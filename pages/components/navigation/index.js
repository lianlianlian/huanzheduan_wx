// pages/components/navigation/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemIndex: {
      type: Number,
      observer:function(newValue,oldValue){
        const { itemIndex, direction, dom} = this.data;
  
        this.navScroll(itemIndex, dom, direction);
      }
    },
    dom:Array,
    direction: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    scroll: 0
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取dom元素
    getSelectorQuery(el) {
      return new Promise((resolve, reject) => {
        wx.createSelectorQuery().in(this).selectAll(`.${el}`).boundingClientRect(function (rects) {
          resolve(rects);
        }).exec();
      })
    },
    // 封装导航点击滚动,  
    // i代表第几个元素,
    // dom代表所用的元素
    // direction滚动方向,false代表横向,true竖向
    navScroll(i, dom, direction) {
      console.log(i)
      let webviewWidth = 0;
      let webviewHeight = 0;
      let width = 0;
      let height = 0;
      let minTranslate = 0;
      let middleTranslate = 0;
      let translate = 0;

      dom.forEach((item, index) => {
        webviewWidth += item.width;
        webviewHeight += item.height;

        if(i > index){
          width += item.width;
          height += item.height;
        } else if(i == index){
          width += item.width / 2;
          height += item.height / 2;
        }
      })

      this.getSelectorQuery('nav').then(res=>{
        const wWidth = res[0].width;
        const wHeight = res[0].height;

        if (direction) {
          minTranslate = Math.min(0, wHeight - webviewHeight);
          middleTranslate = wHeight / 2;
          translate = middleTranslate - height;
        } else {
          minTranslate = Math.min(0, wWidth - webviewWidth);
          middleTranslate = wWidth / 2;
          translate = middleTranslate - width;
        }
        var scroll = Math.max(minTranslate, Math.min(0, translate));

        this.setData({
          scroll: Math.abs(scroll)
        })
        console.log(wWidth)
        // this.triggerEvent('scrollPosition', { scroll: dom[i].left })
      })  
    }
  }
})
