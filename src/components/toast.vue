<template>
     <div class="weui-toast" v-if="toastIsHidden">
     <p class="weui-toast__content">{{data}}</p></div>
 </template>
 <script>
  import 'assets/common.css'
  export default {
    props: ['data'],
    data () {
      return {
        toastIsHidden: true
      }
    },
    ready: function () {
      this.closeToast()
    },
    methods: {
      closeToast () {
        let self = this
        setTimeout(function () {
          self.toastIsHidden = false
        }, 3000)
      }
    }
  }
</script>
<style  scoped>
.fade-transition {
      transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave {
      opacity: 0;
    }
  .dialog{  position:absolute; width:100%; left:0px; bottom:3px; height:4.8rem; line-height:4.8rem; color:#fff; font-size:1.25rem;}
  .weui-toast {
    /*position: fixed;
    z-index: 5000;
    width: px2rem(550);
    min-height: 2.6em;
    top: 50%;
    left: px2rem(100);
    margin-top:-5rem;
    background: rgba(40, 40, 40, 0.75);
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;*/
    position: fixed;
    z-index: 5000;
    width: 15.6em;
    min-height: 2.6em;
    top: 50%;
    left: 50%;
    margin-top:-5rem;
    margin-left: -7.8em;
    background: rgba(40, 40, 40, 0.75);
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;
}
.weui-toast__content {
    /*color:#fff;
    line-height:px2rem(88);
    font-size: px2rem(26);
    opacity:1*/
    margin: 1rem 0;
    color:#fff;
    font-size: 1.1rem;
}

</style>
