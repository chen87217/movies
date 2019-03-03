var getData = require('../../utils/tools.js');

var app = getApp();
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    searchPanelShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var api = app.globalData.movieApi;
    var newUrl = api.baseUrl + api.newUrl;
    var hotUrl = api.baseUrl + api.hotUrl;
    var topUrl = api.baseUrl + api.topUrl;
    
    var args = {
      start: 0,
      count: 3
    }

    getData.ajaxHandle(hotUrl, args,  this.refresh, 'hot');
    getData.ajaxHandle(newUrl, args, this.refresh, 'new');
    getData.ajaxHandle(topUrl, args, this.refresh, 'top');
  },

  /*更新变量*/
  refresh: function (res, category){
    var that = this;
    var result = [];
    if (res) {
      result = this.dataHandle(res.subjects, res.title, category);
    }
    var lists = {};
    lists[category] = result;
    that.setData(lists);
    
    console.log(lists);
  },
  
  /*数据处理*/
  dataHandle: function (res, title, category){
    var items = [];
    for (var i = 0; i < res.length; ++i) {
      var item = {};
      var t = res[i]['title'];
      if (t.length > 6) {
        t = t.substring(0, 6) + '...';
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

  /*更多*/
  onMore: function(event){
    var category = event.currentTarget.dataset.category;
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'movies-more/movies-more?category=' + category + '&title=' + title,
    })
  },

  onSearchTiger: function(event){
    var api = app.globalData.movieApi;
    var searchUrl = api.baseUrl + api.search + '?';
    var search = event.detail.value;
    if(search){
      var args = {
        tag: search,
        start: 0, 
        count: 20
      };
      this.setData({
        containerShow: false,
        searchPanelShow: true
      });
      getData.ajaxHandle(searchUrl, args, this.refresh, 'search');
    }else{
      this.setData({
        containerShow: true,
        searchPanelShow: false
      });  
    }
  },

  onScrollToLower: function (event) {
   
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