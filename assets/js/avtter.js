$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    $("#btnchangeimg").on("click", function() {

        $("#file").click();
        // console.log(1);
    })
    $("#file").on("change", function(e) {
        // console.log(e);
        var flielist = e.target.files[0];
        if (e.target.files.length == 0) {
            return layui.layer.msg('请选择照片')
        }
        var newImgURL = URL.createObjectURL(flielist);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options)

    })
    $(".layui-btn-danger").on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            type: "POST",
            url: "my/update/avatar",
            data: {
                avatar: dataURL
            },


            success: function(response) {
                if (response.status !== 0) {
                    return layui.layer.msg("更换头像请求失败")
                }

                layui.layer.msg("更换头像请求成功");
                window.parent.getname();
            }
        });
    })

})