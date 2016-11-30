<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%--start clip--%>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <%--end clip--%>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="description" content="此代码内容为超萌的猫头鹰登录界面"/>
    <link rel="icon" href="/sources/images/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="/sources/images/favicon.ico" type="image/x-icon"/>
    <title>用户登录</title>
    <!--start: Tooltip classes -->
    <link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-blue/tip-blue.css" type="text/css"/>
    <%--end: Tooltip classes--%>
    <link rel="stylesheet" href="/sources/plug-in/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" href="/sources/plug-in/fontawesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="/sources/css/system/loginnew.css"/>
</head>
<body>
<!-- begin -->
<div id="login">
    <div class="wrapper">
        <div class="login">
            <form id="form" action="" method="post" class="container offset1 loginform">
                <div id="owl-login">
                    <div id="hand" class="hand"></div>
                    <div class="hand hand-r"></div>
                    <div class="arms">
                        <div class="arm"></div>
                        <div class="arm arm-r"></div>
                    </div>
                </div>
                <div class="pad">
                    <div class="control-group">
                        <div class="controls">
                            <i for="username" class="control-label fa fa-user"></i>
                            <input id="username" maxlength="16" type="text" name="username" placeholder="用户名" autofocus="autofocus" class="form-control input-medium">
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <i for="password" class="control-label fa fa-lock"></i>
                            <input id="password" maxlength="16" type="password" name="password" placeholder="密码" class="form-control input-medium">
                            <a class="forgot" href="login_forgot.html">
                                忘记密码
                            </a>
                        </div>
                    </div>
                    <div style="position: relative">
                        <div class="control-group">
                            <div class="controls" style="margin-right: 130px;">
                                <i for="captcha" class="control-label fa fa-key"></i>
                                <input id="captcha" maxlength="4" type="text" name="captcha" placeholder="验证码" class="form-control input-medium">
                                <span for="captcha" class="glyphicon form-control-feedback"></span>
                            </div>
                        </div>
                        <a class="refresh" href="#" title="点击刷新">
                            <img id="checkImg" src="/codeimg">
                        </a>
                    </div>
                    <div>
                        <div class="checkbox clip-check check-primary">
                            <input type="checkbox" id="remember1" value="1">
                            <label for="remember1">
                                保持登录状态
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <a href="#" class="btn pull-left btn-left btn-link text-muted">还没有账户? 注册</a>
                    <button type="button" disabled="disabled" class="btn btn-primary">登录</button>
                </div>
            </form>
        </div>
    </div>
    <script src="/sources/common/jquery.min.js"></script>
    <script src="/sources/common/jquery.json.min.js"></script>
    <script src="/sources/common/jquery-utils.js"></script>
    <script src="/sources/plug-in/poshytip/src/jquery.poshytip.js"></script>
    <script src="/sources/js/system/login.js"></script>
</div>
<!-- end -->
</body>
</html>