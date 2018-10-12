// pages/my-leave-message/index.js
import { getNewsList} from '../../api/api.js'
const {func} = getApp()

function _getClass(content, data) {
  getNewsList({data}).then(res => {
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
  getNewsList({data}).then(res => {
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
    navIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getClass(this, { noticetype: 2, page: 0})
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
      index === 0 ? _getClass(this, { noticetype: 2, page: 0 }) : _getTalk(this, { noticetype: 3, page: 0 })
    }
  }
})