// pages/class-mood-adjust/index.js
import { getVideoList} from '../../api/api.js'

function _getVideoList(content, data) {
  getVideoList({data}).then(res => {
    console.log(res)
    content.setData({
      videoList: res.infor.listItems
    })
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
    _getVideoList(this, { type_id: options.id, page: 0})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }
})