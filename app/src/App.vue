<template>
  <div id="app">
  <!-- start our display of current invaders up to 3 -->
    <h2 class="response-list-heading">{{ responseHeading }}</h2>
    <div v-if="currentInvaders.length === 1">There will be one div printed here.</div>
    <div class="current-invaders" v-else-if="currentInvaders.length === 2">
      <div class="invaders-one">This is the div that holds the first space</div>
      <div class="invaders-two">This is the div that holds the second space</div>
    </div>
    <div v-else-if="currentInvaders.length === 3">There will be three divs printed here.</div>
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
    
    <h3>It's a busy universe, pick an time...</h3>
    <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="timeAvalibleGroup" size="large">
        <el-checkbox-button v-for="time in times" :label="time" :disabled="time === '10:30am'" :key="time">{{time}}</el-checkbox-button>
      </el-checkbox-group>
    <div style="margin: 15px 0;"></div>

  <!-- start our list of next invaders -->
    <h3>Next Invasion starts @</h3>
    <div class="next-invasion-wrapper">
      <ul class="next-invasion" v-for="invasion in confirmedInvasions" :key="invasion._id">
        <li>{{ invasion.email }}</li>
        <li>{{ invasion.confirmed }}</li>      
        <li>{{ invasion.invasion }}</li>
        <li>{{ invasion.location }}</li>
        <li>{{ invasion.when }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import api from './api';

const timeAvalible = ['9:30am', '10:00am', '10:30am', '11:00am', '12:00pm', '12:30pm', '1:00pm', '1:30pm'];

const timeUnavalible = ['9:30am', '10:00am', '10:30am', '11:00am'];

// our data
export default {
  data() {
    return {
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
    fetchData() {
      api.get('/invasions')

      .then((invadersResponse) => {
        const invasions = invadersResponse.data;

        for (let i = 0; i < invasions.length; i += 1) {
          if (invasions[i].confirmed === true) {
            this.confirmedInvasions.push(invasions[i]);
          }
          if (invasions[i].email === 'g.queen@company.com') {
            this.currentInvaders.push(invasions[i]);
          }
        }
      });
    },
  },
  beforeMount() {
    this.fetchData();
  },
};
</script>

<style>

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.response-list-heading {
  color: #2c3e50;
  margin-top: 60px;
}

.current-invaders {
  display: flex;
  justify-content: space-between;
}

.invaders-one {
  flex: 1 1 auto;
  background: #2c3e50;
  margin: 10px;
  padding: 20px;
  color: white;
}

.invaders-two {
  flex: 1 1 auto;  
  background: #2c3e50;
  margin: 10px;
  padding: 20px;
  color: white;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  font-size: 14px;
  font-family: 'Times New Roman', Times, serif;
}

.next-invasion-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.next-invasion {
  flex: 0 1 auto; 
  background: #2c3e50;
  padding: 20px;
  margin: 20px;
  width: 300px;
  color: white;
}

</style>
