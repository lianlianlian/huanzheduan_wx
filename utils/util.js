const app = getApp();
// var md5 = require('/md5.js');
/**
 * 获取当前时间
 */
const formatTime = (date = new Date()) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':') 
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * post请求
 * openLoading:是否开启加载动画
 */
function post(url, data={}, that, openLoading) {
  return new Promise((resolve,reject) =>{
    // md5加密(sign与datetime作为参数传给后端)
    // var sign = md5.hexMD5(DATAKEY + '|' + getNowFormatDate() + '|' + url);
    // data.sign = sign;
    // data.datetime = getNowFormatDate();

    openLoading ? that.setData({ hidding: false }) : ''
    wx.request({
      url: app.globalData.baseURL + url,
      data: data,
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "x-nideshop-token": wx.getStorageSync('token') || ''
      },
      success: function (res) {
        openLoading ? that.setData({ hidding: true }) : ''
        return resolve(res.data);
      },
      fail: function (res) {
        openLoading ? that.setData({ hidding: true}):'';
        res.errMsg == 'request:fail ' ? showToast('服务器开小差了呢!') : showToast(res.errMsg);
      }
    })
  })
}

function chooseImg(count, cb) {
  wx.chooseImage({
    count: count,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      return typeof cb == "function" && cb(res)
    },
    fail: function (res) {
      return typeof cb == "function" && cb(false);
    }
  })
}
/**
 * 文件上传
 */
function upFile(url, filePath, name, formData, cb) {
  wx.uploadFile({
    url: app.globalData.baseURL + url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    },
    formData: formData,
    success: function (res) {
      console.log(res)
      if (res.statusCode == 200 && !res.data.result_code) {
        return typeof cb == "function" && cb(res.data);
      } else {
        return typeof cb == "function" && cb(false);
      }
    },
    fail: function () {
      return typeof cb == "function" && cb(false);
    }
  })
}
function sendTem(openid, templateid, page, formid, data={}, appid, secret, cb) {
  var data = {
    touser: openid,
    template_id: templateid,
    page: page,
    form_id: formid,
    data: data
  }
  wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
    method: 'get',
    success: function (res) {
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + res.data.access_token,
        data: data,
        method: 'post',
        success: function (res) { },
        fail: function () {
          return typeof cb == "function" && cb(false);
        }
      })
    },
    fail: function () {
      return typeof cb == "function" && cb(false);
    }
  })
}
/**
 * model弹框
 * title:主题
 * content:弹框内容
 * cancelText:取消文字
 * confirmText:确定文字
 * cb:回调函数
 */
function showModal(title, content, cb, cancelText="取消", confirmText="确定") {
  wx.showModal({
    title: title,
    content: content,
    cancelText: cancelText,
    confirmText: confirmText,
    success: function (res) {
      if (res.confirm) {
        return typeof cb == "function" && cb(res)
      }
    }
  })
}
/**
 * 确认框
 * */
function showAlert(title, content) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: '确定',
    showCancel: false
  })
}
function getData(appid, secret, data, cb) {
  wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
    method: 'get',
    data: data,
    success: function (res) {
      wx.request({
        url: 'https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=' + res.data.access_token,
        method: 'post',
        success: function (res) {
          console.log(res)
          return cb == "function" && cb(res);
        },
        fail: function () {
          return cb == "function" && cb(false);
        }
      })
    },
    fail: function (res) { }
  })
}
function getOpenId(appid, secret, code, cb) {
  wx.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
    method: 'post',
    success: function (res) {
      return typeof cb == "function" && cb(res)
    },
    fail: function (res) {
      return typeof cb == "function" && cb(false);
    },
  })
}
function showToast(txt) {
  wx.showToast({
    title: txt,
    icon: 'success',
    duration: 1000,
    mask: true,
  })
}
/**
 * 设置历史搜索
 */
function setHistory(data){
  var arr = []
  var historySearch = wx.getStorageSync('historySearch');
  if (historySearch) {
    for (var i = 0; i < historySearch.length; i++) {
      if (data == historySearch[i]) {
        continue;
      }
      arr.push(historySearch[i])
    }
  }
  arr.unshift(data);
  wx.setStorageSync('historySearch', arr);
}
/**
 * 分页
 */
function paging(page,data,that){
  var list = that.data.list;
  list = page == 0?data:list.concat(data);
  that.setData({list,page:++page});
}
/**
 * 获取随机数
 */
function getRandomStringByLength(length){
  var base = "abcdefghijklmnopqrstuvwxyz0123456789";
  var str = '';
  for (var i = 0; i < length; i++) {
    var number = Math.random()* base.length;
    str += base.charAt(parseInt(number));
  }
  return str;
}

function setSign(appid, body, mch_id, nonce_str, notify_url, openid, paySn, spbill_create_ip, total_fee, trade_type){
  var stringA = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + paySn + '&spbill_create_ip=' + spbill_create_ip  + '&total_fee=' + total_fee + '&trade_type=' + trade_type;
  var stringSignTemp = stringA + '&key='+key //注：key为商户平台设置的密钥key
  var sign = md5.hexMD5(stringSignTemp).toUpperCase() //注：MD5签名方式
  return sign;
}
function setSignAgain(appId, nonceStr, pack, signType, timeStamp){
  var stringA = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pack + '&signType=MD5&timeStamp=' + timeStamp  
  var stringSignTempAgain = stringA + '&key=' + key //注：key为商户平台设置的密钥key
  var signAgain = md5.hexMD5(stringSignTempAgain).toUpperCase() //注：MD5签名方式
  return signAgain;
}
/**
 * 转换成xml
 */
function setXMLNodeValue(node){
  var str = '<xml>';
  for(var i in node){
    str += '<' + i + '>' + node[i] + '</' + i + '</>';
  }
  str += '<xml>';
  return str;
}
/**
 * 解析xml
 */
function getXMLNodeValue(node_name, xml) {
  var tmp = xml.split("<" + node_name + ">")
  var _tmp = tmp[1].split("</" + node_name + ">")
  return _tmp[0]
}
/**
 * 获取时间戳
 */
function createTimeStamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}
function getSelectorQuery(i){

}
module.exports = {
  upFile: upFile,
  sendTem: sendTem,
  getOpenId: getOpenId,
  getData: getData,
  showToast: showToast,
  chooseImg: chooseImg,
  upFile: upFile,
  showModal: showModal,
  showAlert: showAlert,
  setHistory: setHistory,
  paging: paging,
  getRandomStringByLength: getRandomStringByLength,
  setSign: setSign,
  setSignAgain: setSignAgain,
  setXMLNodeValue: setXMLNodeValue,
  getXMLNodeValue: getXMLNodeValue,
  createTimeStamp: createTimeStamp,
  formatTime: formatTime
}

