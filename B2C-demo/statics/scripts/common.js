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
    console.log(firstline)
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
