// pages/components/alert/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      this.setData({
        show: !this.data.show
      })
    }
  }
})
