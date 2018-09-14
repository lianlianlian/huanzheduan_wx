// pages/provision/index.js
import { protocal} from '../../api/api.js'
function _protocal() {
  protocal().then(res => {
    console.log(res)
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // _protocal()
  }
})