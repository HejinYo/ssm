/**
 * 主要用于处理加密和解密
 * 包含：SHA-1和3DES加密算法
 */
package com.hejinyo.ssm.utils;

import org.apache.log4j.Logger;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Security;

/**
 * @author lvkui
 * 加密算法
 * SHA-1
 */
public class Encrypt {
	final public String Key = "exdetexht2014030401jdaw09qwe#$^&ndiEDSE";
	static public Logger logj = Logger.getLogger(Encrypt.class.getName());
	
	public String Encrypt_SHA1(String srcData) throws NoSuchAlgorithmException
	{
		String sSHAData="";

		try
		{
			//指定加密码算法：SHA-1
			MessageDigest mdSHA = MessageDigest.getInstance("SHA-1");
			//将源加密字符串转换为字符数组
			byte[] srcBytes = srcData.getBytes();
			//加载加密源字符数组
			mdSHA.update(srcBytes);
			//采用SHA-1加密算法加密源字符串
			byte[] shaBytes = mdSHA.digest();
			//将加密后的字符数组转换为字符串
			sSHAData = new String(shaBytes);
			//将加密后的字符串转换为十六进制字答串
			sSHAData =str_hex(shaBytes);
			logj.debug("success of sha-1.");
		}
		catch(NoSuchAlgorithmException e)
		{
			logj.debug("error of sha-1.");
			e.printStackTrace();
		}
		return sSHAData;
	}

	/**
	 * @author lvkui
	 * 加密算法
	 * 3DES
	 */
	public String Encrypt_3DES(String key, String src) throws Exception
	{
		//KeyGenerator keygen=null;
		SecretKey deskey=null;
		Cipher c=null;
		int i;
		for(i=key.length(); i<24; i++)
		{
			key = key +"0";
		}	
		Security.addProvider(new com.sun.crypto.provider.SunJCE());
		//keygen = KeyGenerator.getInstance("DESede");
		//deskey = keygen.generateKey();
		deskey = new SecretKeySpec(key.getBytes(), "DESede");
		c = Cipher.getInstance("DESede");
		c.init(Cipher.ENCRYPT_MODE, deskey);
		byte[] bsrc = src.getBytes();
		byte[] benc = c.doFinal(bsrc);
		//System.out.println("3des:"+ new String(benc));
		String des = str_hex(benc);
		//System.out.println("hex 3des:"+des);
		return des;
	}
	
	/**
	 * @author lvkui
	 * 解密算法
	 * 3DES
	 */
	public String Decrypt_3DES(String key, String src) throws Exception
	{
		//KeyGenerator keygen=null;
		SecretKey deskey=null;
		Cipher c=null;
		int i;
		for(i=key.length(); i<24; i++)
		{
			key = key +"0";
		}
		byte[] baKeyword = new byte[src.length()/2]; 
		for( i = 0; i < baKeyword.length; i++) 
		{ 
			try 
			{ 
				baKeyword[i] = (byte)(0xff & Integer.parseInt(src.substring(i*2, i*2+2),16)); 
			} 
			catch(Exception e) 
			{ 
				e.printStackTrace(); 
			} 
		} 
		Security.addProvider(new com.sun.crypto.provider.SunJCE());
		//keygen = KeyGenerator.getInstance("DESede");
		//deskey = keygen.generateKey();
		deskey = new SecretKeySpec(key.getBytes(), "DESede");
		c = Cipher.getInstance("DESede");
		c.init(Cipher.DECRYPT_MODE, deskey);
		//byte[] bsrc = src.getBytes();
		byte[] benc = c.doFinal(baKeyword);
		String des = new String(benc);
		//System.out.println("text:"+des);
		return des;
	}
	
	private String str_hex(byte[] str)
	{
		StringBuilder output=null;
		output = new StringBuilder(64);      
		for (int i = 0; i < str.length; i++) {      
			String temp = Integer.toHexString(str[i] & 0xff);      
			if (temp.length() < 2) {      
				output.append("0");      
			}  
			output.append(temp);      
		}
		return  new String(output);
	}
	
	public String hex_str(String hex) 
	{ 
		//String s=null;
		byte[] baKeyword = new byte[hex.length()/2]; 
		for(int i = 0; i < baKeyword.length; i++) 
		{ 
			try 
			{ 
				baKeyword[i] = (byte)(0xff & Integer.parseInt(hex.substring(i*2, i*2+2),16)); 
			} 
			catch(Exception e) 
			{ 
				e.printStackTrace(); 
			} 
		} 

		return new String(baKeyword); 
	} 
}
