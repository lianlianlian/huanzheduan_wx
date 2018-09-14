// pages/talk/index.js
const { func, globalData} = getApp()
import { getBlogList} from '../../api/api.js'

function _getBlogList(content, data) {
  getBlogList({data}).then(res => {
    console.log(res)
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopNav: [
      {
        name: '主板'
      },
      {
        name: '主板'
      },
      {
        name: '主板'
      },
      {
        name: '主板'
      },
      {
        name: '我关注的'
      }
    ],
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
    _getBlogList(this, { keytype: 1})
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
    
    this.setData({
      itemIndex: index
    })
  }
})