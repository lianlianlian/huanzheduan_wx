// pages/my-collection/index.js
const { func, globalData} = getApp()
import { getMsgList, getVideoList, getBlogList, updataMsg, updataVideo, updataBlogList} from '../../api/api.js'
// 收藏文章列表
function _getMsg(content, data) {
  getMsgList({ data }).then(res => {
    let { isFirst, page, msgList} = content.data
    let result = res.infor.listItems

    result = data.page === 0 ? result : [...msgList, ...result]
    isFirst[0] = false
    page[0] = ++ data.page

    content.setData({
      msgList: result,
      isFirst,
      page
    })
  })
}
// 是否收藏文章
function _updataMsg(content, data) {
  updataMsg({data}).then(res => {
    content.selectComponent('#tabs').edit()
    content.setData({
      eidtStatus: false
    })
    _getMsg(content, { keytype: -1, clienttype: 1, page: 0 })
  })
}
// 收藏视频列表
function _getVideoList(content, data) {
  getVideoList({data}).then(res => {
    let { isFirst, page, videoList} = content.data
    let result = res.infor.listItems

    result = data.page === 0 ? result : [...videoList, ...result]
    isFirst[1] = false
    page[1] = ++ data.page

    content.setData({
      videoList: result,
      isFirst,
      page
    })
  })
}
// 是否收藏视频
function _updataVideo(content, data) {
  updataVideo({data}).then(res => {
    content.selectComponent('#tabs').edit()
    content.setData({
      eidtStatus: false
    })
    _getVideoList(content, { type_id: -1, clienttype: 1, page: 0 })
  })
}
// 收藏帖子列表
function _getBlogList(content, data) {
  getBlogList({ data }).then(res => {
    let { blogList, isFirst, page } = content.data
    let result = res.infor.listItems

    result = data.page === 0 ? result : [...blogList, ...result]
    isFirst[2] = false
    page[2] = ++ data.page

    content.setData({
      blogList: result,
      isFirst,
      page
    })
  })
}
// 是否收藏帖子
function _updataBlogList(content, data) {
  updataBlogList({data}).then(res => {
    content.selectComponent('#tabs').edit()
    content.setData({
      eidtStatus: false
    })
    _getBlogList(content, { keytype: 1, clienttype: 1, page: 0})
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
    _getMsg(this, { keytype: -1, clienttype: 1, page: 0 })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const {navIndex: index} = this.data
    index == 0 ? _getMsg(this, { keytype: -1, clienttype: 1, page: 0 }) : index == 1 ? _getVideoList(this, { type_id: -1, clienttype: 1, page: 0 }) : _getBlogList(this, { keytype: 1, clienttype:1, page: 0})
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page, msgList, videoList, blogList, navIndex} = this.data
    if (navIndex === 0) {
      if (msgList.length >= page[navIndex] * globalData.pageSize) {
        _getMsg(this, { keytype: -1, clienttype: 1, page: page[navIndex] })
      }
    } else if (navIndex === 1) {
      if (videoList.length >= page[navIndex] * globalData.pageSize) {
        _getVideoList(this, { type_id: -1, clienttype: 1, page: page[navIndex] })
      }
    } else if (navIndex === 2) {
      if (blogList.length >= page[navIndex] * globalData.pageSize) {
        _getBlogList(this, { keytype: 1, clienttype: 1, page: page[navIndex] })
      }
    }
  },

  /**
   * tab切换，只有首次加载请求数据，优化性能
   */
  tabNav(e) {
    const index = e.detail
    const { isFirst} = this.data

    this.setData({
      navIndex: index,
      eidtStatus: false
    })
    if (isFirst[index]) {
      index === 0 ? _getMsg(this, { keytype: -1, clienttype: 1, page: 0 }) : index === 1 ? _getVideoList(this, { type_id: -1, clienttype: 1, page: 0 }) : _getBlogList(this, { keytype: 1, clienttype: 1, page: 0})
    }
    
  },
  edit(e) {
    const flag = e.detail
    const { navIndex, msgList, videoList, blogList} = this.data

    this.setData({
      eidtStatus: flag,
      allStatus: false
    })

  },
  // 选择某项
  itemEdit(e) {
    const { index } = e.currentTarget.dataset
    let { navIndex, msgList, videoList, blogList, allStatus} = this.data

    if (navIndex == 0) {
      msgList[index].edit = !msgList[index].edit;
      allStatus = msgList.every((item, index) => item.edit)

      this.setData({
        msgList,
        allStatus
      })
    } else if (navIndex == 1) {
      videoList[index].edit = !videoList[index].edit;
      allStatus = videoList.every((item, index) => item.edit)

      this.setData({
        videoList,
        allStatus
      })
    } else if (navIndex == 2) {
      blogList[index].edit = !blogList[index].edit;
      allStatus = blogList.every((item, index) => item.edit)

      this.setData({
        blogList,
        allStatus
      })
    }
  },
  // 点击全选
  allChoose() {
    let { navIndex, msgList, videoList, blogList, allStatus} = this.data
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
      blogList.forEach((item, index) => item.edit = allStatus)
      this.setData({
        blogList,
        allStatus
      })
    }
  },
  // 点击删除
  delet() {
    const { navIndex, msgList, videoList, blogList } = this.data
    let idList = ''

    func.wxUtil.showModal({ title: '删除提示', content: navIndex == 0 ? '确定要删除所选文章吗？' : navIndex == 1 ? '确定要删除所选视频吗？' : '确定要删除所选帖子吗？'}).then(res => {

      if (res.confirm) {
        if (navIndex == 0) {
          idList = msgList.reduce((arr, item) => {item.edit? arr.push(item.id) : null; return arr}, []).join(',')
          if (idList.length <= 0) {
            func.wxUtil.showToast({ title: '请至少选择一项！' })
            return false
          }
          _updataMsg(this, { keytype: 3, clienttype: 1, article_id: idList})
        } else if (navIndex == 1) {
          idList = videoList.reduce((arr, item) => { item.edit ? arr.push(item.id) : null; return arr }, []).join(',')
          if (idList.length <= 0) {
            func.wxUtil.showToast({ title: '请至少选择一项！' })
            return false
          }
          _updataVideo(this, { keytype: 3, clienttype: 1, video_id: idList })
        } else if (navIndex == 2) {
          idList = blogList.reduce((arr, item) => { item.edit ? arr.push(item.id) : null; return arr }, []).join(',')
          if (idList.length <= 0) {
            func.wxUtil.showToast({ title: '请至少选择一项！' })
            return false
          }
          _updataBlogList(this, { keytype: 3, clienttype: 1, blog_id: idList })
        }
        console.log(idList)
      }
    })
  }
})