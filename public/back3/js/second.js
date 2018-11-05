$(function(){
    var currentPage=1;
    var pageSize=5;

    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
             var htmlStr=template("secondTpl",info);
             $('tbody').html(htmlStr);

            
        // 分页插件初始化
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3, // boostrap 版本号
            totalPages: Math.ceil( info.total / info.size ), // 总页数
            currentPage: info.page, // 当前页
            // 注册页码点击事件
            onPageClicked: function( a, b, c, page ) {
              // 更新当前页
              currentPage = page;
              // 重新渲染
              render();
            }
          })

            }
        })
    }









})