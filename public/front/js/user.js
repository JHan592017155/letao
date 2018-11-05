$(function(){

  // 功能1: 请求用户数据, 进行页面渲染 (要求登录)
  // (1) 未登录,  后台返回 当前用户未登录, 拦截到登录页
  // (2) 已登录,  后台返回 当前用户信息 的对象

  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    dataType:"json",
    success:function(info){
        if (info.error===400) {
            location.href="login.html";
            return;
        }
        console.log(info);
        var htmlStr=template("userTpl",info);
        $('#userInfo').html(htmlStr);
    }


  })


  $("#logout").click(function(){
      $.ajax({
          type:"get",
          url:"/user/logout",
          dataType:"json",
          success:function(info){
              console.log(info);
              if (info.success) {
                  location.href="login.html";
              }
          }
      })
  })



})