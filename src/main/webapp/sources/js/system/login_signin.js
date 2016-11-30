$(function () {
    //禁止回退
    window.history.forward(1);
    //刷新验证码
    refreshCheckImg();
    /*//初始化提示信息
     initPoshytip("username");
     initPoshytip("password");
     initPoshytip("captcha");*/
    //表单验证
    validate1();
    //异步判断验证码
    getLoginCode();
});
//刷新验证码
function refreshCheckImg() {
    $(".refresh").click(function () {
        $("#captcha").val("").focus();//清空已经输入的验证码
        $("#checkImg").attr("src", "../captcha-image.html");
        $("button").attr("disabled", "disabled");
    });
}

//初始化提示信息
function initPoshytip(id) {
    $('#' + id).poshytip({
        className: 'tip-blue',
        showOn: 'none',
        alignTo: 'target',
        alignX: 'inner-right',
        alignY: 'center',
        offsetX: 0,
        showTimeout: 100
    });
}
//span.error表单验证
function validate1() {
    var username = $("#username");
    username.blur(function () {
        name = username.val();//val()方法返回或设置被选元素的值。
        if (len(name) == 0) {
            $('#username').next("span").html('请输入用户名！');
        }
    }).keyup(function () {
        if (len(username.val()) > 0) {
            $('#username').next("span").html('');
        }
    });
    var password = $("#password");
    password.blur(function () {
        name = password.val();//val()方法返回或设置被选元素的值。
        if (len(name) == 0) {
            $('#password').next("span").html('请输入密码！');
        }
    }).keyup(function () {
        if (len(password.val()) > 0) {
            $('#password').next("span").html('');
        }
    });
}
//poshytip表单验证
function validate2() {
    var username = $("#username");
    username.blur(function () {
        name = username.val();//val()方法返回或设置被选元素的值。
        if (len(name) == 0) {
            username.poshytip("update", "请输入用户名！")
        } else if (len(name) < 2) {
            username.poshytip("update", "用户名太短了啊")
        } else {
            username.poshytip('hide');
            return false;
        }
        username.poshytip('show');
        username.poshytip('hideDelayed', 2000);
    }).focus(function () {
        username.poshytip('hide');
    });

    var password = $("#password");
    password.blur(function () {
        name = password.val();//val()方法返回或设置被选元素的值。
        if (len(name) == 0) {
            password.poshytip("update", "请输入密码！")
        } else if (len(name) < 6) {
            password.poshytip("update", "密码太短了啊")
        } else {
            password.poshytip('hide');
            return false;
        }
        password.poshytip('show');
        password.poshytip('hideDelayed', 2000);
    }).focus(function () {
        password.poshytip('hide');
    });
}
//异步判断验证码
function getLoginCode() {
    $("#captcha").on("blur keyup", function () {
        jQuery.ajax({
            type: "POST", contentType: "application/json",
            url: "/logincode.html?code=" + $("#captcha").val() + "&random=" + Math.random(),
            dataType: "json",
            success: function (data) {
                console.log(data.flag);
                if (data.flag) {
                    $("span[for=captcha]").empty().removeClass("glyphicon-remove captcha-failure").addClass("glyphicon-ok captcha-success");
                    $("button").removeAttr("disabled");
                } else {
                    $("span[for=captcha]").empty().removeClass("glyphicon-ok captcha-success").addClass("glyphicon-remove captcha-failure");
                    $("button").attr("disabled", "disabled");
                }
            }
        });
    });
}

