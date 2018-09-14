const util = {};
util.showToast = ({ title, icon = 'none', image, duration = 1500, mask = true} = {}) => {
  wx.showToast({
    title,
    icon,
    image,
    duration,
    mask
  })
}
util.showModal = ({ title, content, showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor ='#3CC51F'}) => 
  new Promise((resolve,reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      success: function (res) { 
        resolve(res);
      }
    })
  })
util.getSelectorQuery = (content,el) => 
  new Promise((resolve, reject) => {
    wx.createSelectorQuery().in(content).selectAll(`.${el}`).boundingClientRect(function (rects) {
      resolve(rects);
    }).exec();
  })

util.getSetting = () => 
  new Promise((resolve,reject) => {
    wx.getSetting({
      success: function (res) {
        resolve(res);
      }
    })
  })
util.openSetting = () => 
  new Promise((resolve,reject) => {
    wx.openSetting({
      success: function(res) {
        resolve(res);
      },
      fail: function (err) {
        resolve(err);
      }
    })
  })
util.authorize = ({scope}) =>  //授权,先检查是否授权过
  new Promise((resolve,reject) => {
    wx.authorize({
      scope,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        resolve(res);
      }
    })
  })
util.getUserInfo = () =>  //获取用户信息
  new Promise((resolve, reject) => {
    util.getSetting().then(res => {
      if (res.authSetting['scope.userInfo']){  
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            resolve({...res,success:true});
          },
          fail: function (res) {
            resolve({...res,success:false})
          }
        })
      }else {
        resolve({ ...res, success: false })
      }
    })
  })
//弃用
util.login = ({ scope = 'scope.userInfo' } = {}) => 
  new Promise((resolve,reject) => {
    util.getUserInfo().then(res =>{
      console.log(res)
      if (res.errMsg == 'getUserInfo:fail auth deny'){
        const modelOptions = {
          title: '是否要打开设置页面重新授权',
          content: '需要获取您的公开信息(昵称、头像等),请到小程序的设置中打开用户信息授权',
          showCancel: false,
          confirmText: '去授权'
        }
        return util.showModal(modelOptions).then(res => {
          util.openSetting().then(res => {
            if (!res.authSetting[scope]) {
              util.showToast({ title: '授权失败' });
            } else {
              util.getUserInfo().then(res => {
                const userInfo = res;
                wx.login({
                  success: function(res) {
                    Object.assign(userInfo,{code:res.code})
                    resolve(userInfo);
                  }
                })
              })
            }
          });
        })
      } else {
        const userInfo = res;
        wx.login({
          success: function(res) {
            Object.assign(userInfo, { code: res.code })
            resolve(userInfo);
          }
        })
      }
    })
  })

util.getPages = () => {
  return getCurrentPages()[getCurrentPages().length - 1].route.replace('pages', '..')
}
export default util;
