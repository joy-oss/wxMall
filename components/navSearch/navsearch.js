// components/navSearch/navsearch.js
Component({
  properties: {
    top:{
      type:Int32Array,
      value:0,
    },
    left:{
      type:Int32Array,
      value:0,
    },
    height:{
      type:Int32Array,
      value:0,
    },
    searchTop:{
      type:Int32Array,
      value:0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    temp:[],
    footPrint:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //搜索去重并记录搜索历史
    doSearch(e){
      this.data.temp.push(e.detail.value)
      this.data.footPrint=[...new Set(this.data.temp)]
      // console.log(this.data.footPrint)
      this.triggerEvent('searchEvent',this.data.footPrint)
    },
    inputClick(e){
      //通过双击事件判断是否跳转至搜索页面
     var thisTime=e.timeStamp;
     var lastTime=this.data.lastTime;
     if(lastTime!=0){
       if(thisTime-this.data.lastTime<500){
        wx.redirectTo({
          url: '/pages/search/search',
        })
       }
       this.setData({
         lastTime:thisTime
       })
     }
    }
  }
})
