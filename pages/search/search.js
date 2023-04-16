// pages/search/search.js
const app=getApp()
Page({
  data: {
    top:0,
    height:0,
    left:0,
    footView:[],
    showFootview:[]
  },
  acceptSearch(e){
   this.setData({
     footView:e.detail
   })  
   app.globalData.searchStorage.push(this.data.footView)
   wx.redirectTo({
    url: "/pages/type/type?goodsInfo="+this.data.footView[0],
  })
  },
  onLoad(options) {
    //设置搜索框的位置
    const menuPosition=wx.getMenuButtonBoundingClientRect()
    this.setData({
      top:menuPosition.top,
      height:menuPosition.height,
      left:menuPosition.left-15,
      searchTop:menuPosition.height/2-10
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
    let changeshop = app.globalData.searchStorage;
    this.setData({
      showFootview:changeshop
    })
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