<template>
  <div class="content">
    <!-- 全局header -->
    <nv-head :page-type="getTitleStr(searchKey.tab)"
      ref="head"
      :fix-head="true"
      :need-add="true"
      from="single">
    </nv-head>

    <section id="page">
      <!-- 首页列表 -->
      <ul class="posts-list">
          <li v-for="item in topics" :key="item.id">
              <router-link :to="{name:'detail',params:{id:item.id}}">
              <h3 v-text="item.title"
                      :class="getTabInfo(item.tab, item.good, item.top, true)"
                      :title="getTabInfo(item.tab, item.good, item.top, false)">
              </h3>
              <div class="content">
                  <img class="avatar" :src="item.author.avatar_url" />
                  <div class="info">
                      <p>
                          <span class="name">
                              {{item.author.loginname}}
                          </span>
                          <span class="status" v-if="item.reply_count > 0">
                              <b>{{item.reply_count}}</b>
                              /{{item.visit_count}}
                          </span>
                      </p>
                      <p>
                          <time>{{item.create_at | getLastTimeStr}}</time>
                          <time>{{item.last_reply_at | getLastTimeStr}}</time>
                      </p>
                  </div>
              </div>
              </router-link>
          </li>
      </ul>
    </section>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <span slot="no-more">
        没有更多数据 :(
      </span>
    </infinite-loading>
  </div>
</template>
<script>
import 'assets/common.scss'
import $ from 'n-zepto'
import utils from 'assets/common.js'
import nvHead from 'components/header'
import InfiniteLoading from 'toon-ui/lib/components/scroller'
export default {
  mounted: function () {
    if (this.$route.query && this.$route.query.tab) {
      this.searchKey.tab = this.$route.query.tab
    }
    if (window.window.sessionStorage.searchKey && window.window.sessionStorage.tab === this.searchKey.tab) {
        this.isFirst = false
        this.topics = JSON.parse(window.window.sessionStorage.topics)
        this.searchKey = JSON.parse(window.window.sessionStorage.searchKey)
        this.$nextTick(() => $(window).scrollTop(window.window.sessionStorage.scrollTop))
    } else {
      this.getTopicsList()
    }
  },
  data () {
    return {
      topics: [],
      searchKey: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      isFirst: true
    }
  },
  components: {
    nvHead,
    InfiniteLoading
  },
  filters: {
    getLastTimeStr: function (time) {
      return utils.getLastTimeStr(time)
    }
  },
  watch: {
    '$route' (to, from, next) {
      if (to.query && to.query.tab) {
        this.searchKey.tab = to.query.tab
        this.topics = []
      }
      this.searchKey.page = 1
      this.getTopicsList()
      this.$refs.head.show = false
      $('html, body, #page').removeClass('scroll-hide')
    }
  },
  methods: {
    getTitleStr: function (tab) {
      let str = ''
      switch (tab) {
        case 'share':
          str = '分享'
          break
        case 'ask':
          str = '问答'
          break
        case 'job':
          str = '招聘'
          break
        case 'good':
          str = '精华'
          break
        default:
          str = '全部'
      }
      return str
    },
    getTabInfo: function (tab, good, top, isClass) {
      let str = ''
      let className = ''
      if (top) {
          str = '置顶'
          className = 'top'
      } else if (good) {
          str = '精华'
          className = 'good'
      } else {
          switch (tab) {
              case 'share':
                  str = '分享'
                  className = 'share'
                  break
              case 'ask':
                  str = '问答'
                  className = 'ask'
                  break
              case 'job':
                  str = '招聘'
                  className = 'job'
                  break
              default:
                  str = '暂无'
                  className = 'default'
                  break
          }
      }
      return isClass ? className : str
    },
    getTopicsList: function () {
      let _self = this
      _self.$http.get('https://cnodejs.org/api/v1/topics', {
        params: _self.searchKey
      })
      .then(function (res) {
        _self.topics = _self.topics.concat(res.data.data)
        _self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        _self.isFirst = false
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    onInfinite () {
      console.log(this.searchKey.page)
      if (!this.isFirst) {
        this.searchKey.page += 1
        this.getTopicsList()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    // 如果跳转到详情页面，则记录关键数据
    // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
    if (to.name === 'detail') {
      // 当前滚动条位置
      window.window.sessionStorage.scrollTop = $(window).scrollTop()
      // 当前页面主题数据
      window.window.sessionStorage.topics = JSON.stringify(this.topics)
      // 查询参数
      window.window.sessionStorage.searchKey = JSON.stringify(this.searchKey)
      // 当前tab
      window.window.sessionStorage.tab = from.query.tab || 'all'
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'detail') {
      // 页面切换移除之前记录的数据集
      if (window.window.sessionStorage.tab) {
        window.window.sessionStorage.removeItem('topics')
        window.window.sessionStorage.removeItem('searchKey')
        window.window.sessionStorage.removeItem('tab')
      }
    }
    next()
  }
}
</script>
<style lang="scss">
@import './topic.scss';
</style>