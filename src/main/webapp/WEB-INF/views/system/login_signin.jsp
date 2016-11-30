<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!-- Template Name: Clip-Two - Responsive Admin Template build with Twitter Bootstrap 3.x | Author: ClipTheme -->
<!--[if IE 8]><html class="ie8" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="en">
	<!--<![endif]-->
	<!-- start: HEAD -->
	<!-- start: HEAD -->
	<head>
		<title>用户登录</title>
		<!-- start: META -->
		<!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta content="" name="description" />
		<meta content="" name="author" />
		<!-- end: META -->
		<!-- start: GOOGLE FONTS -->
		<link href="/sources/common/google-fonts.css" rel="stylesheet" type="text/css" />
		<!-- end: GOOGLE FONTS -->
		<!-- start: MAIN CSS -->
		<link rel="stylesheet" href="/sources/plug-in/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="/sources/plug-in/fontawesome/css/font-awesome.min.css">
		<!-- end: MAIN CSS -->
		<!-- start: CLIP-TWO CSS -->
        <link rel="stylesheet" href="/sources/css/system/styles.css">
        <link rel="stylesheet" href="/sources/css/system/login_signin.css">
        <!-- end: CLIP-TWO CSS -->
        <!--start: Tooltip classes -->
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-yellow/tip-yellow.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-blue/tip-blue.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-violet/tip-violet.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-darkgray/tip-darkgray.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-skyblue/tip-skyblue.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-yellowsimple/tip-yellowsimple.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-twitter/tip-twitter.css" type="text/css" />
        	<link rel="stylesheet" href="/sources/plug-in/poshytip/src/tip-green/tip-green.css" type="text/css" />
        <%--end: Tooltip classes--%>
	</head>
	<!-- end: HEAD -->
	<!-- start: BODY -->
	<body class="login">
		<!-- start: LOGIN -->
		<div class="row">
			<div class="main-login col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
				<div class="logo margin-top-30">
					<img src="/sources/images/system/logo.png" alt="HejinYo"/>
				</div>
                <div id="label"></div>
				<!-- start: LOGIN BOX -->
				<div class="box-login">
					<form class="form-login" action="index.html">
						<fieldset>
							<legend>登录到您的帐户</legend>
							<p>请输入您的用户名和密码登录</p>
                            <div id="tips"></div>
							<div class="form-group has-feedback">
								<span class="input-icon">
									<input id="username" type="text" class="form-control" name="username" placeholder="用户名" >
                                    <span for="username" class="error"></span>
                                    <i class="fa fa-user"></i>
                                </span>
							</div>
							<div class="form-group form-actions">
								<span class="input-icon">
									<input id="password" type="password" class="form-control" name="password" placeholder="密码">
                                    <span for="password" class="error"></span>
                                    <i class="fa fa-lock"></i>
                                </span>
							</div>
                            <div class="form-group form-actions has-feedback">
                                <span class="input-icon">
                                    <input id = "captcha" type="text" class="form-control" name="captcha" placeholder="验证码">
                                    <span for="captcha" class="glyphicon form-control-feedback"></span>
                                    <i class="fa fa-key"></i>
                                </span>
                            </div>
                            <%--验证码--%>
                            <a class="refresh" href="#" >
                                <img id="checkImg" src="captcha-image.html">
                                <span>看不清，换一张</span>
                            </a>
							<div class="form-actions">
								<div class="checkbox clip-check check-primary">
									<input type="checkbox" id="remember" value="1">
									<label for="remember">
                                        保持登录状态
									</label>
                                    <button disabled="disabled" type="submit" class="btn btn-primary pull-right">
                                        登录 <i class="fa fa-arrow-circle-right"></i>
                                    </button>
								</div>
							</div>
							<div class="new-account">
                                还没有帐户？
								<a href="login_registration.html">
                                    创建一个帐户
								</a>
                                <a style="display: block;float:right;margin-right:10px;" href="login_forgot.html">
                                     忘记密码
                                </a>
							</div>
						</fieldset>
					</form>
					<!-- start: COPYRIGHT -->
					<div class="copyright">
						&copy; <span class="current-year"></span><span class="text-bold text-uppercase"> HejinYo</span>. <span>All rights reserved</span>
					</div>
					<!-- end: COPYRIGHT -->
				</div>
				<!-- end: LOGIN BOX -->
			</div>
		</div>
		<!-- end: LOGIN -->
		<!-- start: MAIN JAVASCRIPTS -->
		<script src="/sources/common/jquery.min.js"></script>
		<script src="/sources/plug-in/bootstrap/js/bootstrap.min.js"></script>
		<!-- end: MAIN JAVASCRIPTS -->
		<!-- start: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
		<script src="/sources/plug-in/jquery-validation/jquery.validate.min.js"></script>
		<script src="/sources/plug-in/jquery-validation/localization/messages_zh.js"></script>
		<!-- end: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
		<!-- start: CLIP-TWO JAVASCRIPTS -->
		<!-- start: JavaScript Event Handlers for this page -->
		<%--<script src="/sources/js/system/login-old.js"></script>--%>
        <script type="text/javascript" src="/sources/plug-in/poshytip/src/jquery.poshytip.js"></script>
		<script src="/sources/js/system/login_signin.js"></script>
		<script>
			jQuery(document).ready(function() {
				//Main.init();
               // Login.init();
			});
		</script>
		<!-- end: JavaScript Event Handlers for this page -->
		<!-- end: CLIP-TWO JAVASCRIPTS -->
	</body>
	<!-- end: BODY -->
</html>
