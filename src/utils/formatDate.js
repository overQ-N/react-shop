
/**
 * 
 * @param {*} date 时间
 * @param {*} speator 年月日分隔符，默认 /
 * @param {*} speatorHour 时分秒分隔符，默认 ：
 */
const formatDate = (date, speator='/', speatorHour=':') => {
  date = new Date(date)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return [y, m, d].map(formatNum).join(speator) + ' ' + [h, min, sec].map(formatNum).join(speatorHour)
}
const formatNum = (num) => {
  num = num.toString()
  return num[1] ? num : '0' + num
}
export default formatDate
