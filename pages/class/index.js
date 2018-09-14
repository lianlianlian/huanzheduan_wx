// pages/class/index.js
import { getMsgList, getTypeList} from '../../api/api.js';

function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    content.setData({
      msgList: res.infor.listItems
    })
  })
}
function _getTypeList(content, data) {
  getTypeList({ data }).then(res => {
    content.setData({
      nav: res.infor.listItems
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      // {
      //   name: '情绪调节',
      //   img: '../../static/img/c-icon-1.png',
      //   src: '../class-mood-adjust/index'
      // },
      // {
      //   name: '大咖讲座',
      //   img: '../../static/img/c-icon-2.png',
      //   src: ''
      // },
      // {
      //   name: '睡眠训练',
      //   img: '../../static/img/c-icon-3.png',
      //   src: ''
      // }, {
      //   name: '认知矫正',
      //   img: '../../static/img/c-icon-4.png',
      //   src: ''
      // }
    ],
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getTypeList(this, { keytype: 5})
    _getMsg(this, { keytype: 1, page: 0 })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  nav(e) {
    const { index } = e.currentTarget.dataset
    const { nav } = this.data

    wx.navigateTo({
      url: '../class-mood-adjust/index?id=' + nav[index].id
    })
  },
  more(){
    wx.navigateTo({
      url: '../msg/index'
    })
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