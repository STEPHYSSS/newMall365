(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/shoppingMall/seckill/index"],{"04a0":function(t,n,e){"use strict";e.r(n);var o=e("fe62"),a=e("3965");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("aa54");var r,u=e("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"752f5e4a",null,!1,o["a"],r);n["default"]=c.exports},3965:function(t,n,e){"use strict";e.r(n);var o=e("9597"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},"3f9a":function(t,n,e){"use strict";(function(t){e("d977");o(e("66fd"));var n=o(e("04a0"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("c11b")["createPage"])},"8ccc":function(t,n,e){},9597:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("4795")),a=e("57bb");function i(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,o,a,i,r){try{var u=t[i](r),c=u.value}catch(s){return void e(s)}u.done?n(c):Promise.resolve(c).then(o,a)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(o,a){var i=t.apply(n,e);function u(t){r(i,o,a,u,c,"next",t)}function c(t){r(i,o,a,u,c,"throw",t)}u(void 0)}))}}var c={name:"",components:{},data:function(){return{list:[],loading:!0,seckillSID:""}},created:function(){this.$route.query.SID&&(this.seckillSID=this.$route.query.SID)},mounted:function(){this.$store.commit("SET_HISTORY_URL",{path:"/pages/shoppingMall/seckill/index"}),this.imgHeight=(t.getSystemInfoSync().windowWidth-22)/2+"px",this.getlist()},methods:{getlist:function(){var n=this;return u(o.default.mark((function e(){var i,r;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading(),i=JSON.parse(localStorage.getItem("currentStoreInfo")),e.prev=2,e.next=5,Promise.all([(0,a.vipCard)({Action:"GetPromotionList",Type:1,ShopSID:i?i.data.SID:"",SID:n.$route.query.SID},"UPromotionOpera")]);case 5:r=e.sent,n.list=r[0].Data.ProdList,t.hideLoading(),n.loading=!1,e.next=13;break;case 11:e.prev=11,e.t0=e["catch"](2);case 13:case"end":return e.stop()}}),e,null,[[2,11]])})))()},goodBox:function(t){this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{SID:t.SID,seckill:"true"}})},clickLeft:function(){this.$Router.push({path:"/pages/shoppingMall/index"})}}};n.default=c}).call(this,e("c11b")["default"])},aa54:function(t,n,e){"use strict";var o=e("8ccc"),a=e.n(o);a.a},fe62:function(t,n,e){"use strict";var o={uniNavBar:function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"44c0"))},aGoodBox:function(){return Promise.all([e.e("common/vendor"),e.e("components/a-good-box/a-good-box")]).then(e.bind(null,"a65f"))},aNodeData:function(){return e.e("components/a-nodeData/a-nodeData").then(e.bind(null,"f6d5"))}},a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}))}},[["3f9a","common/runtime","common/vendor"]]]);