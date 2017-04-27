<template>
    <div>
        <nv-head page-type="主题"
                :show-menu="showMenu"
                :need-add="true"
                :fix-head="true"
                from="single">
        </nv-head>

        <div id="page"
                :class="{'show-menu':showMenu}"
                v-if="topic.title">

            <h2 class="topic-title" v-text="topic.title"></h2>
            <section class="author-info">
                <img class="avatar" :src="topic.author.avatar_url" />
                <div class="col">
                    <span>{{topic.author.loginname}}</span>
                    <time>
                        发布于:{{topic.create_at | getLastTimeStr(true)}}
                    </time>
                </div>
                <div class="right">
                    <span class="tag"
                            :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
                            v-text="getTabInfo(topic.tab, topic.good, topic.top, false)">
                    </span>
                    <span class="name">{{topic.visit_count}}次浏览</span>
                </div>
            </section>

            <section class='markdown-body topic-content' v-html="topic.content">

            </section>

            <h3 class="topic-reply">
                <strong>{{topic.reply_count}}</strong> 回复
            </h3>

            <section class="reply-list">
                <ul>
                    <li v-for="item in topic.replies">
                        <section class="user">
                            <img class="head" :src="item.author.avatar_url"/>
                            <div class="info">
                                <span class="cl">
                                    <span class="name" v-text="item.author.loginname"></span>
                                    <span class="name mt10">
                                        <span></span>
                                        发布于:{{item.create_at | getLastTimeStr(true)}}</span>
                                </span>
                            </div>
                        </section>
                        <div class="reply_content" v-html="item.content"></div>
                    </li>
                </ul>
            </section>
        </div>

        <div class='no-data' v-if="noData">
            <i class="iconfont icon-empty">&#xe60a;</i>
            该话题不存在!
        </div>
    </div>
</template>
<script>
    import utils from 'assets/common.js'
    import nvHead from 'components/header.vue'

    export default {
        data () {
            return {
                showMenu: false, // 是否展开左侧菜单
                topic: {}, // 主题
                noData: false,
                topicId: ''
            }
        },
        filters: {
          getLastTimeStr: function (time) {
            return utils.getLastTimeStr(time)
          }
        },
        mounted () {
            let _self = this
            // 隐藏左侧展开菜单
            _self.showMenu = false

            // 获取url传的tab参数
            _self.topicId = _self.$route.params.id

            // 加载主题数据
            _self.$http.get('https://cnodejs.org/api/v1/topic/' + _self.topicId)
            .then(function (res) {
              _self.topic = res.data.data
            })
            .catch(function (err) {
              console.log(err)
              _self.noData = true
            })
        },
        methods: {
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
            getLastTimeStr (time, ago) {
                return utils.getLastTimeStr(time, ago)
            },
            isUps (ups) {
                return false
            }
        },
        components: {
            nvHead
        }
    }
</script>
<style lang="scss">
@import './topic.scss';
</style>