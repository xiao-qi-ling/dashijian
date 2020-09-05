$(function() {
    $("#reg_link").click(function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#login_link").click(function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    var from = layui.form;
    var layer = layui.layer;
    from.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $(".pwd").val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    });
    // 注册事件
    $("#reg-from").on("submit", function(e) {
            e.preventDefault();
            var data = {
                username: $("#reg-from [name=username]").val(),
                password: $("#reg-from [name=password]").val()
            }
            $.post("http://ajax.frontend.itheima.net/api/reguser", data, function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                layer.msg(res.message);
                $("#login_link").click();
            })
        })
        // 登录事件
    $("#login-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "api/login",
            data: $(this).serialize(),

            success: function(response) {
                // console.log(response);
                if (response.status !== 0) {
                    return layer.msg(response.message)
                }
                localStorage.setItem("token", response.token)
                location.href = "./index.html";
            }
        });
    })
})