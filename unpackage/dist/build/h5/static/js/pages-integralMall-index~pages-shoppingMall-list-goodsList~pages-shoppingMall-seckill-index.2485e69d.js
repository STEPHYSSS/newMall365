(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-integralMall-index~pages-shoppingMall-list-goodsList~pages-shoppingMall-seckill-index"],{"0571":function(t,e,n){"use strict";var i=n("f981"),a=n.n(i);a.a},"0d16":function(t,e,n){"use strict";var i={aUpImg:n("ba08").default,uniCountdown:n("9599").default,uniIcons:n("6508").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:["goodBoxTwo",t.mainStyle],style:{width:t.imgHeight},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goodBoxCoupon(t.itemData)}}},[i("div",{staticClass:"vanImage-style"},[i("a-up-img",{key:t.itemData.Img,attrs:{url:t._f("setImgPrex")(t.itemData.Img),height:t.imgHeight,width:"100%"}}),"0"!=t.itemData.StockType&&t.itemData.StoreQty<="0"?i("v-uni-image",{staticStyle:{width:"100%",height:"100%",position:"absolute",top:"0"},attrs:{src:n("74c3").replace(/^\./,"")}}):t._e(),t.seckill?i("div",{staticClass:"timer-style"},[i("span",{staticClass:"timer-left"},[t._v(t._s(t.startIS?"距结束":"距开始"))]),i("span",{staticClass:"timer-right"},[i("uni-countdown",{attrs:{color:"#FFFFFF","splitor-color":"#fff","background-color":"transparent",day:t.activeTimeMy.day,hour:t.activeTimeMy.hours,minute:t.activeTimeMy.minute,second:t.activeTimeMy.second},on:{timeup:function(e){arguments[0]=e=t.$handleEvent(e),t.finishTimer.apply(void 0,arguments)}}})],1)]):t._e()],1),i("div",{staticClass:"oneBoxTitle"},[t._v(t._s((t.seckill,t.itemData.Name)))]),t.startIS?i("div",{staticClass:"progress-style"},[i("v-uni-progress",{attrs:{percent:t.setProgress(),activeColor:"#fe5252",active:!0,"stroke-width":"5"}})],1):t._e(),t.seckill&&t.startIS?i("div",{staticClass:"oneBoxTitleSell"},[t._v("已抢"+t._s(Number(t.itemData.StoreQty)-Number(t.itemData.SurplusQty))+"件")]):t._e(),t.seckill&&!t.startIS?i("div",{staticClass:"oneBoxTitleSell"},[t._v("总共"+t._s(t._f("setMoney")(t.itemData.StoreQty))+"件")]):t._e(),i("div",{staticClass:"oneBoxMoney"},[t.isIntegral?i("span",[t._v(t._s(t.itemData.Score)+"积分")]):t._e(),t.itemData.SalePrice>0&&t.isIntegral?i("span",[t._v("+")]):t._e(),t.itemData.MemberPrice>0?i("div",{staticStyle:{display:"inline-block"}},[i("span",[t._v("¥")]),i("span",[t._v(t._s(t.itemData.MemberPrice))]),i("div",{staticStyle:{"text-decoration":"line-through",color:"#969799","font-size":"8pt",display:"inline-block","padding-left":"10px"}},[i("span",[t._v("¥")]),t._v(t._s(t.itemData.SalePrice))])]):i("div",{staticStyle:{display:"inline-block"}},[i("span",[t._v("¥")]),i("span",[t._v(t._s(t.itemData.SalePrice))])]),i("span",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addCart.apply(void 0,arguments)}}},[t.isIntegral||t.seckill?t._e():i("uni-icons",{staticClass:"addIcon",staticStyle:{color:"#fe5252"},attrs:{type:"plus"}})],1),t.seckill?i("div",{staticClass:"addIconBtn"},[0===Number(t.itemData.SurplusQty)?i("v-uni-button",{staticStyle:{background:"#cac7cb",bottom:"0",color:"#fff"},attrs:{size:"mini"}},[t._v(t._s(t.btnTitle))]):i("v-uni-button",{staticStyle:{background:"#fe5252",bottom:"0",color:"#fff"},attrs:{size:"mini"}},[t._v(t._s(t.btnTitle))])],1):t._e()])])},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},"0d3c":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-status-bar",style:{height:t.statusBarHeight}},[t._t("default")],2)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},"0de2":function(t,e,n){"use strict";n.r(e);var i=n("75d6"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"256e":function(t,e,n){"use strict";n.r(e);var i=n("362c"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"25bb":function(t,e,n){"use strict";var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("99e0")),o=i(n("6508")),r={name:"UniNavBar",components:{uniStatusBar:a.default,uniIcons:o.default},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0},noG0:{type:Boolean,default:!1}},mounted:function(){uni.report&&""!==this.title&&uni.report("title",this.title)},methods:{onClickLeft:function(){this.noG0?uni.navigateBack({delta:2}):this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")}}};e.default=r},"2c2c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Mixin=void 0;var i={props:{itemData:{type:Object,default:function(){return{}}},imgHeight:{type:String,default:"80px"},isShoppingCard:{type:Boolean,default:!1},isOrder:{type:Boolean,default:!1},isIntegral:{type:Boolean,default:!1},seckill:{type:Boolean,default:!1}},data:function(){return{list:[]}},methods:{goodBoxCoupon:function(t){this.$emit("goodBox",t)},addCart:function(){}}};e.Mixin=i},"2c60":function(t,e,n){"use strict";var i=n("8312"),a=n.n(i);a.a},"31e4":function(t,e,n){var i=n("955c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("bac56854",i,!0,{sourceMap:!1,shadowMode:!1})},"362c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{url:[String],width:{type:String,default:function(){return"80px"}},height:{type:String,default:function(){return"80px"}}},created:function(){},data:function(){return{dataIMg:this.url}},methods:{errorIMg:function(){this.dataIMg="/static/assets/img/defaultGood.png"},loadIMg:function(){}}};e.default=i},"44c0":function(t,e,n){"use strict";n.r(e);var i=n("7f28"),a=n("f899");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("bc46");var r,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"dfe5e386",null,!1,i["a"],r);e["default"]=l.exports},"5c46":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".goodBoxTwo[data-v-f21f6db8]{display:inline-block;margin-bottom:10px;border-radius:12px;background:#fff;overflow:hidden;\n  /*box-shadow: 1px 1px 1px #eee;*/box-shadow:1px 1px 3px #eee}.goodBoxTwo .progress-style[data-v-f21f6db8]{padding:0 8px}.goodBoxTwo .progress-style[data-v-f21f6db8] .uni-progress-bar,\n.goodBoxTwo .progress-style[data-v-f21f6db8] .uni-progress-inner-bar{border-radius:20px}.goodBoxTwo .addIconBtn[data-v-f21f6db8]{float:right}.goodBoxTwo .addIconBtn .van-button--mini[data-v-f21f6db8]{padding:0 5px}.goodBoxTwo .vanImage-style[data-v-f21f6db8]{position:relative}.goodBoxTwo .timer-style[data-v-f21f6db8]{position:absolute;height:%?62?%;line-height:%?62?%;width:100%;background:#fe5252;bottom:0;color:#fff;font-size:12px}.goodBoxTwo .timer-style .van-count-down[data-v-f21f6db8]{font-size:12px;color:#fff;line-height:30px}.goodBoxTwo .timer-style .timer-right[data-v-f21f6db8]{float:right;-webkit-transform:scale(.9);transform:scale(.9)}.goodBoxTwo .timer-style .timer-right[data-v-f21f6db8] .uni-countdown__number{width:15px}.goodBoxTwo .timer-style .timer-left[data-v-f21f6db8]{padding-left:5px}.goodBoxTwo .oneBoxTitle[data-v-f21f6db8]{color:#313131;font-size:14px;height:19px;overflow:hidden;margin:8px;word-wrap:break-word;overflow-wrap:break-word}.goodBoxTwo .oneBoxTitleSell[data-v-f21f6db8]{color:#969799;font-size:12px;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;margin:5px 0;margin-right:-8px;text-align:right;-webkit-transform:scale(.85);transform:scale(.85)}.goodBoxTwo .goodBoxInfo[data-v-f21f6db8]{margin-bottom:10px;background:#fff}.goodBoxTwo .oneBoxMoney[data-v-f21f6db8]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:5px 8px;color:#fe5252;font-size:14px}.goodBoxTwo .oneBoxMoney .addIcon[data-v-f21f6db8]{float:right;font-size:20px!important;cursor:pointer}",""]),t.exports=e},"74dd":function(t,e,n){"use strict";n.r(e);var i=n("79f5"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"75d6":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=uni.getSystemInfoSync().statusBarHeight+"px",a={name:"UniStatusBar",data:function(){return{statusBarHeight:i}}};e.default=a},"79f5":function(t,e,n){"use strict";n("a9e3"),n("e25e"),n("ac1f"),n("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2c2c"),a={mixins:[i.Mixin],data:function(){return{mainColor:getApp().globalData.mainColor,mainStyle:getApp().globalData.mainStyle,stepperValue:"",timeCountDown:"",btnTitle:"马上抢",activeTimeMy:{},startIS:!1}},props:{},created:function(){this.itemData.StartDate&&this.seckill&&this.getTimeout()},methods:{addCart:function(){this.$emit("addCart")},finishTimer:function(){var t=this;setTimeout((function(){t.getTimeout()}),1e3)},getTimeout:function(t){var e=(new Date).getTime(),n=new Date(this.itemData.EndDate.replace(/-/g,"/")).getTime(),i=new Date(this.itemData.StartDate.replace(/-/g,"/")).getTime();this.startIS=!(i-e>=0)&&(n-e>0||"end");var a=this.startIS?n-e:i-e,o=a;this.activeTimeMy={day:parseInt(o/864e5),hours:parseInt(o%864e5/36e5),minute:parseInt(o%36e5/6e4),second:parseInt(o%6e4/1e3)},this.startIS?"end"===this.startIS?this.btnTitle="活动结束":0===Number(this.itemData.SurplusQty)?this.btnTitle="商品不足":this.btnTitle=" 立即抢购":this.btnTitle=" 活动未开始"},setProgress:function(){var t=100*(1-Number(this.itemData.SurplusQty)/Number(this.itemData.StoreQty));return t=Math.round(100*t)/100,t>=100?100:t}}};e.default=a},"7f28":function(t,e,n){"use strict";var i={uniStatusBar:n("99e0").default,uniIcons:n("6508").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-navbar"},[n("v-uni-view",{staticClass:"uni-navbar__content",class:{"uni-navbar--fixed":t.fixed,"uni-navbar--shadow":t.shadow,"uni-navbar--border":t.border},style:{"background-color":t.backgroundColor}},[t.statusBar?n("uni-status-bar"):t._e(),n("v-uni-view",{staticClass:"uni-navbar__header uni-navbar__content_view",style:{color:t.color,backgroundColor:t.backgroundColor}},[n("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickLeft.apply(void 0,arguments)}}},[t.leftIcon.length?n("v-uni-view",{staticClass:"uni-navbar__content_view"},[n("uni-icons",{attrs:{color:t.color,type:t.leftIcon,size:"24"}})],1):t._e(),t.leftText.length?n("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view",class:{"uni-navbar-btn-icon-left":!t.leftIcon.length}},[n("v-uni-text",{style:{color:t.color,fontSize:"14px"}},[t._v(t._s(t.leftText))])],1):t._e(),t._t("left")],2),n("v-uni-view",{staticClass:"uni-navbar__header-container uni-navbar__content_view"},[t.title.length?n("v-uni-view",{staticClass:"uni-navbar__header-container-inner uni-navbar__content_view"},[n("v-uni-text",{staticClass:"uni-nav-bar-text",style:{color:t.color}},[t._v(t._s(t.title))])],1):t._e(),t._t("default")],2),n("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view uni-navbar__header-right",class:t.title.length?"uni-navbar__header-btns-right":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickRight.apply(void 0,arguments)}}},[t.rightIcon.length?n("v-uni-view",{staticClass:"uni-navbar__content_view"},[n("uni-icons",{attrs:{color:t.color,type:t.rightIcon,size:"24"}})],1):t._e(),t.rightText.length&&!t.rightIcon.length?n("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view"},[n("v-uni-text",{staticClass:"uni-nav-bar-right-text"},[t._v(t._s(t.rightText))])],1):t._e(),t._t("right")],2)],1)],1),t.fixed?n("v-uni-view",{staticClass:"uni-navbar__placeholder"},[t.statusBar?n("uni-status-bar"):t._e(),n("v-uni-view",{staticClass:"uni-navbar__placeholder-view"})],1):t._e()],1)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},8312:function(t,e,n){var i=n("5c46");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("7d8284d6",i,!0,{sourceMap:!1,shadowMode:!1})},"955c":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".uni-nav-bar-text[data-v-dfe5e386]{\n\n\nfont-size:%?32?%\n}.uni-nav-bar-right-text[data-v-dfe5e386]{font-size:%?28?%}.uni-navbar__content[data-v-dfe5e386]{position:relative;background-color:#fff;overflow:hidden}.uni-navbar__content_view[data-v-dfe5e386]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row\n\t\t/* background-color: #FFFFFF;\n */}.uni-navbar__header[data-v-dfe5e386]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:44px;line-height:44px;font-size:16px\n\t\t/* background-color: #ffffff;\n */}.uni-navbar__header-btns[data-v-dfe5e386]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-flex-wrap:nowrap;flex-wrap:nowrap;width:%?120?%;padding:0 6px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-navbar__header-btns-left[data-v-dfe5e386]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nwidth:%?150?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.uni-navbar__header-btns-right[data-v-dfe5e386]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nwidth:%?150?%;padding-right:%?30?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.uni-navbar__header-container[data-v-dfe5e386]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-navbar__header-container-inner[data-v-dfe5e386]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?28?%}.uni-navbar__placeholder-view[data-v-dfe5e386]{height:44px}.uni-navbar--fixed[data-v-dfe5e386]{position:fixed;z-index:998}.uni-navbar--shadow[data-v-dfe5e386]{\nbox-shadow:0 1px 6px #ccc\n}.uni-navbar--border[data-v-dfe5e386]{border-bottom-width:%?1?%;border-bottom-style:solid;border-bottom-color:#e5e5e5}.uni-navbar__header-right[data-v-dfe5e386]{\n}",""]),t.exports=e},"99e0":function(t,e,n){"use strict";n.r(e);var i=n("0d3c"),a=n("0de2");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("0571");var r,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"71f528b1",null,!1,i["a"],r);e["default"]=l.exports},a65f:function(t,e,n){"use strict";n.r(e);var i=n("0d16"),a=n("74dd");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("2c60");var r,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"f21f6db8",null,!1,i["a"],r);e["default"]=l.exports},ba08:function(t,e,n){"use strict";n.r(e);var i=n("e42f"),a=n("256e");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var r,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"30f46702",null,!1,i["a"],r);e["default"]=l.exports},bc46:function(t,e,n){"use strict";var i=n("31e4"),a=n.n(i);a.a},c584:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".uni-status-bar[data-v-71f528b1]{width:%?750?%;height:20px\n\t\t/* height: var(--status-bar-height);\n */}",""]),t.exports=e},e42f:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("img",{style:{width:t.width,height:t.height},attrs:{src:t.dataIMg}})])},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},f899:function(t,e,n){"use strict";n.r(e);var i=n("25bb"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},f981:function(t,e,n){var i=n("c584");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("7af457db",i,!0,{sourceMap:!1,shadowMode:!1})}}]);