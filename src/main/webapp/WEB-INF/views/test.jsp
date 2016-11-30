<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>

<html>
<head>

    <title>JSChart</title>

    <script type="text/javascript" src="/sources/plug-in/jscharts/jscharts.js"></script>
    <script type="text/javascript" src="/sources/common/jquery.min.js"></script>
    <style type="text/css">
        .hot_play {
            position: relative;
        }

        .hot_play ul {
            float: left;
        }

        .hot_play span {
            display: block;
            width: 35px;
            height: 74px;
            position: absolute;
            left: 0px;
            top: 0px;
        }

        .hot_play span.back {
            background: url(/images/xxx.gif) no-repeat;
        }
        div {
            border: dotted red 2px;
        }
        td {
            border: dotted red 2px;
        }

    </style>

</head>
<body>



<table style="overflow: auto;width:100%" >
    <tr align="center">
        <td>
            <div style="position:relative;">
                <img src="/sources/images/favicon.ico">
            </div>
        </td>
        <td align="center">
            <div style="margin: 0px 20% 0px 10%;" id="graph" style="">Loading graph...</div>
        </td>
        <td align="center">
            <div style="" id="graph1" style="">Loading graph...</div>
        </td>
        <td align="center">
            <div style="" id="graph2" style="">Loading graph...</div>
        </td>
    </tr>

</table>

<script type="text/javascript">

	var myData = new Array(['Sector 1', 2], ['Sector 2', 1], ['Sector 3', 3], ['Sector 4', 6], ['Sector 5', 8.5], ['Sector 6', 10]);
	var colors = ['#FACC00', '#FB9900', '#FB6600', '#FB4800', '#CB0A0A', '#F8F933'];
	var myChart = new JSChart('graph', 'pie');
	myChart.setDataArray(myData);
	myChart.colorizePie(colors);
	myChart.setTitleColor('#857D7D');
	myChart.setPieUnitsColor('#9B9B9B');
	myChart.setPieValuesColor('#6A0000');
	myChart.draw();

    var myChart1 = new JSChart('graph1', 'pie');
    var myData1 = new Array(['Sector 1', 2], ['Sector 2', 1], ['Sector 3', 3], ['Sector 4', 6], ['Sector 5', 8.5], ['Sector 6', 10]);
    var colors1 = ['#FACC00', '#FB9900', '#FB6600', '#FB4800', '#CB0A0A', '#F8F933'];
	myChart1.setDataArray(myData);
	myChart1.colorizePie(colors);
	myChart1.setTitleColor('#857D7D');
	myChart1.setPieUnitsColor('#9B9B9B');
	myChart1.setPieValuesColor('#6A0000');
	myChart1.draw();

    var myChart2 = new JSChart('graph2', 'pie');
    var myData2 = new Array(['Sector 1', 2], ['Sector 2', 1], ['Sector 3', 3], ['Sector 4', 6], ['Sector 5', 8.5], ['Sector 6', 10]);
    var colors2 = ['#FACC00', '#FB9900', '#FB6600', '#FB4800', '#CB0A0A', '#F8F933'];
	myChart2.setDataArray(myData);
	myChart2.colorizePie(colors);
	myChart2.setTitleColor('#857D7D');
	myChart2.setPieUnitsColor('#9B9B9B');
	myChart2.setPieValuesColor('#6A0000');
	myChart2.draw();

</script>
</body>
</html>