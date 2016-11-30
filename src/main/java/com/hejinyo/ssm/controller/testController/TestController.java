package com.hejinyo.ssm.controller.testController;

import com.alibaba.fastjson.JSON;
import com.hejinyo.ssm.model.Account;
import com.hejinyo.ssm.service.impl.AccountServiceImpl;
import com.hejinyo.ssm.utils.JsonRetrun;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Account Controller
 */

@Controller
@RequestMapping(value = "/test")
public class TestController {
    @Resource
    private AccountServiceImpl accountsService;

    @Resource
    private Account account;

    @RequestMapping(value = "/getJson")
    @ResponseBody
    public Object getAllAccounts() {
        List<Account> list = accountsService.getAllAccounts(account);
        Map<String, Object> map = new HashMap<String, Object>();
        List<String> listData = new ArrayList<String>();

        JSONObject type = new JSONObject();
        JSONObject data = new JSONObject();
        JSONObject sets = new JSONObject();
        JSONObject sets1 = new JSONObject();
        JSONArray datasets = new JSONArray();
        JSONObject json = new JSONObject();
        JSONObject JSChart = new JSONObject();

        for (Account a : list) {
            String tmp = "{unit:'" + a.getAccount() + "',value:" + a.getBalance() + "}";
            listData.add(tmp);
        }

        JSONArray jsonArray = JSONArray.fromObject(listData);

        // sets.put("type","pie");
        sets.put("data", jsonArray);
        datasets.add(sets);


        json.put("datasets", datasets);
        JSChart.put("JSChart", json);
        map.put("json", listData);
        return jsonArray;
    }

    @RequestMapping(value = "/test")
    public String test() {
        return "/test";
    }

    @RequestMapping(value = "/getJson1")
    @ResponseBody
    public Map<String, Object> getJson1() {
        Map<String, Object> map1 = new HashMap<String, Object>();
        List<Account> list = accountsService.getAllAccounts(account);
        map1.put("status", 200);
        map1.put("data", "product");
        map1.put("message", "success!");
        map1.put("data", list);
        return map1;
    }

    @RequestMapping(value = "/getjson")
    @ResponseBody
    public Object getjson() {
        JSONObject data = new JSONObject();
        JSONObject data1 = new JSONObject();
        JSONArray json = new JSONArray();
        // String tmp[] = {"{'text':'已使用','value':30}","{'text':'未使用','value':70}"};
        // JSONArray jsonArray = JSONArray.fromObject(tmp);
        JSONObject data2 = new JSONObject();
        JSONObject data3 = new JSONObject();
        //data3.put("json",jsonArray);


        JSONObject type1 = new JSONObject();
        JSONObject type2 = new JSONObject();
        JSONObject jsondata = new JSONObject();
        type1.put("used", "30");
        type1.put("unused", "30");
        type2.put("used", "40");
        type2.put("unused", "60");

        data2.put("hejinyo", "hejinyo1");
        data2.put("data", type1);
        data3.put("hejinyo", "hejinyo2");
        data3.put("data", type2);

        jsondata.put("1", data2);
        jsondata.put("2", data3);
        System.out.print(jsondata.getJSONObject("1").getString("hejinyo"));
        data.put("text", "已使用");
        data.put("value", 30);
        data1.put("text", "未使用");
        data1.put("value", 70);

        json.add(data);
        json.add(data1);

        return jsondata;


    }

    @RequestMapping(value = "/getdate")
    @ResponseBody
    public Object getdate() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(new Date());

        List<String> listData = new ArrayList<String>();
        for (int i = 0; i < 10; i++) {
            rightNow.add(Calendar.DAY_OF_YEAR, -1);//日期加10天
            String date = sdf.format(rightNow.getTime());
            String tmp = "{test:'" + date + "',value:'" + i + "'}";
            listData.add(tmp);
        }
        JSONObject date = new JSONObject();
        date.put("ticket", listData);
        // JSONArray array = JSONArray.fromObject(json);
        return date;
    }

    @RequestMapping("/testJson")
    @ResponseBody
    public Map<String, Object> testJson() {
        JsonRetrun jsonRetrun = new JsonRetrun();
        Map<String, Object> jsonMap = new HashMap<String, Object>();
        Account account = new Account();
        account.setCustid("s0000001");
        account.setAccount("banace");
        List list = new ArrayList();
        list.add("wo");
        list.add("shi");
        list.add(123);
        jsonMap.put("name", "hss");
        jsonMap.put("number", 20122281);
        jsonMap.put("list", list);
        jsonMap.put("account", account);
        jsonRetrun.setData(jsonMap);
        jsonRetrun.setStatus(1);
        jsonRetrun.setMessage("登录成功");
        return jsonRetrun.result();
    }

    @RequestMapping("/testJson2")
    @ResponseBody
    public Object testJson2() {
        Map<String, String> map1 = new HashMap<String, String>();
        Map<String, String> map2 = new HashMap<String, String>();
        Map<String, String> map3 = new HashMap<String, String>();
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        map1.put("name", "小明");
        map1.put("age", "23");
        map1.put("sex", "男");
        list.add(map1);

        map2.put("name", "小王");
        map2.put("age", "24");
        map2.put("sex", "女");
        list.add(map2);

        map3.put("name", "小张");
        map3.put("age", "22");
        map3.put("sex", "男");
        list.add(map3);
        String jsonStr = JSONArray.fromObject(list).toString();
        System.out.println(jsonStr);
        JSONArray ja = JSONArray.fromObject(jsonStr);

        System.out.println(JSON.toJSONString(ja));
        Map<String, Object> jsonMap = new HashMap<String, Object>();
        int msg = 1;
        String status = "SUCCESS";

        jsonMap.put("msg", msg);
        jsonMap.put("status", status);
        jsonMap.put("data", map3);
        String s = JSON.toJSONString(jsonMap);
        System.out.println(s);

        return s;
    }
}
