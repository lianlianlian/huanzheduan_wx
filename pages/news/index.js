// pages/news/index.js
import { getNewsList} from '../../api/api.js'
const { } = getApp()
function _getNewsList(content, data) {
  getNewsList({data}).then(res => {
    content.setData({
      list: res.infor.listItems
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['医生消息', '系统消息'],
    navIndex: 0,
    actions: [
      {
        name: '标为已读',
        color: '#fff',
        fontsize: '25',
        width: 80,
        background: '#c7c7cd'
      },
      {
        name: '删除',
        width: 80,
        color: '#fff',
        fontsize: '25',
        background: '#ff4445'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getNewsList(this, { noticetype: 1, page: 0})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  tabNav(e) {
    const index = e.detail

    this.setData({
      navIndex: index
    })
  }
})