$(function(){

  // 发送请求, 获取购物车列表数据, 进行渲染(要求需要登录的)
  // (1) 未登录, 后台返回 error, 要求用户先登录
  // (2) 已登录, 返回购物车的数据

   render();

   function render(){
        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            dataType:"json",
            success:function(info){
                console.log(info);
                if (info.error===400) {
                    location.href="login.html";
                    return;
                }
               var htmlStr=template("cartTpl",{list:info}) ;
               $('#cartList').html(htmlStr);
            }

        })

   }


  // 删除功能
  // (1) 通过事件委托, 给所有的删除按钮, 添加点击事件
  // (2) 在删除按钮中存储 当前购物车的 id
  // (3) 获取 id, 发送删除请求
  // (4) 页面重新渲染

   $('#cartList').on("click",".btn_delete",function(){

    //获取购物车的id

    var id=$(this).data("id");

    $.ajax({
        type:"get",
        url:"/cart/deleteCart",
        data:{
            id:[id]
        },
        dataType:"json",
        success:function(info){
            console.log(info);

            render();
        }


    })


   })



   //修改功能
   $('#cartList').on("click",".btn_edit",function(){

     var id=$(this).data("id");
     var size=$(this).data("size");
     var num=$(this).data("num");
     console.log(id);
     console.log(size);
     console.log(num);
    $.ajax({
        type:"post",
        url:"/cart/updateCart",
        data:{
            id:id,
            size:size,
            num:num
        },
        dataType:"json",
        success:function(info){
            console.log(info);
        }



    })

   })


})