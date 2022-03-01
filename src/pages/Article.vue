<template>
  <div class="article-margins">
    <div v-if="article"> 
      <div class="page-article-container">
        <div class="category" v-if="article.category" @click="categoryClick">
          <span>{{(article.category).toUpperCase()}}</span>
        </div>
        <div class="title">
          {{article.title}}
        </div>
        <div class="author">
          {{"By "+article.author}}
        </div> 
        <div class="date">
          {{article.date}}
        </div>
        <div v-if="article.image" class="article-image-main">
          <img :src="article.image" class="image-main">
        </div>
        <div class="article-body" 
          v-html="article.body">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    msg: Array,
    id: String,
  },
  data(){
    return{
      article: {},
    }
  },
  mounted(){
    this.msg.forEach((el) => {
      if(el.id == this.id){
        this.article = el;
      }
    })
  },
  methods:{
    categoryClick(){
      this.$router.push("/"+this.article.category);
    }
  },
}
</script>

<style scoped>
img{
  width:100%;
  margin: 30px 0;
}
.article-margins{
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 100px;
}
.category{
  font-size: 8px;
  font-weight: 800;
  text-align: left;
  margin-bottom: 20px;
}
.category span{
  cursor: pointer;
  transition: .3s all;
}
.category span:hover{
  color: orange;
}
.title{
  font-size: 50px;
  font-family: 'Times New Roman', Times, serif;
  text-align: left;
}
.page-article-container{
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px;
}
.author{
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 12px;
  margin-top: 40px;
  text-align: left;
}
.date{
  font-size: 12px;
  text-align: left;
  color: #666666;
  margin-bottom: 40px;
}
.image-main{
  margin-top: 0;
}
.article-body{
  text-align: left;
  white-space: pre-wrap;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.9375rem;
  color: #000000;
}
.article-body ::v-deep img{
  width: 100%;
  margin: 30px 0;
}
</style>
