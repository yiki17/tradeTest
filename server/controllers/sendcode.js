const request = require('request')
const sha1 = require('sha1')
const qs = require('querystring')
const appkey = '279335a527d9468be8f1154b4190a7af'
const appsecret = 'dbf1a106f4aa'
const Nonce = Math.random()
  .toString(36)
  .substr(2, 15)
const CurTime = parseInt(new Date().getTime() / 1000) + ''

module.exports = async ctx => {
  let { phone } = ctx.request.query
  let str = appsecret + Nonce + CurTime
  const checkSum = sha1(str)
  const post_data = {
    // templateid: 3913083,
    mobile: phone
  }
  const content = qs.stringify(post_data)
  const option = {
    url: 'https://api.netease.im/sms/sendcode.action?' + content,
    method: 'POST',
    headers: {
      AppKey: appkey,
      Nonce: Nonce,
      CurTime: CurTime,
      CheckSum: checkSum,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  let res = await getJson(option)
  ctx.state.data = {
    msg: res.code
  }
}

function getJson(option) {
  return new Promise((resolve, reject) => {
    request(option, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let info = JSON.parse(body)
        resolve(info)
      } else {
        reject(err)
      }
    })
  })
}

// function getJson(option){
//   return new Promise((resolve,reject) => {
//     https.request(option, res => {
//       let urlData = ''
//       res.on('data', (data) => {
//         urlData +=data
//       })
//       res.on('end', (data) => {
//         const info = JSON.parse(urlData)
//         resolve(info)
//       })
//     })
//   })
// }
