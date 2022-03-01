<template>
<div class="header">
  <img class="logo" alt="Bruin Times" src="@/assets/logo.png" @click="returnhome">
</div>
<div class="date-crypto-holder">
  <span class="header-date">{{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</span>
  <span class="header-bitcoin" @click="pushCryptoPage">
    <div>Bitcoin&nbsp;<span :class="btcChange >= 0.0 ? 'change-green' : 'change-red'">{{parseFloat(btcChange).toFixed(2) + '%'}}</span></div>
    <div>Ethereum&nbsp;<span :class="ethChange >= 0.0 ? 'change-green' : 'change-red'">{{parseFloat(ethChange).toFixed(2) + '%'}}</span></div>
  </span>
</div>
<div class="category-nav">
  <span v-for="cat in categories" :key="cat" class="category" @click="categoryClick(cat)">
    {{cat}}
  </span>
</div>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return{
      categories: ['Covid', 'News', 'Crypto'],
      btcChange: 0.0,
      ethChange: 0.0,
    }
  },
  methods:{
    returnhome(){
      this.$router.push("/");
    },
    categoryClick(c){
      if(c == 'News')
        c = '';
      this.$router.push("/"+c);
    },
    pushCryptoPage(){
      this.$router.push("/crypto")
    }
  },
  mounted(){
    fetch('https://api.pro.coinbase.com/products/BTC-USD/stats')
    .then(r => r.json())
    .then((response) => this.btcChange = 100 * (response.last - response.open) / response.open);
    fetch('https://api.pro.coinbase.com/products/ETH-USD/stats')
    .then(r => r.json())
    .then((response) => this.ethChange = 100 * (response.last - response.open) / response.open);
  }
}
</script>

<style scoped>
.header{
  max-width: 1200px;
  margin: 60px auto 30px;
}
.logo{
  cursor: pointer;
}
.date-crypto-holder{
  max-width: 1200px;
  position: relative;
  margin: -30px auto 0;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 20px;
}
@media screen and (max-width: 700px) {
  .date-crypto-holder{
    padding: 20px 20px 0;
  }
}
.header-date{
  font-size: 13px;
  font-weight: 700;
  font-family: Arial, Helvetica, sans-serif;
}
.category-nav{
  border-bottom: 4px double black;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  padding: 0 20px;
}
.category{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  border-radius: 4px;
  transition: .3s all;
  padding: 4px;
  margin: 5px 30px;
}
.category:hover{
  background: #eaeaea;
}
.header-bitcoin{
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  text-align: right;
}
.change-red{
  color: #a61b1e;
}
.change-green{
  color: #3f893b;
}
</style>