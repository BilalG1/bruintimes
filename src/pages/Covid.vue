<template>
<div>
<div class="charts-buttons">
  <button :class="{'button-select': (dateChoice == '1 Week'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != '1 Week')}" @click="setDateChoice('1 Week')">1 Week</button>
  <button :class="{'button-select': (dateChoice == '1 Month'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != '1 Month')}" @click="setDateChoice('1 Month')">1 Month</button>
  <button :class="{'button-select': (dateChoice == '1 Year'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != '1 Year')}" @click="setDateChoice('1 Year')">1 Year</button>
  <button :class="{'button-select': (dateChoice == 'Full'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != 'Full')}" @click="setDateChoice('Full')">Full</button>
</div>
<div class="charts">
  <canvas id="caseChart"></canvas>
</div>
<br>
<div class="charts">
  <canvas id="deathChart"></canvas>
</div>
</div>
</template>


<script>
import Chart from 'chart.js/auto';

export default {
  data(){
    return{
      dateChoice: "1 Week",
      dateArr: [],
      caseArr: [],
      deathArr: [],
      caseChart: null,
      deathChart: null,
      animationActive: true,
    }
  },
  mounted(){
    fetch('https://api.covid19api.com/total/country/united-states')
    .then(r => r.json())
    .then((response) => {
      this.dateArr = response.map(i => new Date(i.Date).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }));
      this.caseArr = response.map(i => i.Confirmed);
      this.deathArr = response.map(i => i.Deaths);
      this.makeGraphs();
    });
  },
  methods: {
    makeGraphs(){
      this.animationActive = true;
      this.caseChart = new Chart("caseChart", {
        type: "line",
        data: {
          labels: this.getSlicedArray(this.dateArr),
          datasets: [{
            label: "US Confirmed Covid Cases",
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgba(0,0,0,0.1)",
            data: this.getSlicedArray(this.caseArr),
            pointRadius: 2,
          }]
        },
        options:{}
      });
      this.deathChart = new Chart("deathChart", {
        type: "line",
        data: {
          labels: this.getSlicedArray(this.dateArr),
          datasets: [{
            label: "US Covid Deaths",
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgba(0,0,0,0.1)",
            data: this.getSlicedArray(this.deathArr),
            pointRadius: 2,
          }]
        },
        options:{}
      });
      setTimeout(() => this.animationActive = false, 1000);
    },
    getSlicedArray(arr){
      if(this.dateChoice == 'Full')
        return arr;
      else if(this.dateChoice == '1 Year')
        return arr.slice(-365);
      else if(this.dateChoice == '1 Month')
        return arr.slice(-30);
      else
        return arr.slice(-7);
    },
    setDateChoice(d){
      if(this.animationActive)
        return;
      this.dateChoice = d;
      this.caseChart.destroy();
      this.deathChart.destroy();
      this.makeGraphs();
      
    }
  }
}
</script>

<style scoped>

.date-button{
  margin: 0 5px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid gray;
  font-size: 16px;
  padding: 5px 10px;
  transition: .1s all;
}
.button-select{
  background-color: #b1b1b1;
}
.button-grayed{
  background-color: #e6e6e6;
}
.charts{
  width:100%;
  max-width:700px;
  margin: 50px auto 0;
}
</style>