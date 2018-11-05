$(function(){
    var key=getSearch("key");

    $('.search_input').val(key);

    render();

    function render(){
        $('.lt_product').html('<div class="loading"></div>');

        var obj={};
        obj.proName=$('.search_input').val();
        obj.page=1;
        obj.pageSize=100;

      
        // 两个可选的参数, 价格price 库存num
        // (1) 根据有没有高亮的 a, 决定是否需要排序
        // (2) 根据箭头的方向(类名), 决定降序还是升序,  2降序, 1升序  
        var $current=$('.lt_sort a.current');
        if ($current.length>0) {
            // 有高亮的 a, 需要排序
            var sortName=$current.data("type");
            var sortValue=$current.find("i").hasClass("fa-angle-down") ? 2 : 1 ;
            obj[ sortName ]=sortValue;
        }

        setTimeout(function(){
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:obj,
                dataType:"json",
                success:function(info){
                    console.log(info);
                    var htmlStr=template("list_tpl",info);
                    $('.lt_product').html(htmlStr);
                }
            })
        },1000);

    }

    //2-点击搜索按钮，进行搜索
    $('.search_btn').click(function(){
        render();
    });

  // 3. 排序功能
  // (1) 给有 data-type 属性的排序按钮 注册点击事件
  // (2) 原来没有 current 类, 添加上 current 类
  // (3) 如果原来有 current 类, 改变箭头方向
  // (4) 根据 高亮的 a, 和箭头方向, 进行排序

    $('.lt_sort a[data-type]').click(function(){
       
        if ($(this).hasClass("current")) {

            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");

        }else{
            $(this).addClass("current").siblings().removeClass("current");

        }

        render();
    })









})