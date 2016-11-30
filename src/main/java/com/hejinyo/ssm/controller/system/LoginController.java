package com.hejinyo.ssm.controller.system;

import com.hejinyo.ssm.utils.JsonRetrun;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequestMapping("/")
public class LoginController {

    /**
     * 用户登录页面login
     *
     * @return
     */
    @RequestMapping(value = "/to_login", method = RequestMethod.GET)
    public String to_login() {
        return "system/login";
    }

    /**
     * 执行登录
     *
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> login(HttpSession session, @RequestBody String json) {
        JsonRetrun jsonRetrun = new JsonRetrun();
        JSONObject jsonObject = JSONObject.fromObject(json);
        System.out.println("验证码：" + jsonObject.getString("captcha"));
        System.out.println("password：" + jsonObject.getString("password"));
        if ("admin".equals(jsonObject.getString("username"))) {
            jsonRetrun.setStatus(1);
            jsonRetrun.setMessage("登录成功！");
        } else {
            jsonRetrun.setStatus(0);
            jsonRetrun.setMessage("登录失败");
        }
        return jsonRetrun.result();
    }

    /**
     * 验证成功，返回主界面
     *
     * @param request
     * @param session
     * @return
     */
    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public ModelAndView loginPost(HttpServletRequest request, HttpSession session) {
        /*String sessionCode = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
                if (Tools.isNull(sessionCode).equals(code)) {
                    session.removeAttribute(Constants.KAPTCHA_SESSION_KEY);
                }*/
        ModelAndView mv = new ModelAndView();
        mv.setViewName("system/home");
        return mv;
    }
}
