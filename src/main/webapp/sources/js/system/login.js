var codeStatus = false;
$(function () {
    //禁止回退
    //window.history.forward(1);
    //输入内容限制
    confineInput();
    //刷新验证码
    refreshCheckImg();
    //初始化提示信息
    var Poshytip = $("#owl-login");
    initPoshytip(Poshytip, 'center', 'top');
    //输入密码猫头鹰动画响应
    owlAction(Poshytip);
    //验证码验证
    validateCode();
    //buttom是否可用
    buttomUsable();
    //登录动作
    doLogin();
});

//输入内容限制
function confineInput() {
    $('input').keypress(function (e) {
        if (!String.fromCharCode(e.keyCode).match(/^\w+$/)) {
            return false;
        }
    });
}
//刷新验证码
function refreshCheckImg() {
    $(".refresh").click(function () {
        $('#captcha').val('').focus();//清空已经输入的验证码
        codeStatus = false;
        $('#captcha').next('span').removeClass("glyphicon-ok captcha-success glyphicon-remove captcha-failure");
        $('button').attr('disabled', 'disabled');
        $('#checkImg').attr('src', '/codeimg');
    });
}
//初始化提示信息
function initPoshytip(Poshytip, alignX, alignY) {
    Poshytip.poshytip({
        className: 'tip-blue',
        showOn: 'none',
        alignTo: 'target',
        alignX: alignX,
        alignY: alignY,
        offsetX: 0,
        showTimeout: 100
    });
}
//输入密码猫头鹰反映
function owlAction(Poshytip) {
    $('#login #password').focus(function () {
        Poshytip.addClass('password');
        Poshytip.poshytip('update', '我不看你密码！').poshytip('show');
    }).blur(function () {
        Poshytip.removeClass('password');
        Poshytip.poshytip('hide');
    });
}
//异步判断验证码
function validateCode() {
    $("#captcha").on("keyup", function () {
        var cap = $("#captcha").val();
        if (len(cap) == 4) {
            jQuery.ajax({
                type: "POST", contentType: "application/json",
                url: "/verifyCode?code=" + $("#captcha").val() + "&random=" + Math.random(),
                dataType: "json",
                success: function (data) {
                    //console.log(data.flag);//打印code返回结果
                    if (data.flag) {
                        $('#captcha').next('span').removeClass("glyphicon-remove captcha-failure").addClass("glyphicon-ok captcha-success");
                        codeStatus = true;
                        var use = $('#username').val();
                        var pwd = $('#password').val();
                        if (len(use) > 0 && len(pwd) > 0) {
                            $('button').removeAttr('disabled');
                        } else {
                            $('button').attr('disabled', 'disabled');
                        }
                    } else {
                        codeStatus = false;
                        $('#captcha').next('span').removeClass("glyphicon-ok captcha-success").addClass("glyphicon-remove captcha-failure");
                        $('button').attr('disabled', 'disabled');
                    }
                }
            });
        } else if (len(cap) == 0) {
            codeStatus = false;
            $('#captcha').next('span').removeClass("glyphicon-remove captcha-failure glyphicon-ok captcha-success");
            $('button').attr('disabled', 'disabled');
        } else {
            codeStatus = false;
            $('#captcha').next('span').removeClass("glyphicon-ok captcha-success").addClass("glyphicon-remove captcha-failure");
            $('button').attr('disabled', 'disabled');
        }
    });
}

//验证通过提交按钮可用
function buttomUsable() {
    $('#username,#password,#captcha').keyup(function () {
        var use = $('#username').val();
        var pwd = $('#password').val();
        if (len(use) > 0 && len(pwd) > 0) {
            if (codeStatus) {
                $('button').removeAttr('disabled');
            }
        } else {
            $('button').attr('disabled', 'disabled');
        }
    })
}

function doLogin() {
    $('.form-actions button').click(function () {
        var json = $.toJSON($("#form").serializeObject());
        jQuery.ajax({
            type: "POST", contentType: "application/json",
            url: "/login",
            dataType: "json",
            data:json,
            success: function (data) {
                if(data.status==1){
                    top.location.href = "/home";
                    alert(data.message);
                }else{
                    alert(data.message);
                }
            }
        });
    })
}