$(function() {
    // 初始化富文本编辑器
    initEditor();
    var $image = $('#image');
    var layer = layui.layer;
    var form = layui.form


    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);
    //  请求分类数据
    initcate()

    function initcate() {
        $.ajax({
            type: "GET",
            url: "my/article/cates",

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('请求分类数据失败')
                }
                var htmlstr = template('pub_classification', response);
                $('[name=cate_id]').html(htmlstr);
                form.render();
            }
        });
    }
    $('#chooseimg').on('click', function() {
        $('#imgchanges').click();
        // console.log(11);

    })
    $('#imgchanges').on('change', function(e) {
        // e.preventDefault();
        var file = e.target.files;
        if (file.length === 0) {
            return
        }
        console.log(file);
        var newImgURL = URL.createObjectURL(file[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });
    var art_pubstate = '已发布';
    $('#draft').on('click', function() {
        art_pubstate = '草稿'
    })
    $('#release').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.forEach(function(v, k) {
            console.log(k, v);
        })
        fd.append('state', art_pubstate);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)

            })
            // console.log(fd);
            // fd.forEach(function(v, k) {
            //     console.log(k, v);
            // })
        addpub(fd);


    })

    function addpub(fd) {
        $.ajax({
            type: "POST",
            url: "my/article/add",
            data: fd,
            contentType: false,
            processData: false,

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('发表文章失败')
                }
                console.log(response);
                location.href = '/articile/art_list.html'
            }
        });
    }
    art_edit();

    function art_edit() {
        var id = localStorage.getItem('id');
        // console.log(id);
        $.ajax({
            type: "GET",
            url: "my/article/" + id,

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('编辑文章失败')
                }

                var data = response.data;
                console.log(data);
                $('.layui-card-header').html('修改文章');
                $(' [name=title]').val(data.title);
                $('option').val(data.cate_id);
                $('[name=content]').html(data.content);
                $('#image').attr('src', data.cover_img);
                localStorage.removeItem('id')


            }
        });
    }


})