(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shoppingMall-seckill-index"],{"0314":function(t,e,i){"use strict";(function(t){var n=i("ee27");i("c975"),i("baa5"),i("fb6a"),i("d3b7"),i("3ca3"),i("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var o=n(i("c964")),a=i("8ec6"),r=i("ca79"),s=(n(i("0a9e")),{name:"",components:{},data:function(){return{title:"",list:[],loading:!0,seckillSID:"",grourSID:"",queryType:this.$Route.query.Type}},created:function(){var e=sessionStorage.getItem("searchUrl");if(null!=e&&e.indexOf("Flag")>-1&&(t.log("Flag0000"),null!=e&&e.lastIndexOf("?"))){var i=e.lastIndexOf("?");e=e.slice(i),this.seckillSID=(0,r.getQueryString2)("SID",e)}if(null!=e&&e.indexOf("Group")>-1&&(t.log("FlagGroup"),null!=e&&e.lastIndexOf("?"))){var n=e.lastIndexOf("?");e=e.slice(n),this.grourSID=(0,r.getQueryString2)("SID",e)}"1"===this.$Route.query.Type||this.seckillSID?this.title="秒杀活动":("5"===this.$Route.query.Type||this.grourSID)&&(this.title="拼团活动 ")},mounted:function(){this.$store.commit("SET_HISTORY_URL",{path:"/pages/shoppingMall/seckill/index"}),this.imgHeight=(uni.getSystemInfoSync().windowWidth-22)/2+"px","1"===this.queryType||this.seckillSID?this.getlist():("5"===this.$Route.query.Type||this.grourSID)&&this.getGrouplist()},methods:{getlist:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading(),i=JSON.parse(localStorage.getItem("currentStoreInfo")),e.prev=2,e.next=5,Promise.all([(0,a.vipCard)({Action:"GetPromotionList",Type:1,ShopSID:i?i.data.SID:"",SID:t.seckillSID?t.seckillSID:""},"UPromotionOpera")]);case 5:n=e.sent,t.list=n[0].Data.ProdList,uni.hideLoading(),t.loading=!1,e.next=13;break;case 11:e.prev=11,e.t0=e["catch"](2);case 13:case"end":return e.stop()}}),e,null,[[2,11]])})))()},getGrouplist:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading(),i=JSON.parse(localStorage.getItem("currentStoreInfo")),e.prev=2,e.next=5,Promise.all([(0,a.vipCard)({Action:"GetPromotionList",ShopSID:i?i.data.SID:"",SID:t.grourSID?t.grourSID:"",Type:5},"UPromotionOpera")]);case 5:n=e.sent,t.list=n[0].Data.ProdList,uni.hideLoading(),t.loading=!1,e.next=13;break;case 11:e.prev=11,e.t0=e["catch"](2);case 13:case"end":return e.stop()}}),e,null,[[2,11]])})))()},goodBox:function(t){"1"===this.$Route.query.Type||this.seckillSID?this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{SID:t.SID,seckill:"true"}}):("5"===this.$Route.query.Type||this.grourSID)&&this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{SID:t.SID,isGroup:"true"}})},clickLeft:function(){this.$Router.push({path:"/pages/shoppingMall/index"})}}});e.default=s}).call(this,i("5a52")["default"])},"067e":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".seckill .seckill-goodsBox[data-v-4329816d]{display:inline-block}.seckill .seckill-goodsBox[data-v-4329816d]:nth-child(2n + 1){margin-right:6px}",""]),t.exports=e},"1bdc":function(t,e,i){"use strict";i.r(e);var n=i("0314"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"86bb":function(t,e,i){"use strict";i.r(e);var n=i("e1ffb"),o=i("1bdc");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("bbc8");var r,s=i("f0c5"),l=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"4329816d",null,!1,n["a"],r);e["default"]=l.exports},baa5:function(t,e,i){var n=i("23e7"),o=i("e58c");n({target:"Array",proto:!0,forced:o!==[].lastIndexOf},{lastIndexOf:o})},bbc8:function(t,e,i){"use strict";var n=i("f04f"),o=i.n(n);o.a},e1ffb:function(t,e,i){"use strict";var n={uniNavBar:i("b3d2").default,aGoodBox:i("ee62").default,aNodeData:i("8410").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"seckill"},[t.loading?t._e():i("div",[i("uni-nav-bar",{attrs:{fixed:!0,"left-icon":"back",title:t.title,"status-bar":!0,shadow:!1},on:{clickLeft:function(e){arguments[0]=e=t.$handleEvent(e),t.clickLeft.apply(void 0,arguments)}}}),"1"===t.queryType||t.seckillSID?i("div",{staticStyle:{padding:"8px"}},t._l(t.list,(function(e,n){return i("div",{key:n,staticClass:"seckill-goodsBox"},[i("a-good-box",{attrs:{itemData:e,imgHeight:t.imgHeight,seckill:!0},on:{goodBox:function(e){arguments[0]=e=t.$handleEvent(e),t.goodBox.apply(void 0,arguments)}}})],1)})),0):t._e(),"5"===t.queryType||t.grourSID?i("div",{staticStyle:{padding:"8px"}},t._l(t.list,(function(e,n){return i("div",{key:n,staticClass:"seckill-goodsBox"},[i("a-good-box",{attrs:{itemData:e,imgHeight:t.imgHeight,isGroup:!0},on:{goodBox:function(e){arguments[0]=e=t.$handleEvent(e),t.goodBox.apply(void 0,arguments)}}})],1)})),0):t._e(),0===t.list.length?i("a-nodeData"):t._e()],1)])},a=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}))},f04f:function(t,e,i){var n=i("067e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("08696e4c",n,!0,{sourceMap:!1,shadowMode:!1})}}]);