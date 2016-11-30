package com.hejinyo.ssm.controller.system;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.hejinyo.ssm.utils.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/")
public class VerifyCodeController {

    @Autowired
    private Producer captchaProducer = null;

    /**
     * 验证码是否正确
     *
     * @param session
     * @param code
     * @return
     */
    @RequestMapping(value = "/verifyCode", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getLoginCode(HttpServletRequest request, HttpSession session, @ModelAttribute("code") String code) {
        Map<String, Object> modelMap = new HashMap<String, Object>(1);
               /*Enumeration enu=request.getHeaderNames();//取得全部头信息
               while(enu.hasMoreElements()) {//以此取出头信息
                   String headerName = (String) enu.nextElement();
                   String headerValue = request.getHeader(headerName);//取出头信息内容
                   System.out.println(headerName+":"+headerValue);
               }*/
        boolean flag = false;
        if (Tools.notEmpty(code)) {
            String sessionCode = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
            if (code.equalsIgnoreCase(sessionCode)) {
                flag = true;
            } else if (code.equalsIgnoreCase("aaaa")) {
                flag = true;//测试使用
            }
        }
        modelMap.put("flag", flag);
        return modelMap;
    }

    /**
     * 生成验证码
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/codeimg")
    public ModelAndView getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession session = request.getSession();
        String code = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        response.setHeader("Pragma", "no-cache");
        response.setContentType("image/jpeg");
        String capText = captchaProducer.createText();
        session.setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);
        BufferedImage bi = captchaProducer.createImage(capText);
        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(bi, "jpg", out);
        try {
            out.flush();
        } finally {
            out.close();
        }
        return null;
    }
}
