$(function() {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'

        ],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rpwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }


    })
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "my/updatepwd",
            data: $(this).serialize(),

            success: function(response) {
                if (response.status !== 0) {
                    return layui.layer.msg("重置密码请求失败")
                }
                layui.layer.msg("重置密码请求成功");
                $(".layui-form")[0].reset();
            }
        });
    })

})