// pages/components/send-code/index.js
const { func } = getApp()
import { sendCode, clientVerifyCode } from '../../../api/api.js'

function _sendCode(content, data) {
  sendCode({ data }).then(res => {
    //开启计时器
    content.start()
    content.showPhone()
    func.wxUtil.showToast({ title: '验证码发送成功！' })
  })
}

function _clientVerifyCode(content, data) {
  clientVerifyCode({data}).then(res => {
    _sendCode(content, data)
  })
}

let time = 60
let timer

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone: Number,
    type: Number  // type 为2时 忘记密码验证，需要先验证用户名，再申请和验证随机码，最后调用重设密码
  },

  /**
   * 组件的初始数据
   */
  data: {
    txt: '发送验证码'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    send() {
      const { phone, type} = this.data

      if (!phone || phone == '') {
        func.wxUtil.showToast({ title: '请输入手机号！' })
        return false
      }

      if(time < 60) {
        return false
      }
      
      type == 1 ? _sendCode(this, { keytype: type, username: phone }) : _clientVerifyCode(this, { keytype: type, username: phone })
      
    },
    inputCode(e) {
      this.triggerEvent('sendCode', e.detail.value)
    },
    start() {
      timer = setTimeout(() => {

        if (time <= 1) {
          clearTimeout(timer)
          time = 60
          this.setData({
            txt: '发送验证码'
          })
        } else {
          time--
          this.setData({
            txt: `${time}秒后发送`
          })
          this.start()
        }
      }, 1000)
    },
    showPhone() {
      let phone = this.data.phone + ''

      this.setData({
        showPhone: true,
        _phone: phone.substr(0, 3) + '****' + phone.substr(-4)
      })
    }
  }
})
