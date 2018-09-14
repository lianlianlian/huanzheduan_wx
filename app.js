const {WeToast} = require('utils/wxToast/wetoast.js');
// import { login} from 'api/index.js'
import wxUtil from 'utils/wxUtil.js'

import {init} from 'api/api.js'
import './utils/vendor/weapp-cookie/index'

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res
      }
    })
    // init({ data: { lastloginversion: '1.0.0', device_sn: ''}}).then(res => {
    //   console.log(res)
    // })
  },
  onShow: function () {
    
  },
  globalData:{
    userInfo:null,
    code: null,
    systemInfo:null,
    pageSize: null,
    version: '1.0.0',
    tabBar: ['../index/index', '../see-doctor-home/index', '../class/index', '../talk/index', '../my/index'],
    loginNavigateUrl: '',   //  首次登录后，重定向页面地址
    pageUrlStore: '',            //  当前页面地址，（使用页保存）通过对比页面地址是否相同决定是否加载数据（解决onshow多次加载数据浪费请求），navigateback弊端
    isAgainGet: false,     //   与pageUrl配合使用。解决登录态失效，重新登录后（登录页保存，使用页删除），navigateback 不执行onload方法问题，在onshow中使用
    baseURL:'https://hnjjsfjd.com',
    localImgURL:'../../static/img/',
    isUpdataPassword: false,
    mapKey:'cb5c29c955dffc1ab2ba32c49f63f31c',
    payKey:'g9vts986449986bf56576bmm5eby46d3',
    DATAKEY:'iYUuvG984rKfVIXg',
    appid: "wx4274f3ea5516d94c",
    secret: "e573bfd063761434312f473def762ecd"
  },
  func:{
    WeToast,
    // login,
    wxUtil
  }
})