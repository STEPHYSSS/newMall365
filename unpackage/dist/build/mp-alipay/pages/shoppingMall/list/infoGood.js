(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/shoppingMall/list/infoGood"],{"1b65":function(e,t,n){"use strict";(function(e){n("d977");o(n("66fd"));var t=o(n("9cf2"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("c11b")["createPage"])},3988:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("4795")),i=n("57bb"),u=r(n("a055"));function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,o,i,u,r){try{var a=e[u](r),s=a.value}catch(c){return void n(c)}a.done?t(s):Promise.resolve(s).then(o,i)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var u=e.apply(t,n);function r(e){a(u,o,i,r,s,"next",e)}function s(e){a(u,o,i,r,s,"throw",e)}r(void 0)}))}}var c={name:"goodsPage",mixins:[u.default],components:{},data:function(){return{goodList:{},skuDataInfo:{},SID:"",title:""}},onLoad:function(e){},created:function(){this.getInfo(),this.isIntegral=this.$Route.query.isIntegral||"",this.seckill=this.$Route.query.seckill||"",this.isBrowse=this.$Route.query.isBrowse||"",this.$store.commit("SET_HISTORY_URL",{path:"/pages/shoppingMall/list/infoGood",query:{SID:this.$Route.query.SID}})},methods:{getInfo:function(){var e=this;return s(o.default.mark((function t(){var n,u,r,a,s;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.parse(localStorage.getItem("currentStoreInfo")),t.prev=1,u="true"==e.$Route.query.isIntegral?"UIntegralOpera":e.$Route.query.seckill?"UPromotionOpera":"UProdOpera",r=e.$Route.query.seckill?"GetPromotion":"GetProdInfo",t.next=6,(0,i.vipCard)({Action:r,SID:e.$Route.query.SID,ShopSID:n?n.data.SID:""},u);case 6:a=t.sent,s=a.Data,e.$Route.query.seckill?(e.title=s.ProdInfo.Name,e.goodList=s.ProdInfo||{},e.skuDataInfo=s||{}):(e.goodList=s.ProdInfo||{},e.title=s.ProdInfo.Name,e.skuDataInfo=s||{}),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),"该商品不在此门店,请切换其他门店"==t.t0&&setTimeout((function(){e.$Router.push({path:"/pages/shoppingMall/index"})}),2e3);case 14:case"end":return t.stop()}}),t,null,[[1,11]])})))()},clickLeft:function(){this.$Route.query.isCard?this.$Router.pushTab("/pages/shoppingMall/shoppingCart/index"):this.$Route.query.isGoodList?this.$Router.push("/pages/shoppingMall/list/goodsList"):this.$Route.query.isIntegral?this.$Router.push("/pages/integralMall/index"):this.seckill?this.$Router.push("/pages/shoppingMall/seckill/index"):this.$Route.query.admin?this.$Router.push("/pages/shoppingMall/index"):this.$Router.back(1)}}};t.default=c},"5fd9":function(e,t,n){"use strict";var o=n("8b86"),i=n.n(o);i.a},"8b86":function(e,t,n){},"9aa5":function(e,t,n){"use strict";n.r(t);var o=n("3988"),i=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=i.a},"9cf2":function(e,t,n){"use strict";n.r(t);var o=n("b338"),i=n("9aa5");for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("5fd9");var r,a=n("f0c5"),s=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"52a4cc84",null,!1,o["a"],r);t["default"]=s.exports},b338:function(e,t,n){"use strict";var o={uniNavBar:function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"44c0"))},aInfoBuyPageSeckill:function(){return Promise.all([n.e("common/vendor"),n.e("components/a-info-buyPageSeckill/a-info-buyPageSeckill")]).then(n.bind(null,"0725"))},aInfoBuyPage:function(){return Promise.all([n.e("common/vendor"),n.e("components/a-info-buyPage/a-info-buyPage")]).then(n.bind(null,"c697"))}},i=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}))}},[["1b65","common/runtime","common/vendor"]]]);