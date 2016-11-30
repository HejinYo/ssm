package com.hejinyo.ssm.utils;

import java.io.*;

/**
 * @类功能说明：数据库密码加密
 */
public class EncryptDb {
    //数据库密码加密
    public static String encryptDbPassword(String path,String password) throws IOException, InterruptedException{
    	String encrypPassword = null;
    	//类获取系统路径
    	//String path = EncryptDb.class.getClass().getResource("/").getPath();
    	//path = path.substring(1,path.indexOf("classes"));
    	//System.getProperties().getProperty("file.separator")
    	//获取系统分隔符
    	String sep = System.getProperties().getProperty("file.separator");
    	//执行文件存放到WEB-INF下
    	path = path + "WEB-INF" + sep;
    	//拼接文件信息，对数据库密码进行加密
    	String fileInfo = "java -cp " + path + "lib" + sep +"druid-0.2.26.jar com.alibaba.druid.filter.config.ConfigTools " 
    			+ password + " ;exit;";
    	EncryptDb ed = new EncryptDb();
    	String execFile = path + "encrypt"+ed.getSuffix();
    	//创建文件和写入内容
    	ed.writeFile(execFile,fileInfo);
    	//执行文件，获取返回内容
		Process proc = Runtime.getRuntime().exec(execFile);
		BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
		String readInfo = in.readLine();
		while (readInfo != null) {
			if(null != readInfo && readInfo.indexOf("==") != -1){
				encrypPassword = readInfo;
				break;
			}
			readInfo = in.readLine();
		}
		in.close();
		
		System.out.println("Encrypt file: "+execFile);
		System.out.println("Encrypt file info: "+fileInfo);
		System.out.println("Encrypt password: "+encrypPassword);
		return encrypPassword;
    }
    
    //写入执行加密命令
    private void writeFile(String filePath,String fileInfo){
        RandomAccessFile raf = null;
        File filename = new File(filePath);
        try {
        	raf = new RandomAccessFile(filename, "rw");
        	raf.writeBytes(fileInfo);
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            if (raf != null) {
                try {
                	raf.close();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
        }
    }
    
    //获取文件可执行文件后缀
    private String getSuffix(){
    	String suffix = null;
    	String osname = System.getProperties().getProperty("os.name");
    	suffix = osname.toLowerCase().indexOf("windows") != -1 ? ".bat" : ".sh";
    	return suffix;
    }
    
    public static void main(String[] args) throws IOException, InterruptedException {
    	//EncryptDb.encryptDbPassword("chenliang");
    	//System.out.println(EncryptDb.class.getClass().getResource("/").getPath());
    }
}
