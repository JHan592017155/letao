$(function(){
    var currentPage=1;
    var pageSize=5;

    var currentId;
    var isDelete;

    render();
   function render(){
    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:"json",
        success:function(info){
            console.log(info);

            var htmlStr=template("tmp",info);

         $('tbody').html( htmlStr );


        // 分页
         $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            
            currentPage:info.page,//当前页
            
            totalPages:Math.ceil(info.total/info.size),//总页数
            
            onPageClicked:function(a, b, c,page){
              //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage=page;
                render();
            }
          });

        }
    })
   }


  // 什么时候用事件委托?
  // 1. 元素是动态生成的
  // 2. 批量注册事件, 效率高

  // 点击启用禁用按钮, 显示模态框 (使用事件委托)
$('tbody').on("click",".btn",function(){
    $('#userModal').modal("show");

    currentId=$(this).parent().data("id");
    // console.log(currentId);
    
    // 获取启用还是禁用, 根据按钮的类来判断
    // 禁用 ? 0 : 1;
    isDelete=$(this).hasClass("btn-danger")? 0:1;

});
  // 点击模态框确定按钮, 进行修改用户状态
    $('#submitBtn').click(function(){

        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:"json",
            success:function(info){
                console.log(info);

                $('#userModal').modal("hide");

                render();
            }
        })


    })


})