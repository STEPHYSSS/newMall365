(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shoppingMall-order-orderInfo"],{"02c0":function(e,t,n){"use strict";var a=n("2551"),i=n.n(a);i.a},"064b":function(e,t,n){"use strict";n.r(t);var a=n("0d67"),i=n("58c4");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("25d6");var o,s=n("f0c5"),d=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"06b69d22",null,!1,a["a"],o);t["default"]=d.exports},"06a9":function(e,t,n){"use strict";var a=n("12e5"),i=n.n(a);i.a},"0d67":function(e,t,n){"use strict";var a={uniNavBar:n("44c0").default,aGoodLineBox:n("a0c4").default,uniPopup:n("a329").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["order-info-style",e.classHome]},[e.showArea?e._e():n("uni-nav-bar",{attrs:{fixed:!0,"left-icon":"back",title:"订单详情","status-bar":!0,shadow:!1},on:{clickLeft:function(t){arguments[0]=t=e.$handleEvent(t),e.clickGo.apply(void 0,arguments)}}}),!e.loading&&e.OrderInfo.SID?n("div",["{}"!==JSON.stringify(e.currentArea)&&"1"!==e.OrderInfo.OrderType&&"3"!=e.OrderInfo.OrderType?n("div",{staticClass:"order-area-fa",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickAreaGo.apply(void 0,arguments)}}},["1"===e.OrderInfo.DeliveryType&&"{}"!==JSON.stringify(e.currentArea)?n("div",{staticClass:"order-area-delivery"},[n("span",{staticClass:"order-area-info iconfont icon-dianpu"}),n("span",{staticStyle:{"vertical-align":"middle"}},[e._v("提货门店")])]):e._e(),n("div",{staticClass:"order-area"},[n("div",{staticClass:"order-area-icon"},[n("v-uni-image",{attrs:{src:"/static/img/weizhi.png",alt:!0}})],1),"{}"!==JSON.stringify(e.currentArea)?n("div",{staticStyle:{flex:"1"}},[n("div",[n("span",[e._v(e._s(e.currentArea.hasOwnProperty("UserName")?e.currentArea.UserName:e.currentArea.Name)+e._s(e._f("setSex")(e.currentArea.Sex)))]),n("span",{staticClass:"order-area-phone"},[e._v(e._s(e.currentArea.Mobile?e.currentArea.Mobile:e.currentArea.Tel))])]),n("div",{staticClass:"order-area-location"},[e._v(e._s(e.currentArea.Address))])]):e._e()])]):e._e(),"2"==e.OrderInfo.OrderType?n("div",{staticClass:"good_card_box",staticStyle:{"margin-bottom":"10px"}},e._l(e.prodList,(function(t,a){return n("div",{key:a,on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.toGoodsInfo(t,2)}}},[n("a-good-lineBox",{attrs:{itemData:t,isOrder:!0,isIntegral:4==e.OrderInfo.OrderType}})],1)})),0):e._e(),"3"==e.OrderInfo.OrderType?n("div",{staticClass:"good_card_box",staticStyle:{"margin-bottom":"10px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toGoodsInfo(e.OrderInfo,3)}}},[n("a-good-lineBox",{attrs:{itemData:e.OrderInfo,isOrder:!0,isIntegral:4==e.OrderInfo.OrderType}})],1):e._e(),n("div",{staticStyle:{"background-color":"#fff"}},[n("div",{staticClass:"orderData"},[n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("商品总价")]),n("span",{staticClass:"priceSpan"},[e._v("¥"+e._s(e.OrderInfo.ProdAmt))])]),Number(e.OrderInfo.DiscAmt)>0?n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("优惠")]),n("span",{staticClass:"priceSpan"},[e._v("-¥"+e._s(e.OrderInfo.DiscAmt))])]):e._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:e.OrderInfo.TicketNo,expression:"OrderInfo.TicketNo"}],staticClass:"orderTime"},[n("p",{staticClass:"orderTime_label",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showTicketInfo.apply(void 0,arguments)}}},[e._v("电子券优惠"),n("span",{staticClass:"iconfont",class:!0===e.hideTicketInfo?"icon-jiantou9":"icon-jiantou",staticStyle:{"font-size":"12px"}})]),Number(e.OrderInfo.TicketAmt)>0?n("span",{staticClass:"priceSpan"},[e._v("-¥"+e._s(e.OrderInfo.TicketAmt))]):e._e(),n("p",{directives:[{name:"show",rawName:"v-show",value:e.hideTicketInfo,expression:"hideTicketInfo"}]},[e._v("券编号："+e._s(e.OrderInfo.TicketNo))]),n("p",{directives:[{name:"show",rawName:"v-show",value:e.hideTicketInfo,expression:"hideTicketInfo"}]},[e._v("券名称："+e._s(e.OrderInfo.TicketName))])]),Number(e.OrderInfo.ScoreAmt)>0?n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("积分抵扣")]),n("span",{staticClass:"priceSpan"},[e._v("-¥"+e._s(e.OrderInfo.ScoreAmt))])]):e._e(),"2"==e.OrderInfo.OrderType?n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("运费")]),n("span",{staticClass:"priceSpan"},[e._v(e._s(Number(e.OrderInfo.Freight)?"¥"+e.OrderInfo.Freight:"免运费"))])]):e._e(),Number(e.OrderInfo.DiscAmt)>0?n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("优惠金额")]),n("span",{staticClass:"priceSpan"},[e._v(e._s("¥"+e.OrderInfo.Freight))])]):e._e(),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label priceName"},[e._v("实付金额")]),n("span",{staticClass:"priceSpan priceColor"},[e._v("¥"+e._s(e.OrderInfo.PayAmt))])])]),"-1"===e.OrderInfo.State?n("div",{staticStyle:{"text-align":"right",padding:"10px"}},[n("v-uni-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"main",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.payBtnSubmit.apply(void 0,arguments)}}},[e._v("微信支付")]),n("v-uni-button",{attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelBtn.apply(void 0,arguments)}}},[e._v("取消订单")])],1):e._e(),"0"===e.OrderInfo.State?n("div",{staticClass:"btn-fa-style",staticStyle:{"text-align":"right",padding:"10px"}},["4"===e.OrderInfo.OrderType?n("v-uni-button",{attrs:{type:"main",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pickCode.apply(void 0,arguments)}}},[e._v("取货码")]):e._e(),"2"!==e.refundAllow&&"4"!==e.OrderInfo.OrderType?n("v-uni-button",{attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelrefund(e.OrderInfo.RefundState)}}},[e._v(e._s(e._f("RefundState")(e.OrderInfo.RefundState)))]):e._e(),"3"===e.OrderInfo.OrderType?n("v-uni-button",{attrs:{type:"main",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelEvaluate(e.OrderInfo)}}},[e._v("评价")]):e._e()],1):e._e()]),n("div",{staticClass:"orderData"},[e.OrderInfo.OrderType&&e.OrderInfo.OrderType>0&&"2"!==e.OrderInfo.OrderType?n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("商品类型：")]),n("span",[e._v(e._s(e._f("orderType")(e.OrderInfo.OrderType)))])]):e._e(),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("支付状态：")]),n("span",[e._v(e._s(e._f("orderState")(e.OrderInfo.State)))])]),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("支付方式：")]),n("span",[e._v(e._s(e._f("payTypeOrder")(e.OrderInfo.PayType)))])]),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("订单编号：")]),n("span",[e._v(e._s(e.OrderInfo.ExchNo))]),n("span",{staticClass:"copyText colorStyle",attrs:{id:"copyText"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.copyTextFun(e.OrderInfo.ExchNo)}}},[e._v("复制")]),n("div",{attrs:{id:"NewsToolBox"}})]),"3"!==e.OrderInfo.OrderType?n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("订单配送方式：")]),n("span",[e._v(e._s(e._f("deliveryType")(e.OrderInfo.DeliveryType)))])]):e._e(),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("创建时间：")]),n("span",[e._v(e._s(e.OrderInfo.AddTime))])]),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("支付时间：")]),e.OrderInfo.PayTime?n("span",[e._v(e._s(e.OrderInfo.PayTime))]):n("span",[e._v("--")])]),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("提货时间：")]),n("span",[e._v(e._s(e.OrderInfo.PickTime))])]),n("div",{staticClass:"orderTime"},[n("div",{staticClass:"orderTime_label"},[e._v("下单备注：")]),n("span",[e._v(e._s(e.OrderInfo.UserRemarks))])])])]):e._e(),n("div",{staticClass:"confirm-area-popup-fa"},[n("uni-popup",{ref:"showArea",staticClass:"confirm-area-popup",attrs:{position:"bottom"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.showAreaChange.apply(void 0,arguments)}}},[e.showArea?n("uni-nav-bar",{attrs:{fixed:!0,"left-icon":"back",title:"查看门店位置","status-bar":!0,shadow:!1},on:{clickLeft:function(t){arguments[0]=t=e.$handleEvent(t),e.clickGoAddress.apply(void 0,arguments)}}}):e._e(),n("iframe",{attrs:{id:"mapPage",width:"100%",height:"100%",frameborder:"0",src:"https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:"+e.currentArea.Latitude+","+e.currentArea.Longitude+"&key=IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT&referer=365商城管理"}})],1)],1)],1)},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},"0de2":function(e,t,n){"use strict";n.r(t);var a=n("75d6"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},"12e5":function(e,t,n){var a=n("bbaa");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("0ade8e1b",a,!0,{sourceMap:!1,shadowMode:!1})},1420:function(e,t,n){"use strict";n.r(t);var a=n("f554"),i=n("b276");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("06a9");var o,s=n("f0c5"),d=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"3c6ad43b",null,!1,a["a"],o);t["default"]=d.exports},2551:function(e,t,n){var a=n("d0c4");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("09984981",a,!0,{sourceMap:!1,shadowMode:!1})},"25bb":function(e,t,n){"use strict";var a=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("99e0")),r=a(n("6508")),o={name:"UniNavBar",components:{uniStatusBar:i.default,uniIcons:r.default},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0},noG0:{type:Boolean,default:!1}},mounted:function(){uni.report&&""!==this.title&&uni.report("title",this.title)},methods:{onClickLeft:function(){this.noG0?uni.navigateBack({delta:2}):this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")}}};t.default=o},"25d6":function(e,t,n){"use strict";var a=n("70ad"),i=n.n(a);i.a},"44c0":function(e,t,n){"use strict";n.r(t);var a=n("cb9c"),i=n("f899");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("88ee");var o,s=n("f0c5"),d=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"321ca154",null,!1,a["a"],o);t["default"]=d.exports},"4bc0":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".order-info-style[data-v-06b69d22]{margin-bottom:50px}.order-info-style .btn-fa-style uni-button[data-v-06b69d22]{margin-left:5px}.order-info-style .order-area-fa[data-v-06b69d22]{background:#fff}.order-info-style .order-area-fa .order-area-info[data-v-06b69d22]{vertical-align:middle;font-size:16px;margin-right:3px}.order-info-style .order-area-fa .order-area-delivery[data-v-06b69d22]{padding:8px 8px 0 8px;font-size:14px}.order-info-style .confirm-area-popup-fa .confirm-area-popup[data-v-06b69d22]{height:100%;width:100%}.order-info-style .confirm-area-popup-fa[data-v-06b69d22] .uni-popup__wrapper-box{height:100%;width:100%}.order-info-style .goodBox[data-v-06b69d22]{padding:8px!important}.order-info-style .goodsBoxLine[data-v-06b69d22]{margin:0}.order-info-style .orderData[data-v-06b69d22]{color:#777;background:#fff;margin-top:8px;padding-bottom:8px}.order-info-style .orderTime[data-v-06b69d22]{padding:8px 0 0 16px}.order-info-style .orderTime .priceSpan[data-v-06b69d22]{display:inline-block;width:67%;text-align:right}.order-info-style .orderTime .priceColor[data-v-06b69d22]{color:#f60;font-size:14px}.order-info-style .orderTime .orderTime_label[data-v-06b69d22]{width:105px;text-align:left;display:inline-block}.order-info-style .orderTime .priceName[data-v-06b69d22]{font-size:14px}.order-info-style .copyText[data-v-06b69d22]{margin-left:20px}.order-area[data-v-06b69d22]{background:#fff;padding:14px 6px;display:-webkit-box;display:-webkit-flex;display:flex;margin-bottom:8px}.order-area .order-area-icon[data-v-06b69d22]{margin:auto}.order-area .order-area-icon uni-image[data-v-06b69d22],\n.order-area .order-area-icon uni-image[data-v-06b69d22]{margin:0 10px;width:40px;height:40px}.order-area .order-area-phone[data-v-06b69d22]{font-size:14px;color:#909090;margin-left:8px}.order-area .order-area-location[data-v-06b69d22]{font-size:12px;margin-top:3px}",""]),e.exports=t},"58c4":function(e,t,n){"use strict";n.r(t);var a=n("cc1c"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},"70ad":function(e,t,n){var a=n("4bc0");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("3f2f949f",a,!0,{sourceMap:!1,shadowMode:!1})},"75d6":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=uni.getSystemInfoSync().statusBarHeight+"px",i={name:"UniStatusBar",data:function(){return{statusBarHeight:a}}};t.default=i},"88ee":function(e,t,n){"use strict";var a=n("9720"),i=n.n(a);i.a},"8ab1":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".uni-nav-bar-text[data-v-321ca154]{\n\n\nfont-size:%?32?%\n}.uni-nav-bar-right-text[data-v-321ca154]{font-size:%?28?%}.uni-navbar__content[data-v-321ca154]{position:relative;background-color:#fff;overflow:hidden}.uni-navbar__content_view[data-v-321ca154]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row\n\t\t/* background-color: #FFFFFF;\n */}.uni-navbar__header[data-v-321ca154]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:44px;line-height:44px;font-size:16px\n\t\t/* background-color: #ffffff;\n */}.uni-navbar__header-btns[data-v-321ca154]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-flex-wrap:nowrap;flex-wrap:nowrap;width:%?120?%;padding:0 6px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-navbar__header-btns-left[data-v-321ca154]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nwidth:%?150?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.uni-navbar__header-btns-right[data-v-321ca154]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nwidth:%?150?%;padding-right:%?30?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.uni-navbar__header-container[data-v-321ca154]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-navbar__header-container-inner[data-v-321ca154]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?28?%}.uni-navbar__placeholder-view[data-v-321ca154]{height:44px}.uni-navbar--fixed[data-v-321ca154]{position:fixed;z-index:998}.uni-navbar--shadow[data-v-321ca154]{\nbox-shadow:0 1px 6px #ccc\n}.uni-navbar--border[data-v-321ca154]{border-bottom-width:%?1?%;border-bottom-style:solid;border-bottom-color:#e5e5e5}.uni-navbar__header-right[data-v-321ca154]{\n}",""]),e.exports=t},"8eb7":function(e,t,n){"use strict";var a=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("fe65")),r=a(n("431b")),o={name:"adCell",components:{uniSwipeAction:i.default,uniSwipeActionItem:r.default},props:{icon:{type:String,default:""},iconRight:{type:String,default:"10"},text:String,textColor:{type:String,default:"#5E5E5E"},mustInput:{type:[Boolean,String],default:!1},detail:String,detailColor:{type:String,default:"#B3B3B3"},note:String,note1:String,note2:String,note3:String,note4:String,note5:String,noteColor:{type:String,default:"#B3B3B3"},showArrow:{type:[Boolean,String],default:!0},backgroundColor:{type:String,default:"#FFFFFF"},showBottomLine:{type:[Boolean,String],default:!0},swipeOptions:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{onClick:function(){this.$emit("click")},swipeClick:function(e){this.$emit("swipeClick",e)},swipeChange:function(e){this.$emit("swipeChange",e)}}};t.default=o},9720:function(e,t,n){var a=n("8ab1");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("4c2deff8",a,!0,{sourceMap:!1,shadowMode:!1})},"99e0":function(e,t,n){"use strict";n.r(t);var a=n("ef82"),i=n("0de2");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("02c0");var o,s=n("f0c5"),d=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"66e521c8",null,!1,a["a"],o);t["default"]=d.exports},b276:function(e,t,n){"use strict";n.r(t);var a=n("8eb7"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},bbaa:function(e,t,n){var a=n("24fb"),i=n("1de5"),r=n("eb73");t=a(!1);var o=i(r);t.push([e.i,"@font-face{font-family:iconfont;src:url("+o+') format("truetype")}.iconfont[data-v-3c6ad43b]{font-family:iconfont;font-size:14px;color:#bbb;font-weight:400;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.arrowView[data-v-3c6ad43b]:before{content:"\\e64a"}.adBaseView[data-v-3c6ad43b]{width:100%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.baseViewHover[data-v-3c6ad43b]{background-color:#f3f3f3}.adRowView[data-v-3c6ad43b]{width:calc(100% - %?48?%);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-top:%?26?%;padding-bottom:%?26?%}.headView[data-v-3c6ad43b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:left;\n\t/* margin-left: 30upx; */font-size:%?28?%;\n\t/*超出一行点点点*/overflow:hidden; /*超出的部分隐藏起来。*/white-space:nowrap;/*不显示的地方用省略号...代替*/text-overflow:ellipsis;/* 支持 IE */display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.textView[data-v-3c6ad43b]{text-align:left;\n\t/* margin-left: 30upx; */font-size:%?28?%;\n\t/*超出一行点点点*/overflow:hidden; /*超出的部分隐藏起来。*/white-space:nowrap;/*不显示的地方用省略号...代替*/text-overflow:ellipsis/* 支持 IE */}.mustView[data-v-3c6ad43b]{color:red;font-size:%?24?%;margin-left:%?10?%}.detailView1[data-v-3c6ad43b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:right;font-size:%?24?%;overflow:hidden; /*超出的部分隐藏起来。*/white-space:nowrap;/*不显示的地方用省略号...代替*/text-overflow:ellipsis/* 支持 IE */}.detailView2[data-v-3c6ad43b]{width:calc(100% - %?48?%);text-align:left;font-size:%?24?%;word-wrap:break-word;word-break:normal;margin-top:%?12?%}.bottomLine[data-v-3c6ad43b]{width:95%;\n\t/* height: 1upx;\n\tbackground-color: #DDDDDD;\n\tmargin-top: 30upx; */border-top:1px solid #ebedf0}.icon[data-v-3c6ad43b]{width:%?36?%;height:%?36?%\n\t/* margin-right: 10upx; */}',""]),e.exports=t},cb9c:function(e,t,n){"use strict";var a={uniStatusBar:n("99e0").default,uniIcons:n("6508").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-navbar"},[n("v-uni-view",{staticClass:"uni-navbar__content",class:{"uni-navbar--fixed":e.fixed,"uni-navbar--shadow":e.shadow,"uni-navbar--border":e.border},style:{"background-color":e.backgroundColor}},[e.statusBar?n("uni-status-bar"):e._e(),n("v-uni-view",{staticClass:"uni-navbar__header uni-navbar__content_view",style:{color:e.color,backgroundColor:e.backgroundColor}},[n("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickLeft.apply(void 0,arguments)}}},[e.leftIcon.length?n("v-uni-view",{staticClass:"uni-navbar__content_view"},[n("uni-icons",{attrs:{color:e.color,type:e.leftIcon,size:"24"}})],1):e._e(),e.leftText.length?n("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view",class:{"uni-navbar-btn-icon-left":!e.leftIcon.length}},[n("v-uni-text",{style:{color:e.color,fontSize:"14px"}},[e._v(e._s(e.leftText))])],1):e._e(),e._t("left")],2),n("v-uni-view",{staticClass:"uni-navbar__header-container uni-navbar__content_view"},[e.title.length?n("v-uni-view",{staticClass:"uni-navbar__header-container-inner uni-navbar__content_view"},[n("v-uni-text",{staticClass:"uni-nav-bar-text",style:{color:e.color}},[e._v(e._s(e.title))])],1):e._e(),e._t("default")],2),n("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view uni-navbar__header-right",class:e.title.length?"uni-navbar__header-btns-right":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickRight.apply(void 0,arguments)}}},[e.rightIcon.length?n("v-uni-view",{staticClass:"uni-navbar__content_view"},[n("uni-icons",{attrs:{color:e.color,type:e.rightIcon,size:"24"}})],1):e._e(),e.rightText.length&&!e.rightIcon.length?n("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view"},[n("v-uni-text",{staticClass:"uni-nav-bar-right-text"},[e._v(e._s(e.rightText))])],1):e._e(),e._t("right")],2)],1)],1),e.fixed?n("v-uni-view",{staticClass:"uni-navbar__placeholder"},[e.statusBar?n("uni-status-bar"):e._e(),n("v-uni-view",{staticClass:"uni-navbar__placeholder-view"})],1):e._e()],1)},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},cc1c:function(e,t,n){"use strict";var a=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var i=a(n("c964")),r=n("57bb"),o=n("657b"),s=a(n("1420")),d={components:{adCell:s.default},data:function(){return{classHome:getApp().globalData.mainStyle,currentArea:{},prodList:[],OrderInfo:{},loading:!0,payType:1,showArea:!1,refundAllow:null,Refund:{},infoData:{},orderId:"",OrderType:"",hideTicketInfo:!1}},created:function(){if(this.$route.query.query){var e=decodeURIComponent(this.$route.query.query),t=JSON.parse(e);this.orderId=t.order_id,this.OrderType=t.OrderType,this.getInfo()}},computed:{},methods:{getInfo:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,r.vipCard)({Action:"GetOrderInfo",SID:e.orderId,OrderType:e.OrderType},"UOrderOpera");case 3:n=t.sent,a=n.Data,e.infoData=a,"1"===a.OrderInfo.DeliveryType?e.currentArea=a.ShopInfo:e.currentArea=a.OrderInfo,e.prodList=a.OrderItem,e.OrderInfo=a.OrderInfo,e.CardInfo=a.hasOwnProperty("CardInfo")?a.CardInfo:{},e.refundAllow=a.IsRefund,e.Refund=(a.Refund,a.Refund),e.loading=!1,t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),e.loading=!1;case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()},toGoodsInfo:function(e,t){""!=e.PromotionItemSID?this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{SID:e.PromotionItemSID,seckill:"true"}}):this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{SID:e.ProdSID}})},showTicketInfo:function(){this.hideTicketInfo=!this.hideTicketInfo},setScore:function(e){var t="";return t=e.PayScore>0?e.PayScore+"积分"+(e.PayAmt>0?"+¥"+e.PayAmt:""):"¥"+e.PayAmt,t},clickGo:function(){this.$Router.push({path:"/pages/vip/allMyOrder"})},copyTextFun:function(e){var t;t=l(e),t&&uni.showToast({title:"复制成功",duration:2e3,icon:"none"})},payBtn:function(){this.$refs.popupPay.open()},payBtnSubmit:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var n,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="4"==e.OrderInfo.OrderType?"UIntOrderOpera":"UOrderOpera",t.prev=1,t.next=4,(0,r.vipCard)({Action:"PayMoney",SID:e.OrderInfo.SID,OrderType:e.OrderInfo.OrderType},n);case 4:a=t.sent,i=a.Data;try{(0,o.weChatPayment)(e,i,!0)}catch(s){uni.showToast({title:"微信调起失败",duration:2e3,icon:"none"})}t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](1);case 11:case"end":return t.stop()}}),t,null,[[1,9]])})))()},cancelBtn:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,r.vipCard)({Action:"CancelOrder",SID:e.OrderInfo.SID,OrderType:e.$Route.query.OrderType},"UOrderOpera");case 3:uni.showToast({title:"订单取消成功",duration:2e3,icon:"none"}),setTimeout((function(){e.getInfo()}),1e3),t.next=9;break;case 7:t.prev=7,t.t0=t["catch"](0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})))()},cancelrefund:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$Router.push({path:"/pages/shoppingMall/order/refundReason",query:{refund:e,PayAmt:t.OrderInfo.PayAmt,SID:t.OrderInfo.SID,RefundTime:t.OrderInfo.RefundTime,RefCompleteTime:t.Refund?t.Refund.UpTime:"",Reply:t.Refund?t.Refund.Reply:"",OrderType:t.OrderInfo.OrderType}});case 1:case"end":return n.stop()}}),n)})))()},cancelEvaluate:function(){},clickAreaGo:function(){"1"===this.OrderInfo.DeliveryType&&(this.$refs.showArea.open(),this.showArea=!0)},showAreaChange:function(e){e.show||(this.showArea=!1)},clickGoAddress:function(){this.showArea=!1,this.$refs.showArea.close()},pickCode:function(){}}};function l(e){var t=document.createElement("textarea"),n=document.activeElement,a=document.getElementById("NewsToolBox");a.appendChild(t),t.value=e,t.focus(),t.setSelectionRange?t.setSelectionRange(0,t.value.length):t.select();try{var i=document.execCommand("copy")}catch(r){i=!1}return a.removeChild(t),n.focus(),i}t.default=d},d0c4:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".uni-status-bar[data-v-66e521c8]{width:%?750?%;height:20px\n\t\t/* height: var(--status-bar-height);\n */}",""]),e.exports=t},ef82:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-status-bar",style:{height:e.statusBarHeight}},[e._t("default")],2)},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},f554:function(e,t,n){"use strict";var a={uniSwipeAction:n("3dc0").default,uniSwipeActionItem:n("e305").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("uni-swipe-action",[n("uni-swipe-action-item",{attrs:{options:e.swipeOptions},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.swipeClick.apply(void 0,arguments)},change:function(t){arguments[0]=t=e.$handleEvent(t),e.swipeChange.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"adBaseView",style:{backgroundColor:e.backgroundColor},attrs:{"hover-class":"baseViewHover"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClick.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"adRowView"},[""!=e.icon?n("v-uni-image",{staticClass:"icon",style:{marginRight:e.iconRight+"upx"},attrs:{src:e.icon,mode:"aspectFit"}}):e._e(),""!=e.text?n("v-uni-view",{staticClass:"headView"},[n("v-uni-view",{staticClass:"textView",style:{color:e.textColor}},[e._v(e._s(e.text))]),!0===e.mustInput||"true"===e.mustInput?n("v-uni-view",{staticClass:"mustView"},[e._v("*")]):e._e()],1):e._e(),""!=e.detail?n("v-uni-view",{staticClass:"detailView1",style:{color:e.detailColor}},[e._v(e._s(e.detail))]):e._e(),e._t("default"),!0===e.showArrow||"true"===e.showArrow?n("v-uni-view",{staticClass:"iconfont arrowView"}):e._e()],2),null!=e.note&&""!=e.note?n("v-uni-view",{staticClass:"detailView2",style:{color:e.noteColor}},[e._v(e._s(e.note))]):e._e(),null!=e.note1&&""!=e.note1?n("v-uni-view",{staticClass:"detailView2",style:{color:e.noteColor}},[e._v(e._s(e.note1))]):e._e(),null!=e.note2&&""!=e.note2?n("v-uni-view",{staticClass:"detailView2",style:{color:e.noteColor}},[e._v(e._s(e.note2))]):e._e(),null!=e.note3&&""!=e.note3?n("v-uni-view",{staticClass:"detailView2",style:{color:e.noteColor}},[e._v(e._s(e.note3))]):e._e(),null!=e.note4&&""!=e.note4?n("v-uni-view",{staticClass:"detailView2",style:{color:e.noteColor}},[e._v(e._s(e.note4))]):e._e(),null!=e.note5&&""!=e.note5?n("v-uni-view",{staticClass:"detailView2",style:{color:e.noteColor}},[e._v(e._s(e.note5)+"333")]):e._e(),!0===e.showBottomLine||"true"===e.showBottomLine?n("v-uni-view",{staticClass:"bottomLine"}):e._e()],1)],1)],1)},r=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},f899:function(e,t,n){"use strict";n.r(t);var a=n("25bb"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a}}]);