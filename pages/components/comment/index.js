// pages/components/comment/index.js
import { getCommentList} from '../../../api/api.js'

function _getCommentList(content, data) {
  getCommentList({data}).then(res => {
    content.setData({
      commentList: res.infor.listItems
    })
  })
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyId: {
      type: String,
      observer: function (newVal, oldVal, changedPath) {
        const { page, keytype} = this.data
        _getCommentList(this, { keytype, keyid: newVal, page })
      }
    },
    keytype: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    more() {
      const { keyId, keytype} = this.data

      wx.navigateTo({
        url: `../../../../comment-home/index?keytype=${keytype}&keyId=${keyId}`
      })
    }
  }
})
