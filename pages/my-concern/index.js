// pages/my-concern/index.js
import { getTribuneList} from '../../api/api.js'
const { globalData, func} = getApp()

function _getTribuneList(content, data) {
  getTribuneList({data}).then(res => {
    let result = res.infor.listItems
    let tribuneList = content.data.tribuneList

    // result = data.page === 0 ? result : [...tribuneList, ...result]

    content.setData({
      tribuneList: result,
      // page: ++ data.page
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    tribuneList: [
      {
        id: 1,
        imgurl: '../../../static/img/user.png',
        name: '抑郁症病因',
        blog_count: '2888',
        loveflag: 1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getTribuneList(this, { keytype: 2})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 处理登录态失效后，重新登录，获取数据
    const isAgainGet = globalData.isAgainGet
    const pageUrlStore = wx.getStorageSync('pageUrlStore')
    const pageUrl = func.wxUtil.getPages()
    // 登台态失效，登录保存状态，比较失效的页面与该页面是否一致，如果符合，状态置位false，重新加载数据
    if (pageUrlStore == pageUrl && isAgainGet) {
      globalData.isAgainGet = false
      _getTribuneList(this, { keytype: 2 })
    }
  },
  concern(e) {
    const { index, item } = e.detail
    let {tribuneList} = this.data

    tribuneList[index] = item
    this.setData({
      tribuneList
    })
  },
  navigation(e) {
    const { id } = e.detail

    wx.navigateTo({
      url: `../talk-index/index?id=${id}`
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    _getTribuneList(this, { keytype: 2 })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, tribuneList} = this.data

    if (tribuneList.length >= page * globalData.pageSize) {
      _getTribuneList(this, { keytype: 2 })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})