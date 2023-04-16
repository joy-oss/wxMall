// pages/addaddress/addaddress.js
import req from '../../api/packrequest'
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    procince:'',
    city:'',
    area:'',
    name:'',
    detailed:'',
    address_id:''
  },
  getuname(e){
this.setData({
  name:e.detail.value
})
  },
  getphone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getarea(e){
    const area=e.detail.value
    const area1=area.split('省')
    console.log(area1)
    const area2=area1[1].split('市')
    console.log(area2)
    this.setData({
      procince:area1[0],
      city:area2[0],
      area:area2[1]
    })
  },
  getdetail(e){
    this.setData({
      detailed:e.detail.value
    })
  },
  addAddrClick(){
const token=app. globalData.token;
//修改则传id
console.log(this.data.address_id)
if(this.data.address_id!==''){
  req('/api/userAddressAddModify','POST',{token:token,phone:this.data.phone,procince:this.data.procince,city:this.data.city,area:this.data.area,name:this.data.name,detailed:this.data.detailed,address_id:this.data.address_id}).then(res=>{
    if(res.statusCode===200){
      wx.redirectTo({
        url: '/pages/address/address',
      })
    }
  })
}else{
  //新增
  req('/api/userAddressAddModify','POST',{token:token,phone:this.data.phone,procince:this.data.procince,city:this.data.city,area:this.data.area,name:this.data.name,detailed:this.data.detailed}).then(res=>{
    console.log(res)
    if(res.statusCode===200){
      wx.redirectTo({
        url: '/pages/address/address',
      })
    }
  })
}
  },
  deladdrClick(){
    const token=app.globalData.token;
req("api/userAddressDelete",'POST',{token:token,id:this.data.address_id}).then(res=>{
  console.log(res)
  if(res.statusCode===200){
    wx.redirectTo({
      url: '/pages/address/address',
    })
  }
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      address_id:''
    })
    const token=app.globalData.token;
    //若是修改地址进来时需要进行回显
    if(options.address_id){
    this.setData({
      address_id:options.address_id
    })
    console.log(this.data.address_id)
    req("/api/userAddressList",'POST',{token:token}).then(res=>{
    const allcartlist=res.data.data
    // console.log(allcartlist)
    let  editAddr={}
for(let i=0;i<allcartlist.length;i++){
  if(allcartlist[i].address_id===Number(options.address_id)){
    editAddr=allcartlist[i]
  }
}
    this.setData({
      phone:editAddr.phone,
      procince:editAddr.procince,
      city:editAddr.city,
      area:editAddr.area,
      name:editAddr.name,
      detailed:editAddr.detailed,
    })
    })
  }
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