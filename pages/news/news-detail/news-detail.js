var lists = require('../../../data/lists.js');

var app = getApp();

// pages/news/news-detail/news-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    
    //获取当前文章详情信息
    var detail = lists.lists[postId];

    this.init_collection(postId);
    this.init_share(postId);
    this.init_music(postId, detail);

    this.setData({
      detail: detail,
      id: postId
    });
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

  },

  /*
  初始化收藏
  */
  init_collection: function (postId){
    var tmp_collection;
    var collections = wx.getStorageSync('collections');

    if (collections) {
      if (!collections[postId]) {
        collections[postId] = false;
        wx.setStorageSync('collections', collections);
      }
      tmp_collection = collections[postId];

    } else {
      tmp_collection = false;
      collections = [];
      collections[postId] = false;
      wx.setStorageSync('collections', collections);
    }

    this.setData({
      collected: tmp_collection
    });
  },

   /*
  初始分享
  */
  init_share: function(postId){
    var tmp_share;
    var shares = wx.getStorageSync('shares');
    if (shares) {
      if (!shares[postId]) {
        shares[postId] = false;
        wx.setStorageSync('shares', shares);
      }
      tmp_share = shares[postId];
    } else {
      tmp_share = false;
      shares = [];
      shares[postId] = false;
      wx.setStorageSync('shares', shares);
    }
    this.setData({
      shared: tmp_share
    });
  },

  /*
  初始化音乐
  */
  init_music:function(postId, detail){
   
    var that = this;
    //监听暂停事件
    wx.onBackgroundAudioPause(function(){
      that.setData({
        playStatus: false
      });
    });

    wx.onBackgroundAudioStop(function () {
      that.setData({
        playStatus: false
      });
    });

    //监听播放事件
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        music_bg: detail.music.coverImg,
        playStatus: true
      });
    });

    var curr_play_status = false;
    if (postId == app.globalData.music.currId) {
      curr_play_status = app.globalData.music.currStatus;
    }

    if (curr_play_status){
      this.audioPlay(detail);
    }else{
      this.audioPause();
    }
    this.setData({
      playStatus: curr_play_status
    });
  },

  onMusic: function(event){
    var id = event.currentTarget.dataset.id;
    var status  = false;
    if (id == app.globalData.music.currId){
      status = !this.data.playStatus;
    }else{
      status = true;
    }
    app.globalData.music.currId = id;
    app.globalData.music.currStatus = status;

    if (status){
      this.audioPlay(this.data.detail); 
    }else{
      this.audioPause();
    }
  },

  audioPlay: function (detail){
    wx.playBackgroundAudio({
      dataUrl: detail.music.url,
      title: detail.music.title,
      coverImgUrl: detail.music.coverImg
    });

    this.setData({
      music_bg: detail.music.coverImg,
      playStatus: true
    });
  },

  audioPause: function(){
    //wx.stopBackgroundAudio();
    wx.pauseBackgroundAudio();
    this.setData({
      playStatus: false
    });
  },



  /*
  收藏
  */
  onCollected: function(){
    var that = this;
    that.data.collected = !that.data.collected;
    var collections = wx.getStorageSync('collections');
    collections[that.data.id] = that.data.collected;
    wx.setStorageSync('collections', collections);
    that.setData({ collected: that.data.collected});
     
   
    wx.showToast({
      title: that.data.collected?'收藏成功':'取消收藏',
      duration: 2000,
      icon: 'success'
    });
  },

  /*
  分享
  */
  onShared:function(){
    var that = this;
    that.data.shared = !that.data.shared;

    var shares = wx.getStorageSync('shares');
    shares[that.data.id] = that.data.shared;
    wx.setStorageSync('shares', shares);

    that.setData({ shared: that.data.shared});
  }

})