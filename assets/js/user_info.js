$(function() {
    var form = layui.form;
    form.verify({
        user_nikename: function(value) {
            if (value.length > 6) {
                return "昵称必须在1~6字符之间"
            }
        }
    })
    inintuseinfo();

    function inintuseinfo() {
        $.ajax({
            type: "GET",
            url: "my/userinfo",

            success: function(response) {
                // console.log(response);
                //
                if (response.status !== 0) {
                    return layui.layer.msg("获取用户信息失败")
                }
                form.val('userinfoform', response.data);
            }
        });
    }
    $(".layui-btn-primary").on("click", function(e) {
        e.preventDefault();
        inintuseinfo();
    })
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "my/userinfo",
            data: $(this).serialize(),

            success: function(response) {
                // console.log(response);
                if (response.status !== 0) {
                    return layui.layer.msg("更新用户信息失败")
                }
                window.parent.getname();
                return layui.layer.msg("更新用户信息成功")
            }
        });
    })
})