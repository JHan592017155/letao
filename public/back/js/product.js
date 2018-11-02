$(function(){
    var currentPage=1;
    var pageSize=2;

    var picArr=[]; //图片数组，用于存储已上传的图片对象

    render();

    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("productTpl",info);
                $('tbody').html(htmlStr);

                //分页插件初始化
                $('#paginator').bootstrapPaginator({
                  bootstrapMajorVersion: 3, // 版本号
                  totalPages:Math.ceil(info.total/info.size),
                  currentPage:info.page,
                  onPageClicked:function(a,b,c,page){
                      currentPage=page;
                      render();
                  }

                })

            }
        })
    }


    //2. 点击添加按钮，显示添加模态框

    $('#addBtn').click(function(){
        $('#addModal').modal("show");

        //获取所有的二级分类，显示添加模态框
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("dropdownTpl",info);
                $('.dropdown-menu').html(htmlStr);
            }
        })


    });

    //3. 给下拉菜单的 a 绑定点击事件（事件委托绑定）

    $('.dropdown-menu').on("click","a",function(){

        //获取文本，设置给 按钮
        var txt=$(this).text();
        $('#dropdownText').text(txt);

        //获取 id 设置给隐藏域 name="brandId"
        var id=$(this).data("id");
        $('[name="brandId"]').val(id);

       // 重置校验状态为 VALID
       $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");



    });

    //4. 进行插件初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data.result);

          var picObj=data.result;
          var picUrl=picObj.picAddr;  //获取图片路径

          //往数组的最前面追加一个数据
            picArr.unshift(picObj);

          //将图片路径设置给 img src 并添加到 imgBox 的子元素最前面
        $('#imgBox').prepend('<img src="'+picUrl+'" alt="">');

            // push 在数组的最后面追加
            // pop  在数组的最后面移除
            // unshift 在数组的最前面追加
            // shift 在数组的最前面移除

            // 当数组长度 > 3 时, 应该删掉最后一个
            // (1) 数组删掉最后一个
            // (2) 图片结构, 去掉最后一个图片

            if (picArr.length>3) {
                picArr.pop();
                // 只想找 img, 找最后一个 img 类型的元素
                $('#imgBox img:last-of-type').remove();
            }

            //如果图片上传满了 3 张，应该让picStatus的校验状态, 置成校验成功
            if (picArr.length===3) {
                $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID");
            }

        }
  });

    //5. 添加表单校验
    $('#form').bootstrapValidator({
        //配置对隐藏域也进行校验
        excluded: [],

        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',   // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'库存格式要求是非零开头的数字'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'尺码格式必须是 xx-xx 的格式, 例如: 32-40'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品现价"
                    }
                }
            },
            picStatus:{
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }
        }
    
    
    });

  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
    $('#form').on("success.form.bv",function(e){

    e.preventDefault();

    //拼接需要传给后台的参数
    var params=$('#form').serialize();

    params +="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    params +="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    params +="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;

    $.ajax({
        type:"post",
        url:"/product/addProduct",
        data:params,
        dataType:"json",
        success:function(info){
            console.log(info);
            if (info.success) {
                $('#addModal').modal("hide");

                currentPage=1;
                render();

               // 重置模态框的表单内容和状态
                $('#form').data("bootstrapValidator").resetForm(true);
                //重置文本何图片
                $('#dropdownText').text("请选择二级分类");
                $('#imgBox img').remove();
            }
        }
    })
    




    })




})