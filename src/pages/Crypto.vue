<template>
<div>
<div class="charts-buttons">
  <button :class="{'button-select': (dateChoice == '1 Week'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != '1 Week')}" @click="setDateChoice('1 Week')">1 Week</button>
  <button :class="{'button-select': (dateChoice == '1 Month'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != '1 Month')}" @click="setDateChoice('1 Month')">1 Month</button>
  <button :class="{'button-select': (dateChoice == '1 Year'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != '1 Year')}" @click="setDateChoice('1 Year')">1 Year</button>
  <button :class="{'button-select': (dateChoice == 'Full'), 'date-button':true, 'button-grayed': (animationActive && dateChoice != 'Full')}" @click="setDateChoice('Full')">Full</button>
</div>
<div class="charts">
  <canvas id="btcChart"></canvas>
</div>
<br>
<div class="charts">
  <canvas id="ethChart"></canvas>
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
      btcArr: [],
      ethArr: [],
      btcChart: null,
      ethChart: null,
      animationActive: true,
    }
  },
  mounted(){
    fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1000')
    .then(r => r.json())
    .then((response) => {
      response = response.Data.Data;
      this.dateArr = response.map(i => new Date(i.time*1000).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }));
      this.btcArr = response.map(i => i.open);
      fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=1000')
      .then(r => r.json())
      .then((response) => {
        response = response.Data.Data;
        this.ethArr = response.map(i => i.open);
        this.makeGraphs();
      });
    });
  },
  methods: {
    makeGraphs(){
      this.animationActive = true;
      this.btcChart = new Chart("btcChart", {
        type: "line",
        data: {
          labels: this.getSlicedArray(this.dateArr),
          datasets: [{
            label: "Bitcoin Price (USD)",
            backgroundColor: "#f2a900",
            borderColor: "#3c3c3d",
            fill:true,
            data: this.getSlicedArray(this.btcArr),
            pointRadius: 2,
          }]
        },
        options:{}
      });
      this.ethChart = new Chart("ethChart", {
        type: "line",
        data: {
          labels: this.getSlicedArray(this.dateArr),
          datasets: [{
            label: "Ethereum Price (USD)",
            backgroundColor: "#ecf0f1",
            borderColor: "#3c3c3d",
            fill:true,
            data: this.getSlicedArray(this.ethArr),
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
      this.btcChart.destroy();
      this.ethChart.destroy();
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