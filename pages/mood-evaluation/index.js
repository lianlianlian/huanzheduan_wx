// pages/mood-evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [['项目','介绍'], ['知情','同意'], ['问卷'], ['心情','建议']],
    listIndex: 0,
    question: [
      {
        number: 'Q1.',
        type: '单选',
        name: '您认为什么可以成为抑郁症的病因？',
        optionsType: 1,
        options: [
          {
            content: 'A. 遗传因素'
          },
          {
            content: 'B. 生活压力'
          },
          {
            content: 'C. 家庭背景'
          },
          {
            content: 'D. 人际关系问题'
          },
          {
            content: 'E. 没听说过抑郁症'
          },
          {
            content: 'F. 听说过抑郁症但是不清楚症状'
          }
        ]
      },
      {
        number: 'Q2.',
        type: '多选',
        name: '您认为什么可以成为抑郁症的病因？',
        optionsType: 2,
        options: [
          {
            content: 'A. 遗传因素'
          },
          {
            content: 'B. 生活压力'
          },
          {
            content: 'C. 家庭背景'
          },
          {
            content: 'D. 人际关系问题'
          },
          {
            content: 'E. 没听说过抑郁症'
          },
          {
            content: 'F. 听说过抑郁症但是不清楚症状'
          }
        ]
      },
      {
        number: 'Q3.',
        type: '填空',
        name: '您认为什么可以成为抑郁症的病因？',
        optionsType: 3
      }
    ],
    questionIndex: 0,
    btnText: '下一步'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  optionsChoose(e) {
    console.log(e)
    const { optionsType, value, item} = e
    const { questionIndex, question} = this.data
    
    // 单选
    if (optionsType == 0 || optionsType == 1) {
      question[questionIndex] = item
    }
    this.setData({
      question
    })
  },
  pre() {
    let { questionIndex} = this.data
    if (questionIndex >= 1) {
      questionIndex --
      this.setData({
        questionIndex
      })
    }
  },
  next() {
    let { questionIndex, question} = this.data
    if (questionIndex < question.length - 1) {
      questionIndex ++
      this.setData({
        questionIndex
      })
    }
  },
  submit() {
    let { listIndex, btnText} = this.data;
    if (listIndex < 3) {
      listIndex ++
    }
    if (listIndex === 1) {
      btnText = '我同意'
    } 
    this.setData({
      listIndex,
      btnText
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})