// pages/components/doctor-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAppointment: Boolean,
    isCall: Boolean
  },
  externalClasses: ['my-class'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigator() {
      this.triggerEvent('navigator', {navigator: true})
    },
    call() {
      wx.makePhoneCall({
        phoneNumber: '123456789'
      })
    }
  }
})
