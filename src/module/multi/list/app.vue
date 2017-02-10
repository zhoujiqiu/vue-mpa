<template>
<div class="content">
  <div class="news_content"><ol v-if="newsList.length>0"> 
    <li class="aaa" v-for="list in newsList" @click="goDetail(list.newsId)">
      <div class="clearfix"> 
        <div class="fl news_pic" v-if="list.newsUrl">  
          <img :src="list.newsUrl+'?imageView2/1/w/190/h/144'"> 
        </div>
        <div :class="list.newsUrl ? 'news_text' : 'news_text_long'"> 
          <div class="news_text_t">{{list.newsTitle}}</div>
          <span>{{list.newsPublishTime | computedate}}</span>
          <div class="news_text_fr">
            <span>{{list.newsBrowsNum}}&nbsp;浏览</span>
            <strong class="zd" v-if="list.newsIsTop == 'Y'">置顶</strong>
          </div>
        </div>
      </div>
    </li></ol>
    <div class="nodata-box" v-if="listStatus"> <i></i> <p>暂无数据!</p> </div>
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
      newsList: '',
      listStatus: false
    }
  },
  methods: {
    goDetail: function (newsId) {
      window.location.href = '/multi/detail/index.html?newsId=' + newsId
    },
    getNewsList: function () {
      let self = this
      self.newsList = []
      let body = ''
      let param = {
        pageNum: 1,
        pageSize: 50,
        nc_id: 2
      }
      comJs._post('/news/findListNews', body, param).then((response) => {
        if (response.code === '0') {
          self.newsList = response.data
          if (response.data.length > 0) {
            this.listStatus = false
          } else {
            this.listStatus = true
          }
        }
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
/*内容列表*/
.news_content{width: 100%;
    ol{
        background:#fff;
        position:relative;
        &:after{
            content: '';
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            height:1px;
            background-image: linear-gradient(0deg, #dddee3 50%, transparent 50%);
        }
    }
    
}
.news_content li{padding:px2rem(26) 0;position:relative;margin-left:px2rem(30);
    &:after{
        content: '';
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        height:1px;
        background-image: linear-gradient(0deg, #e8e8e8 50%, transparent 50%);
    }
    &:last-child{
        .news_text:after{
            display:none;
        }
    }
}
.news_pic{width:px2rem(190);height:px2rem(144);margin-right:px2rem(20); overflow:hidden;}
.news_pic img{width: px2rem(190);height:px2rem(144);}
.news_text{width:px2rem(510);float:right;position:relative;padding-right:px2rem(30);
    
}
.news_text_long{
    float:none;
    width:px2rem(710);
}
.news_text p{width: 96%;word-wrap: break-word;font-size:px2rem(32);color: #333333;margin-bottom:px2rem(32);}
.news_text span{float: left;font-size:px2rem(24);color: #8E8E93;}
.news_text span:nth-of-type(1){margin-right:px2rem(200); margin-top:px2rem(2)}
.news_text img{float: left;width:px2rem(24);height:px2rem(16);margin-top:px2rem(8);margin-right:px2rem(8);}
.news_text strong{float: right;text-align: center;width:px2rem(60);height:px2rem(28);line-height:px2rem(28);font-size:px2rem(18);}
.news_text .zd{color: #39ABE9;border: 1px solid #39ABE9;border-radius:px2rem(6); font-size:px2rem(20); font-weight:100; height:auto; 
    padding-top:px2rem(4); padding-bottom:px2rem(2); line-height:px2rem(22); margin:px2rem(0) 0 0 px2rem(18);}
.news_text .rm{color: #FF5A5F;border: 1px solid #FF5A5F;border-radius:px2rem(2);}
.no_pic .news_text{width: 100%;}
.no_pic .news_text span:nth-of-type(1){margin-right:px2rem(406);}

.news_text_fr{float:right; line-height:px2rem(30)}
.news_text span:nth-of-type(1){margin-right:0;}
.news_text_t{
  max-height:px2rem(86);
  line-height: px2rem(44);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -moz-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size:px2rem(32)!important;
    margin-bottom:px2rem(28);
    word-wrap: break-word;
    word-break: break-all;
}
</style>