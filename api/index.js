import { BASEURL, DATAKEY} from './httpConfig.js';
import wxUtil from '../utils/wxUtil'
const md5 = require('../utils/md5.js')
import util from '../utils/util.js'

const errCode = ({ error_code: code, msg, url, data, content, openLoading}) => {
  return new Promise((resolve, reject) => {
    // 登录态失效处理
    if(code == 200) {
      // 自动登录，用于微信授权登录
      // login().then(res => {
      //   return http({ url, data: { ...data, session_id: res.response.session_id }, content, openLoading })
      // }).then(res => { resolve(res) })
      // 用于密码登录
      // 清楚用户之前的登录态和信息
      wx.removeStorageSync('token')
      wx.removeStorageSync('userId')
      // 用户登录态失效 ，需要先去登录 ，登录成功后，再次请求接口获取数据
      wx.setStorageSync('pageUrlStore', wxUtil.getPages())
      // globalData.userInfo = null
      wx.redirectTo({
        url: '../login/index'
      })
    }else {
      wxUtil.showToast({ title: msg });
    }
  })
}

export const login = ({ userInfo = {},...data} = {}) =>
    new Promise((resolve,reject) => {
      wx.login({
        success: function(res) {
          http({ url: 'client_login', data: { username: '18800000000', password: '123456', ...userInfo }, ...data}).then(res => {
            wx.setStorageSync('token', res.response.session_id);
            resolve(res);
          })
        }
      })
    })
export const http = ({ url, data = {}, method = 'POST',content, openLoading = true, loadingTxt='加载中...'} = {}) => 
    new Promise((resolve,reject) => {
      openLoading && content ? content.setData({ hidding:false , loadingTxt}) : '';
      // let token = wx.getStorageSync('token') || ''
      // let datetime = util.formatTime()
      // let sign = md5.hexMD5(DATAKEY + '|' + datetime + '|' + url)
      // let device_type = 3
      // let client_type = 1
      // data.password && Object.assign(data, { password: md5.hexMD5(DATAKEY + md5.hexMD5(data.password)) })
      // data.old_password && Object.assign(data, { old_password: md5.hexMD5(DATAKEY + md5.hexMD5(data.old_password)) })
      // data.new_password && Object.assign(data, { new_password: md5.hexMD5(DATAKEY + md5.hexMD5(data.new_password)) })
      // Object.assign(data, { datetime, device_type, client_type, sign, token})
      wx.request({
        url: BASEURL + url,
        data,
        method,
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "token": wx.getStorageSync('token') || ''
        },
        success: res => {
          openLoading && content ? content.setData({ hidding: true }) : '';
          if (res.data.success) {
            resolve(res.data);
          } else {
            errCode({ ...res.data, content, url, data, openLoading }).then(res => { resolve(res) });
          }
        },
        fail: err => {
          errCode({ msg:err.errMsg, content, url, data, openLoading }).then(res => { resolve(res) });
        }
      }) 
    })

export const file = ({ url, path, data = {}, content, openLoading = true, loadingTxt = '加载中...'}) => 
  new Promise((resovle, reject) => {
    let token = wx.getStorageSync('token') || ''
    let datetime = util.formatTime()
    let sign = md5.hexMD5(DATAKEY + '|' + datetime + '|' + url)
    let device_type = 3
    let client_type = 1
    Object.assign(data, { datetime, device_type, client_type, sign, token })
    wx.uploadFile({
      url: BASEURL + url,
      filePath: path,
      name: 'file',
      formData: data,
      success: res => {
        console.log(res)
        if (res.data.success) {
          resolve(res.data);
        } else {
          errCode({ ...JSON.parse(res.data), url, data, openLoading }).then(res => { resolve(res) });
        }
      },
      fail: err => {
        errCode({ msg: err.errMsg, url, data, openLoading }).then(res => { resolve(res) });
      }
    })
  })
