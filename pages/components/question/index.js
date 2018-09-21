// pages/components/question/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentRadio: '',
    currentText: '',
    currentCheckbox: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange(e) {
      let { item} = this.data
      const value = e.detail.value

      item.value = value
      item.options.forEach((item, index) => {
        if (item.content == value) {
          item.checked = true
        } else {
          item.checked = false
        }
      })

      this.setData({
        currentRadio: e.detail.value
      })
      this.triggerEvent('optionsChoose', { optionsType: item.optionsType, value, item})
    },
    checkboxChange(e) {
      let { currentCheckbox, item} = this.data
      const value = e.detail.value
      const index = currentCheckbox.indexOf(value)

      index === -1 ? currentCheckbox.push(value) : currentCheckbox.splice(index, 1);
      item.value = currentCheckbox
      item.options.forEach((item, index) => {
        if (currentCheckbox.includes(item.content)) {
          item.checked = true
        } else {
          item.checked = false
        }
      })

      this.setData({
        currentCheckbox
      })
      this.triggerEvent('optionsChoose', { optionsType: item.optionsType, value: currentCheckbox, item})
    },
    input(e) {
      let {item} = this.data
      const value = e.detail.value

      item.value = value
      // this.setData({
      //   currentText: e.detail.value
      // })
      this.triggerEvent('optionsChoose', { optionsType: item.optionsType, value, item })
    }
  }
})
