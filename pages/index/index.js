// index.js
// 获取应用实例
import req from '../../api/packrequest'
import {goodsType} from '../../api/goods'
const app = getApp()

Page({
  data: {
   top:0,
   height:0,
   left:0,
   searchTop:0,
   goodsRecom:[],
   goodsRecomData:[],
   recomClickId:0,
   recScrollTop:0,
   temp:[],
   footPrint:[],
   footPrintNew:[],
   ishow:false,
   good_id:'',
   leftright:0,
   rightAllHeight:[],
   rightCurrScroll:0,
   h:0,
   allheight:[],
   rightCurrScrollId:0,
   good_type:0,
   searchType:[]
  },
  recomClick(e){
    const i=Number(e.currentTarget.dataset.flag)
    this.setData({
      recomClickId:i,
      leftright:i,
    })
  },
rightleftScroll(e){
this.setData({
  rightCurrScroll:e.detail.scrollTop
})
for(let j=0;j<this.data.allheight.length;j++){
  if(this.data.rightCurrScroll>this.data.allheight[j]&&this.data.rightCurrScroll<=this.data.allheight[j+1]){
    this.setData({
      rightCurrScrollId:j+1,
    })
  }
}
this.setData({
recScrollTop:this.data.rightCurrScrollId*50
})
  },
  acceptSearch(e){
    //获取子组件传递的数据
    this.setData({
      footPrintNew:e.detail
    })
    // 处理数据跳转页面
    console.log(this.data.footPrintNew)
    for(let i=0;i<this.data.footPrintNew.length;i++){
      for(let j=0;j<this.data.goodsRecomData.length;j++){
        if(this.data.goodsRecomData[j].type_name.includes(this.data.footPrintNew[i])){
          wx.setStorageSync(String(i),String(this.data.goodsRecomData[j].good_type_id))
        }
      }
    }
  wx.redirectTo({
    url: "/pages/type/type?id=typelistSearch"
  })
  },
  viewHistory(){
  this.setData({
    footPrintNew:this.data.footPrint
  })
  if( this.data.footPrintNew.length){
    this.setData({
      ishow:false
    })
  }else{
    this.setData({
      ishow:true
    }) 
  }
  },
  typeclickjump(e){
// console.log(e)
this.setData({
  good_type:e.currentTarget.dataset.good_type
})
console.log(this.data.good_type)
wx.redirectTo({
  url: '/pages/type/type?good_type='+this.data.good_type,
})
  },
  onLoad() {
    //设置搜索框的位置
    const menuPosition=wx.getMenuButtonBoundingClientRect()
    this.setData({
      top:menuPosition.top,
      height:menuPosition.height,
      left:menuPosition.left-15,
      searchTop:menuPosition.height/2-10
    })
    //商品分类列表请求
    goodsType.then((res)=>{
      // console.log(res)
      this.setData({
        goodsRecomData:res.data.data.filter(item=>item.parent_id===0),
      })
      this.setData({
        goodsRecom:this.data.goodsRecomData.map(item=>{return item.type_name})
      })
      //给每项一级列表添加二级
      this.data.goodsRecomData.map(item=>{item.children=[]})
      //构建层级数据结构
       for(let j=0;j<this.data.goodsRecomData.length;j++){
        for(let i=0;i<res.data.data.length;i++){ 
        if(res.data.data[i].parent_id===this.data.goodsRecomData[j].good_type_id){
        this.data.goodsRecomData[j].children.push(res.data.data[i])
        }}}
        this.setData({
          goodsRecomData:this.data.goodsRecomData
        })
        // console.log(this.data.goodsRecomData)
    })
//右边连接左边，通过计时器防止加载数据
setTimeout(()=>{
  wx.createSelectorQuery().selectAll(".hotTypeItems").boundingClientRect().exec(res=>{
    this.setData({
      rightAllHeight:res[0]
    })
    //计算高度值
    for(let i=0;i<this.data.rightAllHeight.length;i++)
    {
    this.data.h+=this.data.rightAllHeight[i].height;
    this.data.allheight.push(this.data.h)
    }
  })
  //判断当前滑动到第几个子元素的位置
},3000)
}
})
