<template>
<div class="content">
  <div class="news_detail">
    <h1 class="nd_title">{{newsDetail.newsTitle}}</h1>
    <div class="clo news_details_tit_text"><span class="fl">{{newsDetail.newsAuthor}}&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="fr">{{newsDetail.newsBrowsNum}}浏览&nbsp;&nbsp;&nbsp;&nbsp;{{newsDetail.newsPublishTime | computedate}}</span></div>
    <!-- 图片 -->
    <div class="nd_pic hide" v-if="newsDetail.newsUrl">
    <img :src="newsDetail.newsUrl+'?imageView2/2/w/750/h/360'">
    </div>
    <!-- 文本 -->
    <div class="nd_text">{{{newsDetail.newsContent}}}</div>
  </div>
</div>
</template>
<script>
import 'assets/common.scss'
import comJs from 'assets/common.js'
export default {
  ready: function () {
    this.getNewsList()
  },
  data () {
    return {
      newsDetail: ''
    }
  },
  methods: {
    getNewsList: function () {
      let self = this
      self.newsDetail = []
      let body = ''
      let param = {
        news_id: comJs.GetQueryString('newsId')
      }
      comJs._post('/news/findNewsById', body, param).then((response) => {
        comJs.setTitle(response.newsTitle)
        self.newsDetail = response
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
@function px2rem($px, $base: 75) {
    @return ($px / $base) * 1rem;
}
.news_detail{background: #ffffff;}
/*title*/
.nd_title{width:91%; margin: 0 auto;text-align:left;color: #000; font-size:px2rem(34);font-weight:500;padding:px2rem(48) 0 px2rem(20);position:relative;word-break: break-all;word-wrap: break-word;
  &:after{
        content: '';
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        height:1px;
        background-image: linear-gradient(0deg, #e8e8e8 50%, transparent 50%);
    }
}
.news_details_tit_text{width: 100%;font-size:px2rem(24);color: #8E8E93;text-align: center;margin-top:px2rem(12);margin-bottom:px2rem(12); 
  padding-left:6%; padding-right:6%;}
/*图片*/
.nd_pic{width:px2rem(670);margin: px2rem(30) auto; margin-top:px2rem(38); overflow:hidden;}
.nd_pic img{width: 100%;}
/*文本*/
.nd_text{width: 91%;margin: 0 auto;font-size:px2rem(30);color: #333333;word-wrap: break-word; line-height:px2rem(48);
    img{
        display:block;
        width:auto;
        max-width:100%;
        margin:px2rem(15) auto;
        height:auto;
    }
 }

.content{padding-bottom:px2rem(30)}
.fl{float:left;}
.fr{float:right;}
.clo{clear:both; overflow:hidden;}

.nd_text p,.nd_text div{margin-bottom:px2rem(38)}
</style>