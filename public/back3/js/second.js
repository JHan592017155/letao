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

    //2-显示添加模态框
    $('#addBtn').click(function(){
        //显示模态框
        $('#addModal').modal("show");

        $.ajax({
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var str=template("dropdownTpl",info);
                $('.dropdown-menu').html(str);
            }
        })


    });

    //3-给下拉菜单中的a 注册点击事件，通过事件委托注册
    $('.dropdown-menu').on("click","a",function(){

        var txt=$(this).text();
        $("#dropdownText").text(txt);

        //获取选择的一级分类 id 设置给隐藏域
        var id=$(this).data("id");
        $('[name="categoryId"]').val(id);

    // 让一级分类对应的隐藏域, 校验状态置成 校验成功
    // 参数1: 字段名称
    // 参数2: 校验状态
    // 参数3: 配置校验规则, 用来显示错误信息
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");


    });

    //4. 配置文件上传插件
    $('#fileupload').fileupload({
        dataType:"json",
        done:function( e, data ) {
            // console.log( data.result );  // 后台返回的数据
            var picUrl = data.result.picAddr;
      
            // 设置给 img的 src 属性
            $('#imgBox img').attr("src", picUrl);
      
            // 设置给 隐藏域
            $('[name="brandLogo"]').val( picUrl );
      
            // 让 隐藏域 校验状态变成 校验成功
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
          }
    });


     // 5. 表单校验
    $('#form').bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 对任意配置了的 input 都进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段
    fields: {

      // categoryId 选择一级分类
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }

    }
    });

    //6-注册表单校验成功事件，阻止默认的表单提交，通过ajax 进行提交

    $('#form').on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                console.log(info);
                if (info.success) {
                    $('#addModal').modal("hide");
                    currentPage=1;
                    render();
                        // 重置表单的状态和内容
                $('#form').data("bootstrapValidator").resetForm(true);

                // img图片和下拉菜单不是表单元素, 需要手动重置
                $('#dropdownText').text("请选择一级分类");
                 $('#imgBox img').attr("src", "images/none.png");
                }
            }
        })



    })




})