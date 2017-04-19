<template>
    <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
        <section class="list-ul">
            <a class="icon-quanbu iconfont item" @click="goTopic('all',from)">全部</a>
            <a class="icon-hao iconfont item" @click="goTopic('good',from)">精华</a>
            <a class="icon-fenxiang iconfont item" @click="goTopic('share',from)">分享</a>
            <a class="icon-wenda iconfont item" @click="goTopic('ask',from)">问答</a>
            <a class="icon-zhaopin iconfont item" @click="goTopic('job',from)">招聘</a>
        </section>
    </section>
</template>
<script>
    export default {
        replace: true,
        props: [
            'showMenu',
            'from'
        ],
        methods: {
            goTopic: function (tab, from) {
                if (from === 'single') {
                    this.$router.push({name: 'list', query: {tab: tab}})
                } else {
                    window.location.href = 'list.html?tab=' + tab
                }
            }
        }
    }
</script>

<style lang="scss">
    /*侧边栏*/
    
    .nav-list {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -200px;
        width: 200px;
        background-color: #fff;
        color: #313131;
        transition: all .3s ease;
        z-index: 99;
        &.show {
            transform: translateX(200px);
        }
    }
    /*侧边栏列表*/
    
    .list-ul {
        margin: 0 24px;
        overflow: hidden;
        padding-top: 5%;
        .item {
            display: block;
            font-size: 14px;
            font-weight: 200;
            padding: 9% 0;
            text-align: left;
            text-indent: 1px;
            line-height: 15px;
            color: #313131;
            font-weight: 700;
            &:last-child {
                margin-bottom: 50px;
            }
            &:before {
                color: #2c3e50;
            }
        }
        .line {
            border-top: 1px solid #d4d4d4;
        }
    }
</style>