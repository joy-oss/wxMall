// pages/type/type.js
import {goodsList} from '../../api/goods'
import req from '../../api/packrequest'
Page({
  data: {
    top:0,
    left:0,
    height:0,
    searchTop:0,
    good_id:'',
    goodList:[],
    ishow:false,
    typesearch:0,
    goodssearch:[],
    footView:[],
    tempgoodList:[],
    tempAllgoods:[],
    page:0
  },
  acceptSearch(e){
   this.setData({
     footView:e.detail
   })
   let searchgoods=[]
for(let i=0;i<this.data.footView.length;i++){
for(let j=0;j<this.data.goodList.length;j++){
if(this.data.goodList[j].good_name.includes(this.data.footView[i])){
  searchgoods.push(this.data.goodList[j])
  wx.setStorageSync('flag','搜索成功')
  this.setData({
    goodList:searchgoods
  })
}}}
   },
   //触底加载
   btmLoading(e){
    this.setData({
      page:this.data.page+1
    })
    console.log(this.page)
    req('api/goodList','POST',{page:this.data.page,size:10}).then(res=>{
      this.setData({
        goodList:res.data.data.data
      })
    })
   },
  onLoad(options) {
    // wx.clearStorage()
    //导航栏搜索样式
    const menuPosition=wx.getMenuButtonBoundingClientRect()
    this.setData({
      top:menuPosition.top,
      height:menuPosition.height,
      left:menuPosition.left-15,
      searchTop:menuPosition.height/2-10
    })
    //商品列表
    goodsList.then(res=>{
      this.setData({
        goodList:res.data.data.data
      })
    })
 if(options.good_type){
  this.setData({
    goodList:[]
  })
  //二级分类列表
let goodtype=Number(options.good_type)
req('api/goodList','POST',{good_type:goodtype}).then(res=>{
  if(res.data.data.data.length===0){
    this.setData({
      ishow:true
    })
  }else{
    this.setData({
      ishow:false,
      goodList:res.data.data.data
    })
  }
})
}else if(options.id==='typelistSearch'){
  this.setData({
    goodList:[]
  })
  // console.log(options.id)
  // 分类搜索列表
  this.setData({
    typesearch:Number(wx.getStorageSync('0'))
  })
  console.log(wx.getStorageSync('0'))
  req('api/goodList',"POST",{good_type:this.data.typesearch}).then(res=>{
    // console.log(res)
    this.setData({
      goodList:res.data.data.data
    })
  })
}else if(options.goodsInfo){
  this.setData({
    goodList:[]
  })
  let _this=this
  let goodsInfo=options.goodsInfo
  let allgoodstemp=[]
  // console.log(goodsInfo)
  req('api/goodType','POST').then(res=>{
    const allgoods=res.data.data.filter(item=>item.parent_id!==0)
  for(let i=0;i<allgoods.length;i++){
    if(allgoods[i].type_name.includes(goodsInfo)){
      allgoodstemp.push(allgoods[i])
    }
  }
_this.setData({
  goodList:allgoodstemp
})
// console.log(this.data.goodList)
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
//     setTimeout(()=>{
// console.log(this.data.goodList)
//     },5000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
// wx.clearStorageSync()
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