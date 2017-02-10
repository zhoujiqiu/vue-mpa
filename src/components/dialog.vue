<template lang='jade'>
div(v-if="isShow")
  .mark_bg
  .dialogBox
    <!-- .cont {{msg.cont}} -->
    .cont(v-if="msg.title!==''&&msg.type==1 || msg.type==2 || msg.type==3"){{msg.title}}
    .cont3(v-if="msg.des!='' && msg.type==1 || msg.type==2"){{msg.des}}
    .cont2(v-if="msg.type==0"){{msg.title}}
    .cont1(v-if="msg.type==0"){{msg.des}}
    .btn_box(v-if="msg.type==0")
      ul.btn0
        li
          button(@click="okDialog")我知道了
    .btn_box(v-if="msg.type==1")
      ul.btn1
        li
          button(@click="closeDialog(false)") 关闭
    .btn_box(v-if="msg.type==2")
      ul.btn2
        li.btn_red
          button(@click="closeDialog") 取消
        li.btn_grey
          button(@click="okDialog") 确定
    .btn_box.btn_box3(v-if="msg.type==3")
      .tag_content
        .input
          input(type='text',placeholder='最多5个字',v-model="mycontent",maxlength=5,autofocus,onfocus="javascript:this.placeholder=''" onblur="javascript:this.placeholder='最多5个字'")
      ul.btn2
        li.btn_red
          button(@click="closeDialog") 取消
        li.btn_grey
          button(@click="confirmDialog") 确定
</template>
<script>
import $ from 'n-zepto'
import 'assets/common.css'
module.exports = {
  ready: function () {
    if (this.msg.type === 3) {
      $('.tag_content input').focus()
    }
  },
  props: ['msg'],
  data () {
    return {
      mycontent: '',
      // msg: {},
      isShow: true
    }
  },
  events: {
    'showMsg': function (data) {
      this.isShow = true
      this.msg.title = data.cont
      this.msg.type = data.type
    }
  },
  methods: {
    closeDialog () {
      this.isShow = false
      this.$dispatch('dialogClose')
    },
    okDialog () {
      this.isShow = false
      this.$dispatch('dialogSure')
    },
    confirmDialog () {
      let temp = this.mycontent || ''
      temp = temp.replace(/\s/g, '')
      if (!temp) {
        return
      }
      this.isShow = false
      this.$dispatch('dialogSure', {content: this.mycontent})
    }
  }
}
</script>
<style  scoped>
  .mark_bg{width:100%;height:100%;position:fixed;top:0;left:0;z-index:2000;background-color:#000;opacity:0.5;}
  .dialogBox{width:75%;background:#fff;position:fixed;left:12%;top:11rem;z-index:2100;text-align:center;border-radius:6px;}
  .dialogBox .cont{background: #fff;padding:20px 0.5rem 20px;line-height:24px;font-size:1.4rem;border-radius:6px;}
  .dialogBox .cont3{font-size:1.5rem;}
  .dialogBox .cont2{font-size:1.5rem;padding:30px 0 20px 0}
  .dialogBox .cont1{background: #fff;padding:1rem 0.5rem;line-height:24px;font-size:1.1rem;border-radius:6px;text-align:left;padding:0 20px 25px 22px}
  .dialogBox .btn_box{border-top:1px solid #dddee3;margin-top:10px}
  .dialogBox .btn_box ul.btn1{overflow:hidden;}
  .dialogBox .btn_box ul.btn1 button{height:3.66rem; line-height: 3.66rem; text-align: center;font-size:1.4rem;border:none; display: block;width:100%;color:#0076FF}
  .dialogBox .btn_box .btn2{overflow:hidden;}
  .dialogBox .btn_box .btn2 li{float:left;width:50%}
  .dialogBox .btn_box .btn2 button{height:3.66rem; line-height: 3.66rem; text-align: center;font-size:1.4rem;border:none; display: block;width:100%;}
  .dialogBox .btn_box .btn2 .btn_red{background:#FF5F71;color: #fff}
  .dialogBox .btn_box .btn2 .btn_red button{color:#fff}
  .dialogBox .btn_box .btn2 li:last-child button{border-right:none}
  .dialogBox .btn_box .btn2 .btn_grey button{color: #FF5F71}


  .dialogBox .btn_box ul.btn0{overflow:hidden;background:#FF5F71;}
  .dialogBox .btn_box ul.btn0 button{height:3.66rem; line-height: 3.66rem; text-align: center;font-size:1.4rem;border:none; display: block;width:100%;color:#fff}

  .dialogBox .btn_box .tag_content{ padding:0 10px 20px;}
  .dialogBox .btn_box .tag_content .input{ height: 30px;position: relative;margin:0 auto;}
  .dialogBox .btn_box .tag_content .input:after {content: " ";width: 200%;height: 200%; position: absolute;top: 0;left: 0;z-index:100;border: 1px solid #ACB3BF;transform: scale(.5);transform-origin: 0 0;box-sizing: border-box;}
  .dialogBox .btn_box .tag_content .input input{  position: absolute;top:1px;left:1px;z-index:200;width: 95%; height: 28px; font-size:13px; border: none; display: block; line-height: 28px;-webkit-appearance: none; background: #fff;padding:0px 5px; margin:0px;}
  .dialogBox .btn_box .tag_content .input input::-webkit-input-placeholder{font-size:13px;color: #ACB3BF;line-height: 28px;}
  .btn_box3{border-top: none !important; margin-top:0px !important;}
</style>
