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

// 图片详情页 放大镜
(function ($) {
    $.fn.imagezoom = function (options) {
        var settings = { xzoom: 450, yzoom:450, offset: 20, position: "BTR", preload: 1 };
        if (options) {
            $.extend(settings, options);
        }
        var noalt = '';
        var self = this;
        $(this).bind("mouseenter", function (ev) {
            var imageLeft = $(this).offset().left;
            var imageTop = $(this).offset().top;
            var imageWidth = $(this).get(0).offsetWidth;
            var imageHeight = $(this).get(0).offsetHeight;
            var boxLeft = $(this).parent().offset().left;
            var boxTop = $(this).parent().offset().top;
            var boxWidth = $(this).parent().width();
            var boxHeight = $(this).parent().height();
            noalt = $(this).attr("alt");
            var bigimage = $(this).attr("rel");
            $(this).attr("alt", '');
            if ($("div.zoomDiv").get().length == 0) {
                $(document.body).append("<div class='zoomDiv'><img class='bigimg' src='" + bigimage + "'/></div><div class='zoomMask'>&nbsp;</div>");
            }
            if (settings.position == "BTR") {
                if (boxLeft + boxWidth + settings.offset + settings.xzoom > screen.width) {
                    leftpos = boxLeft - settings.offset - settings.xzoom;
                } else {
                    leftpos = boxLeft + boxWidth + settings.offset;
                }
            } else {
                leftpos = imageLeft - settings.xzoom - settings.offset;
                if (leftpos < 0) {
                    leftpos = imageLeft + imageWidth + settings.offset;
                }
            }
            $("div.zoomDiv").css({ top: boxTop, left: leftpos });
            $("div.zoomDiv").width(settings.xzoom);
            $("div.zoomDiv").height(settings.yzoom);
            $("div.zoomDiv").show();
            $(this).css('cursor', 'crosshair');
            $(document.body).mousemove(function (e) {
                mouse = new MouseEvent(e);
                if (mouse.x < imageLeft || mouse.x > imageLeft + imageWidth || mouse.y < imageTop || mouse.y > imageTop + imageHeight) {
                    mouseOutImage();
                    return;
                }
                var bigwidth = $(".bigimg").get(0).offsetWidth;
                var bigheight = $(".bigimg").get(0).offsetHeight;
                var scaley = 'x';
                var scalex = 'y';
                if (isNaN(scalex) | isNaN(scaley)) {
                    var scalex = (bigwidth / imageWidth);
                    var scaley = (bigheight / imageHeight);
                    $("div.zoomMask").width((settings.xzoom) / scalex);
                    $("div.zoomMask").height((settings.yzoom) / scaley);
                    $("div.zoomMask").css('visibility', 'visible');
                }
                xpos = mouse.x - $("div.zoomMask").width() / 2;
                ypos = mouse.y - $("div.zoomMask").height() / 2;
                xposs = mouse.x - $("div.zoomMask").width() / 2 - imageLeft;
                yposs = mouse.y - $("div.zoomMask").height() / 2 - imageTop;
                xpos = (mouse.x - $("div.zoomMask").width() / 2 < imageLeft) ? imageLeft : (mouse.x + $("div.zoomMask").width() / 2 > imageWidth + imageLeft) ? (imageWidth + imageLeft - $("div.zoomMask").width()) : xpos;
                ypos = (mouse.y - $("div.zoomMask").height() / 2 < imageTop) ? imageTop : (mouse.y + $("div.zoomMask").height() / 2 > imageHeight + imageTop) ? (imageHeight + imageTop - $("div.zoomMask").height()) : ypos;
                $("div.zoomMask").css({ top: ypos, left: xpos });
                $("div.zoomDiv").get(0).scrollLeft = xposs * scalex;
                $("div.zoomDiv").get(0).scrollTop = yposs * scaley;
            });
        });
        function mouseOutImage() {
            $(self).attr("alt", noalt);
            $(document.body).unbind("mousemove");
            $("div.zoomMask").remove();
            $("div.zoomDiv").remove();
        }

        count = 0;
        if (settings.preload) {
            $('body').append("<div style='display:none;' class='jqPreload" + count + "'></div>");
            $(this).each(function () {
                var imagetopreload = $(this).attr("rel");
                var content = jQuery('div.jqPreload' + count + '').html();
                jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">');
            });
        }
    }
})(jQuery);
function MouseEvent(e) {
    this.x = e.pageX;
    this.y = e.pageY;
};
