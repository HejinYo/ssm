package com.hejinyo.ssm.mapper;

import java.util.List;
import java.util.Map;

import com.hejinyo.ssm.model.TableIp;
import org.springframework.stereotype.Repository;


@Repository
public interface TableIpMapper {

	public int getRowCount();

	public List<TableIp> selectByParams(Map<String, Object> params);

	public List<TableIp> fetchByParams(Map<String, Object> params);

}
