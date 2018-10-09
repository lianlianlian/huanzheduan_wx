// pages/talk/index.js
const { func, globalData} = getApp()
import { getTribuneList} from '../../api/api.js'

function _getTribuneList(content, data) {
  getTribuneList({ data }).then(res => {
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
    shopNav: [],
    tribuneList: [],
    systemInfo: {},
    searchHeight: 0,
    itemIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      systemInfo: globalData.systemInfo
    })
    getTribuneList({data: { keytype: 1, parentid: 0 }}).then(res => {
      let result = res.infor.listItems
      result = [...result, { namepath: '我的关注', keytype: 2}]
      this.setData({
        shopNav: result
      })
      _getTribuneList(this, { keytype: 1, parentid: result[0].id })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    func.wxUtil.getSelectorQuery(this,'search-box').then(res => {
      this.setData({
        searchHeight: res[0].height
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  getIndex(e) {
    const { index } = e.currentTarget.dataset
    const { shopNav} = this.data

    this.setData({
      itemIndex: index
    })
    _getTribuneList(this, { keytype: shopNav[index].keytype === 2 ? 2 : 1, parentid: shopNav[index].keytype === 2 ? '' : shopNav[index].id })
  },
  navigation(e) {
    const { id } = e.detail

    wx.navigateTo({
      url: `../talk-index/index?id=${id}`
    })
  },
  concern(e) {
    const { index, item } = e.detail
    let {tribuneList} = this.data

    tribuneList[index] = item
    this.setData({
      tribuneList
    })
  }
})