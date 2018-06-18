// 工具库
// import config from './config'

export function get (url, data) {
  return request(url, 'get', data)
}

export function post (url, data) {
  return request(url, 'post', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url,
      success (res) {
        resolve(res)
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

export function isPhoneAvailable (phone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}
