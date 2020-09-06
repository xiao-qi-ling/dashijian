$(function() {
    getname();
    var layer = layui.layer;
    $('#btn_out').on("click", function() {
        console.log("ok");
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem("token");
            location.href = '/login.html';

            layer.close(index);
        });


    })
})

function getname() {
    $.ajax({
        type: "GET",
        url: "my/userinfo",



        success: function(response) {
            if (response.status !== 0) {
                return layui.layer.msg('请求失败');
            }
            // console.log(response);
            getuserimg(response.data);
        }
    });
}

function getuserimg(res) {
    var name = res.nickname || res.username;
    if (res.user_pic == null) {
        var first = name[0].toUpperCase();
        $(".text-avater").html(first);
        $(".layui-nav-img").hide();
        $("#weclome").html("欢迎&nbsp;&nbsp;" + name)
    } else {
        $(".layui-nav-img").attr("src", res.user_pic).show()
        $(".text-avater").hide();

    }
}