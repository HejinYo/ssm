package com.hejinyo.ssm.service;


import com.hejinyo.ssm.common.PageParam;

public interface ITableIpService {

	public int getRowCount();
	public PageParam getIpListByPage(PageParam pageParam);
	public String printIp(String number, String country, String isp);
}
