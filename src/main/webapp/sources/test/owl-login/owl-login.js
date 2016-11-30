$(function () {
    var tooltips = $("#owl-login").tooltip();

    $('#login #password').focus(function () {
        $('#owl-login').addClass('password');
    }).blur(function () {
        $('#owl-login').removeClass('password');
    });

    $("#signupForm").validate({
        errorElement : "span",
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: {
                required: "请输入用户名",
                minlength: "格式错误"
            },
            password: {
                required: "请输入密码",
                minlength: "长度小于5"
            }
        }
    });
});