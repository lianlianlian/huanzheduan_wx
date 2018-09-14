// pages/my-collection/index.js
const { func } = getApp()
import { getMsgList, getVideoList} from '../../api/api.js'
// 收藏文章列表
function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    content.setData({
      msgList: res.infor.listItems
    })
  })
}
// 收藏视频列表
function _getVideoList(content, data) {
  getVideoList({data}).then(res => {
    content.setData({
      videoList: res.infor.listItems
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['文章', '视频','帖子'],
    page: [0, 0, 0],
    isFirst: [true, true, true],
    eidtStatus:false,
    allStatus: false,
    navIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _getMsg(this, { keytype: 2, page: 0 })
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
  tabNav(e) {
    const index = e.detail

    this.setData({
      navIndex: index
    })

    index == 0 ? _getMsg(this, { keytype: 2, clienttype: 1, page: 0 }) : index == 1 ? _getVideoList(this, { type_id: 1, page: 0 }) : null
    
  },
  edit(e) {
    const flag = e.detail
    const { navIndex} = this.data

    this.setData({
      eidtStatus: flag,
      allStatus: false
    })

  },
  itemEdit(e) {
    const { index } = e.currentTarget.dataset
    const { navIndex, msgList, videoList, cardList} = this.data

    if (navIndex == 0) {
      msgList[index].edit = !msgList[index].edit;
      this.setData({
        msgList
      })
    } else if (navIndex == 1) {
      videoList[index].edit = !videoList[index].edit;
      this.setData({
        videoList
      })
    } else if (navIndex == 2) {
      cardList[index].edit = !cardList[index].edit;
      this.setData({
        cardList
      })
    }
  },
  allChoose() {
    let { navIndex, msgList, videoList, cardList, allStatus} = this.data
    allStatus = !allStatus

    if (navIndex == 0) {
      msgList.forEach((item, index) => item.edit = allStatus)
      this.setData({
        msgList,
        allStatus
      })
    } else if (navIndex == 1) {
      videoList.forEach((item, index) => item.edit = allStatus)
      this.setData({
        videoList,
        allStatus
      })
    } else if (navIndex == 2) {
      cardList.forEach((item, index) => item.edit = allStatus)
      this.setData({
        cardList,
        allStatus
      })
    }
  },
  delet() {
    const { navIndex, msgList, videoList, cardList } = this.data
    let idList = []

    func.wxUtil.showModal({ title: '删除提示', content: navIndex == 0 ? '确定要删除所选文章吗？' : navIndex == 1 ? '确定要删除所选视频吗？' : '确定要删除所选帖子吗？'}).then(res => {

      if (res.confirm) {
        if (navIndex == 0) {
          idList = msgList.filter((item, index) => item == true)
        } else if (navIndex == 1) {
          idList = videoList.filter((item, index) => item == true)
        } else if (navIndex == 2) {
          idList = cardList.filter((item, index) => item == true)
        }
        console.log(idList)
      }
    })
  }
})