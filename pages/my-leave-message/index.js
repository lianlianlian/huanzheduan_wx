// pages/my-leave-message/index.js
import { getClass, getTalk} from '../../api/api.js'
const {} = getApp()

function _getClass(content, data) {
  getClass({data}).then(res => {
    let {isFirst, page, classList} = content.data
    let result = res.infor.listItems
    result = data.page === 0 ? result : [...classList, ...result]
    isFirst[0] = false
    page[0] = ++ data.page

    content.setData({
      isFirst,
      page,
      classList: result
    })
  })
}
function _getTalk(content, data) {
  getTalk({data}).then(res => {
    let {isFirst, page, talkList} = content.data
    let result = res.infor.listItems

    result = data.page === 0 ? result : [...talkList, ...result]
    isFirst[1] = false
    page[1] = ++ data.page

    content.setData({
      isFirst,
      page,
      talkList: result
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['小课堂', '聊一聊'],
    isFirst: [true, true],
    page: [0, 0],
    talkList: [],
    classList: [],
    navIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // _getClass(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  tabNav(e) {
    let {isFirst} = this.data
    const index = e.detail

    this.setData({
      navIndex: index
    })
    if (isFirst[index]) {
      // index === 0 ? _getClass(this) : _getTalk(this)
    }
  }
})