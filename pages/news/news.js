var res = require('../../data/lists.js');

// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.data.tmp = res.lists;
    this.setData({ tmp:res.lists });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  detail:function(event){
    var news_id = event.currentTarget.dataset.id;
    var news_title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'news-detail/news-detail?id='+news_id+'&title='+news_title
    });
  }
})