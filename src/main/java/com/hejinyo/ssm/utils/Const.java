package com.hejinyo.ssm.utils;

import org.springframework.context.ApplicationContext;

public class Const {
	public static final String SESSION_LANGUAGE = "language";//当前系统语言
	public static final String SESSION_SECURITY_CODE = "sessionSecCode";//验证码
	public static final String IS_LOGIN = "islogin";//当前系统语言
	public static final String SESSION_USER = "sessionUser";//当前登陆工号详细信息
	public static final String SESSION_USER_STAFFID = "sessionUserStaffId";//当前登陆工号信息
	public static final String SESSION_USER_RIGHTS = "sessionUserRights";//当前登陆工号用户权限
	public static final String SESSION_ROLE_RIGHTS = "sessionRoleRights";//当前登陆工号角色权限
	public static final String NO_INTERCEPTOR_PATH = ".*/((login)|(logout)(logincode)(loginCheckIp)|(code)).*";	//不对匹配该值的访问路径拦截（正则）
	public static ApplicationContext WEB_APP_CONTEXT = null; //该值会在web容器启动时由WebAppContextListener初始化
	//public static final String I18N_PREFIX = "i18n/ext";//指定国际化资源文件前缀
	public static final String EXT_CONFIG = "config/ext-config.properties";//指定读取配置文件
	
}