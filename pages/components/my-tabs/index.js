// pages/components/my-tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nav: Array,
    list: Array,
    editStatus: Boolean,
    isEdit: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    navIndex: 0,
    status: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    nav(e) {
      const index = e.currentTarget.dataset.index
      let { status} = this.data

      this.setData({
        navIndex: index,
        status: false
      })
      this.triggerEvent('tabNav', index)
    },
    edit() {
      let { status} = this.data

      this.setData({
        status: !status
      })
    },
    _edit() {
      let { status, list } = this.data
      if (list.length <= 0) return false

      this.edit()
      this.triggerEvent('edit', !status)
    }
  }
})
