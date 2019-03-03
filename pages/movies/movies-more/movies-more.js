var getData = require('../../../utils/tools.js');

var app = getApp();

// pages/movies/movies-more/movies-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = options.title;
    var category = options.category;
    var api = app.globalData.movieApi;
    var newUrl = api.baseUrl + api.newUrl;
    var hotUrl = api.baseUrl + api.hotUrl;
    var topUrl = api.baseUrl + api.topUrl;

    var args = {
      start: 0,
      count: 20
    }

    var url;
    switch (category){
      case 'hot':
        url = hotUrl;
        break;
      case 'new':
        url = newUrl;
        break;
      case 'top':
        url = topUrl;
        break;
    } 

    getData.ajaxHandle(url, args, this.refresh, category);

    wx.setNavigationBarTitle({
      title: title,
    });

    this.setData({
      request_url: url,
      category: category,
    })
  },

  // /*更新变量*/
  refresh: function (res, category) {
    var that = this;
    var result = [];
    var total = that.data.total;
    if (res){
      result = this.dataHandle(res.subjects, res.title, category);
      total = total + result.items.length;
    }
    
    that.setData({
      lists: result,
      total: total
    });
  },

  // /*数据处理*/
  dataHandle: function (res, title, category) {
    var that = this;
    var items = [];
    if (that.data.lists){
      if(that.data.lists.items){
        items = that.data.lists.items;
      }
    }

    for (var i = 0; i < res.length; ++i) {
      var item = {};
      var t = res[i]['title'];
      if (t.length>6){
        t = t.substring(0,6)+'...';
      }
      item['title'] = t;
      item['average'] = res[i]['rating']['average'];
      item['stars'] = getData.stars(res[i]['rating']['stars']);
      item['image'] = res[i]['images']['small'];
      items.push(item);
    }

   
    var lists = {};
    lists['title'] = title;
    lists['items'] = items;
    lists['category'] = category;
    return lists;
  },


  onScrollToLower: function(event){
    var that = this;
    var url = that.data.request_url;
    var category =  that.data.category;
    var args = {
      start: that.data.total,
      count: 20
    }
   
    getData.ajaxHandle(url, args, this.refresh, category);
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