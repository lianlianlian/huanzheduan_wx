// pages/components/post/index.js
import { updataTribuneList} from '../../../api/api.js'
const {func} = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    index: Number
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
    concern(){
      let { item, index} = this.data

      updataTribuneList({ data: { keytype: item.loveflag == 0 ? 1 : 2, clienttype: 1, blog_type_id: item.id}}).then(res => {
        func.wxUtil.showToast({ title: item.loveflag == 0 ? '关注成功！' : '取消关注成功！' })
        // item.loveflag = item.loveflag == 0 ? 1 : 0
        this.triggerEvent('concern', { status: true })
      })
    },
    navigation() {
      let { item } = this.data
      this.triggerEvent('navigation', {id: item.id})
    }
  }
})
