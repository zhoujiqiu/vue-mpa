import Vue from 'vue'
import $ from 'n-zepto'

var Rxports = {
  _serverUrl: () => {
    let serverUrl = window.location.host.indexOf('8089') !== -1 ? 'http://t100dcdyapp.xiaotoon.com' : 'http://' + window.location.host
    return serverUrl
  },
  _post: (url, body, param) => {
    return Vue.http.post(
      window.location.host.indexOf('8089') !== -1 ? 'http://t100dcdyapp.xiaotoon.com' + url : 'http://' + window.location.host + url,
      body,
      {params: param})
      .then((res) => {
        console.log(JSON.parse(JSON.stringify(res.data)))
        return res.data
      }).catch((error) => {
        console.log(error)
        return {
          code: error.status,
          message: url + '接口调用异常', // error.statusText,
          data: ''
        }
      })
  },
  GetQueryString: (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  },
  dateTime: (value, param) => {
    let date = new Date(value)
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
    let hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
    // let second = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds()
    if (!param || param === 'time') {
      return date.getFullYear() + '-' + month + '-' + day + '  ' + hour + ':' + minute
    } else if (param === 'date') {
      return date.getFullYear() + '-' + month + '-' + day
    } else if (param === 'datePoint') {
      return date.getFullYear() + '.' + month + '.' + day
    }
  },
  /**
   * 设置网页title公共方法
   * -- created by zhoujiqiu on 2017.1.11
  */
  setTitle: (title) => {
    try {
      let $body = $('body')
      document.title = title
      let $iframe = $('<iframe style="display:none;"></iframe>')
      $iframe.on('load', function () {
        setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    } catch (ex) {
      window.alert(ex)
    }
  }
}
module.exports = Rxports
