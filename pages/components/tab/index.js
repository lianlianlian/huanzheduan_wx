// pages/components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemIndex: 0,
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getIndex(e){
      const {index} = e.detail;
      this.setData({
        itemIndex: index
      })

      this.triggerEvent('getIndex',{index});
    },
    scrollPosition(e){
      const {scroll,width} = e.detail;
      this.createAnimation(width,scroll);
    },
    //tab切换效果
    createAnimation(width, scroll) {
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "50% 50% 0",
      })
      this.animation = animation;
      animation.translateX(scroll).width(width).step();
      this.setData({
        animationData: animation.export()
      })
    }
  }
})
