$(function () {
    resetHeight();
    $(window).resize(function () {
        resetHeight();
    });
    $('#tabs').tabs({
        tabHeight: 33,
        closable: false
    });
    $("#clickl").click(function () {
        console.log($("#tabs").tabs("getTabId"));
    })
});

var tabs = {
    addPanel: function (title, url, tabid) {
        var tabs = $('#tabs');
        if (tabs.tabs('exists', tabid)) {
            tabs.tabs('select', tabid);
            return false;
        }
        var content = '<iframe src=' + url + ' width="100%" border="0" frameBorder="no" scrolling="yes"></iframe>';
        tabs.tabs('add', {
            id: tabid,
            title: title,
            content: content,
            closable: true,
            showHeader: true,
        });
        resetHeight();
    },
    removePanel: function () {
        var tab = $('#tabs').tabs('getSelected');
        if (tab) {
            var index = $('#tabs').tabs('getTabIndex', tab);
            $('#tabs').tabs('close', index);
        }
    },
    updatePanel: function () {
        //var url = $(currTab.panel('options').content).attr('src');
        //var content = '<iframe src=' + url + ' width="100%" border="0" frameBorder="no" scrolling="yes"></iframe>';
        var currTab = $('#tabs').tabs('getSelected');  // get selected panel
        var title = $('li[tabid=' + $("#tabs").tabs("getTabId") + '] span[class="tabs-title"]').html();
        var content = $('#' + $("#tabs").tabs("getTabId")).html();
        $('#tabs').tabs('update', {
            tab: currTab,
            options: {
                title: title,
                content: content
            }
        });
        resetHeight();
    }
}
function resetHeight() {
    //ifram 自适应高度
    $("iframe").height($(window).height() - 92);
}