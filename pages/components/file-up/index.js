// pages/components/file-up/index.js
import { fileUp} from '../../../api/api.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: Number,
    defaultImg: String,
    duration: {
      type: Number,
      value: 0
    }, 
    orderby: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    file() {
      const { count, duration, orderby} = this.data

      wx.chooseImage({
        count,
        sizeType: [],
        sourceType: [],
        success: res => {
          res.tempFilePaths.forEach((item, index) => {
            fileUp({ data: { keytype: 1, keyid: 0, duration, orderby, temp_file: 'file' }, path: item }).then(res => {
              console.log(res)
            })
          })
        }
      })
    }
  }
})
