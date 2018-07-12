$(function () {
    // 头部通知栏
    var topbarNotice = document.getElementById('topbarNotice');
    var ali = topbarNotice.getElementsByTagName('li')
    var now = 0;
    var timer = null;
    next();
    function tab() {
        for (var i = 0; i < ali.length; i++) {
            ali[i].className = 'topbar-notice-item';
        }
        ali[now].className = 'topbar-notice-item show';
    };
    function next() {
        timer = setInterval(function () {
            now++;
            now %= ali.length;
            tab();
        }, 3000);
    };
    topbarNotice.onmouseover = function () {
        clearInterval(timer);
    };
    topbarNotice.onmouseout = next;
    // 头部通知栏end


});

//右边导航
window.onscroll = function () {
    var fixedRightNav = $('#fixedRightNav');
    var scroll_y = 0;
    var firstline = $('.main').offset().top;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_y = document.documentElement.scrollTop;
    } else if (document.body) {
        scroll_y = document.body.scrollTop;
    }
    //显示时机
    if (scroll_y + 50 > firstline) {
        fixedRightNav.css({ 'visibility': 'visible' });
    } else {
        fixedRightNav.css({ 'visibility': 'hidden' });
    }
};

layui.use(['flow', 'element', 'form'], function () {
    var flow = layui.flow;
    //当你执行这样一个方法时，即对页面中的全部带有lay-src的img元素开启了懒加载（当然你也可以指定相关img）
    flow.lazyimg();

    var form = layui.form;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,20}$/
            , '密码必须6到20位，且不能出现空格'
        ]
    });
});


