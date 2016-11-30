package com.hejinyo.ssm.utils;

import jxl.Workbook;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.read.biff.BiffException;
import jxl.write.*;
import jxl.write.biff.RowsExceededException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

public class JXLUtil {
    private static final Log LOG = LogFactory.getLog(JXLUtil.class);
    public static WritableFont arial14font = null;
 
    public static WritableCellFormat arial14format = null;
    public static WritableFont arial10font = null;
    public static WritableCellFormat arial10format = null;
    public static WritableFont arial12font = null;
    public static WritableCellFormat arial12format = null;
 
    public final static String UTF8_ENCODING = "UTF-8";
    public final static String GBK_ENCODING = "GBK";
 
    //public static int index = 1;// 写入序号
    //public static int row = 2;// 具体字段写入从第二行开始
 
    /**
     * 格式定义
     */
    public static void format() {
        try {
        	//设置表头格式
        	/**
            arial14font = new WritableFont(WritableFont.ARIAL, 14,
                    WritableFont.NO_BOLD );
            //arial14font.setColour(jxl.format.Colour.LIGHT_BLUE);
            arial14format = new WritableCellFormat(arial14font);
            //arial14format.setAlignment(jxl.format.Alignment.CENTRE);
            arial14format.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.THIN);
            //arial14format.setBackground(jxl.format.Colour.VERY_LIGHT_YELLOW);
            */
            arial10font = new WritableFont(WritableFont.ARIAL, 12,
                    WritableFont.NO_BOLD);
            //默认是文本形式显示
            arial10format = new WritableCellFormat(arial10font);
            arial10format.setAlignment(jxl.format.Alignment.CENTRE);
            arial10format.setBorder(Border.ALL, BorderLineStyle.THIN);
            //arial10format.setBackground(jxl.format.Colour.LIGHT_BLUE);
            
            arial12font = new WritableFont(WritableFont.ARIAL, 12);
            arial12format = new WritableCellFormat(arial12font);
            arial12format.setBorder(Border.ALL, BorderLineStyle.THIN);
            
        } catch (WriteException e) {
            LOG.debug("格式设置错误");
            e.printStackTrace();
        }
    }
    
    /**
     * 初始化表格信息
     * @param fileName		文件名称
     * @param colName		需要显示的列名称
     * @param widthArr		每列的宽度
     */
    public static void initExcel(String fileName, String[] colName,String[] widthArr) {
    	//JXLUtil.index = 0;// 设置为初始值。不然static的index会一直递增
        //JXLUtil.row = 1;
        //int index = 0;
        //int row = 1;
        format();// 先设置整体单元格格式
        WritableWorkbook workbook = null;
        try {
            // WorkbookSettings setEncode = new WorkbookSettings(); // 设置读文件编码
            // setEncode.setEncoding(UTF8_ENCODING);
            File file = new File(fileName);
            workbook = Workbook.createWorkbook(file);
            LOG.debug("工作环境创建成功");
            WritableSheet sheet = workbook.createSheet("Sheet 1", 0);// 建立sheet
            int row = 0;
            int col = 0;
            int cLen = colName.length;
            for (col = 0; col < cLen; col++) {
            	//arial10format = new WritableCellFormat(arial10font, NumberFormats.TEXT);
            	int cWidth = Integer.parseInt(widthArr[col]);
                sheet.setColumnView(col, cWidth);// 设置col 宽度
                sheet.addCell(new Label(col, row, colName[col], arial10format));// 写入col名称，并对单元格数据进行格式化
            }
            //固定表头第一行
            sheet.getSettings().setVerticalFreeze(1);
            
            workbook.write();// 写入数据
            LOG.debug("init ok!");
        } catch (RowsExceededException e) {
            e.printStackTrace();
        } catch (WriteException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (workbook != null) {
                try {
                    workbook.close();
                } catch (WriteException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    /**
     * 对单元格数据进行格式化
     * @param cellType 单元格类型：S（字符串）、N（整形）、F（浮点数）
     * @return
     */
    public static WritableCellFormat cellFormat(String cellType){
    	WritableFont wf = new WritableFont(WritableFont.ARIAL, 12,WritableFont.NO_BOLD);
    	WritableCellFormat wcf = null;
    	try {
	    	if("N".equals(cellType)){
	    		//整形
	    		wcf = new WritableCellFormat(wf,NumberFormats.INTEGER);
	    		//设置数字对齐方式
	    		//wcf.setAlignment(Alignment.LEFT);  
	    	}else if("F".equals(cellType)){
	    		//浮点数
	    		//NumberFormat nf = new NumberFormat("#.##");
	    		NumberFormat nf = new NumberFormat("0.00");//设置数字格式
	    		wcf = new WritableCellFormat(nf); //设置表单格式    
	    	}else{
	    		//字符串
	    		wcf = new WritableCellFormat(wf,NumberFormats.TEXT);
	    		//设置自动换行;  
	    		wcf.setWrap(true);
	    	}
	    	wcf.setBorder(Border.ALL, BorderLineStyle.THIN);  
		} catch (WriteException e) {
			e.printStackTrace();
		}
		wcf.setFont(wf);
    	return wcf;
    }
    
    /**
     * 将数据写入excel中
     * @param dataList		数据列表
     * @param fileName		文件名称
     * @param fieldArr		字段数组
     * @param colTypes		列类型数组
     */
    public static int dataToExcel(List<Map<String,Object>> dataList,
            String fileName, String[] fieldArr, String[] colTypes) {
    	int dLen = dataList.size();
    	//int index = 1;// 写入序号
        int row = 1;// 具体字段写入从第二行开始
        if (dLen > 0) {
        	
            WritableWorkbook writebook = null;
            InputStream in = null;
            try {
                /**
                 * 读取原来写入的文件
                 */
                // WorkbookSettings setEncode = new WorkbookSettings();
                // //设置读文件编码
                // setEncode.setEncoding(UTF8_ENCODING);
                in = new FileInputStream(new File(fileName));
                Workbook workbook = Workbook.getWorkbook(in);
                writebook = Workbook.createWorkbook(new File(fileName), workbook);
                WritableSheet sheet = writebook.getSheet(0);
                /**
                 * 写入数据
                 */
        		int fLen = fieldArr.length;
        		for(int j = 0 ; j < dLen; j++){
        			int col = 0;
        			Map<String,Object> valMap = dataList.get(j);
        			for (int i = 0; i < fLen; i++) {
        				String filed = fieldArr[i];
        				String[] fArr = filed.split(" ");
        				int tLen = fArr.length;
        				String fieldName = "";
        				//判断前台传递字段是否有别名，如果有别名获取别名，没有直接获取字段本身
    					if(1 == tLen){
    						//获取字段本身
    						fieldName = fArr[0];
    						if (fieldName.indexOf(".") != -1){
    							//解决字段名前加了表别名的问题
    							String[] fAlias = fieldName.split("\\.");
    							fieldName = fAlias[1];
    						} 
    					}else{
    						//获取字段别名
    						fieldName = fArr[1];
    					}
    					Object obj = valMap.get(fieldName);
    					String cval = "";
    					if (null == obj){
    						obj = "";
    					}else{
    						cval = obj.toString();
    					}
    					
    					String colType = colTypes[col];
    					//对数字类型进行特殊处理
    					if("N".equals(colType) || "F".equals(colType)){
    						if(Tools.isEmpty(cval)){
    							cval = "0";
    						}
    						Double dval = Double.parseDouble(cval);
    						jxl.write.Number labelNF = new jxl.write.Number(col, row, dval, cellFormat(colType)); //格式化数值
    						sheet.addCell(labelNF);
    					}else{
    						sheet.addCell(new Label(col, row, cval, cellFormat(colType)));
    					}
    					col++;
        			}
                    row++;
                }
                writebook.write();
                LOG.debug("报表写入成功");
            } catch (BiffException e) {
                e.printStackTrace();
            } catch (WriteException e) {
                LOG.debug("报表写入失败");
                e.printStackTrace();
            } catch (IOException e) {
                LOG.debug("io 异常");
            } finally {
                if (writebook != null) {
                    try {
                        writebook.close();
                    } catch (WriteException e) {
                        LOG.error("excel关闭异常");
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }if(in != null){
                    try {
                        in.close();
                    } catch (IOException e) {
                        LOG.debug(" 文件流关闭异常");
                        e.printStackTrace();
                    }
                }
            }
        }
        return row -- ;
    }
	
	public static void main(String[] args){
	   
	}

}
