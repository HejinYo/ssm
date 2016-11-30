package com.hejinyo.ssm.common;

/**
 * 返回结果 工具类
 *
 * @author HejinYo
 * @version 1.0
 * @email hejinyo@gmail.com
 * @since 1.0
 */
public class ResReturn {
    private int flag;  //结果标识：0：失败  1：成功
    private String reason;  //失败时为失败原因，必须设置值；成功时为操作数据行数
    private int resflag; //扩展标识，0:无  1：数据已存在  2：数据无变化

    public ResReturn() {
        super();
        this.flag = 0;
        this.reason = "";
        this.resflag = 0;
    }

    public int getResflag() {
        return resflag;
    }

    public void setResflag(int resflag) {
        this.resflag = resflag;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

}
