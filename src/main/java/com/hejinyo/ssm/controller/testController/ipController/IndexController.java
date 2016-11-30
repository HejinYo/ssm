package com.hejinyo.ssm.controller.testController.ipController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.hejinyo.ssm.common.PageParam;
import com.hejinyo.ssm.mapper.TableIpMapper;
import com.hejinyo.ssm.service.ITableIpService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {
    @Resource
    TableIpMapper dao;

    @Resource(name = "tableIpServiceImpl")
    ITableIpService service;

    @RequestMapping(value = "/ip")
    public String helloWorld(HttpServletRequest request) {
        String currPageStr = request.getParameter("page");
        int currPage = 1;
        try {
            currPage = Integer.parseInt(currPageStr);
        } catch (Exception e) {
        }

        // 获取总记录数
        int rowCount = service.getRowCount();
        PageParam pageParam = new PageParam();
        pageParam.setRowCount(rowCount);

        if (pageParam.getTotalPage() < currPage) {
            currPage = pageParam.getTotalPage();
        }
        pageParam.setCurrPage(currPage);
        pageParam = service.getIpListByPage(pageParam);
        request.setAttribute("pageParam", pageParam);
        return "page/index";
    }
}
