$(function() {
    $.ajaxPrefilter(function(option) {
        // console.log();
        option.url = "http://ajax.frontend.itheima.net/" + option.url;
    })
})