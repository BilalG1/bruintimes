<template>
  <Header />
  <router-view :msg="articlesArray"/>
  <Footer />
</template>

<script>
import articles from '@/assets/articles.txt'
import Header from '@/pages/Header.vue'
import Footer from '@/pages/Footer.vue'

export default {
  name: 'App',
  data(){
    return{
      articlesArray: []
    }
  },
  components: {
    Header,
    Footer
  },
  mounted(){
    let arr = articles.split("<<NEW ARTICLE>>")
    const properties = ["Title", "Subtitle", "Category", "Author", "Date", "Id", "Body", "Image"];
    for(let article of arr){
      let tempObj = {};
      for(let p of properties){
        if(article.indexOf("<"+p+">") != -1){
          let t = article.substring(article.indexOf("<"+p+">") + p.length + 2, article.indexOf("</"+p+">"));
          tempObj[p.toLowerCase()] = t;
        }
      }
      this.articlesArray.push(tempObj);
    }
    this.shuffleArray(this.articlesArray);
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body, html{
  margin: 0px;
}
</style>
