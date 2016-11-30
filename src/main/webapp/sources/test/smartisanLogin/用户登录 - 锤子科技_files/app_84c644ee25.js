"use strict";
var accountApp = angular.module("accountApp", ["ngRoute", "ngAnimate", "ngTouch", "templates", "accountApp.services", "accountApp.directives", "accountApp.controllers", "accountApp.animations"]), accountAppControllers = angular.module("accountApp.controllers", []), accountAppDirectives = angular.module("accountApp.directives", []), accountAppServices = angular.module("accountApp.services", []), accountAppAnimations = angular.module("accountApp.animations", []);
accountApp.config(["$compileProvider", function (e) {
}]).config(["$httpProvider", function (e) {
    e.interceptors.push("Interceptor")
}]).config(["$routeProvider", function (e) {
    var t = {
        delay: ["$q", "$timeout", "Loading", function (e, t, o) {
        }], wechatResolve: ["Request", "$location", "$rootScope", "$window", "Config", "$q", "Utils", function (e, t, o, n, i, r, a) {
            if (!o.isWechat)return {};
            var c = r.defer();
            return o.openid ? c.resolve() : e.getWechatOpenId().then(function (e) {
                o.openid = e.cookie, o.isWechatLogin = e.is_login, c.resolve(e)
            }, function () {
                c.resolve(), n.location.replace(i.wechatMixinUrl + a.getUrlUnicode())
            }), c.promise
        }], wechatCheckResolve: ["Request", "$location", "$rootScope", "$window", "Config", "$q", function (e, t, o, n, i, r) {
            if (!o.isWechat)return {};
            var a = r.defer();
            return e.checkWechatBind().then(function (e) {
                e.errno == i.errnoMap.OK && e.data && (o.wechatCheckStatus = !!e.data.bind), a.resolve()
            }, function () {
                a.resolve()
            }), a.promise
        }], userInfo: ["$location", "Request", "Config", function (e, t, o) {
            return t.getSettings().then(function (e) {
                return e
            })
        }]
    };
    e.when("/register", {
        templateUrl: "partials/register.html",
        controller: "RegisterCtrl",
        title: "用户注册",
        pageClass: "v2 register",
        resolve: {wechatParams: t.wechatResolve}
    }), e.when("/register/embed", {templateUrl: "partials/register.html", controller: "RegisterCtrl", title: "用户注册"}), e.when("/register/embed/bbs", {
        templateUrl: "partials/registerBbs.html",
        controller: "RegisterCtrl",
        title: "用户注册"
    }), e.when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl",
        title: "用户登录",
        resolve: {wechatParams: t.wechatResolve}
    }), e.when("/login-guest/embed", {
        templateUrl: "partials/loginGuest.html",
        controller: "LoginGuestCtrl",
        title: "登录账户"
    }), e.when("/register-guest/embed", {templateUrl: "partials/registerGuest.html", controller: "RegisterGuestCtrl", title: "验证手机"}), e.when("/login/embed", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl",
        title: "用户登录"
    }), e.when("/login/embed/cloud", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl",
        pageClass: "login",
        title: "用户登录"
    }), e.when("/login/embed/bbs", {templateUrl: "partials/loginBbs.html", controller: "LoginCtrl", pageClass: "login", title: "用户登录"}), e.when("/login/:action", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl",
        title: "用户登录"
    }), e.when("/logout", {template: "", controller: "LogoutCtrl", title: "用户退出", resolve: {wechatParams: t.wechatCheckResolve}}), e.when("/logout/embed", {
        template: "",
        controller: "LogoutCtrl",
        title: "用户退出"
    }), e.when("/modifyAvatar", {
        templateUrl: "partials/modifyAvatar.html",
        controller: "ModifyAvatarCtrl",
        title: "设置头像",
        pageClass: "v2",
        userRequired: !0
    }), e.when("/modifyAvatar/embed", {
        templateUrl: "partials/modifyAvatar.html",
        controller: "ModifyAvatarCtrl",
        title: "设置头像",
        userRequired: !0
    }), e.when("/modifyName", {
        templateUrl: "partials/modifyName.html",
        controller: "ModifyNameCtrl",
        title: "设置昵称",
        pageClass: "v2 modify-name",
        userRequired: !0
    }), e.when("/modifyPassword", {
        templateUrl: "partials/modifyPassword.html",
        controller: "ModifyPasswordCtrl",
        title: "修改密码",
        pageClass: "v2",
        userRequired: !0
    }), e.when("/modifyMobile", {
        templateUrl: "partials/modifyMobile.html",
        controller: "ModifyMobileCtrl",
        title: "修改手机",
        pageClass: "v2 modify-mobile",
        userRequired: !0
    }), e.when("/modifyMail", {
        templateUrl: "partials/modifyMail.html", controller: "ModifyMailCtrl", title: "修改邮箱", pageClass: "v2", userRequired: !0, resolve: {
            userInfo: ["Request", function (e) {
                return e.getUserAuths()
            }]
        }
    }), e.when("/modifyQuestion", {
        templateUrl: "partials/modifyQuestion.html",
        controller: "ModifyQuestionCtrl",
        title: "设置安全问题",
        pageClass: "v2 modify-question",
        userRequired: !0,
        resolve: {
            questionData: ["Request", function (e) {
                return e.getQuestions().then(function (e) {
                    return e
                })
            }]
        }
    }), e.when("/forgotPassword", {
        templateUrl: "partials/forgotPassword.html",
        controller: "ForgotPasswordCtrl",
        pageClass: "v2 forgot-password",
        title: "忘记密码"
    }), e.when("/settings/embed", {
        templateUrl: "partials/settings.html", controller: "SettingsCtrl", title: "账户设置", resolve: {
            settings: ["Request", function (e) {
                return e.getSettings()
            }]
        }
    }), e.when("/auth/:channelID", {
        templateUrl: "partials/auth.html",
        controller: "AuthCtrl",
        title: "安全验证",
        pageClass: "v2 auth-page",
        userRequired: !0,
        resolve: {
            userAuths: ["Request", function (e) {
                return e.getUserAuths()
            }]
        }
    }), e.when("/result/:channelID", {templateUrl: "partials/result.html", title: "修改成功", controller: "ResultCtrl", pageClass: "v2"}), e.when("/v2/login", {
        templateUrl: "partials/loginV2.html",
        controller: "LoginV2Ctrl",
        title: "用户登录",
        pageClass: "v2 login-v2",
        resolve: {wechatParams: t.wechatResolve, userInfo: t.userInfo}
    }), e.when("/v2/login/:action", {
        templateUrl: "partials/loginV2.html",
        controller: "LoginV2Ctrl",
        title: "用户登录",
        pageClass: "v2 login-v2",
        resolve: {wechatParams: t.wechatResolve, userInfo: t.userInfo}
    }), e.when("/bindAccount", {
        templateUrl: "partials/bindAccount.html",
        controller: "BindAccountCtrl",
        title: "绑定手机",
        pageClass: "v2 bind-account",
        userRequired: !0,
        resolve: {
            bindUserInfo: ["Request", function (e) {
                return e.getBindInfo()
            }]
        }
    }), e.when("/bindPassword", {
        templateUrl: "partials/bindPassword.html",
        controller: "BindPasswordCtrl",
        title: "设置密码",
        pageClass: "v2 bind-password",
        resolve: {
            bindUserInfo: ["Request", function (e) {
                return e.getBindInfo()
            }]
        }
    }), e.otherwise({redirectTo: "/result/illegality"})
}]), accountApp.run(["$rootScope", "$route", "$location", "$timeout", "$window", "Loading", "Utils", function (e, t, o, n, i, r, a) {
    e.$on("$routeChangeStart", function (t, n, a) {
        var c = n.$$route ? n.$$route.originalPath : null;
        c && /settings/.test(c) ? e.isSettings = !0 : e.isSettings = !1, c && /cloud/.test(c) ? e.isEmbedCloud = !0 : e.isEmbedCloud = !1;
        var s = o.search().origin;
        e.isEmbedNotes = /notes/i.test(s), e.isEmbedContacts = /contacts/i.test(s), e.isEmbedRadar = /radar/i.test(s), e.isEmbedBbs = /bbs\.smartisan\.com/.test(s), c && /bbs/.test(c) ? (e.isEmbedBbsTmp = !0, e.isEmbedBbs = !1) : e.isEmbedBbsTmp = !1, (e.isEmbedBbsTmp || e.isEmbedBbs) && (e.isRefresh = !0), c && /modifyAvatar/.test(c) ? e.isModifyAvatar = !0 : e.isModifyAvatar = !1, /MicroMessenger/i.test(i.navigator.userAgent) ? e.isWechat = !0 : e.isWechat = !1, r.start()
    }), e.$on("$routeChangeSuccess", function (o, n, a) {
        var c = n.$$route ? n.$$route.originalPath : null;
        e.title = t.current.title, jQuery.support.leadingWhitespace || (i.document.title = t.current.title + " - 锤子科技");
        var s = e.isGuestLogin || !1;
        c && /login\-guest/.test(c) ? e.isGuestLogin = !0 : e.isGuestLogin = !1, e.dialogChangeFlag = s !== e.isGuestLogin, r.done(), e.pageClass = t.current.pageClass ? t.current.pageClass : "", $(".dialog").show()
    })
}]), accountAppServices.factory("Interceptor", ["$q", "$rootScope", "$location", "$window", "Config", function (e, t, o, n, i) {
    var r = {
        request: function (t) {
            return t || e.when(t)
        }, requestError: function (t) {
            return e.reject(t)
        }, response: function (r) {
            return r.data && (0 != r.data.errno && r.data.errno <= 900 ? n.parent == n && o.path("/result/system") : r.data.errno == i.errnoMap.UNAUTHORIZED && (t.forgotPasswordMsg || /settings/.test(o.$$path) || /v2\/login/i.test(o.$$path) || (t.currentUid = void 0, t.currentToken = void 0, o.path("/result/unauthorized")))), r || e.when(r)
        }, responseError: function (t) {
            return e.reject(t)
        }
    };
    return r
}]);
var ConfigBaseProtocolHost = location.protocol + "//" + location.host;
accountAppServices.constant("Config", {
    baseUrl: ConfigBaseProtocolHost + "/v2/",
    baseHost: location.host,
    baseProtocolHost: ConfigBaseProtocolHost,
    officialURL: "http://www.smartisan.com/",
    cloudURL: "https://cloud.smartisan.com/",
    bindAccountURL: ConfigBaseProtocolHost + location.pathname + "#/bindAccount",
    legalOrigin: /.+\.smartisan.com/,
    wechatMixinUrl: ConfigBaseProtocolHost + "/v2/wechat/redirect?custom=",
    reloadCaptchaUrl: ConfigBaseProtocolHost + "/v2/session/captcha/",
    headconfig: {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}},
    regExp: {
        isCnMobile: /^1[3|4|5|7|8]\d{9}$/,
        isMobile: /^\d{5,11}$/,
        isMobileGlobal: /^(\+\d{1,4}\s?)?\d{5,11}$/,
        isMail: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
        isPassword: /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/,
        isSafeUrl: /^(http|https)\:\/\/(?:[a-zA-Z0-9\-\.]+\.)?(smartisan.com\b|idaxiang.org\b|h-notes.com\b)((\/|#|\?)(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9\-\._\?\,\'\:\/\\\+&amp;%\$#\=~])*)?$/
    },
    errnoMap: {
        OK: 0,
        SYSTEM_MAINTENANCE: 1,
        LOGIC_ERROR: 2,
        FS_READ_ERROR: 3,
        FS_WRITE_ERROR: 4,
        DB_CONNECT_ERROR: 5,
        DB_QUERY_ERROR: 6,
        CACHE_CONNECT_ERROR: 7,
        CACHE_QUERY_ERROR: 8,
        PARAMETER_ERROR: 1002,
        ILLEGAL_TICKET: 1601,
        INVALID_TICKET: 1602,
        ILLEGAL_UID: 1101,
        ILLEGAL_PASSWORD: 1102,
        ILLEGAL_AVATAR: 1103,
        ILLEGAL_SECQUES: 1104,
        ILLEGAL_SECANS: 1105,
        INVALID_UID: 1106,
        INVALID_PASSWORD: 1107,
        INVALID_SECANS: 1108,
        ALIAS_REQUIRED: 1109,
        PASSWORD_REQUIRED: 1110,
        ILLEGAL_ALIAS: 1201,
        INVALID_ALIAS: 1202,
        REGISTERED_ALIAS: 1203,
        ILLEGAL_CELLPHONE: 1204,
        INVALID_CELLPHONE: 1205,
        REGISTERED_CELLPHONE: 1206,
        ILLEGAL_EMAIL: 1207,
        INVALID_EMAIL: 1208,
        REGISTERED_EMAIL: 1209,
        INVALID_NICKNAME: 1210,
        UNREGISTERED_NICKNAME: 1211,
        REGISTERED_NICKNAME: 1212,
        ILLEGAL_NICKNAME: 1213,
        ILLEGAL_VCODE: 1301,
        INVALID_VCODE: 1302,
        VCODE_TOO_OFTEN: 1304,
        CAPTCHA_REQUIRED: 1502,
        ILLEGAL_TOKEN: 1401,
        INVALID_TOKEN: 1402,
        UNAUTHORIZED: 1701,
        REFRECH_VCODE: 1303,
        FAILED_LOGIN_LIMIT: 1501,
        OPENID_REGISTERED: 2009,
        OPENID_OTHER_REGISTERED: 2010,
        CELLPHONE_NO_REGISTER: 2011,
        NO_AUTH: 2012
    },
    mailUrl: {
        "163.com": "http://mail.163.com/",
        "126.com": "http://mail.126.com/",
        "139.com": "http://mail.10086.cn/",
        "sina.com": "http://mail.sina.com.cn/",
        "sina.cn": "http://mail.sina.com.cn/",
        "qq.com": "https://mail.qq.com/",
        "sohu.com": "http://mail.sohu.com/",
        "gmail.com": "https://www.gmail.com/",
        "yahoo.com": "https://login.yahoo.com/",
        "21cn.com": "http://mail.21cn.com/",
        "aliyun.com": "https://mail.aliyun.com/",
        "outlook.com": "https://login.live.com/",
        "yeah.net": "http://www.yeah.net/",
        "sogou.com": "http://mail.sogou.com/",
        "189.cn": "http://webmail9.189.cn/webmail/",
        "cntv.cn": "http://mail.cntv.cn/",
        "tianya.cn": "http://mail.tianya.cn/",
        "hainan.net": "http://mail.tianya.cn/",
        "hotmail.com": "https://login.live.com/"
    },
    cccList: [{code: "+355", name: "阿尔巴尼亚"}, {code: "+93", name: "阿富汗"}, {code: "+54", name: "阿根廷"}, {code: "+971", name: "阿拉伯联合酋长国"}, {code: "+297", name: "阿鲁巴"}, {
        code: "+968",
        name: "阿曼"
    }, {code: "+994", name: "阿塞拜疆"}, {code: "+20", name: "埃及"}, {code: "+251", name: "埃塞俄比亚"}, {code: "+353", name: "爱尔兰"}, {code: "+372", name: "爱沙尼亚"}, {code: "+376", name: "安道尔共和国"}, {
        code: "+244",
        name: "安哥拉"
    }, {code: "+1264", name: "安圭拉岛"}, {code: "+1268", name: "安提瓜和巴布达"}, {code: "+61", name: "澳大利亚"}, {code: "+43", name: "奥地利"}, {code: "+1246", name: "巴巴多斯"}, {
        code: "+675",
        name: "巴布亚新几内亚"
    }, {code: "+1242", name: "巴哈马"}, {code: "+595", name: "巴拉圭"}, {code: "+973", name: "巴林"}, {code: "+507", name: "巴拿马"}, {code: "+55", name: "巴西"}, {code: "+375", name: "白俄罗斯"}, {
        code: "+1441",
        name: "百慕大群岛"
    }, {code: "+359", name: "保加利亚"}, {code: "+229", name: "贝宁"}, {code: "+32", name: "比利时"}, {code: "+354", name: "冰岛"}, {code: "+1787", name: "波多黎各"}, {code: "+48", name: "波兰"}, {
        code: "+591",
        name: "玻利维亚"
    }, {code: "+501", name: "伯利兹"}, {code: "+267", name: "博茨瓦纳"}, {code: "+975", name: "不丹"}, {code: "+226", name: "布基纳法索"}, {code: "+257", name: "布隆迪"}, {code: "+45", name: "丹麦"}, {
        code: "+49",
        name: "德国"
    }, {code: "+228", name: "多哥"}, {code: "+1809", name: "多米尼加共和国"}, {code: "+7", name: "俄罗斯"}, {code: "+593", name: "厄瓜多尔"}, {code: "+33", name: "法国"}, {code: "+689", name: "法属玻利尼西亚"}, {
        code: "+594",
        name: "法属圭亚那"
    }, {code: "+63", name: "菲律宾"}, {code: "+679", name: "斐济"}, {code: "+358", name: "芬兰"}, {code: "+238", name: "佛得角共和国"}, {code: "+220", name: "冈比亚"}, {code: "+57", name: "哥伦比亚"}, {
        code: "+506",
        name: "哥斯达黎加"
    }, {code: "+1473", name: "格林纳达"}, {code: "+995", name: "格鲁吉亚"}, {code: "+53", name: "古巴"}, {code: "+1671", name: "关岛"}, {code: "+592", name: "圭亚那"}, {code: "+7", name: "哈萨克斯坦"}, {
        code: "+509",
        name: "海地"
    }, {code: "+82", name: "韩国"}, {code: "+31", name: "荷兰"}, {code: "+599", name: "荷属安的列斯"}, {code: "+382", name: "黑山共和国"}, {code: "+504", name: "洪都拉斯"}, {code: "+253", name: "吉布提"}, {
        code: "+996",
        name: "吉尔吉斯斯坦"
    }, {code: "+224", name: "几内亚"}, {code: "+1", name: "加拿大"}, {code: "+233", name: "加纳"}, {code: "+241", name: "加蓬"}, {code: "+855", name: "柬埔寨"}, {code: "+420", name: "捷克"}, {
        code: "+263",
        name: "津巴布韦"
    }, {code: "+237", name: "喀麦隆"}, {code: "+974", name: "卡塔尔"}, {code: "+1345", name: "开曼群岛"}, {code: "+225", name: "科特迪瓦"}, {code: "+965", name: "科威特"}, {code: "+385", name: "克罗地亚"}, {
        code: "+254",
        name: "肯尼亚"
    }, {code: "+682", name: "库克群岛"}, {code: "+371", name: "拉脱维亚"}, {code: "+266", name: "莱索托"}, {code: "+856", name: "老挝"}, {code: "+961", name: "黎巴嫩"}, {code: "+370", name: "立陶宛"}, {
        code: "+231",
        name: "利比里亚"
    }, {code: "+218", name: "利比亚"}, {code: "+423", name: "列支敦士登"}, {code: "+352", name: "卢森堡"}, {code: "+250", name: "卢旺达"}, {code: "+40", name: "罗马尼亚"}, {code: "+261", name: "马达加斯加"}, {
        code: "+960",
        name: "马尔代夫"
    }, {code: "+356", name: "马耳他"}, {code: "+265", name: "马拉维"}, {code: "+60", name: "马来西亚"}, {code: "+223", name: "马里"}, {code: "+596", name: "马提尼克"}, {code: "+230", name: "毛里求斯"}, {
        code: "+1",
        name: "美国"
    }, {code: "+1684", name: "美属萨摩亚群岛"}, {code: "+976", name: "蒙古"}, {code: "+1664", name: "蒙特塞拉特岛"}, {code: "+880", name: "孟加拉国"}, {code: "+51", name: "秘鲁"}, {
        code: "+373",
        name: "摩尔多瓦"
    }, {code: "+212", name: "摩洛哥"}, {code: "+377", name: "摩纳哥"}, {code: "+258", name: "莫桑比克"}, {code: "+52", name: "墨西哥"}, {code: "+264", name: "纳米比亚"}, {code: "+27", name: "南非"}, {
        code: "+505",
        name: "尼加拉瓜"
    }, {code: "+977", name: "尼泊尔"}, {code: "+227", name: "尼日尔"}, {code: "+234", name: "尼日利亚"}, {code: "+47", name: "挪威"}, {code: "+351", name: "葡萄牙"}, {code: "+81", name: "日本"}, {
        code: "+46",
        name: "瑞典"
    }, {code: "+41", name: "瑞士"}, {code: "+503", name: "萨尔瓦多"}, {code: "+685", name: "萨摩亚"}, {code: "+381", name: "塞尔维亚共和国"}, {code: "+232", name: "塞拉利昂"}, {code: "+221", name: "塞内加尔"}, {
        code: "+357",
        name: "塞浦路斯"
    }, {code: "+248", name: "塞舌尔"}, {code: "+966", name: "沙特阿拉伯"}, {code: "+239", name: "圣多美和普林西比"}, {code: "+1758", name: "圣卢西亚"}, {code: "+378", name: "圣马力诺"}, {
        code: "+1784",
        name: "圣文森特岛"
    }, {code: "+94", name: "斯里兰卡"}, {code: "+421", name: "斯洛伐克"}, {code: "+386", name: "斯洛文尼亚"}, {code: "+268", name: "斯威士兰"}, {code: "+597", name: "苏里南"}, {code: "+252", name: "索马里"}, {
        code: "+992",
        name: "塔吉克斯坦"
    }, {code: "+886", name: "台湾"}, {code: "+66", name: "泰国"}, {code: "+255", name: "坦桑尼亚"}, {code: "+676", name: "汤加"}, {code: "+1868", name: "特立尼达和多巴哥"}, {code: "+216", name: "突尼斯"}, {
        code: "+90",
        name: "土耳其"
    }, {code: "+993", name: "土库曼斯坦"}, {code: "+502", name: "危地马拉"}, {code: "+58", name: "委内瑞拉"}, {code: "+673", name: "文莱"}, {code: "+256", name: "乌干达"}, {code: "+380", name: "乌克兰"}, {
        code: "+598",
        name: "乌拉圭"
    }, {code: "+998", name: "乌兹别克斯坦"}, {code: "+30", name: "希腊"}, {code: "+34", name: "西班牙"}, {code: "+65", name: "新加坡"}, {code: "+64", name: "新西兰"}, {code: "+36", name: "匈牙利"}, {
        code: "+1876",
        name: "牙买加"
    }, {code: "+374", name: "亚美尼亚"}, {code: "+967", name: "也门"}, {code: "+964", name: "伊拉克"}, {code: "+98", name: "伊朗"}, {code: "+972", name: "以色列"}, {code: "+39", name: "意大利"}, {
        code: "+91",
        name: "印度"
    }, {code: "+62", name: "印度尼西亚"}, {code: "+44", name: "英国"}, {code: "+962", name: "约旦"}, {code: "+84", name: "越南"}, {code: "+260", name: "赞比亚"}, {code: "+235", name: "乍得"}, {
        code: "+350",
        name: "直布罗陀"
    }, {code: "+56", name: "智利"}, {code: "+236", name: "中非共和国"}, {code: "+86", name: "中国"}, {code: "+853", name: "中国澳门特别行政区"}, {code: "+852", name: "中国香港特别行政区"}],
    defaultCountryCode: "86",
    defaultCountryName: "中国"
}).factory("UtilTools", ["$q", "$http", "$timeout", function (e, t, o) {
    var n = {
        noopPromise: function () {
            var t = e.defer();
            return o(function () {
                t.resolve("")
            }, 1e3), t.promise
        }, encodeUriQuery: function (e, t) {
            return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
        }, toKeyValue: function (e) {
            var t = this, o = [];
            return angular.forEach(e, function (e, n) {
                angular.isArray(e) ? angular.forEach(e, function (e) {
                    o.push(t.encodeUriQuery(n, !0) + (e === !0 ? "" : "=" + t.encodeUriQuery(e, !0)))
                }) : o.push(t.encodeUriQuery(n, !0) + (e === !0 ? "" : "=" + t.encodeUriQuery(e, !0)))
            }), o.length ? o.join("&") : ""
        }
    };
    return n
}]), accountAppServices.factory("Request", ["$http", "$q", "Config", "UtilTools", "Utils", function (e, t, o, n, i) {
    var r = o.baseUrl, a = o.headconfig, c = o.bindAccountURL;
    return {
        checkMobile: function (o) {
            var i = t.defer(), a = n.toKeyValue(o);
            return e.post(r + "cellphone/?" + a, "").success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, checkMail: function (o) {
            var i = t.defer(), a = n.toKeyValue(o);
            return e.post(r + "email/?" + a, "").success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, checkNickName: function (o) {
            var i = t.defer(), a = n.toKeyValue(o);
            return e.post(r + "nickname/?" + a, "").success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, sendMobileCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "cellphone/?m=post", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, checkMobileCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "cellphone/?m=post", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, getUserChecks: function (o) {
            var i = t.defer(), a = n.toKeyValue(o);
            return e.post(r + "cellphone/?" + a, "").success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, register: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, registerWechat: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "wechat/register/", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, login: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "session/?m=post", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, loginWechat: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "wechat/?m=post", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, logout: function (o) {
            var n = t.defer();
            return e.post(r + "session/?m=delete", "").success(function (e) {
                n.resolve(e)
            }).error(function () {
                n.reject("网络异常!")
            }), n.promise
        }, checkWechatBind: function () {
            var o = t.defer();
            return e.get(r + "wechat/status", "").success(function (e) {
                o.resolve(e)
            }).error(function () {
                o.reject("网络异常!")
            }), o.promise
        }, logoutWechat: function (o) {
            var n = t.defer();
            return e.post(r + "wechat/?m=delete", "").success(function (e) {
                n.resolve(e)
            }).error(function () {
                n.reject("网络异常!")
            }), n.promise
        }, checkLoginCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/captcha/?m=post&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, updateUserPassword: function (o) {
            var i = t.defer(), c = n.toKeyValue(o), s = r + "w/password/?m=put";
            return o.uid && (s = r + "users/password/?m=put&uid=" + o.uid), o.username && (s = r + "users/password/?m=put&username=" + o.username), e.post(s, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, updateUserNickname: function (o) {
            var i = t.defer(), c = n.toKeyValue(o), s = r + "w/nickname/?m=put";
            return o.uid && (s = r + "users/nickname/?m=put&uid=" + o.uid), o.username && (s = r + "users/nickname/?m=put&username=" + o.username), e.post(s, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, uploadImageForAvatar: function (e) {
            var o = t.defer(), n = r + "w/avatar/upload";
            return $.ajaxFileUpload({
                url: n, fileElementId: e, dataType: "json", success: function (e) {
                    o.resolve(e)
                }, error: function (e) {
                    o.reject(e)
                }
            }), o.promise
        }, updataUserAvatar: function (o) {
            var i = t.defer(), c = r + "w/avatar";
            o.uid && (c = r + "users/avatar/?uid=" + o.uid), o.username && (c = r + "users/avatar/?username=" + o.username);
            var s = {};
            o.cropped ? s.avatar = o.imgData : (s.avatar = "from-upload", s["Crop-X"] = Math.round(o.coordData.x), s["Crop-Y"] = Math.round(o.coordData.y), s["Crop-Width"] = Math.round(o.coordData.w), s["Crop-Height"] = Math.round(o.coordData.h));
            var u = n.toKeyValue(s);
            return e.post(c, u, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, updateUserEmail: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/email/?m=put&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, updateUserMobile: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/cellphone/?m=put&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, getUserAuths: function (o) {
            var n = t.defer(), i = r + "w/protection/?m=get";
            return e.post(i, "").success(function (e) {
                n.resolve(e)
            }).error(function () {
                n.reject("网络异常!")
            }), n.promise
        }, getNoLoginAuths: function (o) {
            var i = t.defer(), a = n.toKeyValue(o);
            return e.post(r + "users/protection/?m=get&" + a, "").success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, sendUpdateCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/token/?m=post&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, checkUpdateCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/token/?m=put&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, sendNewMobileCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/cellphone/?m=post&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, sendNewEmail: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/email/?m=post&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, modifyMail: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/email/?m=put&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, getQuestions: function () {
            var o = t.defer();
            return e.post(r + "config/security-questions/?m=get", "").success(function (e) {
                o.resolve(e)
            }).error(function (e) {
                o.reject(e)
            }), o.promise
        }, updateUserQuestion: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/secques/?m=put&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, activeUserEmail: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "users/active/?m=put&uid=" + o.uid, c, a).success(function (e) {
                i.resolve(e)
            }).error(function (e) {
                i.reject(e)
            }), i.promise
        }, getSettings: function () {
            var o = t.defer();
            return e.post(r + "w/?m=get", "").success(function (e) {
                o.resolve(e)
            }).error(function (e) {
                o.reject(e)
            }), o.promise
        }, getWechatOpenId: function () {
            var n = t.defer();
            return e.get(r + "wechat/openid", "").success(function (e) {
                e.errno == o.errnoMap.OK && e.data.cookie ? n.resolve(e.data) : n.reject(e)
            }).error(function (e) {
                n.reject(e)
            }), n.promise
        }, wechatLogin: function (e) {
            e && "" != e || (e = o.officialURL), e = i.unicode(e), c = i.unicode(c), location.href = r + "oauth/wechat?return_url=" + e + "&bind_url=" + c
        }, qqLogin: function (e) {
            e && "" != e || (e = o.officialURL), e = i.unicode(e), c = i.unicode(c), location.href = r + "oauth/qq?return_url=" + e + "&bind_url=" + c
        }, weiboLogin: function (e) {
            e && "" != e || (e = o.officialURL), e = i.unicode(e), c = i.unicode(c), location.href = r + "oauth/weibo?return_url=" + e + "&bind_url=" + c
        }, getBindInfo: function () {
            var o = t.defer();
            return e.get(r + "ident/info", "").success(function (e) {
                o.resolve(e)
            }).error(function (e) {
                o.reject(e)
            }), o.promise
        }, sendBindMobileCaptcha: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "ident/cellphone", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, bindMobile: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "ident/bindCellphone/", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }, bindPassword: function (o) {
            var i = t.defer(), c = n.toKeyValue(o);
            return e.post(r + "ident/create/", c, a).success(function (e) {
                i.resolve(e)
            }).error(function () {
                i.reject("网络异常!")
            }), i.promise
        }
    }
}]), accountAppServices.factory("User", ["Config", function (e) {
    var t = e.baseProtocolHost;
    return location.host.indexOf("account.smartisan.com") < 0 && (t = "https://account.smartisan.com"), {
        user: "", captchaUrl: t + "/v2/session/captcha/?" + +new Date, refreshCaptcha: function () {
            var e = this, t = e.captchaUrl;
            return t = t.lastIndexOf("?") > 0 ? t + "&" + +new Date : t + "?" + +new Date, e.captchaUrl = t
        }, setUser: function (e) {
            this.user = e
        }, isLoggedIn: function () {
            return !!this.user && this.user
        }
    }
}]), accountAppServices.factory("Loading", function () {
    return {
        start: function () {
            $(".loading").show()
        }, done: function () {
            $(".loading").hide()
        }
    }
}), accountAppServices.factory("Validate", function () {
    return {
        checkErrNumber: function (e, t) {
            var o, n = 0;
            e.errAnimation = {}, angular.forEach(t.$error, function (e) {
                angular.forEach(e, function (e) {
                    e.$invalid && (o = e.$name, n++)
                })
            }), 1 == n && (e.errAnimation[o] = !0)
        }
    }
}), accountAppServices.factory("Utils", ["$rootScope", "$q", "$http", "$location", function (e, t, o, n) {
    var i = {};
    return i.truncateChars = function (e, t, o, n) {
        if (e) {
            var i = e.replace(/[\u4e00-\u9fa5\s]/g, "**").length, r = [], a = 0;
            if (n) {
                var c = $("<div></div>").html(e);
                e = c.text(), c = null
            }
            if (i <= t)return e;
            for (var s = 0; s < i; s++) {
                var u = e.charAt(s);
                if (a += /[^\x00-\xff]/.test(u) ? 2 : 1, r.push(u), a >= t)break
            }
            return o ? r.join("") + "..." : r.join("")
        }
        return ""
    }, i.encodeUriQuery = function (e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
    }, i.toKeyValue = function (e) {
        var t = this, o = [];
        return angular.forEach(e, function (e, n) {
            angular.isArray(e) ? angular.forEach(e, function (e) {
                o.push(t.encodeUriQuery(n, !0) + (e === !0 ? "" : "=" + t.encodeUriQuery(e, !0)))
            }) : o.push(t.encodeUriQuery(n, !0) + "=" + t.encodeUriQuery(e, !0))
        }), o.length ? o.join("&") : ""
    }, i.isMobile = function () {
        var e = window.devicePixelRatio || 1;
        return $(window).width() <= 736 && (screen.width <= 736 || e >= 2)
    }, i.isWeixin = function () {
        var e = navigator.userAgent.toLowerCase();
        return "micromessenger" == e.match(/MicroMessenger/i)
    }, i.isMobileQQ = function () {
        var e = navigator.userAgent.toLowerCase();
        return "qq/" == e.match(/qq\//i)
    }, i.isIphone = function () {
        var e = navigator.userAgent.toLowerCase();
        return "iphone" == e.match(/iphone/i)
    }, i.isAndroid = function () {
        var e = navigator.userAgent.toLowerCase();
        return "android" == e.match(/android/i)
    }, i.unicode = function (e) {
        return e ? encodeURIComponent(decodeURIComponent(e)) : e
    }, i.getUrlUnicode = function () {
        return encodeURIComponent(n.absUrl())
    }, i
}]), accountAppControllers.controller("MainCtrl", ["$scope", "$rootScope", "$http", "$timeout", "$location", "$window", "User", "Request", "Config", "Utils", function (e, t, o, n, i, r, a, c, s, u) {
    if (t.isRefresh = !0, t.isMobile = u.isMobile(), e.util = {}, t.isRefresh && !u.isMobile()) {
        var l = $(".dialog"), d = l.css("margin-top");
        e.$on("$viewContentLoaded", function () {
            n(function () {
                var e = $(".dialog"), t = $(".copyright").outerHeight();
                "0px" != e.css("margin-top") && d != e.css("margin-top") || e.css({"margin-top": -(e.outerHeight() + t) / 2})
            })
        })
    }
    if (/embed/.test(i.$$path) && r.parent !== r) {
        var p = i.search().origin;
        s.legalOrigin.test(p) ? t.targetOrigin = p : t.targetOrigin = "http://store.smartisan.com"
    } else $("body").removeClass("bg-none"), $(".wrapper").removeClass("bg-none");
    $(window).on("keydown", function (e) {
        if (!t.isEmbedCloud && !t.isEmbedBbsTmp) {
            var e = e || window.event;
            27 == e.keyCode && t.targetOrigin && r.parent.postMessage("dialogClose", t.targetOrigin)
        }
    }), $(".wrapper").on("click", function (e) {
        if (!t.isEmbedCloud && !t.isEmbedBbsTmp) {
            e.stopPropagation();
            var o = e.target;
            $(o).hasClass("wrapper") && r.parent != r && r.parent.postMessage("dialogClose", t.targetOrigin)
        }
    }), $(".dialog .title .close").on("click", function (e) {
        t.isEmbedCloud || r.parent.postMessage("dialogClose", t.targetOrigin)
    })
}]), accountAppControllers.controller("RegisterCtrl", ["$scope", "$rootScope", "$window", "$http", "$location", "$timeout", "$interval", "Request", "Config", "User", "Validate", "Loading", "Utils", function (e, t, o, n, i, r, a, c, s, u, l, d, p) {
    t.dialogTitle = "注册 Smartisan ID", e.invalid = {}, e.focus = {}, e.showBtn = !0, e.agreed = !1, e.user = {}, e.util.submitted = !1;
    var f = /embed/.test(i.$$path), m = i.search().return_url;
    if (1 == t.isWechatLogin && m)return void o.location.replace(m);
    t.isEmbedBbsTmp && (e.showRePwd = function () {
        e.needRePassword = !0, o.parent !== o && o.parent.postMessage("showSlideDown", t.targetOrigin)
    }), e.cccList = s.cccList, e.ccc = s.defaultCountryCode, e.country = s.defaultCountryName;
    var h = !1;
    e.showList = function (e) {
        h || ($(".country-list").show(), e.stopPropagation(), h = !0, $(".wrapper").one("click", function () {
            $(".country-list").hide(), h = !1
        }))
    }, e.changeCountry = function (t, o) {
        e.ccc = t.slice(1) || e.ccc, e.country = o || e.country, e.form.mobile.$setValidity("mobile", !0), e.form.mobile.$setValidity("mobileRegistered", !0), e.validateMobile()
    }, e.register = function () {
        if (e.util.submitted = !0, e.form.$invalid) {
            if (e.errAnimation = {}, e.form.mobile.$invalid)return void(e.errAnimation.mobile = !0);
            if (e.form.captcha.$invalid)return;
            if (e.form.verification.$invalid)return;
            if (e.form.mail.$invalid)return void(e.errAnimation.mail = !0);
            if (e.form.password.$invalid)return void(e.errAnimation.password = !0);
            if (e.form.repassword.$invalid)return void(e.errAnimation.repassword = !0)
        } else {
            if (!e.agreed)return void(e.animationTip = !0);
            var n = t.isWechat ? c.registerWechat : c.register;
            d.start(), e.clicked = !0, n({
                "user[cellphone]": "+" + e.ccc + " " + e.user.mobile,
                "user[email]": e.user.mail,
                "ext[cellphone_code]": e.user.verification,
                "ext[login]": t.isEmbedBbs || t.isEmbedBbsTmp ? "true" : "false",
                "user[password]": e.user.password
            }).then(function (n) {
                switch (d.done(), e.clicked = !1, +n.errno) {
                    case s.errnoMap.REGISTERED_CELLPHONE:
                        e.invalid.mobileRegistered = !1;
                        break;
                    case s.errnoMap.INVALID_VCODE:
                        e.invalid.mobileCaptchaValid = !1;
                        break;
                    case s.errnoMap.REFRECH_VCODE:
                        e.invalid.mobileCaptchaReload = !1;
                        break;
                    case s.errnoMap.REGISTERED_EMAIL:
                        e.invalid.emailRegistered = !1;
                        break;
                    case s.errnoMap.OK:
                        f ? o.parent !== o && o.parent.postMessage("isRegistered", t.targetOrigin) : i.path("/result/register").search({return_url: p.unicode(m)})
                }
            }, function (t) {
                d.done(), e.clicked = !1
            })
        }
    };
    var g = function () {
        var t = 60;
        e.timer = t, e.showBtn = !1, a(function () {
            e.timer--
        }, 1e3, t).then(function () {
            e.showBtn = !0
        })
    };
    e.resend = function () {
        if (e.captchaSubmitted = !0, e.form.mobile.$invalid)return e.errAnimation = {}, void(e.errAnimation.mobile = !0);
        if (!e.form.captcha.$invalid) {
            var t = {cellphone: "+" + e.ccc + " " + e.user.mobile, captcha: e.user.captcha};
            e.captchaSubmitted = !0, c.sendMobileCaptcha(t).then(function (t) {
                if (e.captchaSubmitted = !1, 0 != t.errno)switch (+t.errno) {
                    case s.errnoMap.REGISTERED_CELLPHONE:
                        e.invalid.mobileRegistered = !1;
                        break;
                    case s.errnoMap.ILLEGAL_CELLPHONE:
                        e.invalid.mobile = !1;
                        break;
                    case s.errnoMap.ILLEGAL_VCODE:
                        e.invalid.captchaValid = !1;
                        break;
                    case s.errnoMap.CAPTCHA_REQUIRED:
                        e.reloadCaptcha(), e.focus.captcha = !0;
                        break;
                    case s.errnoMap.REFRECH_VCODE:
                        e.invalid.captchaValid = !1, e.reloadCaptcha(), e.focus.captcha = !0;
                        break;
                    case s.errnoMap.VCODE_TOO_OFTEN:
                        g()
                } else g()
            }, function (e) {
            })
        }
    }, e.reloadCaptcha = function () {
        e.loginCaptchaUrl = u.refreshCaptcha();
        var t = $(".tips-verifycon");
        t.addClass("active"), setTimeout(function () {
            t.removeClass("active")
        }, 600)
    }, e.reloadCaptcha(), e.validateMobile = function () {
        if (!e.form.mobile.$invalid) {
            if ("86" == e.ccc) {
                if (!s.regExp.isCnMobile.test(e.user.mobile))return void e.form.mobile.$setValidity("mobile", !1)
            } else if (!s.regExp.isMobile.test(e.user.mobile))return void e.form.mobile.$setValidity("mobile", !1);
            c.checkMobile({m: "get", cellphone: "+" + e.ccc + " " + e.user.mobile, action: "check"}).then(function (t) {
                if (0 != t.errno)switch (t.errno) {
                    case s.errnoMap.REGISTERED_CELLPHONE:
                        e.invalid.mobileRegistered = !1;
                        break;
                    case s.errnoMap.ILLEGAL_CELLPHONE:
                        e.invalid.mobile = !1
                }
            }, function (e) {
            })
        }
    }, e.validateMobileCaptcha = function () {
        if (!e.form.verification.$invalid)return e.form.mobile.$invalid ? void(e.invalid.mobileCaptchaValid = !1) : void c.checkMobileCaptcha({
            action: "renew",
            cellphone: "+" + e.ccc + " " + e.user.mobile,
            cellphone_code: e.user.verification
        }).then(function (t) {
            if (0 != t.errno)switch (t.errno) {
                case s.errnoMap.INVALID_VCODE:
                case s.errnoMap.ILLEGAL_VCODE:
                    e.invalid.mobileCaptchaValid = !1;
                    break;
                case s.errnoMap.REFRECH_VCODE:
                    e.invalid.mobileCaptchaReload = !1
            }
        }, function (e) {
        })
    }, e.validateMail = function () {
        e.form.mail.$invalid || c.checkMail({m: "get", email: e.user.mail, action: "check"}).then(function (t) {
            if (0 != t.errno)switch (t.errno) {
                case s.errnoMap.REGISTERED_EMAIL:
                    e.invalid.emailRegistered = !1;
                    break;
                case s.errnoMap.ILLEGAL_EMAIL:
                    e.invalid.mail = !1
            }
        }, function (e) {
        })
    }, e.toLogin = function () {
        if (f)i.path("/login/embed"); else {
            var e = i.search().v;
            if (e && "2" == e)i.path("/v2/login").search({return_url: p.unicode(m)}); else {
                if (s.regExp.isSafeUrl.test(decodeURIComponent(m))) {
                    if (m.indexOf(s.baseHost) >= 0) {
                        var t = m.split("#");
                        t[1] && i.path(t[1])
                    } else/bbs.smartisan.com/i.test(m) ? o.location.replace("http://bbs.smartisan.com/member.php?mod=logging&action=login&referer=") : o.location.replace(m);
                    return
                }
                i.path("/login")
            }
        }
    }
}]), accountAppControllers.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "User", "Request", "$routeParams", "$route", "Config", "Validate", "Loading", "Utils", function (e, t, o, n, i, r, a, c, s, u, l, d, p, f) {
    t.dialogTitle = "登录", e.invalid = {}, e.focus = {}, e.util.submitted = !1;
    var m = /embed/.test(n.$$url), h = n.search().return_url, g = n.search().username, v = new RegExp("^http://www.smartisan.com/special/#/20151111", "i");
    if (v.test(decodeURIComponent(h)) && (t.is1111 = !0, t.backToLast = function () {
            i.history.back(1)
        }), 1 == t.isWechatLogin && h)return void i.location.replace(h);
    t.isEmbedBbs && (t.dialogTitle = "使用欢喜云账户登录锤子论坛"), e.registerText = t.isEmbedNotes || t.isEmbedContacts || t.isEmbedRadar ? "注册欢喜云账户" : "注册新账户", e.user = {}, e.remembered = t.isWechat, m && g && ($(".cloud .title").addClass("locked"), e.user.username = g, $(".username .placeholder").hide()), t.showCcc && (e.cccList = l.cccList, e.ccc = l.defaultCountryCode, e.country = l.defaultCountryName), e.switchModel = function () {
        t.showCcc = !t.showCcc, t.isRefresh = !0, u.reload()
    };
    var b = !1;
    e.showList = function (e) {
        b || ($(".country-list").show(), e.stopPropagation(), b = !0, $(".wrapper").one("click", function () {
            $(".country-list").hide(), b = !1
        }))
    }, e.changeCountry = function (t, o) {
        e.ccc = t.slice(1) || e.ccc, e.country = o || e.country, e.invalid.username = !0, e.invalid.nameValid = !0, e.invalid.passwordValid = !0, e.util.submitted = !1
    }, e.login = function () {
        if (e.util.submitted = !0, e.form.$invalid) {
            if (e.errAnimation = {}, e.form.username.$invalid)return void(e.errAnimation.username = !0);
            if (e.form.password.$invalid)return void(e.errAnimation.password = !0)
        } else {
            var o = {};
            o.username = e.user.username, o.password = e.user.password, e.user.captcha && (o.captcha = e.user.captcha), e.showCcc && l.regExp.isMobile.test(o.username) && (o.username = "+" + e.ccc + " " + o.username), e.remembered && !t.isWechat && (o.extended_login = 1);
            var a = t.isWechat && e.remembered ? c.loginWechat : c.login;
            p.start(), a(o).then(function (o) {
                switch (p.done(), o.errno) {
                    case l.errnoMap.ILLEGAL_PASSWORD:
                    case l.errnoMap.INVALID_PASSWORD:
                        e.invalid.passwordValid = !1, e.focus.password = !0;
                        break;
                    case l.errnoMap.PARAMETER_ERROR:
                    case l.errnoMap.ILLEGAL_CELLPHONE:
                    case l.errnoMap.INVALID_CELLPHONE:
                    case l.errnoMap.INVALID_UID:
                    case l.errnoMap.INVALID_EMAIL:
                    case l.errnoMap.UNREGISTERED_NICKNAME:
                        e.invalid.nameValid = !1;
                        break;
                    case l.errnoMap.ILLEGAL_VCODE:
                    case l.errnoMap.INVALID_VCODE:
                        e.invalid.captchaValid = !1, e.focus.captcha = !0;
                        break;
                    case l.errnoMap.CAPTCHA_REQUIRED:
                        e.captchaNeeded = !0, (t.isEmbedBbs || t.isEmbedBbsTmp) && i.parent !== i && i.parent.postMessage("showSlideDown", t.targetOrigin), e.loginCaptchaUrl = o.data.captcha, r(function () {
                            e.focus.captcha = !0
                        }, 500);
                        break;
                    case l.errnoMap.REFRECH_VCODE:
                        e.captchaNeeded = !0, e.reloadCaptcha(), e.invalid.captchaValid = !1, e.focus.captcha = !0;
                        break;
                    case l.errnoMap.FAILED_LOGIN_LIMIT:
                        e.invalid.passwordValid = !1, e.focus.password = !0, e.captchaNeeded = !0, (t.isEmbedBbs || t.isEmbedBbsTmp) && i.parent !== i && i.parent.postMessage("showSlideDown", t.targetOrigin), e.reloadCaptcha(o.data.captcha);
                        break;
                    case l.errnoMap.OK:
                        if (m)i.parent !== i && i.parent.postMessage("isLoggedIn", t.targetOrigin); else {
                            if (l.regExp.isSafeUrl.test(decodeURIComponent(h))) {
                                if (h.indexOf(l.baseHost) >= 0) {
                                    var a = h.split("#");
                                    a[1] && n.path(a[1])
                                } else i.location.replace(h);
                                return
                            }
                            var c = s.action;
                            switch (c) {
                                case"modifyPassword":
                                    n.path("/" + c);
                                    break;
                                case"modifyMobile":
                                case"modifyMail":
                                case"modifyQuestion":
                                    n.path("/auth/" + c);
                                    break;
                                default:
                                    n.path("/result/login")
                            }
                        }
                }
            }, function (t) {
                p.done(), e.captchaNeeded = !0
            })
        }
    }, e.toRegister = function () {
        m ? t.isEmbedCloud ? e.toRegisterWithReturn() : n.path("/register/embed") : n.path("/register")
    }, e.toRegisterWithReturn = function () {
        i.parent.location.replace(l.baseProtocolHost + "/#/register?return_url=" + f.unicode(t.targetOrigin))
    }, e.forgotPassword = function () {
        m ? i.open(l.baseProtocolHost + "/#/forgotPassword") : n.path("/forgotPassword")
    }, e.reloadCaptcha = function (t) {
        var o = t || e.loginCaptchaUrl;
        o = o.lastIndexOf("?") > 0 ? o + "&" + +new Date : o + "?" + +new Date, e.loginCaptchaUrl = o
    }
}]), accountAppControllers.controller("LoginV2Ctrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "User", "Request", "$routeParams", "$route", "Config", "Validate", "Loading", "userInfo", "Utils", function (e, t, o, n, i, r, a, c, s, u, l, d, p, f, m) {
    function h() {
        if (b === !0 && navigator.credentials && navigator.credentials.store) {
            var t = new PasswordCredential({id: e.user.username, password: e.user.password});
            navigator.credentials.store(t).then(function () {
            })
        }
    }

    function g(t, o) {
        switch (p.done(), t.errno) {
            case l.errnoMap.ILLEGAL_PASSWORD:
            case l.errnoMap.INVALID_PASSWORD:
                e.invalid.passwordValid = !1, e.focus.password = !0;
                break;
            case l.errnoMap.PARAMETER_ERROR:
            case l.errnoMap.ILLEGAL_CELLPHONE:
            case l.errnoMap.INVALID_CELLPHONE:
            case l.errnoMap.INVALID_UID:
            case l.errnoMap.INVALID_EMAIL:
            case l.errnoMap.UNREGISTERED_NICKNAME:
                e.invalid.nameValid = !1;
                break;
            case l.errnoMap.ILLEGAL_VCODE:
            case l.errnoMap.INVALID_VCODE:
                e.invalid.captchaValid = !1, e.focus.captcha = !0;
                break;
            case l.errnoMap.CAPTCHA_REQUIRED:
                e.captchaNeeded = !0, e.loginCaptchaUrl = t.data.captcha, r(function () {
                    e.focus.captcha = !0
                }, 500);
                break;
            case l.errnoMap.REFRECH_VCODE:
                e.captchaNeeded = !0, e.reloadCaptcha(), e.invalid.captchaValid = !1, e.focus.captcha = !0;
                break;
            case l.errnoMap.FAILED_LOGIN_LIMIT:
                e.invalid.passwordValid = !1, e.focus.password = !0, e.captchaNeeded = !0, e.reloadCaptcha(t.data.captcha);
                break;
            case l.errnoMap.OK:
                if (o === !0 && h(), l.regExp.isSafeUrl.test(decodeURIComponent(w))) {
                    if (w.indexOf(l.baseHost) >= 0) {
                        var a = w.split("#");
                        a[1] && n.path(a[1])
                    } else i.location.replace(decodeURIComponent(w));
                    return
                }
                var c = s.action;
                switch (c) {
                    case"modifyPassword":
                        n.path("/" + c);
                        break;
                    case"modifyMobile":
                    case"modifyMail":
                    case"modifyQuestion":
                        n.path("/auth/" + c);
                        break;
                    default:
                        n.path("/result/login")
                }
        }
    }

    function v() {
        var o = "", n = "注册 Smartisan ID", i = "", r = "忘记密码", a = decodeURIComponent(w);
        /cloud.smartisan.com/i.test(a) ? /notes/i.test(a) ? (o = "锤子便签", i = "logo-notes") : /contacts/i.test(a) ? (o = "联系人", i = "logo-contacts") : /radar/i.test(a) ? (o = "查找手机", i = "logo-radar") : y ? (i = "logo-locked", o = "解锁", e.user.username = y, $(".username .placeholder").hide()) : (i = "logo-cloud", o = "欢喜云") : /bbs.smartisan.com/i.test(a) ? (o = "锤子科技官方论坛", i = "logo-bbs") : o = /(smartisan.com\/shop)|(store.smartisan.com)/i.test(a) ? "官方在线商城" : /dev.smartisan.com/i.test(a) ? "开发者中心" : "官网", t.isMobile ? (n = "注册", o = "登录" + o) : (o = "使用 Smartisan ID 登录" + o, r += "？"), t.dialogTitle = o, t.loginLogoClass = i, e.registerText = n, e.forgetText = r
    }

    var b = !0;
    t.dialogTitle = "使用 Smartisan ID 登录锤子商城", e.registerText = "注册 Smartisan ID", e.invalid = {}, e.focus = {}, e.util.submitted = !1;
    var w = n.search().return_url, y = n.search().username;
    if (w && "" != w && !l.regExp.isSafeUrl.test(decodeURIComponent(w)) && (w = m.unicode(l.officialURL)), 1 == t.isWechatLogin && w)return void i.location.replace(w);
    e.user = {}, e.remembered = t.isWechat, t.showCcc && (e.cccList = l.cccList, e.ccc = l.defaultCountryCode, e.country = l.defaultCountryName), e.switchModel = function () {
        t.showCcc = !t.showCcc, t.isRefresh = !0, u.reload()
    };
    var C = !1;
    e.showList = function (e) {
        C || ($(".country-list").show(), e.stopPropagation(), C = !0, $(".wrapper").one("click", function () {
            $(".country-list").hide(), C = !1
        }))
    }, e.changeCountry = function (t, o) {
        e.ccc = t.slice(1) || e.ccc, e.country = o || e.country, e.invalid.username = !0, e.invalid.nameValid = !0, e.invalid.passwordValid = !0, e.util.submitted = !1
    }, e.login = function () {
        if (e.util.submitted = !0, e.form.$invalid) {
            if (e.errAnimation = {}, e.form.username.$invalid)return void(e.errAnimation.username = !0);
            if (e.form.password.$invalid)return void(e.errAnimation.password = !0)
        } else {
            var o = {};
            o.username = e.user.username, o.password = e.user.password, e.user.captcha && (o.captcha = e.user.captcha), e.showCcc && l.regExp.isMobile.test(o.username) && (o.username = "+" + e.ccc + " " + o.username), e.remembered && !t.isWechat && (o.extended_login = 1);
            var n = t.isWechat && e.remembered ? c.loginWechat : c.login;
            p.start(), n(o).then(function (e) {
                g(e, !0)
            }, function (t) {
                p.done(), e.captchaNeeded = !0
            })
        }
    }, e.toRegister = function () {
        n.path("/register").search({v: "2", return_url: w})
    }, e.toRegisterWithReturn = function () {
        i.parent.location.replace(l.baseProtocolHost + "/#/register?return_url=" + m.unicode(t.targetOrigin))
    }, e.forgotPassword = function () {
        n.path("/forgotPassword")
    }, e.reloadCaptcha = function (t) {
        var o = t || e.loginCaptchaUrl || "https://account.smartisan.com/v2/session/captcha/";
        o = o.lastIndexOf("?") > 0 ? o + "&" + +new Date : o + "?" + +new Date, e.loginCaptchaUrl = o;
        var n = $(".tips-verifycon");
        n.addClass("active"), setTimeout(function () {
            n.removeClass("active")
        }, 600)
    }, e.wechatLogin = function () {
        c.wechatLogin(w)
    }, e.qqLogin = function () {
        c.qqLogin(w)
    }, e.weiboLogin = function () {
        c.weiboLogin(w)
    }, v(), b === !0 && navigator.credentials && navigator.credentials.get && navigator.credentials.get({password: !0}).then(function (e) {
        e && "password" == e.type && (p.start(), fetch(l.baseUrl + "session/?m=post", {credentials: e, method: "POST"}).then(function (e) {
            return e.json()
        }).then(function (e) {
            g(e, !1)
        }))
    })
}]), accountAppControllers.controller("LogoutCtrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "User", "Request", "$routeParams", "Config", "Validate", "Loading", function (e, t, o, n, i, r, a, c, s, u, l, d) {
    var p = t.isWechat && t.wechatCheckStatus ? c.logoutWechat : c.logout, f = /embed/.test(n.$$url), m = n.search().return_url;
    d.start(), p().then(function (e) {
        if (d.done(), 0 == e.errno)if (f)i.parent !== i && i.parent.postMessage("isLoggedOut", t.targetOrigin); else if (u.regExp.isSafeUrl.test(decodeURIComponent(m)))if (m.indexOf(u.baseHost) >= 0) {
            var o = m.split("#");
            o[1] && n.path(o[1])
        } else i.location.replace(m); else n.path("/login")
    }, function (e) {
        d.done()
    })
}]), accountAppControllers.controller("Logout2Ctrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "User", "Request", "$routeParams", "Config", "Validate", "Loading", function (e, t, o, n, i, r, a, c, s, u, l, d) {
    t.dialogTitle = "退出登录";
    var p = /embed/.test(n.$$url), f = n.search().return_url;
    e.confirm = function () {
        var e = t.isWechat ? c.logoutWechat : c.logout;
        d.start(), e().then(function (e) {
            if (d.done(), 0 == e.errno)if (p)i.parent !== i && i.parent.postMessage("isLoggedOut", t.targetOrigin); else if (u.regExp.isSafeUrl.test(decodeURIComponent(f)))if (f.indexOf(u.baseHost) >= 0) {
                var o = f.split("#");
                o[1] && n.path(o[1])
            } else i.location.replace(f); else n.path("/login")
        }, function (e) {
            d.done()
        })
    }, e.cancel = function () {
        p ? i.parent !== i && i.parent.postMessage("dialogClose", t.targetOrigin) : i.history.length > 1 && i.history.back(1)
    }
}]), accountAppControllers.controller("AuthCtrl", ["$scope", "$rootScope", "$http", "$routeParams", "$location", "$window", "Request", "UtilTools", "$interval", "Config", "Validate", "Loading", "userAuths", function (e, t, o, n, i, r, a, c, s, u, l, d, p) {
    t.dialogTitle = "安全验证", e.invalid = {}, e.user = {}, e.answer = {};
    var f = {cellphone: "通过手机短信验证身份", email: "通过邮箱验证身份", secques: "通过密码保护验证身份"};
    e.authType = {types: [], checked: 0}, e.errAnimation = {}, e.util.submitted = !1;
    switch (n.channelID) {
        case"forgotPassword":
            e.authType.action = "FIND_PASSWORD";
            var m = n;
            m && m.username && (e.authType.username = m.username), e.gotoPage = "modifyPassword";
            break;
        case"modifyMobile":
            e.authType.action = "UPDATE_CELLPHONE", e.gotoPage = "modifyMobile";
            break;
        case"modifyMail":
            e.authType.action = "UPDATE_EMAIL", e.gotoPage = "modifyMail";
            break;
        case"modifyQuestion":
            e.authType.action = "UPDATE_SECQUES", e.gotoPage = "modifyQuestion";
            break;
        case"modifyAvatar":
            e.authType.action = "UPDATE_AVATAR", e.gotoPage = "modifyAvatar"
    }
    var h = function (t) {
        var o = 60 * (t || 1);
        e.timer = o, e.showBtn = !1, s(function () {
            e.timer--
        }, 1e3, o).then(function () {
            e.showBtn = !0
        })
    };
    e.resend = function () {
        h(), a.sendUpdateCaptcha({"for": e.authType.action, to: e.authType.checkType, uid: t.currentUid, secret: e.secret}).then(function (e) {
            if (e.errno == u.errnoMap.PARAMETER_ERROR)return void r.location.reload()
        })
    }, e.resendEmail = function () {
        h(5), a.sendUpdateCaptcha({"for": e.authType.action, to: e.authType.checkType, uid: t.currentUid, secret: e.secret}).then(function (e) {
            if (e.errno == u.errnoMap.PARAMETER_ERROR)return void r.location.reload()
        })
    }, e.gotoEmail = function () {
        var t;
        angular.forEach(e.authType.types, function (e) {
            "email" == e.type && (t = e.value)
        });
        var o = t.split("@")[1], n = u.mailUrl[o] || "http://mail." + o + "/";
        window.open(n)
    }, e.next = function () {
        return "secques" == e.authType.checkType ? (e.current = "secques", void e.changeQuestion()) : (d.start(), void a.sendUpdateCaptcha({
            "for": e.authType.action,
            to: e.authType.checkType,
            uid: t.currentUid,
            secret: e.secret
        }).then(function (t) {
            if (d.done(), e.util.submitted = !1, t.errno == u.errnoMap.PARAMETER_ERROR)return void r.location.reload();
            switch (jQuery.support.opacity && $(".content").css({opacity: "0"}).animate({opacity: "1"}, 500), e.authType.checkType) {
                case"email":
                    e.current = "email", h(5);
                    break;
                case"cellphone":
                    e.current = "cellphone", angular.forEach(e.authType.types, function (t) {
                        "cellphone" == t.type && (e.mobile = t.value)
                    }), e.showBtn = !0, h()
            }
        }, function (e) {
            d.done()
        }))
    }, e.mobileNext = function () {
        if (e.util.submitted = !0, t.currentToken = void 0, !e.form.$valid)return void l.checkErrNumber(e, e.form);
        d.start();
        var o = {"for": e.authType.action, uid: t.currentUid};
        o.cellphone_code = e.user.verification, a.checkUpdateCaptcha(o).then(function (o) {
            switch (d.done(), +o.errno) {
                case u.errnoMap.OK:
                    t.currentToken = o.data, i.path("/" + e.gotoPage);
                    break;
                case u.errnoMap.ILLEGAL_VCODE:
                case u.errnoMap.INVALID_VCODE:
                    e.invalid.mobileCaptchaValid = !1;
                    break;
                case u.errnoMap.REFRECH_VCODE:
                    e.invalid.mobileCaptchaReload = !1
            }
        }, function (e) {
            d.done()
        })
    }, e.changeQuestion = function () {
        var t, o = e.questions && e.questions.length > 0 ? e.questions[Math.floor(2 * Math.random())].v : "";
        e.questions = [], angular.forEach(e.authType.types, function (e) {
            "secques" == e.type && (t = e.value)
        });
        for (var n in t)t.hasOwnProperty(n) && o !== t[n] && e.questions.push({k: n, v: t[n]});
        e.questions.length > 2 && e.questions.splice(Math.floor(3 * Math.random()), 1), e.answer = {}, e.invalid.answerInvalid = !0, e.util.submitted = !1, e.form.answer1 && (e.form.answer1.$submitted = !1), e.form.answer2 && (e.form.answer2.$submitted = !1)
    }, e.questionConfirm = function () {
        if (e.util.submitted = !0, t.currentToken = void 0, e.form.answer1.$invalid)return e.errAnimation = {}, void(e.errAnimation.answer1 = !0);
        if (e.form.answer2.$invalid)return e.errAnimation = {}, void(e.errAnimation.answer2 = !0);
        var o = {"for": e.authType.action, uid: t.currentUid};
        o["secans[" + e.questions[0].k + "]"] = e.answer.answer1, o["secans[" + e.questions[1].k + "]"] = e.answer.answer2, d.start(), a.checkUpdateCaptcha(o).then(function (o) {
            switch (d.done(), +o.errno) {
                case u.errnoMap.OK:
                    t.currentToken = o.data, i.path("/" + e.gotoPage);
                    break;
                case u.errnoMap.INVALID_SECANS:
                    e.invalid.answerInvalid = !1
            }
        }, function (e) {
            d.done()
        })
    };
    var g = function (e) {
        var t = {}, o = [];
        return angular.forEach(e, function (e, o) {
            switch (e.type) {
                case"cellphone":
                    t.cellphone = e;
                    break;
                case"email":
                    t.email = e;
                    break;
                case"secques":
                    t.secques = e
            }
        }), t.cellphone && o.push(t.cellphone), t.email && o.push(t.email), t.secques && o.push(t.secques), o
    }, v = function () {
        e.gotoPage && b()
    }, b = function () {
        t.forgotPasswordMsg ? w(t.forgotPasswordMsg) : "0" == p.errno ? w(p) : y()
    }, w = function (o) {
        if (d.done(), e.authType.types = [], "0" == o.errno) {
            for (var n in o.data)if (o.data[n])if ("uid" == n)t.currentUid = o.data[n]; else {
                var i = {};
                i.type = n, i.value = o.data[n], i.desc = f[n], e.authType.types.push(i)
            }
            e.authType.types = g(e.authType.types), e.secret = o.data.secret, angular.forEach(e.authType.types, function (t, o) {
                "cellphone" == t.type && e.selectType(o)
            })
        } else y()
    };
    e.selectType = function (t) {
        e.authType.checked = t, e.authType.checkType = e.authType.types[t].type
    };
    var y = function () {
        d.done()
    };
    v(), t.isMobile && (e.isMobile = !0)
}]), accountAppControllers.controller("ModifyPasswordCtrl", ["$scope", "$rootScope", "$http", "$location", "Request", "Config", "Loading", "Validate", function (e, t, o, n, i, r, a, c) {
    t.dialogTitle = "修改密码", e.invalid = {}, e.user = {}, e.oldRequired = !0, e.util.submitted = !1;
    var s = n.search();
    if (t.currentToken)e.oldRequired = !1; else if (s && s.code) {
        e.oldRequired = !1, t.currentUid = s.uid;
        var u = {"for": "FIND_PASSWORD", uid: s.uid, email_code: s.code};
        i.checkUpdateCaptcha(u).then(function (e) {
            "0" == e.errno ? t.currentToken = e.data : n.path("/forgotPassword")
        }, function (e) {
        })
    }
    e.modify = function () {
        if (e.util.submitted = !0, e.oldRequired && e.form.oldpassword.$invalid)return e.errAnimation = {}, void(e.errAnimation.oldpassword = !0);
        if (e.form.password.$invalid)return e.errAnimation = {}, void(e.errAnimation.password = !0);
        if (e.form.repassword.$invalid)return e.errAnimation = {}, void(e.errAnimation.repassword = !0);
        a.start();
        var o = {};
        e.oldRequired ? o = {"user[password]": e.user.password, "ext[password]": e.user.oldpassword} : (o = {
            "user[password]": e.user.password,
            "ext[token]": t.currentToken
        }, t.currentUid && (o.uid = t.currentUid), s.username && (o.username = s.username)), i.updateUserPassword(o).then(function (t) {
            switch (a.done(), +t.errno) {
                case r.errnoMap.OK:
                    n.path("/result/modifyPassword");
                    break;
                case r.errnoMap.ILLEGAL_PASSWORD:
                case r.errnoMap.INVALID_PASSWORD:
                    e.invalid.oldpasswordValid = !1
            }
        }, function (e) {
            a.done()
        })
    }
}]), accountAppControllers.controller("ModifyMobileCtrl", ["$scope", "$rootScope", "$http", "$location", "Request", "$interval", "Config", "Loading", "Validate", function (e, t, o, n, i, r, a, c, s) {
    t.dialogTitle = "修改手机", e.invalid = {}, e.user = {}, e.util.submitted = !1, e.errAnimation = {};
    var u = n.search();
    e.cccList = a.cccList, e.ccc = a.defaultCountryCode, e.country = a.defaultCountryName, e.showCcc = !0;
    var l = !1;
    if (e.showList = function (e) {
            l || ($(".country-list").show(), e.stopPropagation(), l = !0, $(".wrapper").one("click", function () {
                $(".country-list").hide(), l = !1
            }))
        }, e.changeCountry = function (t, o) {
            e.ccc = t.slice(1) || e.ccc, e.country = o || e.country, e.invalid.mobile = !0, e.invalid.mobileRegistered = !0, e.util.submitted = !1
        }, !t.currentToken)if (u && u.code) {
        t.currentUid = u.uid || "";
        var d = {"for": "UPDATE_CELLPHONE", uid: u.uid || "", email_code: u.code};
        i.checkUpdateCaptcha(d).then(function (e) {
            "0" == e.errno ? t.currentToken = e.data : n.path("/auth/modifyMobile")
        }, function (e) {
        })
    } else n.path("/auth/modifyMobile");
    var p = function () {
        var t = 60;
        e.timer = t, e.showBtn = !1, r(function () {
            e.timer--
        }, 1e3, t).then(function () {
            e.showBtn = !0
        })
    };
    e.resend = function () {
        p(), c.start(), i.sendNewMobileCaptcha({cellphone: e.newMobile, uid: t.currentUid}).then(function (e) {
            c.done()
        }, function (e) {
            c.done()
        })
    }, e.step1 = function () {
        return e.util.submitted = !0, e.form.mobile.$invalid ? void(e.errAnimation.mobile = !0) : "86" != e.ccc || a.regExp.isCnMobile.test(e.user.mobile) ? (c.start(), void i.sendNewMobileCaptcha({
            cellphone: "+" + e.ccc + " " + e.user.mobile,
            token: t.currentToken,
            uid: t.currentUid
        }).then(function (t) {
            switch (c.done(), +t.errno) {
                case a.errnoMap.OK:
                case a.errnoMap.VCODE_TOO_OFTEN:
                    e.current = "step2", e.util.submitted = !1, e.newMobile = "+" + e.ccc + " " + e.user.mobile, p();
                    break;
                case a.errnoMap.REGISTERED_CELLPHONE:
                    e.invalid.mobileRegistered = !1;
                    break;
                case a.errnoMap.ILLEGAL_CELLPHONE:
                    e.invalid.mobile = !1;
                    break;
                default:
                    n.path("/auth/modifyMobile")
            }
        }, function () {
            c.done()
        })) : (e.invalid.mobile = !1, void(e.errAnimation.mobile = !0))
    }, e.step2 = function () {
        e.util.submitted = !0, e.form.$valid && (c.start(), i.updateUserMobile({uid: t.currentUid, "user[cellphone]": e.newMobile, "ext[cellphone_code]": e.user.verification}).then(function (t) {
            switch (c.done(), +t.errno) {
                case a.errnoMap.OK:
                    n.path("/result/modifyMobile");
                    break;
                case a.errnoMap.INVALID_VCODE:
                case a.errnoMap.ILLEGAL_VCODE:
                    e.invalid.mobileCaptchaValid = !1;
                    break;
                case a.errnoMap.REFRECH_VCODE:
                    e.invalid.mobileCaptchaReload = !1;
                    break;
                default:
                    n.path("/auth/modifyMobile")
            }
        }, function (e) {
            c.done(), n.path("/auth/modifyMobile")
        }))
    }
}]), accountAppControllers.controller("ModifyMailCtrl", ["$scope", "$rootScope", "$http", "$location", "Request", "$interval", "Config", "Loading", "Validate", "userInfo", function (e, t, o, n, i, r, a, c, s, u) {
    var l = "修改";
    e.emailTips = "请输入您需要更换的邮箱地址", u.errno != a.errnoMap.OK || u.data.email && "" != u.data.email || (l = "新增", e.emailTips = "请输入您需要新增的邮箱地址"), t.dialogTitle = l + "邮箱", e.emailTips = "请输入您需要" + l + "的邮箱地址", t.title = l + "邮箱", e.invalid = {}, e.user = {}, e.util.submitted = !1;
    var d = n.search();
    if (!t.currentToken)if (d && d.code) {
        t.currentUid = d.uid || "";
        var p = {"for": "UPDATE_EMAIL", uid: d.uid || "", email_code: d.code};
        i.checkUpdateCaptcha(p).then(function (e) {
            "0" == e.errno ? t.currentToken = e.data : n.path("/auth/modifyMail")
        }, function (e) {
        })
    } else n.path("/auth/modifyMail");
    var f = function (t) {
        var o = 60 * (t || 1);
        e.timer = o, e.showBtn = !1, r(function () {
            e.timer--
        }, 1e3, o).then(function () {
            e.showBtn = !0
        })
    };
    e.resend = function () {
        f(5), c.start(), i.sendNewEmail({email: e.newEmail, uid: t.currentUid}).then(function (e) {
            c.done()
        }, function (e) {
            c.done()
        })
    }, e.next = function () {
        return e.util.submitted = !0, e.form.$valid ? (c.start(), void i.modifyMail({uid: t.currentUid, "user[email]": e.user.mail, "ext[token]": t.currentToken}).then(function (o) {
            switch (c.done(), +o.errno) {
                case a.errnoMap.OK:
                    e.submitted = !1, e.newEmail = e.user.mail, e.current = "step2", t.dialogTitle = l + "邮箱成功", f(5);
                    break;
                case a.errnoMap.REGISTERED_EMAIL:
                    e.invalid.emailRegistered = !1;
                    break;
                case a.errnoMap.ILLEGAL_EMAIL:
                    e.invalid.mail = !1;
                    break;
                case a.errnoMap.VCODE_TOO_OFTEN:
                    e.submitted = !1, e.newEmail = e.user.mail, e.current = "step2", t.dialogTitle = l + "邮箱成功", f(5);
                    break;
                default:
                    n.path("/auth/modifyMail")
            }
        }, function (e) {
            c.done()
        })) : void s.checkErrNumber(e, e.form)
    }, e.gotoEmail = function () {
        var t = e.newEmail, o = t.split("@")[1], n = a.mailUrl[o] || "http://mail." + o + "/";
        window.open(n)
    }
}]), accountAppControllers.controller("ModifyQuestionCtrl", ["$scope", "$rootScope", "$http", "$location", "Request", "$timeout", "Config", "Validate", "Loading", "questionData", function (e, t, o, n, i, r, a, c, s, u) {
    t.dialogTitle = "设置安全问题", e.questionsOne = [], e.questionsTwo = [], e.questionsThree = [];
    var l = n.search();
    if (e.invalid = {}, e.question = {}, e.question.question1 = {k: "", v: "请选择"}, e.question.question2 = {k: "", v: "请选择"}, e.question.question3 = {
            k: "",
            v: "请选择"
        }, e.util.submitted = !1, !t.currentToken)if (l && l.code) {
        t.currentUid = l.uid || "";
        var d = {"for": "UPDATE_SECQUES", uid: l.uid, email_code: l.code};
        i.checkUpdateCaptcha(d).then(function (e) {
            "0" == e.errno ? t.currentToken = e.data : n.path("/auth/modifyQuestion")
        }, function (e) {
        })
    } else n.path("/auth/modifyQuestion");
    var p = [], f = function () {
        if ("0" == u.errno) {
            var t = [], o = [];
            angular.forEach(u.data, function (e, n) {
                t.push(n), o.push(e)
            }), p.push({k: "", v: "请选择"});
            for (var n = 0; n < t.length; n++)p.push({k: t[n], v: o[n]});
            e.updateQuestion()
        }
    };
    e.updateQuestion = function () {
        e.questionsOne = [], e.questionsTwo = [], e.questionsThree = [], e.question.question1 || (e.question.question1 = {k: "", v: "请选择"}), e.question.question2 || (e.question.question2 = {
            k: "",
            v: "请选择"
        }), e.question.question3 || (e.question.question3 = {k: "", v: "请选择"}), angular.forEach(p, function (t) {
            switch (t.k) {
                case"":
                    e.questionsOne.push(t), e.questionsTwo.push(t), e.questionsThree.push(t);
                    break;
                case e.question.question1.k:
                    e.questionsOne.push(t);
                    break;
                case e.question.question2.k:
                    e.questionsTwo.push(t);
                    break;
                case e.question.question3.k:
                    e.questionsThree.push(t);
                    break;
                default:
                    e.questionsOne.push(t), e.questionsTwo.push(t), e.questionsThree.push(t)
            }
        }), e.question1Required = "" == e.question.question1.k, e.question2Required = "" == e.question.question2.k, e.question3Required = "" == e.question.question3.k, r(function () {
            e.form.question1.$setValidity("question1", !e.question1Required), e.form.question2.$setValidity("question1", !e.question2Required), e.form.question3.$setValidity("question1", !e.question3Required)
        })
    }, f(), e.next = function () {
        if (e.util.submitted = !0, "" == e.question.question1.k && (e.question1Required = !0), "" == e.question.question2.k && (e.question2Required = !0), "" == e.question.question3.k && (e.question3Required = !0), !(e.question1Required || e.question2Required || e.question3Required))if (e.form.$valid) {
            var o = {uid: t.currentUid, "ext[token]": t.currentToken};
            o["user[secques][" + e.question.question1.k + "]"] = e.question.answer1, o["user[secques][" + e.question.question2.k + "]"] = e.question.answer2, o["user[secques][" + e.question.question3.k + "]"] = e.question.answer3, s.start(), i.updateUserQuestion(o).then(function (e) {
                s.done(), "0" == e.errno && n.path("/result/modifyQuestion")
            }, function (e) {
                s.done()
            })
        } else {
            if (e.errAnimation = {}, e.form.answer1.$invalid)return void(e.errAnimation.answer1 = !0);
            if (e.form.answer2.$invalid)return void(e.errAnimation.answer2 = !0);
            if (e.form.answer3.$invalid)return void(e.errAnimation.answer3 = !0)
        }
    }
}]), accountAppControllers.controller("ForgotPasswordCtrl", ["$scope", "$rootScope", "$http", "$location", "$route", "Request", "Config", "User", "Validate", "Loading", function (e, t, o, n, i, r, a, c, s, u) {
    function l() {
        t.showCcc && (e.cccList = a.cccList, e.ccc = a.defaultCountryCode, e.country = a.defaultCountryName)
    }

    t.dialogTitle = "忘记密码", e.invalid = {}, e.util.submitted = !1, e.focus = {}, l(), e.switchModel = function () {
        t.showCcc = !t.showCcc, l()
    };
    var d = !1;
    e.showList = function (e) {
        d || ($(".country-list").show(), e.stopPropagation(), d = !0, $(".wrapper").one("click", function () {
            $(".country-list").hide(), d = !1
        }))
    }, e.changeCountry = function (t, o) {
        e.ccc = t.slice(1) || e.ccc, e.country = o || e.country, e.invalid.username = !0, e.invalid.nameValid = !0, e.util.submitted = !1
    }, e.next = function () {
        if (e.util.submitted = !0, e.form.$valid) {
            u.start();
            var o = {};
            o.username = e.user.username, e.user.captcha && (o.captcha = e.user.captcha), e.showCcc && (o.username = "+" + e.ccc + " " + o.username), r.getNoLoginAuths(o).then(function (o) {
                switch (u.done(), +o.errno) {
                    case 0:
                        n.path("/auth/forgotPassword"), t.forgotPasswordMsg = o;
                        break;
                    case a.errnoMap.PARAMETER_ERROR:
                    case a.errnoMap.INVALID_CELLPHONE:
                    case a.errnoMap.ILLEGAL_CELLPHONE:
                    case a.errnoMap.INVALID_UID:
                    case a.errnoMap.ILLEGAL_EMAIL:
                    case a.errnoMap.INVALID_EMAIL:
                    case a.errnoMap.UNREGISTERED_NICKNAME:
                        e.reloadCaptcha(), e.invalid.nameValid = !1, e.focus.username = !0;
                        break;
                    case a.errnoMap.ILLEGAL_VCODE:
                    case a.errnoMap.INVALID_VCODE:
                        e.invalid.captchaValid = !1, e.focus.captcha = !0;
                        break;
                    case a.errnoMap.REFRECH_VCODE:
                        e.reloadCaptcha(), e.invalid.captchaValid = !1, e.focus.captcha = !0
                }
            }, function (e) {
                u.done()
            })
        } else if (e.errAnimation = {}, e.form.username.$invalid)return void(e.errAnimation.username = !0)
    }, e.reloadCaptcha = function () {
        e.captchaUrl = c.refreshCaptcha();
        var t = $(".tips-verifycon");
        t.addClass("active"), setTimeout(function () {
            t.removeClass("active")
        }, 600)
    }, e.reloadCaptcha()
}]), accountAppControllers.controller("SettingsCtrl", ["$scope", "$rootScope", "$http", "$location", "$window", "Request", "Config", "UtilTools", "Loading", "settings", function (e, t, o, n, i, r, a, c, s, u) {
    t.dialogTitle = "账户设置", e.originUrl = t.targetOrigin ? "?return_url=" + t.targetOrigin : "";
    var l = /embed/.test(n.$$path);
    if (l && i.parent == i)return void n.url("/result/illegality");
    var d = n.$$protocol + "://" + n.$$host + "/#" + n.$$path;
    "0" == u.errno ? (e.settings = u.data, e.settings.email || 1 != e.settings.active ? e.settings.email && 1 == e.settings.active ? e.emailStatus = 1 : 3 == e.settings.active && (e.emailStatus = 2) : e.emailStatus = 0, e.cellphoneActive = e.settings.active, e.secquesActive = !!e.settings.secques, e.isEmailSend = !1, e.sendEmail = function () {
        e.isEmailSend = !0, s.start(), r.sendNewEmail({email: e.settings.email, uid: e.settings.uid}).then(function (e) {
            s.done()
        }, function (e) {
            s.done()
        })
    }, e.gotoEmail = function () {
        var t = e.settings.email, o = t.split("@")[1], n = a.mailUrl[o] || "http://mail." + o + "/";
        window.open(n)
    }) : (n.search().return_url = d, l ? n.path("/login/embed") : n.path("/login"))
}]), accountAppControllers.controller("ResultCtrl", ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$sce", "$interval", "$window", "Request", "Config", function (e, t, o, n, i, r, a, c, s, u) {
    function l(o) {
        o && o.code ? s.updateUserEmail({uid: o.uid, "user[email]": o.email, "ext[email_code]": o.code}).then(function (o) {
            "0" == o.errno ? (f = "修改邮箱成功", m = "您的邮箱已经修改成功", t.title = "修改邮箱成功") : (f = "修改邮箱失败", m = "您的邮箱修改失败", t.title = "修改邮箱失败", e.fail = !0), t.dialogTitle = f, e.resultInfo = r.trustAsHtml(m)
        }, function (e) {
            n.path("/result/error")
        }) : n.path("/")
    }

    function d(o) {
        o && o.code ? s.activeUserEmail({uid: o.uid, active: "email", email_code: o.code}).then(function (o) {
            "0" == o.errno ? (f = "激活邮箱成功", m = "您的邮箱已经激活成功", t.title = "激活邮箱成功") : (f = "激活邮箱失败", m = "您的邮箱激活失败", t.title = "激活邮箱失败", e.fail = !0), t.dialogTitle = f, e.resultInfo = r.trustAsHtml(m)
        }, function (e) {
            n.path("/result/error")
        }) : n.path("/")
    }

    e.timerToUrl = null;
    var p = function () {
        var t = 3;
        e.timerToUrl = t, a(function () {
            e.timerToUrl--
        }, 1e3, t).then(function () {
            c.location.href = e.getGotoUrl()
        })
    };
    p();
    var f = "", m = "", h = "返回", g = "";
    switch (i.channelID) {
        case"register":
            f = "注册成功", m = "您已经注册成功<br>请妥善保存您的账号和密码", t.title = "注册成功";
            break;
        case"bindAccount":
            f = "提示", m = "手机号已绑定成功", g = "当您下次访问锤子科技官网时，可使用该号码直接登录", t.title = "手机号已绑定成功";
            break;
        case"login":
            f = "登录成功", m = "您已经登录成功", t.title = "登录成功";
            break;
        case"modifyName":
            f = "昵称修改成功", m = "您的昵称已经修改成功", t.title = "昵称修改成功";
            break;
        case"modifyPassword":
            f = "密码重置成功", m = "您的密码已经重置成功", t.title = "密码重置成功";
            break;
        case"modifyMobile":
            f = "修改手机成功", m = "您的手机已经修改成功", t.title = "修改手机成功";
            break;
        case"modifyMail":
            var v = n.search();
            l(v);
            break;
        case"modifyQuestion":
            f = "提示", m = "您的密码保护问题修改成功", t.title = "修改密保成功";
            break;
        case"modifyAvatar":
            f = "修改头像成功", m = "您的头像已经修改成功", t.title = "修改头像成功";
            break;
        case"activateMail":
            var v = n.search();
            d(v);
            break;
        case"illegality":
            f = "提示", m = "没有操作权限", t.title = "没有权限", e.fail = !0;
            break;
        case"error":
            f = "提示", m = "操作失败", t.title = "操作失败", e.fail = !0;
            break;
        case"system":
            f = "系统错误", m = "系统错误，请稍候重试", t.title = "系统错误", e.fail = !0;
            break;
        case"unauthorized":
            f = "提示", m = "您需要登录才能进行刚才的操作", t.title = "没有权限", e.fail = !0;
            break;
        default:
            n.path("/")
    }
    e.getGotoUrl = function () {
        var e = n.search(), t = u.officialURL, o = decodeURIComponent(e.return_url);
        return e.referer && "cloud" == e.referer && (t = u.cloudURL), u.regExp.isSafeUrl.test(o) && (t = o), h = /cloud.smartisan.com/i.test(o) ? "返回欢喜云" : /bbs.smartisan.com/i.test(o) ? "返回锤子科技官方论坛" : /(smartisan.com\/shop)|(store.smartisan.com)/i.test(o) ? "返回官方在线商城" : /dev.smartisan.com/i.test(o) ? "返回 Smartisan 开发者中心" : "返回", t
    }, e.gotoUrl = e.getGotoUrl(), t.dialogTitle = f, e.resultInfo = r.trustAsHtml(m), e.resultTip = g, e.returnInfo = h
}]), accountAppControllers.controller("LoginGuestCtrl", ["$scope", "$rootScope", "$http", "$location", "$window", "$timeout", "User", "Request", "$routeParams", "Config", "Validate", "Loading", function (e, t, o, n, i, r, a, c, s, u, l, d) {
    t.dialogTitle = "登录账户", e.invalid = {}, e.focus = {}, e.util.submitted = !1;
    var p = /embed/.test(n.$$url);
    if (p && i.parent == i)return void n.url("/result/illegality");
    var f = n.search().return_url;
    n.search().username;
    e.login = function () {
        if (e.util.submitted = !0, e.form.$invalid)return void l.checkErrNumber(e, e.form);
        var o = e.user;
        d.start(), c.login(o).then(function (o) {
            switch (d.done(), o.errno) {
                case u.errnoMap.ILLEGAL_PASSWORD:
                case u.errnoMap.INVALID_PASSWORD:
                    e.invalid.passwordValid = !1, e.focus.password = !0;
                    break;
                case u.errnoMap.INVALID_CELLPHONE:
                case u.errnoMap.INVALID_UID:
                case u.errnoMap.INVALID_EMAIL:
                    e.invalid.nameValid = !1;
                    break;
                case u.errnoMap.ILLEGAL_VCODE:
                case u.errnoMap.INVALID_VCODE:
                    e.invalid.captchaValid = !1, e.focus.captcha = !0;
                    break;
                case u.errnoMap.CAPTCHA_REQUIRED:
                    e.captchaNeeded = !0, e.loginCaptchaUrl = o.data.captcha, r(function () {
                        e.focus.captcha = !0
                    }, 500);
                    break;
                case u.errnoMap.REFRECH_VCODE:
                    e.captchaNeeded = !0, e.reloadCaptcha(), e.invalid.captchaValid = !1, e.focus.captcha = !0;
                    break;
                case u.errnoMap.FAILED_LOGIN_LIMIT:
                    e.invalid.passwordValid = !1, e.focus.password = !0, e.captchaNeeded = !0, e.loginCaptchaUrl = o.data.captcha;
                    break;
                case u.errnoMap.OK:
                    if (p)i.parent !== i && i.parent.postMessage("isLoggedIn", t.targetOrigin); else {
                        if (u.regExp.isSafeUrl.test(decodeURIComponent(f))) {
                            if (f.indexOf(u.baseHost) >= 0) {
                                var a = f.split("#");
                                a[1] && n.path(a[1])
                            } else i.location.replace(f);
                            return
                        }
                        var c = s.action;
                        switch (c) {
                            case"modifyPassword":
                                n.path("/" + c);
                                break;
                            case"modifyMobile":
                            case"modifyMail":
                            case"modifyQuestion":
                                n.path("/auth/" + c);
                                break;
                            default:
                                n.path("/result/login")
                        }
                    }
            }
        }, function (e) {
            d.done()
        })
    }, e.toRegister = function () {
        p ? n.path("/register/embed") : n.path("/register")
    }, e.toGuestRegister = function () {
        p ? n.path("/register-guest/embed") : n.path("/register-guest")
    }, e.forgotPassword = function () {
        p ? i.open(u.baseProtocolHost + "/#/forgotPassword") : n.path("/forgotPassword")
    }, e.reloadCaptcha = function () {
        var t = e.loginCaptchaUrl;
        t = t.lastIndexOf("?") > 0 ? t + "&" + +new Date : t + "?" + +new Date, e.loginCaptchaUrl = t
    }
}]), accountAppControllers.controller("RegisterGuestCtrl", ["$scope", "$rootScope", "$window", "$http", "$location", "$timeout", "$interval", "Request", "Config", "User", "Validate", "Loading", function (e, t, o, n, i, r, a, c, s, u, l, d) {
    t.dialogTitle = "验证手机", e.invalid = {}, e.focus = {}, e.showBtn = !0, e.user = {}, e.util.submitted = !1;
    var p = /embed/.test(i.$$path);
    if (p && o.parent == o)return void i.url("/result/illegality");
    e.register = function () {
        return e.util.submitted = !0, e.form.$invalid ? void l.checkErrNumber(e, e.form) : (d.start(), e.clicked = !0, void c.register({
            "user[cellphone]": e.user.mobile,
            "ext[cellphone_code]": e.user.verification
        }).then(function (n) {
            switch (d.done(), e.clicked = !1, +n.errno) {
                case s.errnoMap.REGISTERED_CELLPHONE:
                    e.invalid.mobileRegistered = !1;
                    break;
                case s.errnoMap.INVALID_VCODE:
                    e.invalid.captchaValid = !1;
                    break;
                case s.errnoMap.REFRECH_VCODE:
                    e.invalid.captchaReload = !1;
                    break;
                case s.errnoMap.OK:
                    p ? o.parent !== o && o.parent.postMessage("isRegistered", t.targetOrigin) : i.path("/result/register")
            }
        }, function (t) {
            d.done(), e.clicked = !1
        }))
    };
    var f = function () {
        var t = 60;
        e.timer = t, e.showBtn = !1, a(function () {
            e.timer--
        }, 1e3, t).then(function () {
            e.showBtn = !0
        })
    };
    e.resend = function () {
        if (!e.form.mobile.$invalid && !e.form.captcha.$invalid) {
            var t = {cellphone: e.user.mobile, captcha: e.user.captcha};
            e.captchaSubmitted = !0, c.sendMobileCaptcha(t).then(function (t) {
                if (e.captchaSubmitted = !1, 0 != t.errno)switch (+t.errno) {
                    case s.errnoMap.REGISTERED_CELLPHONE:
                        e.invalid.mobileRegistered = !1;
                        break;
                    case s.errnoMap.ILLEGAL_VCODE:
                    case s.errnoMap.INVALID_VCODE:
                        e.invalid.captchaValid = !1;
                        break;
                    case s.errnoMap.CAPTCHA_REQUIRED:
                        e.reloadCaptcha(), e.focus.captcha = !0;
                        break;
                    case s.errnoMap.REFRECH_VCODE:
                        e.invalid.captchaValid = !1,
                            e.reloadCaptcha(), e.focus.captcha = !0;
                        break;
                    case s.errnoMap.VCODE_TOO_OFTEN:
                        f()
                } else f()
            }, function (e) {
            })
        }
    }, e.reloadCaptcha = function () {
        e.loginCaptchaUrl = u.refreshCaptcha();
        var t = $(".tips-verifycon");
        t.addClass("active"), setTimeout(function () {
            t.removeClass("active")
        }, 600)
    }, e.reloadCaptcha(), e.validateMobile = function () {
        e.form.mobile.$invalid || c.checkMobile({m: "get", cellphone: e.user.mobile, action: "check"}).then(function (t) {
            if (0 != t.errno)switch (t.errno) {
                case s.errnoMap.REGISTERED_CELLPHONE:
                    e.invalid.mobileRegistered = !1;
                    break;
                case s.errnoMap.ILLEGAL_CELLPHONE:
                    e.invalid.mobile = !1
            }
        }, function (e) {
        })
    }, e.validateMobileCaptcha = function () {
        if (!e.form.verification.$invalid)return e.form.mobile.$invalid ? void(e.invalid.mobileCaptchaValid = !1) : void c.checkMobileCaptcha({
            action: "renew",
            cellphone: e.user.mobile,
            cellphone_code: e.user.verification
        }).then(function (t) {
            if (0 != t.errno)switch (t.errno) {
                case s.errnoMap.INVALID_VCODE:
                case s.errnoMap.ILLEGAL_VCODE:
                    e.invalid.mobileCaptchaValid = !1;
                    break;
                case s.errnoMap.REFRECH_VCODE:
                    e.invalid.mobileCaptchaReload = !1
            }
        }, function (e) {
        })
    }, e.toLogin = function () {
        p ? i.path("/login/embed") : i.path("/login")
    }
}]), accountAppControllers.controller("ModifyAvatarCtrl", ["$scope", "$rootScope", "$http", "$q", "$location", "$window", "$timeout", "User", "Request", "$routeParams", "Config", "Validate", "Loading", function (e, t, o, n, i, r, a, c, s, u, l, d, p) {
    t.dialogTitle = "设置头像";
    var f = /embed/.test(i.$$url), m = (i.search().return_url, i.search().username), h = !1;
    if (f && r.parent == r)return void i.url("/result/illegality");
    var g, v, b, w = /\.(jpg|jpeg|png)$/i, y = 2097152, C = 500, E = 500, M = 340, R = 270, A = [(M - R) / 2, 0, R, R], L = {w: 0, h: 0}, k = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }, I = 50, V = ".jcrop-holder", O = (r.URL || (r.URL = r.webkitURL)) && r.URL.createObjectURL, U = !!O, D = $("#aim"), T = $("#avatar"), _ = $(".info"), q = function (t) {
        e.remindInfo = t, _.animate({bottom: "61px"}, {
            duration: 500, queue: !1, easing: "easeOutQuart", complete: function () {
                _.css({zIndex: 100}), e.closeInfo(3e3)
            }
        })
    };
    e.closeInfo = function (e) {
        b && a.cancel(b), b = a(function () {
            _.css({zIndex: -100}), _.animate({bottom: "25px"}, {
                duration: 500, queue: !1, easing: "easeOutQuart", complete: function () {
                }
            })
        }, e)
    };
    var S = function (e, t) {
        var o, n, i, r, a = e.width(), c = e.height();
        t = t || a / c, t > M / R ? (o = M, n = o / t, n < I && (n = I, o = n * t)) : (n = R, o = n * t, o < I && (o = I, n = o / t)), i = (R - n) / 2, r = (M - o) / 2, e.css({
            width: o,
            height: n,
            marginTop: i,
            marginLeft: r
        }), A[2] = A[3] = Math.min(o, n), A[0] = Math.max(0, (o - A[2]) / 2), A[1] = Math.max(0, (n - A[2]) / 2)
    }, N = function () {
        var e = D.attr("src"), t = T.attr("src");
        return function () {
            v && v.destroy(), T.attr("src", t), D.attr("src", e), T.css({backgroundColor: "transparent"}), D.css({backgroundColor: "transparent"})
        }
    }(), x = function () {
        var e, t, o, n, i = D.parent(), r = function (r) {
            if (parseInt(r.w) > 0) {
                o = i.width(), n = i.height();
                var a = o / r.w, c = n / r.h;
                D.css({
                    width: Math.round(a * e) + "px",
                    height: Math.round(c * t) + "px",
                    marginLeft: "-" + Math.round(a * r.x) + "px",
                    marginTop: "-" + Math.round(c * r.y) + "px"
                }), k.x = r.x / e * L.w, k.y = r.y / t * L.h, k.w = r.w / e * L.w, k.h = r.h / t * L.h;
                var s = +$(V).css("margin-left").slice(0, -2);
                s + r.x < 0 ? $(V).css("margin-left", -r.x) : s + r.x > M - r.w && $(V).css("margin-left", M - r.w - r.x);
                var u = +$(V).css("margin-top").slice(0, -2);
                u + r.y < 0 ? $(V).css("margin-top", -r.y) : u + r.y > R - r.h && $(V).css("margin-top", R - r.h - r.y)
            } else k.w = 0
        };
        return function () {
            v && v.destroy(), T.Jcrop({onChange: r, onSelect: r, minSize: [I, I], allowSelect: !0, aspectRatio: o / n || 1, setSelect: A}, function () {
                var o = this.getBounds();
                e = o[0], t = o[1], $(V).find("img").css({backgroundColor: "#fff"}), $("#editAreaMask")[0] && $("#editAreaMask").css({
                    position: "absolute",
                    filter: "alpha(opacity=40)",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#000"
                }).appendTo(V), $(V).css({marginTop: T.css("marginTop"), marginLeft: T.css("marginLeft")}), r({x: A[0], y: A[1], w: A[2], h: A[3]}), v = this, h = !0
            })
        }
    }();
    $("#upload").on("change", function (e) {
        h = !1;
        var t = this, o = (T[0], D[0], t.files && t.files[0] ? t.files[0].name : t.value), i = t.files && t.files[0] ? t.files[0].size : 0;
        if (!o || !w.test(o))return a(function () {
            q("文件格式错误，请重新选择")
        }, 0), t.value = "", void N();
        if (i > y)return a(function () {
            q("文件过大，请重新选择")
        }, 0), t.value = "", void N();
        T.css({width: "auto", height: "auto", display: "none"});
        var r = n.defer();
        U ? r.resolve(O(t.files[0])) : (p.start(), s.uploadImageForAvatar("upload").then(function (e) {
            switch (p.done(), +e.errno) {
                case l.errnoMap.OK:
                    r.resolve(e.data.avatar_url + "?" + +new Date);
                    break;
                case l.errnoMap.ILLEGAL_AVATAR:
                    q("文件格式错误，请重新选择")
            }
        }, function (e) {
            q("文件过大或格式错误，请重新选择"), N(), p.done()
        })), r.promise.then(function (e) {
            T.attr("src", e), D.attr("src", e), T.load(function () {
                L.w = T.width(), L.h = T.height(), g = L.w / L.h, S(T, g), T.unbind("load"), T.css({display: "block", backgroundColor: "#fff"}), D.css({backgroundColor: "#fff"}), x()
            })
        })
    });
    var P = function () {
        var e = n.defer(), t = new Image;
        return t.onload = function () {
            var o = document.createElement("canvas");
            k.w = k.h = Math.min(Math.round(k.w), Math.round(k.h)), o.width = Math.min(k.w, C), o.height = Math.min(k.h, E);
            var n = o.getContext("2d");
            n.drawImage(t, k.x, k.y, k.w, k.h, 0, 0, o.width, o.height);
            var i = o.toDataURL("image/png");
            i = i.replace(/^data\:image\/png\;base64\,/, ""), e.resolve(i)
        }, k.w ? t.src = O($("#upload")[0].files[0]) : (q("未选择图片区域"), e.reject()), e.promise
    }, j = function (e) {
        s.updataUserAvatar(e).then(function (e) {
            switch (p.done(), +e.errno) {
                case l.errnoMap.OK:
                    f ? r.parent !== r && r.parent.postMessage("isModifiedAvatar", t.targetOrigin) : i.path("/result/modifyAvatar");
                    break;
                default:
                    q("上传失败"), N()
            }
        }, function (e) {
            p.done()
        })
    };
    e.confirm = function () {
        if (!h)return q("请点击【重新选择】选择图片文件"), void N();
        p.start();
        var e = {}, o = n.defer();
        t.currentUid && (e.uid = t.currentUid), m && (e.username = m), e.cropped = U, U ? P().then(function (t) {
            e.imgData = t, o.resolve()
        }, function () {
            p.done()
        }) : (e.coordData = k, o.resolve()), o.promise.then(function () {
            j(e)
        })
    }, e.cancel = function () {
        f ? r.parent !== r && r.parent.postMessage("dialogClose", t.targetOrigin) : r.history.length > 1 && r.history.back(1)
    }
}]), accountAppControllers.controller("ModifyNameCtrl", ["$scope", "$rootScope", "$http", "$location", "Request", "Config", "Loading", "Validate", function (e, t, o, n, i, r, a, c) {
    t.dialogTitle = "设置昵称", e.invalid = {}, e.user = {}, e.util.submitted = !1;
    var s = n.search();
    e.modify = function () {
        if (e.util.submitted = !0, !e.form.$valid)return void c.checkErrNumber(e, e.form);
        a.start();
        var o = {"user[nickname]": e.user.nickname};
        t.currentUid && (o.uid = t.currentUid), s.username && (o.username = s.username), i.updateUserNickname(o).then(function (t) {
            switch (a.done(), +t.errno) {
                case r.errnoMap.OK:
                    n.path("/result/modifyName");
                    break;
                case r.errnoMap.INVALID_NICKNAME:
                    e.invalid.nickname = !1;
                    break;
                case r.errnoMap.REGISTERED_NICKNAME:
                    e.invalid.nicknameRegistered = !1;
                    break;
                case r.errnoMap.ILLEGAL_NICKNAME:
                    e.invalid.nicknameIllegal = !1
            }
        }, function (e) {
            a.done()
        })
    }
}]), accountAppControllers.controller("BindAccountCtrl", ["$scope", "$rootScope", "$window", "$http", "$location", "$timeout", "$interval", "Request", "Config", "User", "Validate", "Loading", "bindUserInfo", "Utils", function (e, t, o, n, i, r, a, c, s, u, l, d, p, f) {
    t.dialogTitle = "绑定手机", p.errno == s.errnoMap.OK && p.data.nickname && "" != p.data.nickname || i.path("/result/illegality").replace(), e.platformName = "微信", /qq/i.test(p.data.type) ? e.platformName = " QQ " : /weibo/i.test(p.data.type) && (e.platformName = "微博"), e.invalid = {}, e.focus = {}, e.showBtn = !0, e.user = {}, e.util.submitted = !1;
    var m = i.search().return_url;
    m || (m = s.officialURL), e.cccList = s.cccList, e.ccc = s.defaultCountryCode, e.country = s.defaultCountryName;
    var h = !1;
    e.showList = function (e) {
        h || ($(".country-list").show(), e.stopPropagation(), h = !0, $(".wrapper").one("click", function () {
            $(".country-list").hide(), h = !1
        }))
    }, e.changeCountry = function (t, o) {
        e.ccc = t.slice(1) || e.ccc, e.country = o || e.country, e.form.mobile.$setValidity("mobile", !0), e.form.mobile.$setValidity("mobileRegistered", !0), e.validateMobile()
    }, e.submitInfo = function () {
        if (e.util.submitted = !0, e.form.$invalid) {
            if (e.errAnimation = {}, e.form.mobile.$invalid)return void(e.errAnimation.mobile = !0);
            if (e.form.captcha.$invalid)return;
            return void e.form.verification.$invalid
        }
        d.start(), e.clicked = !0, c.bindMobile({"user[cellphone]": "+" + e.ccc + " " + e.user.mobile, "ext[cellphone_code]": e.user.verification}).then(function (t) {
            switch (d.done(), e.clicked = !1, +t.errno) {
                case s.errnoMap.INVALID_VCODE:
                    e.invalid.mobileCaptchaValid = !1;
                    break;
                case s.errnoMap.REFRECH_VCODE:
                    e.invalid.mobileCaptchaReload = !1;
                    break;
                case s.errnoMap.OPENID_OTHER_REGISTERED:
                    e.form.mobile.$setValidity("mobileOtherRegistered", !1);
                    break;
                case s.errnoMap.OPENID_REGISTERED:
                    e.form.mobile.$setValidity("openidOtherRegistered", !1);
                    break;
                case s.errnoMap.OK:
                    i.path("/result/bindAccount").search({return_url: f.unicode(m)}).replace();
                    break;
                case s.errnoMap.CELLPHONE_NO_REGISTER:
                    i.path("/bindPassword").search({return_url: f.unicode(m)}).replace();
                    break;
                case s.errnoMap.NO_AUTH:
                    i.path("/result/illegality").replace()
            }
        }, function (t) {
            d.done(), e.clicked = !1
        })
    };
    var g = function () {
        var t = 60;
        e.timer = t, e.showBtn = !1, a(function () {
            e.timer--
        }, 1e3, t).then(function () {
            e.showBtn = !0
        })
    };
    e.resend = function () {
        if (e.captchaSubmitted = !0, e.form.mobile.$invalid)return e.errAnimation = {}, void(e.errAnimation.mobile = !0);
        if (!e.form.captcha.$invalid) {
            var t = {cellphone: "+" + e.ccc + " " + e.user.mobile, captcha: e.user.captcha};
            e.captchaSubmitted = !0, c.sendBindMobileCaptcha(t).then(function (t) {
                if (e.captchaSubmitted = !1, 0 != t.errno)switch (+t.errno) {
                    case s.errnoMap.REGISTERED_CELLPHONE:
                        break;
                    case s.errnoMap.ILLEGAL_CELLPHONE:
                        e.invalid.mobile = !1;
                        break;
                    case s.errnoMap.ILLEGAL_VCODE:
                        e.invalid.captchaValid = !1;
                        break;
                    case s.errnoMap.INVALID_VCODE:
                        e.invalid.captchaValid = !1;
                        break;
                    case s.errnoMap.CAPTCHA_REQUIRED:
                        e.reloadCaptcha(), e.focus.captcha = !0;
                        break;
                    case s.errnoMap.REFRECH_VCODE:
                        e.invalid.captchaValid = !1, e.reloadCaptcha(), e.focus.captcha = !0;
                        break;
                    case s.errnoMap.VCODE_TOO_OFTEN:
                        g()
                } else g()
            }, function (e) {
            })
        }
    }, e.reloadCaptcha = function () {
        e.loginCaptchaUrl = u.refreshCaptcha();
        var t = $(".tips-verifycon");
        t.addClass("active"), setTimeout(function () {
            t.removeClass("active")
        }, 600)
    }, e.reloadCaptcha(), e.validateMobile = function () {
        if (e.form.mobile.$setValidity("mobileOtherRegistered", !0), e.form.mobile.$setValidity("openidOtherRegistered", !0), "86" == e.ccc) {
            if (!s.regExp.isCnMobile.test(e.user.mobile))return void e.form.mobile.$setValidity("mobile", !1)
        } else if (!s.regExp.isMobile.test(e.user.mobile))return void e.form.mobile.$setValidity("mobile", !1)
    }, e.validateMobileCaptcha = function () {
        if (!e.form.verification.$invalid)return e.form.mobile.$invalid ? void(e.invalid.mobileCaptchaValid = !1) : void c.checkMobileCaptcha({
            action: "renew",
            cellphone: "+" + e.ccc + " " + e.user.mobile,
            cellphone_code: e.user.verification
        }).then(function (t) {
            if (0 != t.errno)switch (t.errno) {
                case s.errnoMap.INVALID_VCODE:
                case s.errnoMap.ILLEGAL_VCODE:
                    e.invalid.mobileCaptchaValid = !1;
                    break;
                case s.errnoMap.REFRECH_VCODE:
                    e.invalid.mobileCaptchaReload = !1
            }
        }, function (e) {
        })
    }
}]), accountAppControllers.controller("BindPasswordCtrl", ["$scope", "$rootScope", "$window", "$http", "$location", "$timeout", "$interval", "Request", "Config", "User", "Validate", "Loading", "bindUserInfo", "Utils", function (e, t, o, n, i, r, a, c, s, u, l, d, p, f) {
    t.dialogTitle = "设置手机号登录密码", p.errno == s.errnoMap.OK && p.data.nickname && "" != p.data.nickname || i.path("/result/illegality").replace(), e.platformName = "微信", /qq/i.test(p.data.type) ? e.platformName = " QQ " : /weibo/i.test(p.data.type) && (e.platformName = "微博"), e.invalid = {}, e.focus = {}, e.showBtn = !0, e.user = {}, e.passCheck = function () {
        e.form.password.$setValidity("serverError", !0), e.form.password.$setValidity("mobileOtherRegistered", !0), e.form.password.$setValidity("openidOtherRegistered", !0)
    }, e.util.submitted = !1;
    var m = i.search().return_url;
    m || (m = s.officialURL), e.submitInfo = function () {
        if (e.util.submitted = !0, e.form.$invalid) {
            if (e.errAnimation = {}, e.form.password.$invalid)return void(e.errAnimation.password = !0);
            if (e.form.repassword.$invalid)return void(e.errAnimation.repassword = !0)
        } else d.start(), e.clicked = !0, c.bindPassword({"user[password]": e.user.password}).then(function (t) {
            switch (d.done(), e.clicked = !1, +t.errno) {
                case s.errnoMap.OK:
                    i.path("/result/bindAccount").search({return_url: f.unicode(m)}).replace();
                    break;
                case s.errnoMap.OPENID_OTHER_REGISTERED:
                    e.form.password.$setValidity("mobileOtherRegistered", !1);
                    break;
                case s.errnoMap.OPENID_REGISTERED:
                    e.form.password.$setValidity("openidOtherRegistered", !1);
                    break;
                default:
                    e.form.password.$setValidity("serverError", !1)
            }
        }, function (t) {
            d.done(), e.clicked = !1
        })
    }
}]), accountAppDirectives.directive("iAutoFocus", ["$timeout", "Utils", function (e, t) {
    return {
        restrict: "A", require: "ngModel", link: function (o, n, i, r) {
            n && (t.isMobile() || (e(function () {
                n.focus()
            }, 10), e(function () {
                location.hash.indexOf("v2/login") >= 0 && n.val() && "" != n.val() && $(".btn-wrapper .btn").removeClass("disabled")
            }, 800)))
        }
    }
}]).directive("focusOn", ["$timeout", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            t.$watch(n.focusOn, function (t) {
                t && e(function () {
                    o.focus()
                }, 10)
            })
        }
    }
}]).directive("selectOn", ["$timeout", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            t.$watch(n.selectOn, function (t) {
                t && e(function () {
                    o.select()
                }, 10)
            })
        }
    }
}]).directive("iFocus", [function () {
    var e = "i-focused";
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            i.$focused = !1, i.$blurred = !1, o.on("focus", function (n) {
                o.addClass(e), t.$apply(function () {
                    i.$focused = !0
                })
            }).on("blur", function (n) {
                o.removeClass(e), t.$apply(function () {
                    i.$focused = !1, i.$blurred = !0
                })
            }).on("keydown", function (e) {
                t.$apply(function () {
                    i.$blurred = !1
                })
            })
        }
    }
}]).directive("iBlur", [function () {
    var e = "i-blurred";
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            i.$blurred = !1, o.on("keydown", function (n) {
                o.removeClass(e), t.$apply(function () {
                    i.$blurred = !1
                })
            }).on("blur", function (n) {
                o.addClass(e), t.$apply(function () {
                    i.$blurred = !0
                })
            })
        }
    }
}]).directive("iInput", function () {
    return {
        restrict: "A", require: "ngModel", link: function (e, t, o, n) {
            t.on("focus", function () {
                $(this).parent(".input").addClass("focus"), jQuery.support.opacity && $(this).parent(".input").animate({opacity: 1}, {queue: !1, duration: 300})
            }), t.on("blur", function () {
                if ($(this).parent(".input").removeClass("focus"), !$(this).val()) {
                    if ($(this).prev(".placeholder").show(), !jQuery.support.opacity)return;
                    $(this).parent(".input").animate({opacity: .618}, {queue: !1, duration: 300})
                }
            }), t.on("keydown input", function (t) {
                if ($(this).prev(".placeholder").hide(), 13 != t.which)switch (n.$submitted = !1, e.util.submitted = !1, e.errAnimation = {}, angular.forEach(e.focus, function (t, o) {
                    e.focus[o] = !1
                }), n.$name) {
                    case"username":
                        e.invalid.nameValid = !0, e.invalid.passwordValid = !0;
                        break;
                    case"password":
                        e.invalid.passwordValid = !0;
                        break;
                    case"oldpassword":
                        e.invalid.oldpasswordValid = !0;
                        break;
                    case"captcha":
                        e.invalid.captchaValid = !0, e.invalid.captchaReload = !0;
                        break;
                    case"mobile":
                        e.invalid.mobile = !0, e.invalid.mobileRegistered = !0;
                        break;
                    case"mail":
                        e.invalid.emailRegistered = !0;
                        break;
                    case"nickname":
                        e.invalid.nickname = !0, e.invalid.nicknameRegistered = !0, e.invalid.nicknameIllegal = !0;
                        break;
                    case"verification":
                        e.invalid.mobileCaptchaValid = !0, e.invalid.mobileCaptchaReload = !0;
                        break;
                    case"answer1":
                    case"answer2":
                        e.invalid.answerInvalid = !0
                }
            }), e.$watch("util.submitted", function (e) {
                e && (n.$submitted = !0, n.$blurred = !0)
            })
        }
    }
}).directive("iUsername", ["Config", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            i.$parsers.push(function (o) {
                var n = t.showCcc ? e.regExp.isMobile.test(o) : e.regExp.isMail.test(o) || e.regExp.isCnMobile.test(o);
                return !o || n ? (i.$setValidity(i.$name, !0), o) : void i.$setValidity(i.$name, !1)
            })
        }
    }
}]).directive("iPassword", ["Config", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            i.$parsers.push(function (t) {
                return t = t || "", !t || e.regExp.isPassword.test(t) ? (i.$setValidity("password", !0), t) : void i.$setValidity("password", !1)
            })
        }
    }
}]).directive("iRepassword", ["Config", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (e, t, o, n) {
            e.$watch(function () {
                return e.user && e.user.repassword == e.user.password
            }, function (e, t) {
                e != t && (e ? n.$setValidity("repassword", !0) : n.$setValidity("repassword", !1))
            })
        }
    }
}]).directive("iMobile", ["Config", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            i.$parsers.push(function (t) {
                return !t || e.regExp.isMobile.test(t) ? (i.$setValidity(i.$name, !0), t) : void i.$setValidity(i.$name, !1)
            })
        }
    }
}]).directive("iMail", ["Config", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            i.$parsers.push(function (t) {
                return !t || e.regExp.isMail.test(t) ? (i.$setValidity(i.$name, !0), t) : void i.$setValidity(i.$name, !1)
            })
        }
    }
}]).directive("iResponse", ["Validate", function (e) {
    return {
        restrict: "A", require: "ngModel", link: function (t, o, n, i) {
            switch (i.$name) {
                case"username":
                    t.$watch("invalid.nameValid", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("nameValid", !0) : (i.$setValidity("nameValid", !1), e.checkErrNumber(t, t.form))
                    });
                    break;
                case"nickname":
                    t.$watch("invalid.nickname", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("nickname", !0) : (i.$setValidity("nickname", !1), e.checkErrNumber(t, t.form))
                    }), t.$watch("invalid.nicknameRegistered", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("nicknameRegistered", !0) : (i.$setValidity("nicknameRegistered", !1), e.checkErrNumber(t, t.form))
                    }), t.$watch("invalid.nicknameIllegal", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("nicknameIllegal", !0) : (i.$setValidity("nicknameIllegal", !1), e.checkErrNumber(t, t.form))
                    });
                    break;
                case"password":
                    t.$watch("invalid.passwordValid", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("passwordValid", !0) : (i.$setValidity("passwordValid", !1), e.checkErrNumber(t, t.form))
                    });
                    break;
                case"oldpassword":
                    t.$watch("invalid.oldpasswordValid", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("oldpasswordValid", !0) : (i.$setValidity("oldpasswordValid", !1), e.checkErrNumber(t, t.form))
                    });
                    break;
                case"captcha":
                    t.$watch("invalid.captchaValid", function (e) {
                        e = "undefined" == typeof e || e, e ? i.$setValidity("captchaValid", !0) : i.$setValidity("captchaValid", !1)
                    }), t.$watch("invalid.captchaReload", function (e) {
                        e = "undefined" == typeof e || e, e ? i.$setValidity("captchaReload", !0) : i.$setValidity("captchaReload", !1)
                    });
                    break;
                case"mobile":
                    t.$watch("invalid.mobileRegistered", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("mobileRegistered", !0) : (i.$setValidity("mobileRegistered", !1), e.checkErrNumber(t, t.form))
                    }), t.$watch("invalid.mobile", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("mobile", !0) : (i.$setValidity("mobile", !1), e.checkErrNumber(t, t.form))
                    });
                    break;
                case"mail":
                    t.$watch("invalid.emailRegistered", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("emailRegistered", !0) : (i.$setValidity("emailRegistered", !1), e.checkErrNumber(t, t.form))
                    }), t.$watch("invalid.mail", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("mail", !0) : (i.$setValidity("mail", !1), e.checkErrNumber(t, t.form))
                    });
                    break;
                case"verification":
                    t.$watch("invalid.mobileCaptchaValid", function (e) {
                        e = "undefined" == typeof e || e, e ? i.$setValidity("mobileCaptchaValid", !0) : i.$setValidity("mobileCaptchaValid", !1)
                    }), t.$watch("invalid.mobileCaptchaReload", function (e) {
                        e = "undefined" == typeof e || e, e ? i.$setValidity("mobileCaptchaReload", !0) : i.$setValidity("mobileCaptchaReload", !1)
                    });
                    break;
                case"answer1":
                case"answer2":
                    t.$watch("invalid.answerInvalid", function (o) {
                        o = "undefined" == typeof o || o, o ? i.$setValidity("answerInvalid", !0) : (i.$setValidity("answerInvalid", !1), e.checkErrNumber(t, t.form))
                    })
            }
        }
    }
}]).directive("iShow", ["$timeout", function (e) {
    return {
        restrict: "A", link: function (e, t, o, n) {
            e.$watch(o.iShow, function (e) {
                e ? jQuery.support.opacity ? t.stop().show().animate({opacity: 1}, {queue: !1, duration: 300}) : t.stop().show() : jQuery.support.opacity ? t.stop().animate({opacity: 0}, {
                    duration: 300,
                    done: function () {
                        t.hide()
                    }
                }) : t.stop().hide()
            })
        }
    }
}]).directive("iWarning", ["$timeout", "Utils", function (e, t) {
    return {
        restrict: "A", link: function (o, n, i, r) {
            var a = n.parent(".input");
            o.$watch(i.iWarning, function (o, i) {
                if (!!o != !!i && (o ? (a.addClass("invalid"), jQuery.support.opacity ? n.stop().show().animate({opacity: 1}, {
                        queue: !1,
                        duration: 300
                    }) : n.stop().show()) : (a.removeClass("invalid"), jQuery.support.opacity ? n.stop().animate({opacity: 0}, {
                        duration: 300, done: function () {
                            n.hide()
                        }
                    }) : n.stop().hide()), t.isMobile() && $("body").attr("class").indexOf("v2") >= 0)) {
                    var r = $(".warning");
                    r.addClass("notice-m");
                    for (var c = !1, s = null, u = 0; u <= r.length; u++) {
                        var l = $(r[u]);
                        l.css({marginRight: -(l.outerWidth() / 2)}), !c && l.css("display") && l.css("display").indexOf("none") < 0 ? (c = !0, s = l) : c && l.hide()
                    }
                    c && e(function () {
                        s.hide()
                    }, 2500)
                }
            })
        }
    }
}]).directive("slideDown", ["$timeout", "$location", function (e, t) {
    return {
        restrict: "A", link: function (e, t, o, n) {
            e.isMobile || e.$watch(o.slideDown, function (e) {
                if (e) {
                    t.show();
                    var o = t.parents(".content").outerHeight(!0), n = 500, i = $(".title").outerHeight(!0), r = $(".copyright").outerHeight();
                    $(".dialog").animate({"margin-top": -(o + i + r) / 2}, {duration: n, queue: !1, easing: "easeOutQuart"}), t.hide().slideDown({duration: n, easing: "easeOutQuart"})
                }
            })
        }
    }
}]).directive("slideDownRegisterRepeat", ["$timeout", function (e) {
    return {
        restrict: "A", link: function (e, t, o, n) {
            e.$watch(o.slideDownRegisterRepeat, function (e) {
                if (e) {
                    if (t.css("display").indexOf("none") < 0)return;
                    t.show();
                    var o = t.parents(".content").outerHeight(), n = 500, i = $(".title").outerHeight();
                    $(".dialog").animate({"margin-top": -(o + i) / 2}, {duration: n, queue: !1, easing: "easeOutQuart"}), t.hide().slideDown({duration: n, easing: "easeOutQuart"})
                }
            })
        }
    }
}]).directive("iAnimation", ["Utils", function (e) {
    return {
        restrict: "A", link: function (e, t, o, n) {
            e.$watch(o.iAnimation, function (o) {
                o && (t.stop(!0).animate({left: "-15px"}, 50).animate({left: "20px"}, 80).animate({left: "-10px"}, 80).animate({left: "5px"}, 80).animate({left: "0px"}, 80), e.animationTip && (e.animationTip = !1), e.errAnimation = {}, e.$parent.errAnimation = {})
            })
        }
    }
}]).directive("iEnter", [function () {
    return function (e, t, o, n) {
        t.bind("keydown keypress", function (t) {
            13 == t.which && (e.$apply(function () {
                e.$eval(o.iEnter, {event: t})
            }), t.preventDefault())
        })
    }
}]).directive("limitLength", [function () {
    return {
        restrict: "A", require: "ngModel", link: function (e, t, o, n) {
            n.$parsers.push(function (e) {
                return e && e.length != +o.limitLength ? void n.$setValidity("limitlength", !1) : (n.$setValidity("limitlength", !0), e)
            })
        }
    }
}]).directive("inputRadius", [function () {
    return {
        restrict: "A", link: function (e, t, o, n) {
            t.find(":first").before('<div class="radius-left"></div><div class="radius-center"></div><div class="radius-right"></div>')
        }
    }
}]).directive("btnRadius", [function () {
    return {
        restrict: "A", link: function (e, t, o, n) {
            t.find(":first").before('<div class="radius-left"></div><div class="radius-right"></div>')
        }
    }
}]).directive("copyrightYear", [function () {
    return {
        restrict: "A", link: function (e, t, o, n) {
            var i = new Date, r = (i.getFullYear(), i.getMonth() + 1, 2016);
            $(t).html(r)
        }
    }
}]).directive("iLabel", [function () {
    return {
        restrict: "A", link: function (e, t, o, n) {
            if (!e.isMobile) {
                var i = o.iLabel, r = i + "_mousedown";
                t.on("click", function () {
                    $("#" + i).focus()
                }).on("mousedown", function () {
                    e[r] = !0
                }).on("mouseup", function () {
                    e[r] = !1
                })
            }
        }
    }
}]), accountAppAnimations.animation(".content", ["$rootScope", "$timeout", "$location", function (e, t, o) {
    return {
        enter: function (o, n) {
            if (o = $(o), e.isMobile)return void n();
            var i = o.height(), r = o.outerHeight(!0), a = $(".title").outerHeight(!0), c = $(".copyright").outerHeight(), s = e.isRefresh ? 0 : 500;
            return o.css({height: e.height}), o.animate({height: i}, {
                duration: s, queue: !1, easing: "easeOutQuart", complete: function () {
                    o.css({height: "auto"}), e.height = o.height()
                }
            }), $(".dialog").animate({"margin-top": -(r + a + c) / 2}, {
                duration: s,
                queue: !1,
                easing: "easeOutQuart"
            }), e.isRefresh ? void(e.isRefresh = !1) : void(jQuery.support.opacity ? (o.css({opacity: 0}), t(function () {
                o.animate({opacity: 1}, 300, n)
            }, s)) : (o.show(), n()))
        }, leave: function (t, o) {
            return t = $(t), e.isMobile ? void o() : (e.isFirstSwitch = !0, t.css({
                position: "absolute",
                width: "100%",
                boxSizing: "border-box"
            }), void(jQuery.support.opacity && !e.dialogChangeFlag ? t.animate({opacity: 0}, 100, o) : (t.hide(), o())))
        }
    }
}]).animation(".animate-switch", ["$rootScope", "$timeout", function (e, t) {
    return {
        enter: function (o, n) {
            if (e.isMobile)return void n();
            if (!e.isFirstSwitch) {
                o = o.parents(".content");
                var i = o.height(), r = o.outerHeight(), a = $(".title").outerHeight(), c = 500;
                o.css({height: e.height}), o.animate({height: i}, {
                    duration: c, queue: !1, easing: "easeOutQuart", complete: function () {
                        o.css({height: "auto"}), e.height = o.height()
                    }
                }), $(".dialog").animate({"margin-top": -(r + a) / 2}, {duration: c, queue: !1, easing: "easeOutQuart"}), jQuery.support.opacity ? (o.css({opacity: 0}), t(function () {
                    o.animate({opacity: 1}, 300)
                }, c, n)) : (o.show(), n())
            }
        }, leave: function (t, o) {
            return e.isMobile ? void o() : (e.isFirstSwitch = !1, t.css({position: "absolute"}), void(jQuery.support.opacity ? t.animate({opacity: 0}, 100, o) : (t.hide(), o())))
        }
    }
}]), function (e) {
    e.Jcrop = function (t, o) {
        function n(e) {
            return Math.round(e) + "px"
        }

        function i(e) {
            return _.baseClass + "-" + e
        }

        function r() {
            return e.fx.step.hasOwnProperty("backgroundColor")
        }

        function a(t) {
            var o = e(t).offset();
            return [o.left, o.top]
        }

        function c(e) {
            return [e.pageX - T[0], e.pageY - T[1]]
        }

        function s(t) {
            "object" != typeof t && (t = {}), _ = e.extend(_, t), e.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (e, t) {
                "function" != typeof _[t] && (_[t] = function () {
                })
            })
        }

        function u(e, t, o) {
            if (T = a(Q), me.setCursor("move" === e ? e : e + "-resize"), "move" === e)return me.activateHandlers(d(t), g, o);
            var n = de.getFixed(), i = p(e), r = de.getCorner(p(i));
            de.setPressed(de.getCorner(i)), de.setCurrent(r), me.activateHandlers(l(e, n), g, o)
        }

        function l(e, t) {
            return function (o) {
                if (_.aspectRatio)switch (e) {
                    case"e":
                        o[1] = t.y + 1;
                        break;
                    case"w":
                        o[1] = t.y + 1;
                        break;
                    case"n":
                        o[0] = t.x + 1;
                        break;
                    case"s":
                        o[0] = t.x + 1
                } else switch (e) {
                    case"e":
                        o[1] = t.y2;
                        break;
                    case"w":
                        o[1] = t.y2;
                        break;
                    case"n":
                        o[0] = t.x2;
                        break;
                    case"s":
                        o[0] = t.x2
                }
                de.setCurrent(o), fe.update()
            }
        }

        function d(e) {
            var t = e;
            return he.watchKeys(), function (e) {
                de.moveOffset([e[0] - t[0], e[1] - t[1]]), t = e, fe.update()
            }
        }

        function p(e) {
            switch (e) {
                case"n":
                    return "sw";
                case"s":
                    return "nw";
                case"e":
                    return "nw";
                case"w":
                    return "ne";
                case"ne":
                    return "sw";
                case"nw":
                    return "se";
                case"se":
                    return "nw";
                case"sw":
                    return "ne"
            }
        }

        function f(e) {
            return function (t) {
                return !_.disabled && (!("move" === e && !_.allowMove) && (T = a(Q), ne = !0, u(e, c(t)), t.stopPropagation(), t.preventDefault(), !1))
            }
        }

        function m(e, t, o) {
            var n = e.width(), i = e.height();
            n > t && t > 0 && (n = t, i = t / e.width() * e.height()), i > o && o > 0 && (i = o, n = o / e.height() * e.width()), te = e.width() / n, oe = e.height() / i, e.width(n).height(i)
        }

        function h(e) {
            return {x: e.x * te, y: e.y * oe, x2: e.x2 * te, y2: e.y2 * oe, w: e.w * te, h: e.h * oe}
        }

        function g(e) {
            var t = de.getFixed();
            t.w > _.minSelect[0] && t.h > _.minSelect[1] ? (fe.enableHandles(), fe.done()) : fe.release(), me.setCursor(_.allowSelect ? "crosshair" : "default")
        }

        function v(e) {
            if (_.disabled)return !1;
            if (!_.allowSelect)return !1;
            ne = !0, T = a(Q), fe.disableHandles(), me.setCursor("crosshair");
            var t = c(e);
            return de.setPressed(t), fe.update(), me.activateHandlers(b, g, "touch" === e.type.substring(0, 5)), he.watchKeys(), e.stopPropagation(), e.preventDefault(), !1
        }

        function b(e) {
            de.setCurrent(e), fe.update()
        }

        function w() {
            var t = e("<div></div>").addClass(i("tracker"));
            return S && t.css({opacity: 0, backgroundColor: "white"}), t
        }

        function y(e) {
            F.removeClass().addClass(i("holder")).addClass(e)
        }

        function C(e, t) {
            function o() {
                window.setTimeout(b, d)
            }

            var n = e[0] / te, i = e[1] / oe, r = e[2] / te, a = e[3] / oe;
            if (!ie) {
                var c = de.flipCoords(n, i, r, a), s = de.getFixed(), u = [s.x, s.y, s.x2, s.y2], l = u, d = _.animationDelay, p = c[0] - u[0], f = c[1] - u[1], m = c[2] - u[2], h = c[3] - u[3], g = 0, v = _.swingSpeed;
                n = l[0], i = l[1], r = l[2], a = l[3], fe.animMode(!0);
                var b = function () {
                    return function () {
                        g += (100 - g) / v, l[0] = Math.round(n + g / 100 * p), l[1] = Math.round(i + g / 100 * f), l[2] = Math.round(r + g / 100 * m), l[3] = Math.round(a + g / 100 * h), g >= 99.8 && (g = 100), g < 100 ? ($(l), o()) : (fe.done(), fe.animMode(!1), "function" == typeof t && t.call(ge))
                    }
                }();
                o()
            }
        }

        function E(e) {
            $([e[0] / te, e[1] / oe, e[2] / te, e[3] / oe]), _.onSelect.call(ge, h(de.getFixed())), fe.enableHandles()
        }

        function $(e) {
            de.setPressed([e[0], e[1]]), de.setCurrent([e[2], e[3]]), fe.update()
        }

        function M() {
            return h(de.getFixed())
        }

        function R() {
            return de.getFixed()
        }

        function A(e) {
            s(e), D()
        }

        function L() {
            _.disabled = !0, fe.disableHandles(), fe.setCursor("default"), me.setCursor("default")
        }

        function k() {
            _.disabled = !1, D()
        }

        function I() {
            fe.done(), me.activateHandlers(null, null)
        }

        function V() {
            F.remove(), P.show(), P.css("visibility", "visible"), e(t).removeData("Jcrop")
        }

        function O(e, t) {
            fe.release(), L();
            var o = new Image;
            o.onload = function () {
                var n = o.width, i = o.height, r = _.boxWidth, a = _.boxHeight;
                Q.width(n).height(i), Q.attr("src", e), K.attr("src", e), m(Q, r, a), G = Q.width(), B = Q.height(), K.width(G).height(B), ce.width(G + 2 * ae).height(B + 2 * ae), F.width(G).height(B), pe.resize(G, B), k(), "function" == typeof t && t.call(ge)
            }, o.src = e
        }

        function U(e, t, o) {
            var n = t || _.bgColor;
            _.bgFade && r() && _.fadeTime && !o ? e.animate({backgroundColor: n}, {queue: !1, duration: _.fadeTime}) : e.css("backgroundColor", n)
        }

        function D(e) {
            _.allowResize ? e ? fe.enableOnly() : fe.enableHandles() : fe.disableHandles(), me.setCursor(_.allowSelect ? "crosshair" : "default"), fe.setCursor(_.allowMove ? "move" : "default"), _.hasOwnProperty("trueSize") && (te = _.trueSize[0] / G, oe = _.trueSize[1] / B), _.hasOwnProperty("setSelect") && (E(_.setSelect), fe.done(), delete _.setSelect), pe.refresh(), _.bgColor != se && (U(_.shade ? pe.getShades() : F, _.shade ? _.shadeColor || _.bgColor : _.bgColor), se = _.bgColor), ue != _.bgOpacity && (ue = _.bgOpacity, _.shade ? pe.refresh() : fe.setBgOpacity(ue)), X = _.maxSize[0] || 0, Y = _.maxSize[1] || 0, Z = _.minSize[0] || 0, ee = _.minSize[1] || 0, _.hasOwnProperty("outerImage") && (Q.attr("src", _.outerImage), delete _.outerImage), fe.refresh()
        }

        var T, _ = e.extend({}, e.Jcrop.defaults), q = navigator.userAgent.toLowerCase(), S = /msie/.test(q), N = /msie [1-6]\./.test(q);
        "object" != typeof t && (t = e(t)[0]), "object" != typeof o && (o = {}), s(o);
        var x = {border: "none", visibility: "visible", margin: 0, padding: 0, position: "absolute", top: 0, left: 0}, P = e(t), j = !0;
        if ("IMG" == t.tagName) {
            if (0 != P[0].width && 0 != P[0].height)P.width(P[0].width), P.height(P[0].height); else {
                var H = new Image;
                H.src = P[0].src, P.width(H.width), P.height(H.height)
            }
            var Q = P.clone().removeAttr("id").css(x).show();
            Q.width(P.width()), Q.height(P.height()), P.after(Q).hide()
        } else Q = P.css(x).show(), j = !1, null === _.shade && (_.shade = !0);
        m(Q, _.boxWidth, _.boxHeight);
        var G = Q.width(), B = Q.height(), F = e("<div />").width(G).height(B).addClass(i("holder")).css({position: "relative", backgroundColor: _.bgColor}).insertAfter(P).append(Q);
        _.addClass && F.addClass(_.addClass);
        var K = e("<div />"), W = e("<div />").width("100%").height("100%").css({
            zIndex: 310,
            position: "absolute",
            overflow: "hidden"
        }), z = e("<div />").width("100%").height("100%").css("zIndex", 320), J = e("<div />").css({position: "absolute", zIndex: 600}).dblclick(function () {
            var e = de.getFixed();
            _.onDblClick.call(ge, e)
        }).insertBefore(Q).append(W, z);
        j && (K = e("<img />").attr("src", Q.attr("src")).css(x).width(G).height(B), W.append(K)), N && J.css({overflowY: "hidden"});
        var X, Y, Z, ee, te, oe, ne, ie, re, ae = _.boundary, ce = w().width(G + 2 * ae).height(B + 2 * ae).css({
            position: "absolute",
            top: n(-ae),
            left: n(-ae),
            zIndex: 290
        }).mousedown(v), se = _.bgColor, ue = _.bgOpacity;
        T = a(Q);
        var le = function () {
            function e() {
                var e, t = {}, o = ["touchstart", "touchmove", "touchend"], n = document.createElement("div");
                try {
                    for (e = 0; e < o.length; e++) {
                        var i = o[e];
                        i = "on" + i;
                        var r = i in n;
                        r || (n.setAttribute(i, "return;"), r = "function" == typeof n[i]), t[o[e]] = r
                    }
                    return t.touchstart && t.touchend && t.touchmove
                } catch (a) {
                    return !1
                }
            }

            function t() {
                return _.touchSupport === !0 || _.touchSupport === !1 ? _.touchSupport : e()
            }

            return {
                createDragger: function (e) {
                    return function (t) {
                        return !_.disabled && (!("move" === e && !_.allowMove) && (T = a(Q), ne = !0, u(e, c(le.cfilter(t)), !0), t.stopPropagation(), t.preventDefault(), !1))
                    }
                }, newSelection: function (e) {
                    return v(le.cfilter(e))
                }, cfilter: function (e) {
                    return e.pageX = e.originalEvent.changedTouches[0].pageX, e.pageY = e.originalEvent.changedTouches[0].pageY, e
                }, isSupported: e, support: t()
            }
        }(), de = function () {
            function e(e) {
                e = a(e), m = p = e[0], h = f = e[1]
            }

            function t(e) {
                e = a(e), l = e[0] - m, d = e[1] - h, m = e[0], h = e[1]
            }

            function o() {
                return [l, d]
            }

            function n(e) {
                var t = e[0], o = e[1];
                0 > p + t && (t -= t + p), 0 > f + o && (o -= o + f), B < h + o && (o += B - (h + o)), G < m + t && (t += G - (m + t)), p += t, m += t, f += o, h += o
            }

            function i(e) {
                var t = r();
                switch (e) {
                    case"ne":
                        return [t.x2, t.y];
                    case"nw":
                        return [t.x, t.y];
                    case"se":
                        return [t.x2, t.y2];
                    case"sw":
                        return [t.x, t.y2]
                }
            }

            function r() {
                if (!_.aspectRatio)return s();
                var e, t, o, n, i = _.aspectRatio, r = _.minSize[0] / te, a = _.maxSize[0] / te, l = _.maxSize[1] / oe, d = m - p, g = h - f, v = Math.abs(d), b = Math.abs(g), w = v / b;
                return 0 === a && (a = 10 * G), 0 === l && (l = 10 * B), w < i ? (t = h, o = b * i, e = d < 0 ? p - o : o + p, e < 0 ? (e = 0, n = Math.abs((e - p) / i), t = g < 0 ? f - n : n + f) : e > G && (e = G, n = Math.abs((e - p) / i), t = g < 0 ? f - n : n + f)) : (e = m, n = v / i, t = g < 0 ? f - n : f + n, t < 0 ? (t = 0, o = Math.abs((t - f) * i), e = d < 0 ? p - o : o + p) : t > B && (t = B, o = Math.abs(t - f) * i, e = d < 0 ? p - o : o + p)), e > p ? (e - p < r ? e = p + r : e - p > a && (e = p + a), t = t > f ? f + (e - p) / i : f - (e - p) / i) : e < p && (p - e < r ? e = p - r : p - e > a && (e = p - a), t = t > f ? f + (p - e) / i : f - (p - e) / i), e < 0 ? (p -= e, e = 0) : e > G && (p -= e - G, e = G), t < 0 ? (f -= t, t = 0) : t > B && (f -= t - B, t = B), u(c(p, f, e, t))
            }

            function a(e) {
                return e[0] < 0 && (e[0] = 0),
                e[1] < 0 && (e[1] = 0), e[0] > G && (e[0] = G), e[1] > B && (e[1] = B), [Math.round(e[0]), Math.round(e[1])]
            }

            function c(e, t, o, n) {
                var i = e, r = o, a = t, c = n;
                return o < e && (i = o, r = e), n < t && (a = n, c = t), [i, a, r, c]
            }

            function s() {
                var e, t = m - p, o = h - f;
                return X && Math.abs(t) > X && (m = t > 0 ? p + X : p - X), Y && Math.abs(o) > Y && (h = o > 0 ? f + Y : f - Y), ee / oe && Math.abs(o) < ee / oe && (h = o > 0 ? f + ee / oe : f - ee / oe), Z / te && Math.abs(t) < Z / te && (m = t > 0 ? p + Z / te : p - Z / te), p < 0 && (m -= p, p -= p), f < 0 && (h -= f, f -= f), m < 0 && (p -= m, m -= m), h < 0 && (f -= h, h -= h), m > G && (e = m - G, p -= e, m -= e), h > B && (e = h - B, f -= e, h -= e), p > G && (e = p - B, h -= e, f -= e), f > B && (e = f - B, h -= e, f -= e), u(c(p, f, m, h))
            }

            function u(e) {
                return {x: e[0], y: e[1], x2: e[2], y2: e[3], w: e[2] - e[0], h: e[3] - e[1]}
            }

            var l, d, p = 0, f = 0, m = 0, h = 0;
            return {flipCoords: c, setPressed: e, setCurrent: t, getOffset: o, moveOffset: n, getCorner: i, getFixed: r}
        }(), pe = function () {
            function t(e, t) {
                m.left.css({height: n(t)}), m.right.css({height: n(t)})
            }

            function o() {
                return i(de.getFixed())
            }

            function i(e) {
                m.top.css({left: n(e.x), width: n(e.w), height: n(e.y)}), m.bottom.css({top: n(e.y2), left: n(e.x), width: n(e.w), height: n(B - e.y2)}), m.right.css({
                    left: n(e.x2),
                    width: n(G - e.x2)
                }), m.left.css({width: n(e.x)})
            }

            function r() {
                return e("<div />").css({position: "absolute", backgroundColor: _.shadeColor || _.bgColor}).appendTo(f)
            }

            function a() {
                p || (p = !0, f.insertBefore(Q), o(), fe.setBgOpacity(1, 0, 1), K.hide(), c(_.shadeColor || _.bgColor, 1), fe.isAwake() ? u(_.bgOpacity, 1) : u(1, 1))
            }

            function c(e, t) {
                U(d(), e, t)
            }

            function s() {
                p && (f.remove(), K.show(), p = !1, fe.isAwake() ? fe.setBgOpacity(_.bgOpacity, 1, 1) : (fe.setBgOpacity(1, 1, 1), fe.disableHandles()), U(F, 0, 1))
            }

            function u(e, t) {
                p && (_.bgFade && !t ? f.animate({opacity: 1 - e}, {queue: !1, duration: _.fadeTime}) : f.css({opacity: 1 - e}))
            }

            function l() {
                _.shade ? a() : s(), fe.isAwake() && u(_.bgOpacity)
            }

            function d() {
                return f.children()
            }

            var p = !1, f = e("<div />").css({position: "absolute", zIndex: 240, opacity: 0}), m = {top: r(), left: r().height(B), right: r().height(B), bottom: r()};
            return {update: o, updateRaw: i, getShades: d, setBgColor: c, enable: a, disable: s, resize: t, refresh: l, opacity: u}
        }(), fe = function () {
            function t(t) {
                var o = e("<div />").css({position: "absolute", opacity: _.borderOpacity}).addClass(i(t));
                return W.append(o), o
            }

            function o(t, o) {
                var n = e("<div />").mousedown(f(t)).css({cursor: t + "-resize", position: "absolute", zIndex: o}).addClass("ord-" + t);
                return le.support && n.bind("touchstart.jcrop", le.createDragger(t)), z.append(n), n
            }

            function r(e) {
                var t = _.handleSize, n = o(e, L++).css({opacity: _.handleOpacity}).addClass(i("handle"));
                return t && n.width(t).height(t), n
            }

            function a(e) {
                return o(e, L++).addClass("jcrop-dragbar")
            }

            function c(e) {
                var t;
                for (t = 0; t < e.length; t++)V[e[t]] = a(e[t])
            }

            function s(e) {
                var o, n;
                for (n = 0; n < e.length; n++) {
                    switch (e[n]) {
                        case"n":
                            o = "hline";
                            break;
                        case"s":
                            o = "hline bottom";
                            break;
                        case"e":
                            o = "vline right";
                            break;
                        case"w":
                            o = "vline"
                    }
                    k[e[n]] = t(o)
                }
            }

            function u(e) {
                var t;
                for (t = 0; t < e.length; t++)I[e[t]] = r(e[t])
            }

            function l(e, t) {
                _.shade || K.css({top: n(-t), left: n(-e)}), J.css({top: n(t), left: n(e)})
            }

            function d(e, t) {
                J.width(Math.round(e)).height(Math.round(t))
            }

            function p() {
                var e = de.getFixed();
                de.setPressed([e.x, e.y]), de.setCurrent([e.x2, e.y2]), m()
            }

            function m(e) {
                if (A)return g(e)
            }

            function g(e) {
                var t = de.getFixed();
                d(t.w, t.h), l(t.x, t.y), _.shade && pe.updateRaw(t), A || b(), e ? _.onSelect.call(ge, h(t)) : _.onChange.call(ge, h(t))
            }

            function v(e, t, o) {
                (A || t) && (_.bgFade && !o ? Q.animate({opacity: e}, {queue: !1, duration: _.fadeTime}) : Q.css("opacity", e))
            }

            function b() {
                J.show(), _.shade ? pe.opacity(ue) : v(ue, !0), A = !0
            }

            function y() {
                $(), J.hide(), _.shade ? pe.opacity(1) : v(1), A = !1, _.onRelease.call(ge)
            }

            function C() {
                O && z.show()
            }

            function E() {
                if (O = !0, _.allowResize)return z.show(), !0
            }

            function $() {
                O = !1, z.hide()
            }

            function M(e) {
                e ? (ie = !0, $()) : (ie = !1, E())
            }

            function R() {
                M(!1), p()
            }

            var A, L = 370, k = {}, I = {}, V = {}, O = !1;
            _.dragEdges && e.isArray(_.createDragbars) && c(_.createDragbars), e.isArray(_.createHandles) && u(_.createHandles), _.drawBorders && e.isArray(_.createBorders) && s(_.createBorders), e(document).bind("touchstart.jcrop-ios", function (t) {
                e(t.currentTarget).hasClass("jcrop-tracker") && t.stopPropagation()
            });
            var U = w().mousedown(f("move")).css({cursor: "move", position: "absolute", zIndex: 360});
            return le.support && U.bind("touchstart.jcrop", le.createDragger("move")), W.append(U), $(), {
                updateVisible: m, update: g, release: y, refresh: p, isAwake: function () {
                    return A
                }, setCursor: function (e) {
                    U.css("cursor", e)
                }, enableHandles: E, enableOnly: function () {
                    O = !0
                }, showHandles: C, disableHandles: $, animMode: M, setBgOpacity: v, done: R
            }
        }(), me = function () {
            function t(t) {
                ce.css({zIndex: 450}), t ? e(document).bind("touchmove.jcrop", a).bind("touchend.jcrop", s) : p && e(document).bind("mousemove.jcrop", n).bind("mouseup.jcrop", i)
            }

            function o() {
                ce.css({zIndex: 290}), e(document).unbind(".jcrop")
            }

            function n(e) {
                return l(c(e)), !1
            }

            function i(e) {
                return e.preventDefault(), e.stopPropagation(), ne && (ne = !1, d(c(e)), fe.isAwake() && _.onSelect.call(ge, h(de.getFixed())), o(), l = function () {
                }, d = function () {
                }), !1
            }

            function r(e, o, n) {
                return ne = !0, l = e, d = o, t(n), !1
            }

            function a(e) {
                return l(c(le.cfilter(e))), !1
            }

            function s(e) {
                return i(le.cfilter(e))
            }

            function u(e) {
                ce.css("cursor", e)
            }

            var l = function () {
            }, d = function () {
            }, p = _.trackDocument;
            return p || ce.mousemove(n).mouseup(i).mouseout(i), Q.before(ce), {activateHandlers: r, setCursor: u}
        }(), he = function () {
            function t() {
                _.keySupport && (r.show(), r.focus())
            }

            function o(e) {
                r.hide()
            }

            function n(e, t, o) {
                _.allowMove && (de.moveOffset([t, o]), fe.updateVisible(!0)), e.preventDefault(), e.stopPropagation()
            }

            function i(e) {
                if (e.ctrlKey || e.metaKey)return !0;
                re = !!e.shiftKey;
                var t = re ? 10 : 1;
                switch (e.keyCode) {
                    case 37:
                        n(e, -t, 0);
                        break;
                    case 39:
                        n(e, t, 0);
                        break;
                    case 38:
                        n(e, 0, -t);
                        break;
                    case 40:
                        n(e, 0, t);
                        break;
                    case 27:
                        _.allowSelect && fe.release();
                        break;
                    case 9:
                        return !0
                }
                return !1
            }

            var r = e('<input type="radio" />').css({position: "fixed", left: "-120px", width: "12px"}).addClass("jcrop-keymgr"), a = e("<div />").css({
                position: "absolute",
                overflow: "hidden"
            }).append(r);
            return _.keySupport && (r.keydown(i).blur(o), N || !_.fixedSupport ? (r.css({position: "absolute", left: "-20px"}), a.append(r).insertBefore(Q)) : r.insertBefore(Q)), {watchKeys: t}
        }();
        le.support && ce.bind("touchstart.jcrop", le.newSelection), z.hide(), D(!0);
        var ge = {
            setImage: O,
            animateTo: C,
            setSelect: E,
            setOptions: A,
            tellSelect: M,
            tellScaled: R,
            setClass: y,
            disable: L,
            enable: k,
            cancel: I,
            release: fe.release,
            destroy: V,
            focus: he.watchKeys,
            getBounds: function () {
                return [G * te, B * oe]
            },
            getWidgetSize: function () {
                return [G, B]
            },
            getScaleFactor: function () {
                return [te, oe]
            },
            getOptions: function () {
                return _
            },
            ui: {holder: F, selection: J}
        };
        return S && F.bind("selectstart", function () {
            return !1
        }), P.data("Jcrop", ge), ge
    }, e.fn.Jcrop = function (t, o) {
        var n;
        return this.each(function () {
            if (e(this).data("Jcrop")) {
                if ("api" === t)return e(this).data("Jcrop");
                e(this).data("Jcrop").setOptions(t)
            } else"IMG" == this.tagName ? e.Jcrop.Loader(this, function () {
                e(this).css({display: "block", visibility: "hidden"}), n = e.Jcrop(this, t), e.isFunction(o) && o.call(n)
            }) : (e(this).css({display: "block", visibility: "hidden"}), n = e.Jcrop(this, t), e.isFunction(o) && o.call(n))
        }), this
    }, e.Jcrop.Loader = function (t, o, n) {
        function i() {
            a.complete ? (r.unbind(".jcloader"), e.isFunction(o) && o.call(a)) : window.setTimeout(i, 50)
        }

        var r = e(t), a = r[0];
        r.bind("load.jcloader", i).bind("error.jcloader", function (t) {
            r.unbind(".jcloader"), e.isFunction(n) && n.call(a)
        }), a.complete && e.isFunction(o) && (r.unbind(".jcloader"), o.call(a))
    }, e.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: null,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {
        },
        onSelect: function () {
        },
        onDblClick: function () {
        },
        onRelease: function () {
        }
    }
}(jQuery), jQuery.extend({
    createUploadIframe: function (e, t) {
        var o = "jUploadFrame" + e, n = '<iframe id="' + o + '" name="' + o + '" style="position:absolute; top:-9999px; left:-9999px"';
        return window.ActiveXObject && ("boolean" == typeof t ? n += ' src="javascript:false"' : "string" == typeof t && (n += ' src="' + t + '"')), n += " />", jQuery(n).appendTo(document.body), jQuery("#" + o).get(0)
    }, createUploadForm: function (e, t, o) {
        var n = "jUploadForm" + e, i = "jUploadFile" + e, r = jQuery('<form  action="" method="POST" name="' + n + '" id="' + n + '" enctype="multipart/form-data"></form>');
        if (o)for (var a in o)jQuery('<input type="hidden" name="' + a + '" value="' + o[a] + '" />').appendTo(r);
        var c = jQuery("#" + t), s = jQuery(c).clone(!0);
        return jQuery(c).attr("id", i), jQuery(c).before(s), jQuery(c).appendTo(r), jQuery(r).css("position", "absolute"), jQuery(r).css("top", "-1200px"), jQuery(r).css("left", "-1200px"), jQuery(r).appendTo("body"), r
    }, ajaxFileUpload: function (e) {
        e = jQuery.extend({}, jQuery.ajaxSettings, e);
        var t = (new Date).getTime(), o = jQuery.createUploadForm(t, e.fileElementId, "undefined" != typeof e.data && e.data), n = (jQuery.createUploadIframe(t, e.secureuri), "jUploadFrame" + t), i = "jUploadForm" + t;
        e.global && !jQuery.active++ && jQuery.event.trigger("ajaxStart");
        var r = !1, a = {};
        e.global && jQuery.event.trigger("ajaxSend", [a, e]);
        var c = function (t) {
            var i = document.getElementById(n);
            try {
                i.contentWindow ? (a.responseText = i.contentWindow.document.body ? i.contentWindow.document.body.innerHTML : null, a.responseXML = i.contentWindow.document.XMLDocument ? i.contentWindow.document.XMLDocument : i.contentWindow.document) : i.contentDocument && (a.responseText = i.contentDocument.document.body ? i.contentDocument.document.body.innerHTML : null, a.responseXML = i.contentDocument.document.XMLDocument ? i.contentDocument.document.XMLDocument : i.contentDocument.document)
            } catch (c) {
                jQuery.event.trigger("ajaxError", [e, a, null, c])
            }
            if (a || "timeout" == t) {
                r = !0;
                var s;
                try {
                    if (s = "timeout" != t ? "success" : "error", "error" != s) {
                        var u = jQuery.uploadHttpData(a, e.dataType);
                        e.success && e.success(u, s), e.global && jQuery.event.trigger("ajaxSuccess", [a, e])
                    } else e.error(e, a, s)
                } catch (c) {
                    s = "error", e.error(e, a, s, c)
                }
                e.global && jQuery.event.trigger("ajaxComplete", [a, e]), e.global && !--jQuery.active && jQuery.event.trigger("ajaxStop"), e.complete && e.complete(a, s), jQuery(i).unbind(), setTimeout(function () {
                    try {
                        jQuery(i).remove(), jQuery(o).remove()
                    } catch (t) {
                        e.error(e, a, null, t)
                    }
                }, 100), a = null
            }
        };
        e.timeout > 0 && setTimeout(function () {
            r || c("timeout")
        }, e.timeout);
        try {
            var o = jQuery("#" + i);
            jQuery(o).attr("action", e.url), jQuery(o).attr("method", "POST"), jQuery(o).attr("target", n), o.encoding ? jQuery(o).attr("encoding", "multipart/form-data") : jQuery(o).attr("enctype", "multipart/form-data"), jQuery(o).submit()
        } catch (s) {
            e.error(e, a, null, s)
        }
        return jQuery("#" + n).load(c), {
            abort: function () {
            }
        }
    }, uploadHttpData: function (r, type) {
        var data = !type;
        return data = "xml" == type || data ? r.responseXML : r.responseText, "script" == type && jQuery.globalEval(data), "json" == type && eval("data = " + data), "html" == type && jQuery("<div>").html(data).evalScripts(), data
    }
});