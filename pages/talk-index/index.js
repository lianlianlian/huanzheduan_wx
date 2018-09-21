// pages/talk-index/index.js
import { getTribuneDetail, getBlogList} from '../../api/api.js'
const { globalData, func} = getApp()

function _getTribuneDetail(content, data) {
  getTribuneDetail({data}).then(res => {
    content.setData({
      tribuneItem: res.infor[0]
    })
  })
}
function _getBlogList(content, data) {
  getBlogList({data}).then(res => {
    content.setData({
      blogList: res.infor.listItems
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tribuneItem: {
      id: 1,
      imgurl: '../../../static/img/user.png',
      name: '抑郁症病因',
      blog_count: '2888',
      loveflag: 0
    },
    blogList: [
      {
        
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options

    this.setData({
      id
    })
    _getTribuneDetail(this, { blog_type_id: id})
    _getBlogList(this, { keytype: 0, type_id: id})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {id} = this.data
    // 处理登录态失效后，重新登录，获取数据
    const isAgainGet = globalData.isAgainGet
    const pageUrlStore = wx.getStorageSync('pageUrlStore')
    const pageUrl = func.wxUtil.getPages()
    // 登台态失效，登录保存状态，比较失效的页面与该页面是否一致，如果符合，状态置位false，重新加载数据
    if (pageUrlStore == pageUrl && isAgainGet) {
      globalData.isAgainGet = false
      _getTribuneDetail(this, { blog_type_id: id })
    }
  },
  concern(e) {
    const { item } = e.detail
    let tribuneItem = this.data

    this.setData({
      tribuneItem: item
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})