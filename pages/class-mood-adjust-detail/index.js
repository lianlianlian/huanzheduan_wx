// pages/class-mood-adjust-detail/index.js
const { func } = getApp()
import { getVideoDetail, updataVideo} from '../../api/api.js'

function _getVideoDetail(content, data) {
  getVideoDetail({data}).then(res => {
    content.setData({
      videoDetail: res.infor[0],
      id: data.video_id
    })
  })
}
function _updataVideo(content, data) {
  let { videoDetail } = content.data
  updataVideo({data}).then(res => {
    videoDetail.loveflag = videoDetail.loveflag == 0 ? 1 : 0
    func.wxUtil.showToast({ title: data.keytype === 1 ? '收藏成功！' : '取消收藏成功！' })
    content.setData({
      videoDetail
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoDetail: {},
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getVideoDetail(this, { video_id: options.id})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  collect() {
    let { videoDetail, id } = this.data
    let keytype = videoDetail.loveflag == 0 ? 1 : 2
    let token = wx.getStorageSync('token')

    if (!token) {
      func.wxUtil.showModal({ title: '温馨提示', content: '您未登录，请确定要登录吗？' }).then(res => {
        wx.navigateTo({
          url: '../login/index'
        })
      })
      return false
    }
    _updataVideo(this, { keytype, clienttype: 1, video_id: id })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})