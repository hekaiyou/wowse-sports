// miniprogram/pages/reservation/reservation.js
import WxValidate from '../../utils/WxValidate.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ["深圳市宝安区", "深圳市龙华区", "深圳市南山区", "珠海市香洲区"],
    regionIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 先初始化表单
     */
    this.initValidate();
  },

  /**
   * 区域选择发生改变时
   */
  bindRegionChange: function (e) {
    this.setData({
      regionIndex: e.detail.value
    })
  },

  /**
   * 表单发生了提交事件
   */
  formSubmit: function (e) {
    /**
     * 表单提交校验
     */
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    /**
     * 验证成功以后的逻辑
     */
    this.submitInfo(params);
  },

  /**
   * 表单-提交
   */
  submitInfo(params) {
    let form = params;
    console.log('将要提交的表单信息：', form);
  },

  /**
   * 表单-验证字段
   */
  initValidate() {
    /**
     * 配置规则
     */
    const rules = {
      babyName: {
        required: true,
        rangelength: [2, 4]
      },
      babyAge: {
        required: true,
        range: [3, 97]
      },
      contact: {
        required: true,
        rangelength: [2, 4]
      },
      phone: {
        required: true,
        tel: true
      },
    };
    /**
     * 验证字段的提示信息，若不传则调用默认的信息
     */
    const messages = {
      babyName: {
        required: '请输入宝贝姓名',
        rangelength: '请输入2~4个汉字',
      },
      babyAge: {
        required: '请输入宝贝年龄',
        rangelength: '请输入范围在5到97之间的数值',
      },
      contact: {
        required: '请输入联系人',
        rangelength: '请输入2~4个汉字',
      },
      phone: {
        required: '请输入联系电话',
        rangelength: '请输入11位的手机号码',
      },
    };
    /**
     * 创建实例对象
     */
    this.WxValidate = new WxValidate(rules, messages)
  },

  /**
   * 显示模态窗口
   */
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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