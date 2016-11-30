$(function () {
    //ifram 自适应高度
    $("iframe").height($(window).height() - 92);
    $(window).resize(function () {
        $("iframe").height($(window).height() - 92);
    })
    var tabs = $("#tabs").tabs();
    // 关闭图标：当点击时移除标签页
    tabs.delegate("span.glyphicon-remove", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        var index = $("#tabsCount").val();
        index--;
        $("#tabsCount").val(index);
        tabs.tabs("refresh");
    });
});

function add_Tab(src) {
    var tabTitle = $("#tab_title"),
        tabContent = $("#tab_content"),
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='glyphicon glyphicon-remove icon' role='presentation'></span></li>",
        tabCounter = 4;
    var index = $("#tabsCount").val();
    index++;
    $("#tabsCount").val(index);
    var tabs = $("#tabs").tabs();

    var label = tabTitle.val() || "Tab " + index,
        id = "tabs-" + Math.floor((Math.random() * 100) + 1),
        li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
        tabContentHtml = tabContent.val() || "Tab " + index + " content.";
    tabs.find(".ui-tabs-nav").append(li);
    if (typeof(src) != "undefined") {
        var iframe = '<iframe src="' + src + '" id="inner_frame_0" width="100%" height="100%" name="inner-frame-0" border="0" frameBorder="no" scrolling="yes"></iframe>';
        tabs.append("<div id='" + id + "'>" + iframe + "</div>");
    } else {
        tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
    }

    tabs.tabs("refresh");
    var panelId = $("#tabs ul li[aria-controls=" + id + "]");
    tabs.tabs("option", "active", index);
    $("iframe").height($(window).height() - 92);
}