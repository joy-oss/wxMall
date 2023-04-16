// pages/address/address.js
import req from '../../api/packrequest'
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
addrInfo:[],
phone:[],
cartcom:'',
defaultid:0
  },
  setDefault(e){
    const token=app.globalData.token
    const address_id=Number(e.detail.value)
    this.setData({
      defaultid:address_id
    })
    console.log(e.detail.value)
    req('/api/userAddressDfault','POST',{token:token,id:address_id}).then(res=>{
      if(res.statusCode===200){
        wx.showToast({
          title: '已设为默认地址',
          icon: 'success',
          duration: 2000
        })
if(this.data.cartcom==='cart'){
wx.redirectTo({
  url: '/pages/cart/cart',
})
}else{
  wx.redirectTo({
    url: '/pages/order/order',
  })
}
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
if(options.id)(
  this.setData({
    cartcom:options.id
  })
)
    const token=app.globalData.token
    req('/api/userAddressList','POST',{token:token}).then(res=>{
      console.log(res)
      this.setData({
        addrInfo:res.data.data
      })
  let tempnum=res.data.data
  let tempphone=[]
  for(let i=0;i<tempnum.length;i++){
    const nuewphone=tempnum[i].phone.split('')
    nuewphone.splice(3,5,"*","*","*","*","*")
    tempphone.push(nuewphone.join(""))
  }
 this.setData({
   phone:tempphone
 })
})
  },
  addaddr(){
    wx.navigateTo(
      {
        url:'/pages/addaddress/addaddress?id=addaddr'
      }
    )
  },
  editAddrClick(e){
    console.log(e)
    wx.navigateTo(
      {
        url:'/pages/addaddress/addaddress?address_id='+e.currentTarget.dataset.address_id
      }
    )
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