// pages/msg/index.js
import { getMsgList, getTypeList} from '../../api/api.js';
const { globalData, func} = getApp()

function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    let result = res.infor.listItems
    let msgList = content.data.msgList

    result = data.page === 0 ? result : [...msgList, ...result]

    content.setData({
      msgList: result,
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
    navIndex: 0,
    dom: [],
    navList: [],
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    getTypeList({data: { keytype: 6 }}).then(res => {
      let navList = res.infor.listItems
      this.setData({
        navList
      })
      _getMsg(this, { keytype: navList[0].id, clienttype: 1, page: 0 })
    })

    func.wxUtil.getSelectorQuery(this, 'navItem').then(res => {
      this.setData({
        dom: res
      })
      console.log(this.data.dom)
    })
  },
  nav(e) {
    const {navList} = this.data
    let index = e.currentTarget.dataset.index
    this.setData({
      navIndex: index
    })
    _getMsg(this, { keytype: navList[index].id, clienttype: 1, page: 0 })
  },
  add() {
    wx.navigateTo({
      url: '../msg-type/index'
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   const { navIndex, navList } = this.data

  //   _getMsg(this, { keytype: navList[navIndex].id, clienttype: 1, page: 0})
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, msgList, navIndex, navList} = this.data

    if (msgList.length >= page * globalData.pageSize) {
      _getMsg(this, { keytype: navList[navIndex].id, clienttype: 1, page})
    }
  }

})