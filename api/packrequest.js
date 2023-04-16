//封装公共函数
import {baseUrl} from './baseUrl'
const req=(url,method,data)=>{
return new Promise((reslove,reject)=>{
wx.request({
  url: baseUrl+url,
  method,
  data,
  success:(res)=>{
    reslove(res)
  },
  fail:(err)=>{
    reject(err)
  }
})
})
}
export default req;