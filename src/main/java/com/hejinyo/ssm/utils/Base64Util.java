package com.hejinyo.ssm.utils;

import sun.misc.BASE64Decoder;

public class Base64Util {
	public static String getBASE64(String s) {
		if (s == null)
			return null;
		return (new sun.misc.BASE64Encoder()).encode(s.getBytes());
	}

	// 将 BASE64 编码的字符串 s 进行解码
	public static String getFromBASE64(String s) {
		if (s == null)
			return null;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			byte[] b = decoder.decodeBuffer(s);
			return new String(b);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static void main(String args[]){
		String s = Base64Util.getBASE64("666");
		System.out.println(s);
		String ss = Base64Util.getFromBASE64("NjY2");
		System.out.println(ss);
		
	}
}
