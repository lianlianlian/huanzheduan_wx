// pages/components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    index: Number
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
    concern(){
      let { item, index} = this.data
      item.loveflag = item.loveflag == 0 ? 1 : 0

      this.triggerEvent('concern', {index, item})
    },
    navigation() {
      let { item } = this.data
      this.triggerEvent('navigation', {id: item.id})
    }
  }
})
