(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shoppingMall-index"],{"0291":function(t,e,o){var i=o("24fb"),n=o("1de5"),a=o("ce80"),s=o("ad13");e=i(!1);var r=n(a),d=n(s);e.push([t.i,".popSty[data-v-f66b3858]{background-color:#4c4c4c;z-index:999;display:block;height:100vh;width:100vw;position:flex;position:fixed;top:0;opacity:.5}.activeBox[data-v-f66b3858]{width:100%;height:415px;position:fixed;top:14%;z-index:1000;background-image:url("+r+");background-size:100% 100%}.activeBox .close[data-v-f66b3858]{width:35px;height:35px;position:absolute;right:13px;top:60px}.ticketPart[data-v-f66b3858]{position:absolute;top:30%;left:10%;width:80%}.ticketPart .receive[data-v-f66b3858]{width:150px;height:36px;letter-spacing:4px;background-color:orange;color:#fff;margin:10px auto;text-align:center;line-height:36px;font-size:16px;border-radius:16px;box-shadow:0 0 4px 1px #f1a979}h3[data-v-f66b3858]{color:#fff;font-size:18px;text-align:center;letter-spacing:4px;margin-bottom:18px}.Box[data-v-f66b3858]{overflow-y:scroll;height:172px}.smallbox[data-v-f66b3858]{background-image:url("+d+");background-size:100% 100%;width:90%;height:86px;margin:0 auto;position:relative}.smallbox span[data-v-f66b3858]{position:absolute;top:25%;left:11%;font-size:15px;font-weight:600;color:red;width:38px;\n  /* border: 1px solid; */text-align:center}[data-v-f66b3858] .popup-layer{z-index:999!important}[data-v-f66b3858] .popup-content{z-index:1000}[data-v-f66b3858] .popup-content{display:inline-block;width:200px;height:200px;background-color:#87ceeb}",""]),t.exports=e},"0945":function(t,e,o){"use strict";var i=o("eabf"),n=o.n(i);n.a},"241d":function(t,e,o){"use strict";var i=o("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,o("96cf");var n=i(o("c964")),a=o("57bb"),s={data:function(){return{location:{}}},methods:{getWxConfig:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.vipCard)({Action:"GetJSSDK",Url:window.location.href},"UProdOpera");case 3:o=e.sent,i=o.Data,wx.config({debug:!1,appId:i.SDK.appId,timestamp:i.SDK.timestamp,nonceStr:i.SDK.noncestr,signature:i.SDK.signature,jsApiList:["getLocation","openAddress","scanQRCode"]}),wx.ready((function(e){var o=t;wx.getLocation({type:"gcj02",success:function(t){console.log(JSON.stringify(t)),o.location={longitude:t.longitude,latitude:t.latitude},o.$store.commit("SET_CURRENT_LOCATION",o.location),sessionStorage.setItem("location",JSON.stringify(o.location))},cancel:function(t){this.$toast.fail(t)}}),wx.error((function(t){this.$toast.fail("获取当前位置失败"),console.log("调用微信接口获取当前位置失败",t)}))})),e.next=11;break;case 9:e.prev=9,e.t0=e["catch"](0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))()}}};e.default=s},"2acb":function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ticketPop",{attrs:{getCoupon:t.getCoupon}}),o("div",{staticClass:"shoppingCart_style",class:t.classHome},[o("v-uni-view",{staticClass:"header"},["takein"==t.$store.state.orderType?o("v-uni-view",{staticClass:"nav_left"},[o("v-uni-view",{staticClass:"store-name",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toShopAddress.apply(void 0,arguments)}}},[o("v-uni-text",[t._v(t._s(t.currentStore.Name)),o("v-uni-text",{staticClass:"iconfont icon-jiantou"})],1)],1)],1):o("v-uni-view",{staticClass:"nav_left overflow-hidden"},[o("v-uni-view",{staticClass:"nav_leftAdd"},[o("v-uni-image",{staticStyle:{width:"30rpx",height:"30rpx"},attrs:{src:"/static/images/order/location.png"}}),o("v-uni-view",{staticClass:"addresName",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toAddress.apply(void 0,arguments)}}},[t._v(t._s(t.addressInfo.Address))])],1)],1),o("v-uni-view",{staticClass:"nav_right"},[o("v-uni-view",{staticClass:"dinein",class:{active:"takein"==t.$store.state.orderType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toziqu.apply(void 0,arguments)}}},[o("v-uni-text",[t._v("自取")])],1),o("v-uni-view",{staticClass:"takeout",class:{active:"takeout"==t.$store.state.orderType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toAddress.apply(void 0,arguments)}}},[o("v-uni-text",[t._v("外卖")])],1)],1)],1),t.loadding?t._e():o("div",[o("v-uni-button",{attrs:{type:"default",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.seckill.apply(void 0,arguments)}}},[t._v("秒杀")]),o("div",t._l(t.listMode,(function(e,i){return o("div",{key:i},["enterShops"===e.viewComponets?o("enterShops",{attrs:{propsObj:e.props}}):t._e(),"searchBox"===e.viewComponets?o("searchBox",{attrs:{propsObj:e.props}}):t._e(),"notice"===e.viewComponets?o("notice",{attrs:{propsObj:e.props}}):t._e(),"guide"===e.viewComponets?o("guide",{attrs:{propsObj:e.props}}):t._e(),"auxiliaryBlank"===e.viewComponets?o("auxiliaryBlank",{attrs:{propsObj:e.props}}):t._e(),"pictureAds"===e.viewComponets?o("pictureAds",{attrs:{propsObj:e.props}}):t._e(),"magicCube"===e.viewComponets?o("magicCube",{attrs:{propsObj:e.props}}):t._e(),"imgNav"===e.viewComponets?o("imgNav",{attrs:{propsObj:e.props}}):t._e(),"textBox"===e.viewComponets?o("textBox",{attrs:{propsObj:e.props}}):t._e(),"switchStores"===e.viewComponets?o("switchStores",{attrs:{propsObj:e.props}}):t._e(),"richText"===e.viewComponets?o("richText",{attrs:{propsObj:e.props}}):t._e(),"goods"===e.viewComponets?o("goods",{attrs:{propsObj:e.props}}):t._e(),"goodGroup"===e.viewComponets?o("goodsGroup",{attrs:{propsObj:e.props}}):t._e(),"titleBox"===e.viewComponets?o("titleBox",{attrs:{propsObj:e.props}}):t._e(),"seckill"===e.viewComponets?o("seckillGoods",{attrs:{propsObj:e.props}}):t._e(),"interests"===e.viewComponets?o("interests",{attrs:{propsObj:e.props}}):t._e()],1)})),0)],1),t.loadding&&"{}"===JSON.stringify(t.location)?o("div"):t._e()],1),o("v-uni-view",[o("tabBar",{attrs:{pagePath:"/pages/shoppingMall/index"}})],1)],1)},a=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return i}))},"3b5f":function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,".cgwl-form[data-v-27eede96]{filter:alpha(opacity = 0);-webkit-transition:.2s ease-out;transition:.2s ease-out;position:fixed;top:50%;width:70px;right:0;font-size:12px;background-color:#488bff;z-index:9999;padding-bottom:10px}.cgwl-form .cgwl-item[data-v-27eede96]{position:relative;box-sizing:border-box;display:block;width:100%;height:30px;line-height:30px;font-size:12px;color:#fff;text-align:center;cursor:pointer;z-index:9999;margin:0}.cgwl-item[data-v-27eede96]:hover{color:red}.cgwl-form uni-input[data-v-27eede96]{cursor:pointer;border:none;background:transparent;color:#fff;margin:3px 0}.cgwl-form uni-input[data-v-27eede96]:hover{color:#043b9a}.cgwl-icon[data-v-27eede96]{display:block;width:31px;height:30px;\n    /* background: url(./chat.png); */margin:20px auto;margin-bottom:4px}.cgwl-close[data-v-27eede96]{display:block;width:18px;height:18px;\n    /* background: url(./close.png) no-repeat; */position:pox;position:absolute;right:10px;top:10px}#wolive-talk[data-v-27eede96]{width:400px;height:500px;position:fixed;bottom:10px;right:90px;z-index:999999}#wolive-iframe[data-v-27eede96]{width:100%;height:100%;box-shadow:rgba(15,66,76,.25) 0 0 24px 0;border-radius:10px 10px 0 0;border:none;border-left:1px solid #ddd}.shoppingCart_style[data-v-27eede96]{padding-bottom:50px}.shoppingCart_style[data-v-27eede96] .uni-navbar__header-btns-left{width:%?160?%}.shoppingCart_style[data-v-27eede96] .uni-navbar__header-right{width:0!important;padding:0}.shoppingCart_style .van-popup--top[data-v-27eede96]{width:145px!important}.shoppingCart_style .van-dropdown-menu[data-v-27eede96]{height:54px}.shoppingCart_style .header[data-v-27eede96]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?20?%;background-color:#fff;box-sizing:border-box}.shoppingCart_style .header .dot[data-v-27eede96]{position:absolute;width:%?34?%;height:%?34?%;line-height:%?34?%;font-size:%?22?%;background-color:#ff0;color:#fff;top:%?16?%;right:%?10?%;border-radius:100%;text-align:center}.shoppingCart_style .header .nav_left[data-v-27eede96]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.shoppingCart_style .header .nav_left .store-name[data-v-27eede96]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:17px;margin-bottom:%?10?%}.shoppingCart_style .header .nav_left .store-name .iconfont[data-v-27eede96]{margin-left:%?10?%;line-height:100%}.shoppingCart_style .header .nav_left .store-location[data-v-27eede96]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#919293;font-size:13px}.shoppingCart_style .header .nav_left .store-location .iconfont[data-v-27eede96]{vertical-align:middle;display:table-cell;line-height:100%}.shoppingCart_style .header .nav_left .store-location uni-image[data-v-27eede96]{padding-right:5px;width:%?30?%;height:%?30?%}.shoppingCart_style .header .nav_left .nav_leftAdd[data-v-27eede96]{display:inline-block}.shoppingCart_style .header .nav_left .nav_leftAdd .addresName[data-v-27eede96]{font-size:15px;font-weight:700;display:inline-block;margin-left:5px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:200px}.shoppingCart_style .header .nav_right[data-v-27eede96]{height:30px;background-color:#f5f5f5;border-radius:19px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:12px;padding:0 19px;color:#919293}.shoppingCart_style .header .nav_right .dinein[data-v-27eede96]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.shoppingCart_style .header .nav_right .dinein.active[data-v-27eede96]{padding:6px 19px;color:#fff;background-color:#adb838;border-radius:%?38?%}.shoppingCart_style .header .nav_right .takeout[data-v-27eede96]{margin-left:%?20?%;height:100%;line-height:30px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:%?14?% 0}.shoppingCart_style .header .nav_right .takeout.active[data-v-27eede96]{padding:0 19px;color:#fff;background-color:#adb838;border-radius:%?38?%}.shoppingCart_style .header .nav_right .dinein.active[data-v-27eede96]{margin-left:%?-38?%}.shoppingCart_style .header .nav_right .takeout.active[data-v-27eede96]{margin-right:%?-38?%}",""]),t.exports=e},"3cb6":function(t,e,o){"use strict";o.r(e);var i=o("66d97"),n=o("67ca");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("0945");var s,r=o("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"f66b3858",null,!1,i["a"],s);e["default"]=d.exports},"3d2b":function(t,e,o){"use strict";o.r(e);var i=o("d876"),n=o("e794");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("8577");var s,r=o("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"d9ebcfd8",null,!1,i["a"],s);e["default"]=d.exports},"578c":function(t,e,o){t.exports=o.p+"static/img/close.5e68a2a3.png"},"66d97":function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.getCoupon.length>0?i("v-uni-view",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showPopu,expression:"showPopu"}],staticClass:"popSty"}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showPopu,expression:"showPopu"}],staticClass:"activeBox"},[i("v-uni-image",{staticClass:"close",attrs:{src:o("578c").replace(/^\./,"")},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}}),i("div",{staticClass:"ticketPart"},[i("h3",[t._v("进店送券")]),i("div",{staticClass:"Box"},t._l(t.getCoupon,(function(e,o){return i("div",{key:o,staticClass:"smallbox"},[i("span",[t._v("¥"+t._s(e.TakeMoney))]),i("div",{staticStyle:{float:"right",width:"61%","margin-top":"12px"}},[i("p",{staticStyle:{"font-weight":"800","font-size":"14px"}},[t._v(t._s(e.TypeName))]),i("p",{staticStyle:{position:"absolute",bottom:"15px"}},[t._v(t._s(t._f("fomartData")(e.StartTime))+"-"+t._s(t._f("fomartData")(e.ValidTime)))])])])})),0),i("p",{staticClass:"receive",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("立即使用")])])],1)]):t._e()},a=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return i}))},"67ca":function(t,e,o){"use strict";o.r(e);var i=o("78d0"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},"6a60":function(t,e,o){"use strict";o("4160"),o("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{}},mounted:function(){this.$on("close",this.closeDropdown)},methods:{closeDropdown:function(){this.$children.forEach((function(t){t.close()}))}}};e.default=i},7407:function(t,e,o){"use strict";o.r(e);var i=o("cacd"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},"76dd":function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */@font-face{font-family:iconfont;\n  /* project id 1564327 */src:url(https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot);src:url(https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot#iefix) format("embedded-opentype"),url(https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2) format("woff2"),url(https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff) format("woff"),url(https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf) format("truetype"),url(https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont) format("svg")}.iconfont[data-v-d9ebcfd8]{font-family:iconfont!important;font-size:%?28?%;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale}.dropdown-item[data-v-d9ebcfd8]{width:100%;-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative}.dropdown-item__selected[data-v-d9ebcfd8]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#fff;padding:0 %?12?%;box-sizing:border-box;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.dropdown-item__selected .selected__name[data-v-d9ebcfd8]{font-size:%?25?%}.dropdown-item__selected .selected__icon[data-v-d9ebcfd8]{margin-left:%?20?%}.dropdown-item__selected .selected__icon.down[data-v-d9ebcfd8]{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:rotate(0);transform:rotate(0)}.dropdown-item__selected .selected__icon.up[data-v-d9ebcfd8]{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.dropdown-item__content[data-v-d9ebcfd8]{position:fixed;left:0;right:0;overflow:hidden;top:0;bottom:0;z-index:1}.dropdown-item__content .list[data-v-d9ebcfd8]{max-height:400px;overflow-y:auto;position:absolute;left:0;right:0;z-index:3;background:#fff;-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-transition:all .3s;transition:all .3s}.dropdown-item__content .list.show[data-v-d9ebcfd8]{-webkit-transform:translateY(0);transform:translateY(0)}.dropdown-item__content .list__option[data-v-d9ebcfd8]{font-size:%?21?%;padding:%?0?% %?24?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.dropdown-item__content .list__option[data-v-d9ebcfd8]:not(:last-child){border-bottom:%?1?% solid #ddd}.dropdown-item__content .dropdown-mask[data-v-d9ebcfd8]{position:absolute;left:0;right:0;top:0;bottom:0;-webkit-transition:all .3s;transition:all .3s;z-index:2}.dropdown-item__content .dropdown-mask.show[data-v-d9ebcfd8]{background:rgba(0,0,0,.5)}.dropdown-item[data-v-d9ebcfd8]:not(:last-child):after{content:" ";position:absolute;width:%?2?%;top:%?36?%;bottom:%?36?%;right:0;background:#e5e5e5}',""]),t.exports=e},"78d0":function(t,e,o){"use strict";o("fb6a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o("57bb");var i={data:function(){return{showPopu:!0}},components:{},props:["getCoupon"],methods:{close:function(){this.showPopu=!1}},filters:{fomartData:function(t){if(t)return t.slice(0,10)}}};e.default=i},"81c6":function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.dropdown-menu[data-v-60f69c49]{display:-webkit-box;display:-webkit-flex;display:flex;overflow:auto;white-space:nowrap}dropdown-item[data-v-60f69c49]{-webkit-box-flex:1;-webkit-flex:1;flex:1}',""]),t.exports=e},8577:function(t,e,o){"use strict";var i=o("cc15"),n=o.n(i);n.a},"939d":function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"dropdown-menu"},[t._t("default")],2)},a=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return i}))},"9c4b":function(t,e,o){"use strict";var i=o("b659"),n=o.n(i);n.a},"9ef1":function(t,e,o){var i=o("3b5f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("753969c7",i,!0,{sourceMap:!1,shadowMode:!1})},a76e:function(t,e,o){"use strict";o.r(e);var i=o("2acb"),n=o("7407");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("cc75");var s,r=o("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"27eede96",null,!1,i["a"],s);e["default"]=d.exports},ad13:function(t,e,o){t.exports=o.p+"static/img/smallticket.96d97d2b.png"},b5b6:function(t,e,o){"use strict";o("a9e3"),o("ac1f"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={components:{},props:{value:[Number,String,Object],list:{type:Array,default:function(){return[]}},title:[Number,String]},data:function(){return{showList:"",showClass:"",selectItem:{},contentTop:0}},watch:{},mounted:function(){this.showList=this.active,this.selectItem=this.list[this.value]},methods:{choose:function(t){this.selectItem=t,this.$emit("input",t.value),this.closePopup()},changePopup:function(){this.showList?this.closePopup():this.openPopup()},openPopup:function(){var t=this;this.$parent.$emit("close"),this.showList=!0,this.$nextTick((function(){t.getElementData(".dropdown-item__selected",(function(e){t.contentTop=e[0].bottom,t.showClass="show"}))}))},closePopup:function(){var t=this;this.showClass="",setTimeout((function(){t.showList=!1}),300)},close:function(){this.showClass="",this.showList=!1},getElementData:function(t,e){uni.createSelectorQuery().in(this).selectAll(t).boundingClientRect().exec((function(t){e(t[0])}))}}};e.default=i},b659:function(t,e,o){var i=o("81c6");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("07aae32b",i,!0,{sourceMap:!1,shadowMode:!1})},cacd:function(t,e,o){"use strict";var i=o("ee27");o("4de4"),o("4160"),o("b64b"),o("07ac"),o("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,o("96cf");var n=i(o("c964")),a=o("57bb"),s=i(o("241d")),r=i(o("b867")),d=i(o("f50e")),c=i(o("3d2b")),l=i(o("3cb6")),p=(o("657b"),{mixins:[s.default],components:{msDropdownMenu:d.default,msDropdownItem:c.default,ticketPop:l.default},data:function(){return{classHome:getApp().globalData.mainStyle,valueSearch:"",value1:0,getCoupon:[],activeColor:getApp().globalData.mainColor,list:[{text:"全部门店",value:0},{text:"item2",value:1},{text:"item3",value:2}],listMode:[],filterDropdownValue:{},innerAudio:null,oldAudioObj:{},loadding:!0,currentStoreInfo:{},addressName:{},SID:"",location:{}}},created:function(){this.init()},computed:{currentStore:function(){return this.$store.state.currentStoreInfo},addressInfo:function(){return this.$store.state.addressInfo}},watch:{currentStore:function(t){this.getAutoMode()},addressInfo:function(){this.getAutoMode()}},mounted:function(){},methods:{init:function(){if(sessionStorage.getItem("IsCoupon")||this.getCouponInfo(),localStorage.getItem("currentLocation")||this.getWxConfig(),uni.showLoading({title:"加载中"}),this.$route.query.query){var t=JSON.parse(this.$route.query.query),e=Object.keys(t);"SID"==e&&(this.SID=Object.values(t))}this.addresses,this.addressName=JSON.parse(sessionStorage.getItem("takeOutAddress")),JSON.parse(localStorage.getItem("localShop"))?this.currentStoreInfo.Name=JSON.parse(localStorage.getItem("localShop")).Name:this.getShopList(),this.getAutoMode()},getShopList:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,a.vipCard)({Action:"GetShopList",Longitude:t.$store.state.currentLocation.longitude,Latitude:t.$store.state.currentLocation.latitude},"UShopOpera");case 2:o=e.sent,i=o.Data,t.currentStoreInfo={Name:i.ShopList[0].Name,Address:i.ShopList[0].Address,SID:i.ShopList[0].SID,Latitude:i.ShopList[0].Latitude,Longitude:i.ShopList[0].Longitude},t.$store.commit("SET_CURRENT_STORE",t.currentStoreInfo),localStorage.setItem("localShop",JSON.stringify(t.currentStoreInfo));case 7:case"end":return e.stop()}}),e)})))()},getCouponInfo:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.vipCard)({Action:"GiveCoupon"},"UPromotionOpera");case 3:o=e.sent,i=o.Data,t.getCoupon=i.TicketList?i.TicketList:[],e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},clickClear:function(){r.default.remove("UserMACPhone")},clickCoupon:function(){this.$Router.push("/pages/shoppingMall/list/couponList")},clickGoods:function(){this.$Router.push("/pages/shoppingMall/list/goodsList")},clickGoods_two:function(){this.$Router.push("/shoppingMall/goodsList_two")},integralMall:function(){this.$Router.push("/pages/integralMall/index")},seckill:function(){this.$Router.push("/pages/shoppingMall/seckill/index")},makeUpGroup:function(){this.$Router.push("/pages/shoppingMall/makeGroup/makeGroup")},setVoice:function(){},voicePlay:function(t){var e=this,o=uni.getStorageSync("arrVoice");if(t.indexMy!==this.oldAudioObj.indexMy&&(this.innerAudio.src=t.url,this.innerAudio.loop="True"===t.loopPlay),this.oldAudioObj=t,this.innerAudio.paused){var i=o.filter((function(e){return e.index===t.indexMy}))[0].startTime;i&&(this.innerAudio.startTime=i),this.innerAudio.play()}else"2"==t.anewAudio?(this.innerAudio.pause(),o.forEach((function(o){o.index===t.indexMy&&(o.startTime=e.innerAudio.duration)})),uni.setStorageSync("arrVoice",o)):"1"==t.anewAudio&&this.innerAudio.stop()},getAutoMode:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var o,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中"}),o=JSON.parse(localStorage.getItem("currentStoreInfo")),e.prev=2,e.next=5,(0,a.vipCard)({Action:"GetDecorate",Type:"0",SID:t.SID[0]?t.SID[0]:"",ShopSID:o?o.data.SID:""},"UShopOpera");case 5:i=e.sent,n=i.Data,uni.hideLoading(),t.loadding=!1,t.listMode=n.Decorate.HtmlInfo?n.Decorate.HtmlInfo:[],e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](2),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})))()},toziqu:function(){this.$store.commit("SET_ORDER_TYPE","takein");var t=JSON.parse(localStorage.getItem("currentStoreInfo"));this.currentStoreInfo={Name:t.data.Name,Address:t.data.Address,SID:t.data.SID,Length:t.data.Length}},toShopAddress:function(){this.$Router.push({path:"/pages/myAddress/myAddress",query:{flag:"shopAuto"}})},toAddress:function(){this.$store.commit("SET_ORDER_TYPE","takeout"),this.$Router.push({path:"/pages/myAddress/myAddress",query:{flag:"AutoWaimai"}})}}});e.default=p},cc15:function(t,e,o){var i=o("76dd");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("ecde29fa",i,!0,{sourceMap:!1,shadowMode:!1})},cc75:function(t,e,o){"use strict";var i=o("9ef1"),n=o.n(i);n.a},ce80:function(t,e,o){t.exports=o.p+"static/img/ticketBoxS.d355faa2.png"},d876:function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"dropdown-item"},[o("v-uni-view",{staticClass:"dropdown-item__selected",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePopup.apply(void 0,arguments)}}},[t.$slots.title?t._t("title"):[o("v-uni-view",{staticClass:"selected__name"},[t._v(t._s(t.title?t.title:t.selectItem.text))]),o("v-uni-view",{staticClass:"selected__icon",class:"show"===t.showClass?"up":"down"},[o("span",{staticClass:"iconfont"},[t._v("")])])]],2),t.showList?o("v-uni-view",{staticClass:"dropdown-item__content",style:{top:t.contentTop+"px"}},[o("v-uni-view",{class:["list",t.showClass]},[t.$slots.default?t._t("default"):t._l(t.list,(function(e,i){return o("v-uni-view",{key:i,staticClass:"list__option",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.choose(e)}}},[o("v-uni-view",[t._v(t._s(e.text))]),e.value===t.value?o("v-uni-icon",{attrs:{type:"success_no_circle",size:"15"}}):t._e()],1)}))],2),t.showList?o("v-uni-view",{class:["dropdown-mask",t.showClass],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closePopup.apply(void 0,arguments)}}}):t._e()],1):t._e()],1)},a=[];o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return i}))},e794:function(t,e,o){"use strict";o.r(e);var i=o("b5b6"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},eabf:function(t,e,o){var i=o("0291");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("279381c2",i,!0,{sourceMap:!1,shadowMode:!1})},ef01:function(t,e,o){"use strict";o.r(e);var i=o("6a60"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},f50e:function(t,e,o){"use strict";o.r(e);var i=o("939d"),n=o("ef01");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("9c4b");var s,r=o("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"60f69c49",null,!1,i["a"],s);e["default"]=d.exports}}]);