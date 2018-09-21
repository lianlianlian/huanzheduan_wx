// pages/talk-detail/index.js
import { getBlogDetail} from '../../api/api.js'
const { func, globalData} = getApp()

function _getBlogDetail(content, data) {
  getBlogDetail({data}).then(res => {
    content.setData({
      item: res.infor[0]
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      title: '抑郁症应该如何调节？',
      viewcount: 45681,
      loveflag: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options

    this.setData({
      id
    })
    _getBlogDetail(this, { blog_id: id})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { id } = this.data
    // 处理登录态失效后，重新登录，获取数据
    const isAgainGet = globalData.isAgainGet
    const pageUrlStore = wx.getStorageSync('pageUrlStore')
    const pageUrl = func.wxUtil.getPages()
    // 登台态失效，登录保存状态，比较失效的页面与该页面是否一致，如果符合，状态置位false，重新加载数据
    if (pageUrlStore == pageUrl && isAgainGet) {
      globalData.isAgainGet = false
      _getBlogDetail(this, { blog_id: id })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const {item} = this.data

    return {
      title: item.title
    }
  }
})