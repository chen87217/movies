var get_data_request = function (postUrl, args, callback, category) {
  wx.request({
    url: postUrl,
    data: args,
    header: {
      'content-type': 'json' // 默认值
    },
    success(res) {
      callback(res.data, category);
    },
    fail(res){
      callback(null, category);
    }
  });
}

var rating = function(stars){
  var star = parseFloat(stars);
  var arr = [];
  for(var i=1; i <= 5; ++i){
    if(10*i <= star){
      arr.push(1);
    }else{
      arr.push(0);
    }
  }
  return arr;
}

module.exports = {
  ajaxHandle: get_data_request,
  stars: rating
}