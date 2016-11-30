<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<!--[if IE 8]><html class="ie8" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- start: HEAD -->
<head>
    <title>HejinYo - Responsive Admin Template</title>
    <!-- start: META -->
    <!--[if IE]>
    <meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1"/><![endif]-->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- end: META -->
    <!-- start: GOOGLE FONTS -->
    <link href="/sources/common/google-fonts.css" rel="stylesheet" type="text/css"/>
    <!-- end: GOOGLE FONTS -->
    <!-- start: MAIN CSS -->
    <link href="/sources/plug-in/bootstrap/css/bootstrap.css" rel="stylesheet"/>
    <link href="/sources/plug-in/fontawesome/css/font-awesome.css" rel="stylesheet"/>
    <link href="/sources/plug-in/themify-icons/themify-icons.min.css" rel="stylesheet">
    <link href="/sources/plug-in/animate.css/animate.min.css" rel="stylesheet" media="screen">
    <link href="/sources/plug-in/perfect-scrollbar/perfect-scrollbar.min.css" rel="stylesheet" media="screen">
    <link href="/sources/plug-in/switchery/switchery.min.css" rel="stylesheet" media="screen">
    <link href="/sources/plug-in/jquery-ui/jquery-ui.css" rel="stylesheet">
    <!-- end: MAIN CSS -->
    <!-- start: CLIP-TWO CSS -->
    <link rel="stylesheet" href="/sources/css/system/styles.css">
    <link rel="stylesheet" href="/sources/css/system/plugins.css">
    <link rel="stylesheet" href="/sources/css/system/themes/theme-1.css" id="skin_color"/>
    <!-- end: CLIP-TWO CSS -->
    <!-- start: CSS REQUIRED FOR THIS PAGE ONLY -->
    <link rel="stylesheet" href="/sources/css/system/main.css"/>
    <!-- end: CSS REQUIRED FOR THIS PAGE ONLY -->
</head>
<!-- end: HEAD -->
<body>

<div id="app">
    <!-- Start 左侧边栏 -->
    <div class="sidebar app-aside" id="sidebar">
        <div class="sidebar-container perfect-scrollbar">
            <nav>
                <!-- start: SEARCH FORM -->
                <div class="search-form">
                    <a class="s-open" href="#">
                        <i class="ti-search"></i>
                    </a>
                    <form class="navbar-form" role="search">
                        <a class="s-remove" href="#" target=".navbar-form">
                            <i class="ti-close"></i>
                        </a>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search...">
                            <button class="btn search-button" type="submit">
                                <i class="ti-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <!-- end: SEARCH FORM -->
                <!-- start: MAIN NAVIGATION MENU -->
                <div class="navbar-title">
                    <span>Main Navigation</span>
                </div>
                <ul class="main-navigation-menu">
                    <li class="active open">
                        <a onclick="add_Tab('to_login');">
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="ti-home"></i>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Dashboard </span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="ti-pencil-alt"></i>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Forms </span><i class="icon-arrow"></i>
                                </div>
                            </div>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="form_elements.html">
                                    <span class="title">Form Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href="form_text_editor.html">
                                    <span class="title">Text Editor</span>
                                </a>
                            </li>
                            <li>
                                <a href="form_wizard.html">
                                    <span class="title">Form Wizard</span>
                                </a>
                            </li>
                            <li>
                                <a href="form_validation.html">
                                    <span class="title">Form Validation</span>
                                </a>
                            </li>
                            <li>
                                <a href="form_image_cropping.html">
                                    <span class="title">Image Cropping</span>
                                </a>
                            </li>
                            <li>
                                <a href="form_multiple_upload.html">
                                    <span class="title">Multiple File Upload</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="ti-user"></i>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Login </span><i class="icon-arrow"></i>
                                </div>
                            </div>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="login_signin.html">
                                    <span class="title"> Login Form </span>
                                </a>
                            </li>
                            <li>
                                <a href="login_registration.html">
                                    <span class="title"> Registration Form </span>
                                </a>
                            </li>
                            <li>
                                <a href="login_forgot.html">
                                    <span class="title"> Forgot Password Form </span>
                                </a>
                            </li>
                            <li>
                                <a href="login_lockscreen.html">
                                    <span class="title">Lock Screen</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="maps.html">
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="ti-location-pin"></i>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Maps </span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="charts.html">
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="ti-pie-chart"></i>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Charts </span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- end: MAIN NAVIGATION MENU -->
                <!-- start: CORE FEATURES -->
                <div class="navbar-title">
                    <span>Core Features</span>
                </div>
                <ul class="folders">
                    <li>
                        <a href="pages_calendar.html">
                            <div class="item-content">
                                <div class="item-media">
                                    <span class="fa-stack"> <i class="fa fa-square fa-stack-2x"></i> <i class="fa fa-terminal fa-stack-1x fa-inverse"></i> </span>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Calendar </span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="pages_messages.html">
                            <div class="item-content">
                                <div class="item-media">
                                    <span class="fa-stack"> <i class="fa fa-square fa-stack-2x"></i> <i class="fa fa-folder-open-o fa-stack-1x fa-inverse"></i> </span>
                                </div>
                                <div class="item-inner">
                                    <span class="title"> Messages </span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- end: CORE FEATURES -->
                <!-- start: DOCUMENTATION BUTTON -->
                <div class="wrapper">
                    <a href="documentation.html" class="button-o">
                        <i class="ti-help"></i>
                        <span>Documentation</span>
                    </a>
                </div>
                <!-- end: DOCUMENTATION BUTTON -->
            </nav>
        </div>
    </div>
    <!-- end 左侧边栏 -->
    <!-- Start 页面 -->
    <div class="app-content">
        <!-- start: TOP NAVBAR -->
        <header class="navbar navbar-default navbar-static-top">
            <!-- start: NAVBAR HEADER -->
            <div class="navbar-header">
                <a href="#" class="sidebar-mobile-toggler pull-left hidden-md hidden-lg" class="btn btn-navbar sidebar-toggle" data-toggle-class="app-slide-off" data-toggle-target="#app"
                   data-toggle-click-outside="#sidebar">
                    <i class="ti-align-justify"></i>
                </a>
                <a class="navbar-brand" href="#">
                    <img src="/sources/images/system/logo.png" alt="Clip-Two"/>
                </a>
                <a href="#" class="sidebar-toggler pull-right visible-md visible-lg" data-toggle-class="app-sidebar-closed" data-toggle-target="#app">
                    <i class="ti-align-justify"></i>
                </a>
                <a class="pull-right menu-toggler visible-xs-block" id="menu-toggler" data-toggle="collapse" href=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="ti-view-grid"></i>
                </a>
            </div>
            <!-- end: NAVBAR HEADER -->
            <!-- start: NAVBAR COLLAPSE -->
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-right">
                    <!-- start: MESSAGES DROPDOWN -->
                    <li class="dropdown">
                        <a href class="dropdown-toggle" data-toggle="dropdown">
                            <span class="dot-badge partition-red"></span> <i class="ti-comment"></i> <span>MESSAGES</span>
                        </a>
                        <ul class="dropdown-menu dropdown-light dropdown-messages dropdown-large">
                            <li>
                                <span class="dropdown-header"> Unread messages</span>
                            </li>
                            <li>
                                <div class="drop-down-wrapper ps-container">
                                    <ul>
                                        <li class="unread">
                                            <a href="javascript:;" class="unread">
                                                <div class="clearfix">
                                                    <div class="thread-image">
                                                        <img src="/sources/plug-in/clip/assets/images/avatar-2.jpg" alt="">
                                                    </div>
                                                    <div class="thread-content">
                                                        <span class="author">Nicole Bell</span>
                                                        <span class="preview">Duis mollis, est non commodo luctus, nisi erat porttitor ligula...</span>
                                                        <span class="time"> Just Now</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" class="unread">
                                                <div class="clearfix">
                                                    <div class="thread-image">
                                                        <img src="/sources/plug-in/clip/assets/images/avatar-3.jpg" alt="">
                                                    </div>
                                                    <div class="thread-content">
                                                        <span class="author">Steven Thompson</span>
                                                        <span class="preview">Duis mollis, est non commodo luctus, nisi erat porttitor ligula...</span>
                                                        <span class="time">8 hrs</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <div class="clearfix">
                                                    <div class="thread-image">
                                                        <img src="/sources/plug-in/clip/assets/images/avatar-5.jpg" alt="">
                                                    </div>
                                                    <div class="thread-content">
                                                        <span class="author">Kenneth Ross</span>
                                                        <span class="preview">Duis mollis, est non commodo luctus, nisi erat porttitor ligula...</span>
                                                        <span class="time">14 hrs</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="view-all">
                                <a href="#">
                                    See All
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- end: MESSAGES DROPDOWN -->
                    <!-- start: ACTIVITIES DROPDOWN -->
                    <li class="dropdown">
                        <a href class="dropdown-toggle" data-toggle="dropdown">
                            <i class="ti-check-box"></i> <span>ACTIVITIES</span>
                        </a>
                        <ul class="dropdown-menu dropdown-light dropdown-messages dropdown-large">
                            <li>
                                <span class="dropdown-header"> You have new notifications</span>
                            </li>
                            <li>
                                <div class="drop-down-wrapper ps-container">
                                    <div class="list-group no-margin">
                                        <a class="media list-group-item" href="">
                                            <img class="img-circle" alt="..." src="/sources/plug-in/clip/assets/images/avatar-1.jpg">
                                            <span class="media-body block no-margin"> Use awesome animate.css <small class="block text-grey">10 minutes ago</small> </span>
                                        </a>
                                        <a class="media list-group-item" href="">
                                            <span class="media-body block no-margin"> 1.0 initial released <small class="block text-grey">1 hour ago</small> </span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="view-all">
                                <a href="#">
                                    See All
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- end: ACTIVITIES DROPDOWN -->
                    <!-- start: LANGUAGE SWITCHER -->
                    <li class="dropdown">
                        <a href class="dropdown-toggle" data-toggle="dropdown">
                            <i class="ti-world"></i> English
                        </a>
                        <ul role="menu" class="dropdown-menu dropdown-light fadeInUpShort">
                            <li>
                                <a href="#" class="menu-toggler">
                                    Deutsch
                                </a>
                            </li>
                            <li>
                                <a href="#" class="menu-toggler">
                                    English
                                </a>
                            </li>
                            <li>
                                <a href="#" class="menu-toggler">
                                    Italiano
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- start: LANGUAGE SWITCHER -->
                    <!-- start: USER OPTIONS DROPDOWN -->
                    <li class="dropdown current-user">
                        <a href class="dropdown-toggle" data-toggle="dropdown">
                            <img src="/sources/plug-in/clip/assets/images/avatar-1.jpg" alt="Peter"> <span class="username">Peter <i class="ti-angle-down"></i></i></span>
                        </a>
                        <ul class="dropdown-menu dropdown-dark">
                            <li>
                                <a href="pages_user_profile.html">
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a href="pages_calendar.html">
                                    My Calendar
                                </a>
                            </li>
                            <li>
                                <a hef="pages_messages.html">
                                    My Messages (3)
                                </a>
                            </li>
                            <li>
                                <a href="login_lockscreen.html">
                                    Lock Screen
                                </a>
                            </li>
                            <li>
                                <a href="login_signin.html">
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- end: USER OPTIONS DROPDOWN -->
                </ul>
                <!-- start: MENU TOGGLER FOR MOBILE DEVICES -->
                <div class="close-handle visible-xs-block menu-toggler" data-toggle="collapse" href=".navbar-collapse">
                    <div class="arrow-left"></div>
                    <div class="arrow-right"></div>
                </div>
                <!-- end: MENU TOGGLER FOR MOBILE DEVICES -->
            </div>
            <a class="dropdown-off-sidebar" data-toggle-class="app-offsidebar-open" data-toggle-target="#app" data-toggle-click-outside="#off-sidebar">
                &nbsp;
            </a>
            <!-- end: NAVBAR COLLAPSE -->
        </header>
        <!-- end: TOP NAVBAR -->
        <div class="main-content">
            <div id="iframe">
                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-0">默认页</a></li>
                    </ul>
                    <div id="tabs-0">
                        <iframe src="/sources/plug-in/poshytip/demo/demo.html" id="inner_frame_0"
                        width='100%' height="100%" name="inner-frame-0" border="0" frameBorder="no" scrolling="yes"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End 页面 -->
    <!-- start: OFF-右侧边栏 -->
    <div id="off-sidebar" class="sidebar">
        <div class="sidebar-wrapper">
            <ul class="nav nav-tabs nav-justified">
                <li class="active">
                    <a href="#off-users" aria-controls="off-users" role="tab" data-toggle="tab">
                        <i class="ti-comments"></i>
                    </a>
                </li>
                <li>
                    <a href="#off-favorites" aria-controls="off-favorites" role="tab" data-toggle="tab">
                        <i class="ti-heart"></i>
                    </a>
                </li>
                <li>
                    <a href="#off-settings" aria-controls="off-settings" role="tab" data-toggle="tab">
                        <i class="ti-settings"></i>
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="off-users">
                    <div id="users" toggleable active-class="chat-open">
                        <div class="users-list">
                            <div class="sidebar-content perfect-scrollbar">
                                <h5 class="sidebar-title">On-line</h5>
                                <ul class="media-list">
                                    <li class="media">
                                        <a data-toggle-class="chat-open" data-toggle-target="#users" href="#">
                                            <i class="fa fa-circle status-online"></i>
                                            <img alt="..." src="/sources/plug-in/clip/assets/images/avatar-5.jpg" class="media-object">
                                            <div class="media-body">
                                                <h4 class="media-heading">Kenneth Ross</h4>
                                                <span> Senior Designer </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <h5 class="sidebar-title">Off-line</h5>
                                <ul class="media-list">
                                    <li class="media">
                                        <a data-toggle-class="chat-open" data-toggle-target="#users" href="#">
                                            <img alt="..." src="/sources/plug-in/clip/assets/images/avatar-6.jpg" class="media-object">
                                            <div class="media-body">
                                                <h4 class="media-heading">Nicole Bell</h4>
                                                <span> Content Designer </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="media">
                                        <a data-toggle-class="chat-open" data-toggle-target="#users" href="#">
                                            <img alt="..." src="/sources/plug-in/clip/assets/images/avatar-10.jpg" class="media-object">
                                            <div class="media-body">
                                                <h4 class="media-heading">Ella Patterson</h4>
                                                <span> Web Editor </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="user-chat">
                            <div class="chat-content">
                                <div class="sidebar-content perfect-scrollbar">
                                    <a class="sidebar-back pull-left" href="#" data-toggle-class="chat-open" data-toggle-target="#users"><i class="ti-angle-left"></i> <span>Back</span></a>
                                    <ol class="discussion">
                                        <li class="messages-date">
                                            Sunday, Feb 9, 12:58
                                        </li>
                                        <li class="self">
                                            <div class="message">
                                                <div class="message-name">
                                                    Peter Clark
                                                </div>
                                                <div class="message-text">
                                                    Hi, Nicole
                                                </div>
                                                <div class="message-avatar">
                                                    <img src="/sources/plug-in/clip/assets/images/avatar-1.jpg" alt="">
                                                </div>
                                            </div>
                                            <div class="message">
                                                <div class="message-name">
                                                    Nicole Bell
                                                </div>
                                                <div class="message-text">
                                                    How are you?
                                                </div>
                                                <div class="message-avatar">
                                                    <img src="/sources/plug-in/clip/assets/images/avatar-1.jpg" alt="">
                                                </div>
                                            </div>
                                        </li>
                                        <li class="other">
                                            <div class="message">
                                                <div class="message-name">
                                                    Nicole Bell
                                                </div>
                                                <div class="message-text">
                                                    Hi, i am good
                                                </div>
                                                <div class="message-avatar">
                                                    <img src="/sources/plug-in/clip/assets/images/avatar-2.jpg" alt="">
                                                </div>
                                            </div>
                                        </li>
                                        <li class="self">
                                            <div class="message">
                                                <div class="message-name">
                                                    Peter Clark
                                                </div>
                                                <div class="message-text">
                                                    Glad to see you ;)
                                                </div>
                                                <div class="message-avatar">
                                                    <img src="/sources/plug-in/clip/assets/images/avatar-1.jpg" alt="">
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div class="message-bar">
                                <div class="message-inner">
                                    <a class="link icon-only" href="#"><i class="fa fa-camera"></i></a>
                                    <div class="message-area">
                                        <textarea placeholder="Message"></textarea>
                                    </div>
                                    <a class="link" href="#">
                                        Send
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="off-favorites">
                    <div class="users-list">
                        <div class="sidebar-content perfect-scrollbar">
                            <h5 class="sidebar-title">Favorites</h5>
                            <ul class="media-list">
                                <li class="media">
                                    <a href="#">
                                        <img alt="..." src="/sources/plug-in/clip/assets/images/avatar-7.jpg" class="media-object">
                                        <div class="media-body">
                                            <h4 class="media-heading">Nicole Bell</h4>
                                            <span> Content Designer </span>
                                        </div>
                                    </a>
                                </li>
                                <li class="media">
                                    <a href="#">
                                        <div class="user-label">
                                            <span class="label label-success">3</span>
                                        </div>
                                        <img alt="..." src="/sources/plug-in/clip/assets/images/avatar-6.jpg" class="media-object">
                                        <div class="media-body">
                                            <h4 class="media-heading">Steven Thompson</h4>
                                            <span> Visual Designer </span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="off-settings">
                    <div class="sidebar-content perfect-scrollbar">
                        <h5 class="sidebar-title">General Settings</h5>
                        <ul class="media-list">
                            <li class="media">
                                <div class="padding-10">
                                    <div class="display-table-cell">
                                        <input type="checkbox" class="js-switch" checked/>
                                    </div>
                                    <span class="display-table-cell vertical-align-middle padding-left-10">Enable Notifications</span>
                                </div>
                            </li>
                            <li class="media">
                                <div class="padding-10">
                                    <div class="display-table-cell">
                                        <input type="checkbox" class="js-switch"/>
                                    </div>
                                    <span class="display-table-cell vertical-align-middle padding-left-10">Show your E-mail</span>
                                </div>
                            </li>
                            <li class="media">
                                <div class="padding-10">
                                    <div class="display-table-cell">
                                        <input type="checkbox" class="js-switch" checked/>
                                    </div>
                                    <span class="display-table-cell vertical-align-middle padding-left-10">Show Offline Users</span>
                                </div>
                            </li>
                            <li class="media">
                                <div class="padding-10">
                                    <div class="display-table-cell">
                                        <input type="checkbox" class="js-switch" checked/>
                                    </div>
                                    <span class="display-table-cell vertical-align-middle padding-left-10">E-mail Alerts</span>
                                </div>
                            </li>
                            <li class="media">
                                <div class="padding-10">
                                    <div class="display-table-cell">
                                        <input type="checkbox" class="js-switch"/>
                                    </div>
                                    <span class="display-table-cell vertical-align-middle padding-left-10">SMS Alerts</span>
                                </div>
                            </li>
                        </ul>
                        <div class="save-options">
                            <button class="btn btn-success">
                                <i class="icon-settings"></i><span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end: OFF-右侧边栏 -->
    <!-- start: 设置 -->
    <div class="settings panel panel-default hidden-xs hidden-sm" id="settings">
        <button ct-toggle="toggle" data-toggle-class="active" data-toggle-target="#settings" class="btn btn-default">
            <i class="fa fa-spin fa-gear"></i>
        </button>
        <div class="panel-heading">
            主题设置
        </div>
        <div class="panel-body">
            <!-- start: FIXED HEADER -->
            <div class="setting-box clearfix">
                <span class="setting-title pull-left"> 固定头部</span>
                <span class="setting-switch pull-right">
					<input type="checkbox" class="js-switch" id="fixed-header"/>
				</span>
            </div>
            <!-- end: FIXED HEADER -->
            <!-- start: FIXED SIDEBAR -->
            <div class="setting-box clearfix">
                <span class="setting-title pull-left">固定侧边</span>
                <span class="setting-switch pull-right">
					<input type="checkbox" class="js-switch" id="fixed-sidebar"/>
				</span>
            </div>
            <!-- end: FIXED SIDEBAR -->
            <!-- start: CLOSED SIDEBAR -->
            <div class="setting-box clearfix">
                <span class="setting-title pull-left">关闭侧边</span>
                <span class="setting-switch pull-right">
					<input type="checkbox" class="js-switch" id="closed-sidebar"/>
				</span>
            </div>
            <!-- end: CLOSED SIDEBAR -->
            <!-- start: FIXED FOOTER -->
            <div class="setting-box clearfix">
                <span class="setting-title pull-left">固定页脚</span>
                <span class="setting-switch pull-right">
					<input type="checkbox" class="js-switch" id="fixed-footer"/>
				</span>
            </div>
            <!-- end: FIXED FOOTER -->
            <!-- start: THEME SWITCHER -->
            <div class="colors-row setting-box">
                <div class="color-theme theme-1">
                    <div class="color-layout">
                        <label>
                            <input type="radio" name="setting-theme" value="theme-1">
                            <span class="ti-check"></span>
                            <span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
                            <span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
                        </label>
                    </div>
                </div>
                <div class="color-theme theme-2">
                    <div class="color-layout">
                        <label>
                            <input type="radio" name="setting-theme" value="theme-2">
                            <span class="ti-check"></span>
                            <span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
                            <span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="colors-row setting-box">
                <div class="color-theme theme-3">
                    <div class="color-layout">
                        <label>
                            <input type="radio" name="setting-theme" value="theme-3">
                            <span class="ti-check"></span>
                            <span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
                            <span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
                        </label>
                    </div>
                </div>
                <div class="color-theme theme-4">
                    <div class="color-layout">
                        <label>
                            <input type="radio" name="setting-theme" value="theme-4">
                            <span class="ti-check"></span>
                            <span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
                            <span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="colors-row setting-box">
                <div class="color-theme theme-5">
                    <div class="color-layout">
                        <label>
                            <input type="radio" name="setting-theme" value="theme-5">
                            <span class="ti-check"></span>
                            <span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
                            <span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
                        </label>
                    </div>
                </div>
                <div class="color-theme theme-6">
                    <div class="color-layout">
                        <label>
                            <input type="radio" name="setting-theme" value="theme-6">
                            <span class="ti-check"></span>
                            <span class="split header"> <span class="color th-header"></span> <span class="color th-collapse"></span> </span>
                            <span class="split"> <span class="color th-sidebar"><i class="element"></i></span> <span class="color th-body"></span> </span>
                        </label>
                    </div>
                </div>
            </div>
            <!-- end: THEME SWITCHER -->
        </div>
    </div>
    <!-- end: 设置 -->
</div>
<input id="tabsCount" type="hidden" value="0">
<!-- start: MAIN JAVASCRIPTS -->
<script src="/sources/common/jquery.min.js"></script>
<script src="/sources/plug-in/bootstrap/js/bootstrap.min.js"></script>
<script src="/sources/plug-in/modernizr/modernizr.js"></script>
<script src="/sources/plug-in/jquery-cookie/jquery.cookie.js"></script>
<script src="/sources/plug-in/perfect-scrollbar/perfect-scrollbar.min.js"></script>
<script src="/sources/plug-in/switchery/switchery.min.js"></script>
<!-- end: MAIN JAVASCRIPTS -->
<!-- start: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
<script src="/sources/plug-in/jquery-ui/jquery-ui.js"></script>
<!-- end: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
<!-- start: CLIP-TWO JAVASCRIPTS -->
<script src="/sources/js/system/main_clip.js"></script>
<!-- start: JavaScript Event Handlers for this page -->
<script src="/sources/js/system/main.js"></script>
<script>
    jQuery(document).ready(function () {
        Main.init();
    });
</script>
<!-- end: JavaScript Event Handlers for this page -->
<!-- end: CLIP-TWO JAVASCRIPTS -->
</body>
</html>
