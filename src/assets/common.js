import timeago from 'timeago.js'
import $ from 'n-zepto'

/**
 * 格式化日期或时间
 * @param {string} time 需要格式化的时间
 */
exports.getLastTimeStr = (time) => {
  var str = ''
  if (time !== null && time !== '') {
      str = timeago().format(time, 'zh_CN')
  }
  return str
}

/**
 * 获取浏览器url参数
 * @param {string} name url参数的key
 */
exports.getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 * 设置网页title公共方法
 * @param {string} title 网页标题
*/
exports.setTitle = (title) => {
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
