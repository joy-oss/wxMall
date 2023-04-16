// pages/cart/cart.js
import req from '../../api/packrequest'
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    sku:[],
    num:1,
    checkall:false,
    theDefault:'',
    money:0,
    count:'',
    storeflag:0,
    shopping_car_ids:[],
    price:[],
    address:'',
    ifdefault:true,
    theDefault:'',
    checkitem:false
  },
  checkall(e){
this.setData({
  checkitem:!this.data.checkitem,
  checkall:!this.data.checkall
})
let checkallprice=[]
for(let i=0;i<this.data.num.length;i++){
  checkallprice.push(this.data.num[i]*this.data.price[i])
}
const money=checkallprice.reduce((total,item)=>total+=item)
const count=this.data.num
const allccount=count.reduce((total,item)=>total+=item)
if(this.data.checkitem===true){
  this.setData({
    money:money,
    count:allccount
  })
  
}else{
  this.setData({
    money:0,
    count:0
  })
}


  },
  incre(e){
    const cre=e.currentTarget.dataset.index;
    const tempnum=this.data.num
    const crenum=this.data.num[cre]+1
    tempnum.splice(cre,1,crenum)
    this.setData({
    num:tempnum
   })
  //增加件数更新后台数据
const token=app.globalData.token;
const good_id=e.currentTarget.dataset.item.good_id;
const num=crenum;
const price=Number(e.currentTarget.dataset.item.price);
const money=num*Number(e.currentTarget.dataset.item.price);
const sku=JSON.stringify(Number(e.currentTarget.dataset.item.sku));
const shopping_car_id=e.currentTarget.dataset.item.shopping_car_id;
req('/api/shoppingCarAddModify','POST',{token:token,good_id:good_id,num:num,price:price,money:money,sku:sku,shopping_car_id:shopping_car_id}).then(res=>{
  //console.log(res)
})
  },
   decre(e){
    const cre=e.currentTarget.dataset.index;
    const tempnum=this.data.num
    const crenum=this.data.num[cre]-1
if(crenum===0){
  tempnum.splice(cre,1,1)
  this.setData({
    num:tempnum
  })
}else{
  tempnum.splice(cre,1,crenum)
  this.setData({
    num:tempnum
  })
  //减少件数更新后台数据
const token=app.globalData.token;
const good_id=e.currentTarget.dataset.item.good_id;
const num=crenum;
const price=Number(e.currentTarget.dataset.item.price);
const money=num*Number(e.currentTarget.dataset.item.price);
const sku=JSON.stringify(Number(e.currentTarget.dataset.item.sku));
const shopping_car_id=e.currentTarget.dataset.item.shopping_car_id;
req('/api/shoppingCarAddModify','POST',{token:token,good_id:good_id,num:num,price:price,money:money,sku:sku,shopping_car_id:shopping_car_id}).then(res=>{
  //console.log(res)
})
}
   },
   radioClick(e){
     //收集选中的元素下标
   const currcart=[...new Set(e.detail.value)]
   //选中的元素转为数字并进行排序
   const numc=currcart.map(item=>{return Number(item)}).sort((a,b)=>a-b)
   console.log(numc)
   //获取选中的购物车id
   const cc=JSON.parse(wx.getStorageSync('key'))
   //全选
   console.log(this.data.checkitem)
   if(numc.length===cc.length){
     this.setData({
       checkitem:true,
       checkall:true
     })
   }
   //反选
         if(this.data.checkitem===true&&numc.length!==cc.length){
          this.setData({
          checkitem:false
         })
         }
  let  mm=[]
  // console.log(cc.length)
   for(let i=0;i<numc.length;i++){
   mm.push(cc[numc[i]])
   }
  //计算选中商品的价格 获取对应位置的商品单价和数量
let money=0
let count=0
for(let i=0;i<numc.length;i++){
money+=this.data.price[numc[i]]*this.data.num[numc[i]]
count+=this.data.num[numc[i]]
}
this.setData({
  shopping_car_ids:mm,
  money:money,
  count:String(count)
})
},
   editaddr(){
     wx.navigateTo({
       url: '/pages/address/address?id=cart',
     })
   },
   jumpTOrder(e){
  //console.log(this.data.shopping_car_ids)
  const token=app.globalData.token
  req("/api/generateOrder",'POST',{token:token,address_id:this.data.address_id,money:String(this.data.money),shopping_car_ids:this.data.shopping_car_ids}).then(res=>{
    //console.log(res)
    if(res.statusCode===200){
      wx.navigateTo({
        url:'/pages/order/order'
      })
    }
  })
   },
   delCartItem(e){
    wx.showModal({
      title: '提示',
      content: '确定要删除该购物车么？',
      success (res) {
    if (res.confirm) {
    const token=app.globalData.token
    const carindex=e.currentTarget.dataset.index
    const cc=JSON.parse(wx.getStorageSync('key'))
    const shopping_car_ids=cc[carindex]
    req("api/shoppingCarDelete",'POST',{token:token,shopping_car_id:shopping_car_ids}).then(res=>{
      //
      //
    })
    } else if (res.cancel) {
    }
    }
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideTabBar()
    // wx.startPullDownRefresh()
    const token=app.globalData.token
    //购物车列表
    req('api/shoppingCarList','POST',{token:token}).then(res=>{
     //console.log(res)
      const sku=res.data.data.data.map(item=>{
        return JSON.parse(item.sku)
      })
      const num=res.data.data.data.map(item=>{
      return item.num})
      const price=res.data.data.data.map(item=>{
      return Number(item.price)})
      const shopping_car_ids=res.data.data.data.map(item=>{
      return item.shopping_car_id}) 
        console.log(shopping_car_ids)
        wx.setStorageSync('key', JSON.stringify(shopping_car_ids))
        this.setData({
          carts:res.data.data.data,
          sku:sku,
          num:num,
          price:price,
          shopping_car_ids:shopping_car_ids
        })
      })
    //设置当前显示位置
    wx.getLocation({
      type: 'wgs84',
      success :(res)=>{
        const latitude = res.latitude
        const longitude = res.longitude
        const qqmapsdk=new QQMapWX({
          key:'OJIBZ-LAI6X-AFW4T-TY5QC-46NXS-P5F7W'
        })
        qqmapsdk.reverseGeocoder({
        loaction:{
          latitude:latitude,
          longitude:longitude
        },
        success:(res)=>{
        this.setData({
          address:res.result.address
        })
        // console.log(res)
        // console.log(latitude+":"+longitude)
        }
        })
      }
     })
    //设置默认收货地址
    req('/api/userAddressList','POST',{token:token}).then(res=>{
      const cartsList=res.data.data
      const defaultCart=cartsList.filter(item=>{return item.default===1})
     //console.log(defaultCart)
      if(defaultCart.length===0){
        console.log(defaultCart)
        this.setData({
          ifdefault:false
        })
      }else{
        const defaultLocation=defaultCart[0].procince+'省'+defaultCart[0].city+'市'+defaultCart[0].area+defaultCart[0].detailed
        this.setData({
          theDefault:defaultLocation,
          address_id:defaultCart[0].address_id,
        })
      }


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