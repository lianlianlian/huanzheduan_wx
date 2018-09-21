// pages/class-mood-adjust/index.js
import { getVideoList} from '../../api/api.js'
const { globalData} = getApp()

function _getVideoList(content, data) {
  getVideoList({data}).then(res => {
    let result = res.infor.listItems
    let videoList = content.data.videoList

    result = data.page === 0 ? result : [...videoList, ...result]

    content.setData({
      videoList: res.infor.listItems,
      page: ++ data.page
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    videoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options

    this.setData({
      id
    })
    _getVideoList(this, { type_id: id, page: 0})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const { id } = this.data

    _getVideoList(this, { type_id: id, page: 0 })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, videoList, id } = this.data

    if (videoList.length >= page * globalData.pageSize) {
      _getVideoList(this, { type_id: id, page })
    }
  }
})