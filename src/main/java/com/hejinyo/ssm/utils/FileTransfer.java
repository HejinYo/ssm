package com.hejinyo.ssm.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class FileTransfer {
    private static final Log LOG = LogFactory.getLog(FileTransfer.class);
    /**
     * 传输文件 
     * @param fileName
     * @param prefix
     * @param response
     */
    public static void transferFile(String fileName,String prefix,HttpServletResponse response ) {
        LOG.debug("transfer start filename:" + fileName);
        ByteArrayOutputStream os = FileUtil.getOutStreamByte(fileName,1024 * 32);
        ByteArrayInputStream inStream = null;
        try {
            inStream = new ByteArrayInputStream(os.toByteArray());
            LOG.debug("get instream size :"+inStream.available());
            if (os != null && os.size() > 0) {
                long filelength = os.size();
                // 设置输出的格式
                response.reset();
                response.setContentType("application/x-msdownload");
                response.setContentLength((int) filelength);
                response.setContentType("text/html;charset=UTF-8");
                response.addHeader(
                        "Content-Disposition",
                        "attachment; filename=\""
                                + new String(prefix.getBytes("GBK"),
                                        "ISO8859_1") + ".xls\"");
                LOG.debug("init format ok!");
                // 循环取出流中的数据
                byte[] b = new byte[4];
                int len;
//              os.flush();
                ServletOutputStream out =  response.getOutputStream();
                while ((len = inStream.read(b)) != -1){
//                  LOG.debug("write byte: "+Arrays.toString(b));
                    out.write(b, 0, len);
//                  response.getWriter().write(b.toString().toCharArray(), 0, len);
                }
                out.flush();
                out.close();
                LOG.debug("out close ok");
                response.flushBuffer();
                LOG.debug("response finished");
            }
 
        } catch (FileNotFoundException e) {
            LOG.error("要发送的文件不存在");
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            LOG.error("编码格式不支持");
            e.printStackTrace();
        } catch (IOException e) {
            LOG.debug("文件流异常");
            e.printStackTrace();
        }finally{
            if(null != inStream){
                try {
                    inStream.close();
                    LOG.debug("inStream close ok");
                } catch (IOException e) {
                    LOG.error("文件关闭异常");
                    e.printStackTrace();
                }
            }
         
        }
 
    }
}
