<template>
<div class="articles-margins">
  <div class="articles-grid-main">
    <div class="articles-grid-left">
      <div v-for="article in msg.slice(0,msg.length/x)" :key="article.id" class="article-each" @click="articleClickProtocol(article.id)">
        <div class="articles-grid-main">
          <div class="articles-grid-left-left">
            <span class="article-title">
              {{article.title}}
            </span>
            <span class="article-subtitle">    
              {{article.subtitle}}
            </span>
          </div>
          <div class="articles-grid-left-right">
            <img :src="article.image" class="image-leftcol">
          </div>
        </div>
      </div>
    </div>
    <div v-if="x == 2" class="articles-grid-right line-before">
     <div v-for="article in msg.slice(msg.length/x)" :key="article.id" class="article-each" @click="articleClickProtocol(article.id)"> 
        <div>
          <span class="article-title">
            {{article.title}}
          </span>
          <span class="article-subtitle">    
            {{article.subtitle}}
          </span>
        </div>
        <div>
          <img :src="article.image" class="image-rightcol">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: Array,
  },
  data(){
    return{
      x: 2,
    }
  },
  created() {
    window.addEventListener("resize", this.checkWinWidth);
  },
  mounted() {
    this.checkWinWidth();
  },
  unmounted() {
    window.removeEventListener("resize", this.checkWinWidth);
  },
  methods: {
    articleClickProtocol(id){
      this.$router.push("/article/"+id);
    },
    checkWinWidth(){
      let w = window.innerWidth;
      this.x = w > 1000 ? 2 : 1;
    }
  }
}
</script>

<style scoped>
.articles-margins{
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.articles-grid-main{
  text-align: left;
  display: grid;
  grid-column-gap: 31px;
  grid-template-columns: repeat(20,1fr);
}
.articles-grid-left{
  position: relative;
  grid-column: span 14;
}
.articles-grid-right{
  position: relative;
  grid-column: span 6;
}
.line-before::before{
  content: '';
  height: 100%;
  position: absolute;
  left: -16px;
  border-left: 1px solid #666666;
}
.article-each{
  cursor: pointer;
  padding: 20px 0;
}
.article-each::after{
  content: '';
  width: 100%;
  position: absolute;
  border-bottom: 1px solid #666666;
  margin: 20px 0;
}
.article-each:hover .article-title{
  color: #888888;
}
.article-title{
  color: #000000;
  font-family: "times new roman",times,serif;
  font-size: 1.375rem;
  line-height: 1.5625rem;
  font-weight: 700;
  margin-bottom: 10px;
  transition: .3s ease;
}
.article-subtitle{
  display: block;
  margin-top: 10px;
  color: #666666;
  font-size: 15px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.image-leftcol{
  width: 40vw;
  max-width: 522px;
  text-align: end;
}
.image-rightcol{
  width: 20vw;
  max-width: 261px;
  text-align: end;
  margin-top: 20px;
}
.articles-grid-left-left{
  position: relative;
  grid-column: span 7;
}
.articles-grid-left-right{
  position: relative;
  grid-column: span 13;
}
</style>
