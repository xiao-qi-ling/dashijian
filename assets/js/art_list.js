$(function() {
    var layer = layui.layer;
    var laypage = layui.laypage;
    var ID = null

    var form = layui.form;
    var q = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        // 定义时间过滤器
    function paddzero(date) {
        return date > 9 ? date : '0' + date
    }
    template.defaults.imports.filter = function(date) {
        const dt = new Date(date);
        var y = paddzero(dt.getFullYear())
        var m = paddzero(dt.getMonth() + 1)
        var d = paddzero(dt.getDate())
        var hh = paddzero(dt.getHours())
        var mm = paddzero(dt.getMinutes())
        var ss = paddzero(dt.getSeconds())
        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss
    }

    function initlist() {

        $.ajax({
            type: "GET",
            url: "my/article/list",
            data: q,

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('请求文章列表失败')
                }
                // console.log(response);
                var htmlstr = template('tpl-table', response);
                // console.log(htmlstr);
                $('tbody').html(htmlstr);

                getpage(response.total)
            }
        });
    }
    initlist();
    initcate();

    function initcate() {

        $.ajax({
            type: "GET",
            url: "my/article/cates",


            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('请求文章列表失败')
                }
                // console.log(response);
                // console.log(response);
                var htmlstr = template('tpl-cate', response);
                // console.log(htmlstr);
                $('#Classification').html(htmlstr);
                form.render();
            }
        });
    }

    $('#form-seach').on('submit', function(e) {
            console.log(11);
            e.preventDefault();
            var cate_id = $('[name=cate_id]').val();
            var state = $('[name=state]').val();
            q.cate_id = cate_id;
            q.state = state;
            // console.log(q);
            initlist();
        })
        // 分页
    function getpage(total) {
        layui.use('laypage', function() {


            //执行一个laypage实例
            laypage.render({
                elem: 'pagebox' //注意，这里的 test1 是 ID，不用加 # 号
                    , //数据总数，从服务端得到
                count: total,
                limit: q.pagesize,
                limits: [2, 3, 5, 10],
                curr: q.pagenum,
                jump: function(obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit);
                    //得到每页显示的条数
                    q.pagesize = obj.limit;
                    q.pagenum = obj.curr;
                    //首次不执行
                    if (!first) {
                        //do something
                        initlist()
                    }
                },
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']

            });
        });
    }
    $('tbody').on('click', '.btn-delet', function() {
        var len = $('.btn-delet').length;
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: "GET",
                url: "my/article/delete/" + id,

                success: function(response) {
                    if (response.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1

                    }
                    initlist();
                }
            });
            layer.close(index);
        });

    })
    $('tbody').on('click', '.btn-edit', function() {
        var id = $(this).attr('data-id');
        // console.log(id);
        // console.log(initedit(id));
        localStorage.setItem('id', id);
        location.href = '/articile/art_pub.html';

    })



})