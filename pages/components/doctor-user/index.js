// pages/components/doctor-user/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCall: Boolean,
    isShowSection: Boolean,
    isShowStatus: Boolean
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
    call() {
      wx.makePhoneCall({
        phoneNumber: '123456789'
      })
    }
  }
})
