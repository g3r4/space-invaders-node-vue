<template>
  <div id="app">
    <p class="current-time">
      <span>Currently the time is <time>{{ currentTime }}</time></span>
    </p>
  <!-- start our display of current invaders up to 3 -->
    <h2 class="response-list-heading">{{ responseHeading }}</h2>
    <!-- when 1 -->
    <div v-if="currentInvaders.length === 1">
      <div class="invaders-one">
        <span v-for="invasion in currentInvaders.slice((1))">
          <li>{{ invasion.email }}</li>
          <li>{{ invasion.confirmed }}</li>      
          <li>{{ invasion.invasion }}</li>
          <li>{{ invasion.location }}</li>
          <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
          <li>{{ moment(invasion.when).format('LTS') }}</li>   
        </span>
      </div>      
    </div>
    <!-- when 2 -->
    <div class="current-invaders" v-else-if="currentInvaders.length === 2">
      <div class="invaders-one" v-for="i in Math.ceil(currentInvaders.length / 2)">
        <span v-for="invasion in currentInvaders.slice((1))">
          <li>{{ invasion.email }}</li>
          <li>{{ invasion.confirmed }}</li>      
          <li>{{ invasion.invasion }}</li>
          <li>{{ invasion.location }}</li>
          <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
          <li>{{ moment(invasion.when).format('LTS') }}</li>   
        </span>
      </div>
      <div class="invaders-two" v-for="i in Math.ceil(currentInvaders.length / 2)">
        <span v-for="invasion in currentInvaders.slice((+1))">
          <li>{{ invasion.email }}</li>
          <li>{{ invasion.confirmed }}</li>      
          <li>{{ invasion.invasion }}</li>
          <li>{{ invasion.location }}</li>
          <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
          <li>{{ moment(invasion.when).format('LTS') }}</li>  
        </span>
      </div>
    </div>
    <!-- when 3 -->
    <div v-else-if="currentInvaders.length === 3">
      <div class="invaders-one" v-for="i in Math.ceil(currentInvaders.length / 3)">
        <span v-for="invasion in currentInvaders.slice((1))">
          <li>{{ invasion.email }}</li>
          <li>{{ invasion.confirmed }}</li>      
          <li>{{ invasion.invasion }}</li>
          <li>{{ invasion.location }}</li>
          <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
          <li>{{ moment(invasion.when).format('LTS') }}</li>   
        </span>
      </div>
      <div class="invaders-two" v-for="i in Math.ceil(currentInvaders.length / 3)">
        <span v-for="invasion in currentInvaders.slice((+1))">
          <li>{{ invasion.email }}</li>
          <li>{{ invasion.confirmed }}</li>      
          <li>{{ invasion.invasion }}</li>
          <li>{{ invasion.location }}</li>
          <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
          <li>{{ moment(invasion.when).format('LTS') }}</li>  
        </span>
      </div>
      <div class="invaders-three" v-for="i in Math.ceil(currentInvaders.length / 3)">
        <span v-for="invasion in currentInvaders.slice((+2))">
          <li>{{ invasion.email }}</li>
          <li>{{ invasion.confirmed }}</li>      
          <li>{{ invasion.invasion }}</li>
          <li>{{ invasion.location }}</li>
          <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
          <li>{{ moment(invasion.when).format('LTS') }}</li>   
        </span>
      </div>
    </div>
    <!-- when none -->
    <div v-else>There are no invasions at this time.</div>
  <!-- start our form -->
    <div class="block">
      <h3>When is your invasion?</h3>
      <el-date-picker
        v-model="selectedDate"
        type="daterange"
        align="right"
        placeholder="Pick a date range"
        format="MM/dd/yyyy"
        :picker-options="pickerOptions1">
      </el-date-picker>
    </div>
    
    <h3>It's a busy universe, pick any avalible time...</h3>
    <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="timeAvalibleGroup" size="large">
        <el-checkbox-button v-for="time in times" :label="time" :disabled="time.includes(timeUnavalible)" :key="time" v-on:keyup.13="shiftSelect">{{ time }}</el-checkbox-button>
      </el-checkbox-group>
    <div style="margin: 15px 0;"></div>


    <el-button type="primary" @click="submitForm('submitInvasionForm')" style="margin: 10px 0;">Submit</el-button>

  <!-- start our list of next invaders -->
    <h3>Next Invasion starts @</h3>
    <div class="next-invasion-wrapper">
      <ul class="next-invasion" v-for="invasion in confirmedInvasions" :key="invasion._id">
        <li>{{ invasion.email }}</li>
        <li>{{ invasion.confirmed }}</li>      
        <li>{{ invasion.invasion }}</li>
        <li>{{ invasion.location }}</li>
        <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
        <li>{{ moment(invasion.when).format('LTS') }}</li>                
      </ul>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import api from './api';

const timeAvalible = ['8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '6:00pm', '6:30pm', '7:00pm']; // need this time from the server

const timeUnavalible = ['8:00am', '8:30am']; // need this time from the server

// set known time in a day 8am - 7pm in 30min increments

// our data
export default {
  data() {
    return {
      moment,
      currentTime: null,
      currentInvaders: [],
      confirmedInvasions: [],
      responseHeading: 'Current Invasions',
      pickerOptions1: {
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: 'Tomorrow',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() + (3600 * 1000 * 24));
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      selectedDate: '',
      timeAvalibleGroup: [],
      times: timeAvalible,
      notTimes: timeUnavalible,
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format('LTS');
    },
    fetchData() {
      api.get('/invasions')

      .then((invadersResponse) => {
        const invasions = invadersResponse.data;

        for (let i = 0; i < invasions.length; i += 1) {
          if (invasions[i].confirmed === true) {
            this.confirmedInvasions.push(invasions[i]);
          }
          // if (invasions[i].when === moment().minute(+-30)) {
          if (invasions[i].email === 'g.queen@company.com') {
            this.currentInvaders.push(invasions[i]);
          }
        }
      });
    },
    // submitForm(formName) {
    //   this.$refs[formName];
    // },
  },
  beforeMount() {
    this.fetchData();
    this.currentTime = moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
};
</script>

<style>

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.current-time {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}

time {
  font-weight: 700;
}

.response-list-heading {
  color: #2c3e50;
  margin-top: 60px;
}

.current-invaders {
  display: flex;
  justify-content: space-between;
}

.invaders-one,
.invaders-two,
.invaders-three {
  flex: 1 1 auto;
  background: #4db3ff;
  margin: 10px;
  padding: 20px;
  color: white;
  border-radius: 4px;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  font-size: 14px;
  font-family: 'Times New Roman', Times, serif;
}

/* our checkbox buttons */
el-checkbox-button {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.el-checkbox-button__original {
  position: initial;
}

.el-checkbox-button {
  margin: 10px;
}

.el-checkbox-button__inner {
  border: 1px solid #bfcbd9;
  border-radius: 4px !important;
}

.next-invasion-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.next-invasion {
  flex: 0 1 auto; 
  background: #4db3ff;
  padding: 20px;
  margin: 20px;
  width: 300px;
  color: white;
  border-radius: 4px;
}

</style>
