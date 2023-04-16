// components/goodsShowTab/goodsShowTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    fclickEvent(e){
      console.log(e)
    },
    jumpToDetil(e){
      // console.log(e)
      const good_id=Number(e.currentTarget.id)
      wx.redirectTo({
        url: '/pages/surprise/surprise?good_id='+good_id,
      })
    }
  }
})
