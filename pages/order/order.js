// pages/order/order.js
import req from '../../api/packrequest'
import util from '../../utils/util'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theDefault:'',
    name:'',
    phone:'',
    orderInfo:[],
    times:'',
    money:'',
    sku:[]
  },
  editAddr(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  jumpOdList(){
    wx.navigateTo({
      url:'/pages/orderlist/orderlist'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
console.log(options)
//请求默认地址
const token=app.globalData.token
req('/api/userAddressList','POST',{token:token}).then(res=>{
  const cartsList=res.data.data
  const defaultCart=cartsList.filter(item=>{return item.default===1})
  const defaultLocation=defaultCart[0].procince+'省'+defaultCart[0].city+'市'+defaultCart[0].area+defaultCart[0].detailed
   const tt=defaultCart[0].phone.split('')
   tt.splice(3,5,"*","*","*","*","*")
   let phone=tt.join("")
  this.setData({
    theDefault:defaultLocation,
    name:defaultCart[0].name,
    phone:phone
  })
})
// const token=app.globalData.token
//请求订单列表
req("api/orderList","POST",{token:token}).then(res=>{
  console.log(res)
  const address_id=res.data.data.data[0].address_id
  const money=res.data.data.data[0].money
  const sku=res.data.data.data[0].childern.map(item=>{return JSON.parse(item.sku)})
  this.setData({
     orderInfo:res.data.data.data[0].childern,
     money:money,
     sku:sku
   })
})
this.setData({
  times:util.formatTime(new Date()),
})
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})