$(function(){

    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template("left_tpl",info);
            $('.lt_category_left ul').html(htmlStr);

            //渲染第一个一级分类，对应的二级分类
            renderById( info.rows[0].id );
        }
    });


    //2-给左侧 a 注册点击事件 （事件委托）
    $('.lt_category_left ul').on("click","a",function(){
        var id=$(this).data("id");

        renderById(id);

        $(this).addClass("current").parent().siblings().find("a").removeClass("current");

    })




    //根据一级分类的 id 渲染二级分类
    function renderById(id){

        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            success:function(info){
                console.log(info);

                var htmlStr=template("right_tpl",info);
                $(".lt_category_right ul").html(htmlStr);
            }
        })
    }

})