export const time = (value) => {
  let date = new Date(value)
  let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
  let hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
  let minute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
  let second = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second
}
export const date = (value) => {
  let date = new Date(value)
  let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
  return date.getFullYear() + '-' + month + '-' + day
}
export const computedate = (value) => {
  let date = new Date(value)
  let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
  let hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
  let minute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
  let second = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds()
  if (date.toDateString() === new Date().toDateString()) { // 如果是当天只显示时间
    return hour + ':' + minute + ':' + second
  } else {
    return date.getFullYear() + '-' + month + '-' + day
  }
}
export const timeformater = (val) => {
  function fillZero (num) {
    return num > 9 ? ('' + num) : ('0' + num)
  }
  if (val) {
    let dateTime = new Date(val)
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    let date = dateTime.getDate()
    let d = year + '.' + fillZero(month) + '.' + fillZero(date)
    return d
  } else {
    return ''
  }
}
export const cut = (str, max) => {
  if (!str) return ''
  if (str.length <= max) {
    return str
  } else {
    return str.substr(0, max) + ' ...'
  }
}
