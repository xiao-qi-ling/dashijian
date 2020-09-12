$(function() {
    function initlist() {
        $.ajax({
            type: "GET",
            url: "my/article/cates",


            success: function(response) {
                // console.log();
                var htmlstr = template('getlist', response);
                $('tbody').html(htmlstr);

            }

        })
    }

    initlist();
    var layer = layui.layer;
    var index = null;
    $("#Addcategory").on('click', function() {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $("#dialog-add").html(),
            area: ['500px', '300px']
        })
    });
    $('body').on('submit', '#addcategory', function(e) {
        e.preventDefault();
        // console.log(1);
        $.ajax({
            type: "POST",
            url: "my/article/addcates",
            data: $(this).serialize(),

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('添加类别失败')
                }
                layer.msg('添加类别成功');
                layer.close(index);
                initlist();
            }
        })

    })

    var indexedit = null;
    var form = layui.form;

    $('tbody').on("click", ".btn-edit", function() {
        // console.log(11);
        indexedit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $("#formedit").html(),
            area: ['500px', '300px']
        })
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            type: "GET",
            url: "my/article/cates/" + id,

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('请求数据失败')
                }
                // layer.msg('请求数据成功')
                form.val('fromedit', response.data)


            }
        });
    })
    $('body').on('submit', '#fromedit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "my/article/updatecate",
            data: $(this).serialize(),

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('更新数据失败')
                }
                layer.msg('更新数据成功')
                layer.close(indexedit);
                initlist();
            }
        });
    })
    $('tbody').on('click', '.btn-del', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: "GET",
                url: "my/article/deletecate/" + id,

                success: function(response) {
                    // console.log(response);
                    if (response.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initlist();
                    layer.close(index);

                }
            });

        });
    })
})