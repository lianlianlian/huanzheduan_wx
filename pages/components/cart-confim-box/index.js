// pages/components/cart-confim-box/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopList: {
      type: Array,
      observer: function (newValue,oldValue) {
        this.sum(newValue)
      }
    },
    showShopButton: Boolean
  },
  /**
   * 组件的初始数据
   */
  data: {
    showShopInfo: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showShopInfo() {
      const { showShopInfo, shopList } = this.data;
      if (shopList.length <= 0) {
        return false;
      }
      this.setData({
        showShopInfo: !showShopInfo
      })
    },
    hiddenShopInfo() {
      this.setData({
        showShopInfo: false
      })
    },
    clearCart() {
      this.setData({
        shopList: []
      })
      this.hiddenShopInfo();
      this.triggerEvent('upDataCart', { index: null});
    },
    sum(arrData) {

      let sum = arrData.reduce((sum, item) => sum + item.price.split('¥')[1] * item.number,0)
      this.setData({
        sumPrice: sum
      })
    },
    remove(e) {
      let { shopList } = this.data;
      const index = e.currentTarget.dataset.index;

      this.triggerEvent('upDataCart', { index});

      if (shopList[index].number > 1) {
        shopList[index].number--;
      } else {
        shopList.splice(index, 1);
      }

      this.sum(shopList);

      this.setData({
        shopList
      })
      if (shopList.length <= 0) {
        this.hiddenShopInfo();
      }
    },
    add(e) {
      let { shopList } = this.data;
      const index = e.currentTarget.dataset.index;
      shopList[index].number++;

      this.sum(shopList);

      this.setData({
        shopList
      })
      this.triggerEvent('upDataCart', { index });
    },
    submit(){
      this.triggerEvent('submit', this.properties.shopList);
    }
  }
})
