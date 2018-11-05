$(function(){

    $('#loginBtn').click(function(){
        var username=$('#username').val().trim();
        var password=$('#password').val().trim();

        if (username==='') {
            mui.toast("请输入用户名");
            return;
            
        }
        if (password==="") {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                if (info.error===403) {
                    mui.toast("用户名或者密码错误");
                    return;
                }

                if (info.success) {
                    // (1) 是从购物车等页面跳转过来的, 需要跳回去
                    // (2) 如果直接访问 login.html, 跳转到个人中心 
                    if (location.href.indexOf("retUrl") !=-1) {
                        // 有 retUrl, 说明需要跳回去
                        var retUrl=location.search.replace("?retUrl=","");

                        location.href=retUrl;
                    }else{
                         // 没有 retUrl, 去个人中心
                        location.href="user.html";
                    }

                }
            }
        })


    })













})