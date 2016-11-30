package com.hejinyo.ssm.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * 返回JSON结果 工具类
 *
 * @author HejinYo
 * @version 1.0
 * @email hejinyo@gmail.com
 * @since 1.0
 */
public class JsonRetrun {
    private int status;  //结果标识：0：失败  1：成功
    private String message;  //结果信息：失败时为失败原因，必须设置值；成功时为操作数据行数
    private Object data; //扩展内容：可以发送map、list等其他所有的对象

    /**
     * 返回Map类型结果
     * @return Map<String, Object>
     */
    public Map<String, Object> result() {
        Map<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("data", getData());
        jsonMap.put("status", getStatus());
        jsonMap.put("message", getMessage());
        return jsonMap;
    }

    private int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    private String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
