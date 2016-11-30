package com.hejinyo.ssm.utils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 字符串，字符，日期 工具类
 *
 * @author HejinYo
 * @version 1.0
 * @email hejinyo@gmail.com
 * @since 1.0
 */
public class Tools {
    /**
     * 检测字符串是否不为空(null,"","null")
     *
     * @param s
     * @return 不为空则返回true，否则返回false
     */
    public static boolean notEmpty(String s) {
        return s != null && !"".equals(s) && !"null".equals(s);
    }

    /**
     * 检测字符串是否为空(null,"","null")
     *
     * @param s
     * @return 为空则返回true，不否则返回false
     */
    public static boolean isEmpty(String s) {
        return s == null || "".equals(s) || "null".equals(s);
    }

    /**
     * 如果为null则返回空
     *
     * @param s
     * @return
     */
    public static String isNull(String s) {
        return (s == null || "null".equals(s)) ? "" : s;
    }

    /**
     * 字符串转换为字符串数组
     *
     * @param str        字符串
     * @param splitRegex 分隔符
     * @return
     */
    public static String[] str2StrArray(String str, String splitRegex) {
        if (isEmpty(str)) {
            return null;
        }
        return str.split(splitRegex);
    }

    /**
     * 用默认的分隔符(,)将字符串转换为字符串数组
     *
     * @param str 字符串
     * @return
     */
    public static String[] str2StrArray(String str) {
        return str2StrArray(str, ",\\s*");
    }

    /**
     * 按照yyyy-MM-dd HH:mm:ss的格式，字符串转日期
     *
     * @param date
     * @return
     */
    public static Date strToDate(String date) {
        if (notEmpty(date)) {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                if (date.length() == 10) {
                    date = date + " 00:00:00";
                }
                return format.parse(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return new Date();
        } else {
            return null;
        }
    }

    /**
     * 某一个日期加一个类型的时间后获取的时间日期
     *
     * @param times
     * @param datenum
     * @param datetype
     * @return
     */
    public static Date getAddDate(String times, String datenum, String datetype) {
        Date date = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            date = sdf.parse(times);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        Calendar cH_AddTime = Calendar.getInstance();
        cH_AddTime.setTime(date);
        if ("day".equals(datetype)) {
            cH_AddTime.add(Calendar.DAY_OF_MONTH, Integer.parseInt(datenum));
        } else if ("month".equals(datetype)) {
            cH_AddTime.add(Calendar.MONTH, Integer.parseInt(datenum));
        } else {
            cH_AddTime.add(Calendar.HOUR_OF_DAY, Integer.parseInt(datenum));
        }
        return cH_AddTime.getTime();
    }

    /**
     * 按照yyyy-MM-dd HH:mm:ss的格式，字符串转日期
     *
     * @param date
     * @return
     */
    public static Date strToDateDay(String date) {
        if (notEmpty(date)) {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            try {
                return format.parse(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return new Date();
        } else {
            return null;
        }
    }

    /**
     * 按照参数format的格式，日期转字符串
     *
     * @param date
     * @param format
     * @return
     */
    public static String dateToStr(Date date, String format) {
        if (date != null) {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            return sdf.format(date);
        } else {
            return "";
        }
    }

    /**
     * 按照yyyy-MM-dd HH:mm:ss的格式，日期转字符串
     *
     * @return yyyy-MM-dd HH:mm:ss
     */
    public static String getDate() {
        return dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 按照yyyy-MM-dd的格式，日期转字符串
     *
     * @return yyyy-MM-dd
     */
    public static String getDay() {
        return dateToStr(new Date(), "yyyy-MM-dd");
    }

    /**
     * 按照yyyyMMdd的格式，日期转字符串
     *
     * @return yyyyMMdd
     */
    public static String getDayLine() {
        return dateToStr(new Date(), "yyyyMMdd");
    }

    /**
     * 按照yyyyMMddhhmmss的格式，日期转字符串
     *
     * @return yyyyMMddhhmmss
     */
    public static String getMsec() {
        return dateToStr(new Date(), "yyyyMMddhhmmss");
    }

    /**
     * 获取有效时间范围内的时间
     *
     * @param date
     * @return
     */
    public static List<String> getRangeMonth(int range) {
        List<String> dateList = new ArrayList<String>();
        if (range > 0) {
            range++;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
            for (int i = 1; i < range; i++) {
                Calendar rightNow = Calendar.getInstance();
                //rightNow.add(Calendar.YEAR,-1);//日期减1年
                rightNow.add(Calendar.MONTH, -i);//日期加3个月
                //rightNow.add(Calendar.DAY_OF_YEAR,1);//日期加10天
                Date cMonth = rightNow.getTime();
                String reStr = sdf.format(cMonth);
                dateList.add(reStr);
            }
        }
        return dateList;
    }

    /**
     * 返回jsonarray格式的字符串
     *
     * @param arrayStr
     * @return
     */
    public static String getArrayStr(String arrayStr) {
        if (notEmpty(arrayStr)) {
            if (arrayStr.indexOf("[") == -1) {
                arrayStr = "[\"" + arrayStr + "\"]";
            }
        }
        return arrayStr;
    }

    /**
     * 生成有效范围内的随机数
     *
     * @param start 起始值
     * @param end   结束值
     * @return
     */
    public static int extRandom(int start, int end) {
        return Integer.parseInt(new java.text.DecimalFormat("0").format(Math.floor(Math.random() * (end - start) + start)));
    }

    /**
     * 整数补零
     * 0 代表前面补充0
     * len 代表长度
     * d 代表参数为正数型
     *
     * @param len
     * @param val
     * @return
     */
    public static String zeroFill(String len, int val) {
        return String.format("%0" + len + "d", val);
    }

    /**
     * 浮点数补0
     *
     * @param len
     * @param val
     * @return
     */
    public static String zeroFill_double(String len, String val) {
        boolean flag = false;
        //是否为负数
        if (val.indexOf("-") != -1) {
            flag = true;
            val = val.substring(1);
        }
        String cval = "0";
        String mval = "0";
        if (val.lastIndexOf(".") != -1) {
            cval = val.substring(0, val.lastIndexOf("."));
            mval = val.substring(val.lastIndexOf("."));
        } else {
            cval = val;
            mval = ".00";
        }
        if (mval.length() == 2) {
            mval = mval + "0";
        }
        //整数部分补0
        int dval = Integer.parseInt(cval);
        String rval = String.format("%0" + len + "d", dval);
        int cLen = 3;
        //固定前缀
        String fixed = "";
        if (flag) {
            cLen = 4;
            fixed = "-";
        }
        return fixed + rval.substring(cLen) + mval;
    }

    /**
     * 填充空白
     *
     * @param str
     * @param strLength
     * @return
     */
    public static String blankSpaceFill(String str, int strLength) {
        int strLen = str.length();
        if (strLen < strLength) {
            while (strLen < strLength) {
                StringBuffer sb = new StringBuffer();
                // sb.append("0").append(str);// 左补0
                sb.append(str).append(" ");// 右补空格
                str = sb.toString();
                strLen = str.length();
            }
        }
        return str;
    }

    /**
     * 格式化系统后台输出日志
     *
     * @param log
     */
    public static String extLog(String log) {
        return "ext_log - " + log;
    }

    /**
     * 生成有效范围内的随机数，格式为大小写字母和数字的组合
     *
     * @param start 起始值
     * @param end   结束值
     * @return
     */
    public static String extRandomStr(int start, int end) {
        String rStr = "";
        int rCount = extRandom(start, end + 1);
        for (int i = 0; i < rCount; i++) {
            rStr += randomChar();
        }
        return rStr;
    }

    private static char randomChar() {
        Random r = new Random();
        String s = "AaBbCcDdEeFfGgHhIiJjKkLMmNnPpRrSsTtUuVvWwXxYyZz0123456789";
        return s.charAt(r.nextInt(s.length()));
    }

    /**
     * 计算两个日期相隔的小时数
     *
     * @param beginDate 开始日期
     * @param endDate   结束日期
     * @return
     */
    public static int timeoutHour(String beginDate, String endDate) {
        Date dFirstDate = strToDate(beginDate);
        Date dSecondDate = strToDate(endDate);
        int hour = (int) ((dSecondDate.getTime() - dFirstDate.getTime()) / (60 * 60 * 1000));//取得小时数
        //DecimalFormat df = new DecimalFormat("0.0");//格式化小数，不足的补0
        //String dHour = df.format(hour/60);//返回的是String类型的
        return hour;
    }

    /**
     * 计算两个日期相隔的分钟数
     *
     * @param beginDate 开始日期
     * @param endDate   结束日期
     * @return
     */
    public static int timeoutMin(String beginDate, String endDate) {
        Date dFirstDate = strToDate(beginDate);
        Date dSecondDate = strToDate(endDate);
        int min = (int) ((dSecondDate.getTime() - dFirstDate.getTime()) / (60 * 1000));//取得小时数
        //DecimalFormat df = new DecimalFormat("0.0");//格式化小数，不足的补0
        //String dHour = df.format(hour/60);//返回的是String类型的
        return min;
    }

    /**
     * 判断是否为周末
     *
     * @param sDate 字符串日期
     * @return
     */
    public static boolean isWeekend(String sDate) {
        boolean flag = false;
        if (notEmpty(sDate)) {
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date bdate;
            try {
                bdate = format.parse(sDate);
                Calendar cal = Calendar.getInstance();
                cal.setTime(bdate);
                if (cal.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY
                        || cal.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
                    flag = true;
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return flag;
    }

    /**
     * 生成随机大写英文字母
     *
     * @return
     */
    public static char randomLetter() {
        int i = (int) (Math.random() * 26 + 65);
        char c = (char) i;
        return c;
    }

    /**
     * 增加若干天，返回字符串时间
     *
     * @param day
     * @return
     */
    public static String dateAddDay(int day) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, day);
        String thisDate = sf.format(c.getTime());
        return thisDate;
    }

    /**
     * 去除数组中重复的记录
     *
     * @param a
     * @return
     */
    public static String[] array_unique(String[] a) {
        // array_unique
        List<String> list = new LinkedList<String>();
        for (int i = 0; i < a.length; i++) {
            if (!list.contains(a[i])) {
                list.add(a[i]);
            }
        }
        return (String[]) list.toArray(new String[list.size()]);
    }

    /**
     * @param request 请求对象
     * @return
     * @Description java获取客户端访问的真实IP地址
     */
    public static String getIPAddress(HttpServletRequest request) {
        //获取X-Forwarded-For
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            //获取Proxy-Client-IP
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            //WL-Proxy-Client-IP
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            //获取的IP实际上是代理服务器的地址，并不是客户端的IP地址
            ip = request.getRemoteAddr();
        }
        /*
         * 如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值
    	 * X-Forwarded-For：192.168.1.110, 192.168.1.120, 192.168.1.130, 192.168.1.100
    	 * 用户真实IP为： 192.168.1.110
    	 */
        if (ip.contains(",")) {
            ip = ip.split(",")[0];
        }
        return ip;
    }

    /**
     * 将List对象转换成字符串
     *
     * @param list
     * @param separator
     * @return
     */
    public static String listToString(List<String> list, char separator) {
        return org.apache.commons.lang.StringUtils.join(list.toArray(), separator);
    }

    /**
     * 删除文件夹中日期昨天的文件
     *
     * @param fileFolder
     */
    public static void oldFilesDelete(String fileFolder) {
        File fileport = new File(fileFolder);
        File[] filelist = fileport.listFiles();
        if (null != filelist && filelist.length > 0) {
            Date nowdate = new Date();
            SimpleDateFormat formatter_date = new SimpleDateFormat("yyyyMMdd");
            String n = formatter_date.format(nowdate);
            int filelistLength = filelist.length;
            for (int i = 0; i < filelistLength; i++) {
                String fileName = filelist[i].getName();
                if (fileName.length() > 8) {
                    fileName = fileName.substring(0, 8);
                    //获取今天之前的文件信息
                    int flag = fileName.compareTo(n);
                    if (flag < 0) {
                        //删除当天之前的导出文件信息
                        filelist[i].delete();
                    }
                }
            }
        }
    }

    public static void main(String agrs[]) {


    }
}
