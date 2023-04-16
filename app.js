// app.js
import req from "./api/packrequest"
const app=getApp()
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    const _this=this
    //登录获取登陆的token保存下来直接使用
    req("/api/login","POST",{name:'wl@wl@wl',pw:"123"}).then(res=>{
      console.log(res)
      if(res.data.code===2000){
       _this.globalData.token=res.data.data.token
      }
    })
    wx.clearStorageSync()
  },
  globalData: {
    searchStorage:[],
    token:''
  }
})
