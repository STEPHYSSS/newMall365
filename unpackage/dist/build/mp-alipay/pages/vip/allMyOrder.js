(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/vip/allMyOrder"],{"45c9":function(t,n,e){"use strict";e.r(n);var a=e("eaa0"),r=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=r.a},"71af":function(t,n,e){"use strict";var a={uniNavBar:function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"44c0"))},msTabs:function(){return e.e("components/ms-tabs/ms-tabs").then(e.bind(null,"4713"))},aOrderBox:function(){return e.e("components/a-orderBox/a-orderBox").then(e.bind(null,"dc8f"))}},r=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}))},d23d:function(t,n,e){"use strict";(function(t){e("d977");a(e("66fd"));var n=a(e("ec8b"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("c11b")["createPage"])},eaa0:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("4795")),r=e("57bb");function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,a,r,i,o){try{var u=t[i](o),c=u.value}catch(l){return void e(l)}u.done?n(c):Promise.resolve(c).then(a,r)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(a,r){var i=t.apply(n,e);function u(t){o(i,a,r,u,c,"next",t)}function c(t){o(i,a,r,u,c,"throw",t)}u(void 0)}))}}var c={data:function(){return{active:null,fromData:[],fromData0:[],loading:!0,mainColor:getApp().globalData.mainColor,mainStyle:getApp().globalData.mainStyle,list:[{title:"全部"},{title:"待付款"},{title:"已付款"},{title:"已提货"},{title:"已取消"}],State:"",OrderType:""}},onLoad:function(t){this.active=Number(this.$Route.query.id)||0,this.getList()},methods:{onClick:function(t,n){l(t,this)},getList:function(){var t=this;return u(a.default.mark((function n(){var e,i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,r.vipCard)({Action:"GetOrderList",OrderType:t.OrderType?t.OrderType:""},"UOrderOpera");case 3:e=n.sent,i=e.Data,t.allfromData=i.OrderList,t.fromData=i.OrderList,l(t.active,t),t.loading=!1,n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](0),t.loading=!1;case 14:case"end":return n.stop()}}),n,null,[[0,11]])})))()},clickGo:function(){this.$Router.pushTab({path:"/pages/home"})}},watch:{active:function(t){var n=this;this.loading=!0,setTimeout((function(){n.loading=!1,l(t,n)}),200)}}};function l(t,n){var e=[];n.allfromData&&0!==n.allfromData.length?("0"==t?e=n.allfromData:"1"==t?e=n.allfromData.filter((function(t){return"-1"==t.State})):"2"==t?e=n.allfromData.filter((function(t){return"0"==t.State||"1"==t.State||"-2"==t.State})):"3"==t?e=n.allfromData.filter((function(t){return"3"==t.State})):"4"==t&&(e=n.allfromData.filter((function(t){return"-3"==t.State}))),n.fromData=e):n.fromData=[]}n.default=c},ec8b:function(t,n,e){"use strict";e.r(n);var a=e("71af"),r=e("45c9");for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);var o,u=e("f0c5"),c=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"4fbb8489",null,!1,a["a"],o);n["default"]=c.exports}},[["d23d","common/runtime","common/vendor"]]]);