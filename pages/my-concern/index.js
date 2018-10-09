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
    tribuneList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _getTribuneList(this, { keytype: 2 })
  },
  concern(e) {
    const { status } = e.detail
    _getTribuneList(this, { keytype: 2 })
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
  // onReachBottom: function () {
  //   const { page, tribuneList} = this.data

  //   if (tribuneList.length >= page * globalData.pageSize) {
  //     _getTribuneList(this, { keytype: 2 })
  //   }
  // }
})