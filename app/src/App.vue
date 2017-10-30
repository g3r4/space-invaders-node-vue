<template>
  <div id="app">
    <p class="current-time">
      <span>Currently the time is <time>{{ currentTime }}</time></span>
    </p>
  <!-- start our display of current invaders up to 3 -->
    <h2 class="response-list-heading">Current Invasions</h2>
    <!-- when 1 -->
    <!-- TODO: see if we can make this more dry -->
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

    <!-- start our form here -->
    <el-form 
    :model="validateForm" 
    :rules="formRules"
    ref="validateForm" 
    >

      <!-- user picks a date -->
      <el-form-item prop="date">
        <h3>Pick a day for your invasion</h3>
        <el-date-picker
          v-model="validateForm.when.date"
          type="date"
          placeholder="Pick a date">
        </el-date-picker>
      </el-form-item>

      <!-- user picks an avalible space -->
      <el-form-item prop="space">
        <h3>Pick your invasion space</h3>
          <el-select 
          v-model="validateForm.space" 
          placeholder="Select">
            <el-option
              v-for="space in spaces"
              :key="space.value"
              :label="space.label"
              :value="space.value"
              :disabled="space.disabled"
            ></el-option>
          </el-select>
      </el-form-item>

      <!-- user selects from avalible times -->
      <el-form-item prop="timeRange">
        <h3>It's a busy universe, pick any avalible time...</h3>
          <el-checkbox-group 
          v-model="validateForm.when.timeRange" 
          size="large">
            <el-checkbox-button 
            v-for="time in times" 
            :label="time" 
            :disabled="time === '10:30am'" 
            :key="time" v-on:keyup.13="shiftSelect">{{ time }}</el-checkbox-button>
          </el-checkbox-group>
      </el-form-item>

      <!-- user names reservation -->
      <el-form-item prop="invasion">
        <h3>Name your invasion</h3>
          <el-input 
          placeholder="Colaborative Sketch Session for..." 
          type="input"
          v-model="validateForm.invasion" 
          auto-complete="off"></el-input>
      </el-form-item>

      <!-- user enters email to confirm -->
      <el-form-item prop="email">
        <h3>Enter your email</h3>
        <el-input 
        placeholder="Email" 
        type="email"
        v-model="validateForm.email" 
        auto-complete="off"></el-input>
      </el-form-item>  

      <!-- user submits the reervation -->
      <el-form-item>
        <el-button 
        type="primary" 
        @click="submitForm('validateForm')">Submit</el-button>

        <el-button 
        @click="resetForm('validateForm')">Reset</el-button>
      </el-form-item>

    </el-form>
    <!-- this ends the post form test -->

    <!-- start our list of next invaders -->
    <h3>Next Invasion starts @</h3>
      <h4>Unconfirmed Invasions</h4>    
    <div class="next-unconfirmed-invasion-wrapper">
      <ul class="next-unconfirmed-invasion" v-for="invasion in unConfirmedInvasions" :key="invasion._id">
        <li>{{ invasion.email }}</li>
        <li>{{ invasion.confirmed }}</li>      
        <li>{{ invasion.invasion }}</li>
        <li>{{ invasion.location }}</li>
        <li>{{ moment(invasion.when).format('dddd, MMMM DD') }}</li>
        <li>{{ moment(invasion.when).format('LTS') }}</li>                
      </ul>
    </div>
    <h4>Confirmed Invasions</h4>
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

const spaceAvalible = [{ value: 'Space 1', label: 'Space 1' }, { value: 'Space 2', label: 'Space 2', disabled: true }, { value: 'Space 3', label: 'Space 3' }];// need this space list from the server

// our data
export default {
  data() {
    return {
      moment,
      currentTime: null,
      times: timeAvalible,
      spaces: spaceAvalible,
      validateForm: {
        when: {
          date: '',
          timeRange: [],
        },
        space: '',
        invasion: '',
        email: '',
      },
      formRules: {
        date: [
          { 
            required: true, 
            type: 'date', 
            message: 'Please pick a date.', 
            trigger: 'change' 
            },
        ],
        space: [
          { 
            required: true, 
            type: 'input', 
            message: 'Please select a valid space.', 
            trigger: 'blur' 
            },
        ],
        timeRange: [
          { 
            required: true, 
            type: 'array', 
            message: 'Please pick at least one time.', 
            trigger: 'change' 
            },
        ],
        invasion: [
          { 
            required: true, 
            type: 'input', 
            message: 'Please input invasion name', 
            trigger: 'blur' 
            },
        ],
        email: [
          { 
            required: true, 
            type: 'email', 
            message: 'Please enter a valid email.', 
            trigger: 'blur' 
            },
        ],
      },
      currentInvaders: [],
      confirmedInvasions: [],
      unConfirmedInvasions: [],      
      invasionSaved: [],
      timeAvalibleGroup: [],
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
          if (invasions[i].confirmed === false) {
            this.unConfirmedInvasions.push(invasions[i]);
          }
        }
      });
    },
    submitForm(validateForm) {
      // this.invasionSaved.push(validateForm);
      // this.invasionSaved.api.put('/invasions');
      this.$refs[validateForm].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.$refs[validateForm].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(validateForm) {
      this.$refs[validateForm].resetFields();
    },
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

.next-invasion-wrapper,
.next-unconfirmed-invasion-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.next-unconfirmed-invasion {
  flex: 0 1 auto; 
  border: solid 1px #4db3ff;
  padding: 20px;
  margin: 20px;
  width: 300px;
  color: #4db3ff;
  border-radius: 4px;
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
