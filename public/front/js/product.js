$(function(){

    //1-获取地址栏传递过来的 productId

    var productId=getSearch("productId");

    // console.log(productId);
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template("productTpl",info);
            $('.lt_main .mui-scroll').html(htmlStr);
           
            
             // 手动在 轮播图 渲染完成后, 进行初始化
             var gallery = mui('.mui-slider');
             gallery.slider({
               interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
             });

              // 手动初始化, 数字框
              mui(".mui-numbox").numbox()
               

        }


    });



    //3-给尺码添加可选功能（事件委托）
    $('.lt_main .mui-scroll').on("click",".lt_size span",function(){

        $(this).addClass("current").siblings().removeClass("current");

    });

    //4-加入购物车功能
    $('#addCart').click(function(){

        var size=$('.lt_size span.current').text();
        var num=$('.mui-numbox-input').val();

        if (!size) {
            mui.toast("请选择尺码");
            return;            
        }

        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:productId,
                size:size,
                num:num
            },
            dataType:"json",
            success:function(info){
                console.log(info);

                if (info.error===400) {
                // 当前用户未登录, 直接拦截到登陆页, 而且将当前页地址传递过去
               location.href="login.html?retUrl=" +location.href;    
                }

                if (info.success) {
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){

                     // 通过 e.index 判断用户点击的是哪个按钮
                    if (e.index===0) {
                        location.href="cart.html";
                    }
                    })
                }


            }
        })


    })







})