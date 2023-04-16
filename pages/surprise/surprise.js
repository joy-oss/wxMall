// pages/surprise/surprise.js
import {$fetch_commList} from '../../api/goods'
const app=getApp()
import req from '../../api/packrequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:0,
    height:0,
    left:0,
    searchTop:0,
    goodsDetilData:{},
    showSkub:false,
    skuInfo:{},
    rowflag:'',
    cloflag:'',
    clovalue:'',
    skuvalues:[],
    skukeys:[],
    sku:[],
    selected:[],
    mysku:[],
    price:0,
    good_id:0,
    count:1,
    money:0,
  },
  jumpback(){
    wx.redirectTo({
      url:'/pages/type/type'
    })
  },
  jumptocart(){
wx.redirectTo({
  url: '/pages/cart/cart',
})
  },
  showSku(){
    this.setData({
      showSkub:true
    })
  },
  hiddenSku(){
    this.setData({
      showSkub:false
    })
   this.setData({
     money:this.data.count*this.data.price
   })
   const token=app.globalData.token
   const endsku=JSON.stringify(this.data.selected)
   //创建购物车
    req('/api/shoppingCarAddModify','POST',{
      token:token,good_id:this.data.good_id,num:this.data.count,price:this.data.price,money:this.data.money,sku:endsku,
    }).then(res=>{
        if(res.statusCode===200){
          wx.showToast({
            title: '成功加入购物车',
            icon: 'success',
            duration: 2000 
          })
        }else{
          wx.showToast({
            title: '网络请求错误',
            icon: 'error',
            duration: 2000,
    })
  }
})
}
  ,
  clickf(e){
    this.setData({
      rowflag:e.currentTarget.dataset.key
    })

// console.log("key:"+this.data.rowflag)
let tempmysku1=this.data.mysku
if(tempmysku1.length!==0){
if(tempmysku1.every(item=>item.key!==this.data.rowflag)===true){
// 判断选择sku类型,如果是新类型则新增sku对象
let newvalue={}
newvalue.key=this.data.rowflag
newvalue.value=[]
let newvaluevalue={}
newvaluevalue.key=this.data.rowflag
newvaluevalue.value=this.data.clovalue
newvalue.value.push(newvaluevalue)
tempmysku1.push(newvalue)
this.setData({
  mysku:tempmysku1
})
}else{
  // 如果已经含有该key则替换原来的
for(let i=0;i<tempmysku1.length;i++){
  if(tempmysku1[i].key===this.data.rowflag){
    let newvalue=[]
    let newvaluevalue={}
    newvaluevalue.key=this.data.rowflag
    newvaluevalue.value=this.data.clovalue
    newvalue.push(newvaluevalue)
    tempmysku1[i].value=newvalue
  }
}
this.setData({
  mysku:tempmysku1
})
} 
}else{
  // 初始化sku数据结构
  let myskuvalue={};
  let tempmysku=[]
  tempmysku.push(myskuvalue)
  myskuvalue.key=this.data.rowflag
  myskuvalue.value=[]
  let newvaluevalue={}
  myskuvalue.value.push(newvaluevalue)
  newvaluevalue.key=this.data.rowflag
  newvaluevalue.value=this.data.clovalue
  this.setData({
    mysku:tempmysku
  })
}
//筛选value值在页面展示
let tempselected=[]
for(let i=0;i<this.data.mysku.length;i++){
for(let j=0;j<this.data.mysku[i].value.length;j++){
  tempselected.push(this.data.mysku[i].value[j].value)
}}
// console.log(this.data.mysku)
//数组去重
this.setData({
  selected:tempselected
})
},
  clicks(e){
    this.setData({
      cloflag:e.currentTarget.dataset.key,
      clovalue:e.currentTarget.dataset.value
    })
  },
  incre(){
   this.setData({
     count:this.data.count+1
   })
  },
  decre(){
    this.setData({
      count:this.data.count-1
    })
  },
  buyClick(){
    const endsku=JSON.stringify(this.data.selected)
    this.setData({
      money:this.data.count*this.data.price
    })
   wx.redirectTo({ 
     url: "/pages/order/order?good_id="+this.data.good_id+"&num="+this.data.count+"&price="+this.data.price+"&money="+this.data.money+"&sku="+endsku
   })
  },
  jumpToCart(){
    this.setData({
      money:this.data.count*this.data.price
    })
    wx.redirectTo({
      url: "/pages/cart/cart"
    })
  },
  onLoad(options) {
//设置搜索框的位置
const menuPosition=wx.getMenuButtonBoundingClientRect()
this.setData({
  top:menuPosition.top,
  height:menuPosition.height,
  left:menuPosition.left-15,
  searchTop:menuPosition.height/2-10,
})
//请求详情页数据
  req('api/goodInfo','Post',{good_id:options.good_id}).then(res=>{
    console.log(res)
    this.setData({
      goodsDetilData:res.data.data,
      skuInfo:JSON.parse(res.data.data.info[0].edition),
      good_id:res.data.data.good_id,
      price:Number(res.data.data.price)
    })
    // console.log(res)
    //构建数组对象数据结构
  const temValue=this.data.skuInfo.sku_column.map(item=>{
    return item.value
  })
  const temkey=this.data.skuInfo.sku_column.map(item=>{
    return item.key
  })
 const temparr=[]
  for(let i=0;i<temValue.length;i++){
    let temp=[]
    temparr[i]=temp
    for(let j=0;j<temValue[i].length;j++){
      let tempobj={}
       tempobj.value=temValue[i][j]
       temparr[i].push(tempobj)
    }
  }
  for(let j=0;j<temparr.length;j++){
    for(let i=0;i<temparr[j].length;i++){
         temparr[j][i].key=temkey[j]
    }
  }
const t=JSON.parse(res.data.data.info[0].edition)
for(let i=0;i<t.sku_column.length;i++){
  t.sku_column[i].value=temparr[i]
}
// console.log(t)
// console.log(this.data.skuInfo)
this.setData({
  skuInfo:t
})
})
//评论区列表
$fetch_commList({good_id:options.good_id,tag_id:'2'}).then(res=>{
  console.log(res)
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
//单页隐藏tabBar
wx.hideTabBar()
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