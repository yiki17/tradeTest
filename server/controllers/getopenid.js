const https = require('https')
const appId = 'wxb801b79d4db96b60'
const appSecret = '959405c04fb81613e29768c1287755bf'
const getOpenUrl = 'https://api.weixin.qq.com/sns/jscode2session'
module.exports = async ctx => {
  const { code } = ctx.request.query
  let url = getOpenUrl + '?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code'
  let info = await getJson(url)
  ctx.state.data = {
    msg: info
  }
}
function getJson(url){
  return new Promise((resolve,reject) => {
    https.get(url,res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const info = JSON.parse(urlData)
        resolve(info)
        if(info){
          resolve(info)
        }else{
          reject()
        }
      })
    })
  })
}