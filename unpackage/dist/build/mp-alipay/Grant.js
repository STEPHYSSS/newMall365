(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["Grant"],{"0e2c":function(e,t,n){"use strict";n.r(t);var r=n("63a4"),c=n("9df1");for(var o in c)"default"!==o&&function(e){n.d(t,e,(function(){return c[e]}))}(o);n("9340");var i,a=n("f0c5"),u=Object(a["a"])(c["default"],r["b"],r["c"],!1,null,"81504dfa",null,!1,r["a"],i);t["default"]=u.exports},"28cb":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("4795")),c=n("57bb"),o=(i(n("3714")),i(n("b867")));function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,r,c,o,i){try{var a=e[o](i),u=a.value}catch(d){return void n(d)}a.done?t(u):Promise.resolve(u).then(r,c)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(r,c){var o=e.apply(t,n);function i(e){a(o,r,c,i,u,"next",e)}function u(e){a(o,r,c,i,u,"throw",e)}i(void 0)}))}}var d={name:"Grant",data:function(){return{redirect_uri:"",appId:"",UserMACPhone:o.default.get("UserMACPhone")}},onLoad:function(e){var t=JSON.parse(e.query);this.redirect_uri=t.redirect_uri,this.appId=t.appId},created:function(){"localhost"==window.location.hostname?window.location.href=this.redirect_uri+"&code=11111":this.UserMACPhone?e.navigateTo({url:"/pages/home"}):this.appId?(this.redirect_uri=encodeURIComponent(this.redirect_uri),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(this.appId,"&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=").concat(this.redirect_uri,"&state=1#wechat_redirect")):this.AppIdoAuth()},mounted:function(){},methods:{AppIdoAuth:function(){var e=this;return u(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.vipCard)({},"GetPlatform");case 3:n=t.sent,o=n.Data,e.redirect_uri=encodeURIComponent(e.redirect_uri),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(o.AppID,"&response_type=code&scope=snsapi_userinfo&connect_redirect=1&redirect_uri=").concat(e.redirect_uri,"&state=1#wechat_redirect"),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()}}};t.default=d}).call(this,n("c11b")["default"])},"63a4":function(e,t,n){"use strict";var r,c=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}))},8834:function(e,t,n){"use strict";(function(e){n("d977");r(n("66fd"));var t=r(n("0e2c"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("c11b")["createPage"])},9340:function(e,t,n){"use strict";var r=n("9dda"),c=n.n(r);c.a},"9dda":function(e,t,n){},"9df1":function(e,t,n){"use strict";n.r(t);var r=n("28cb"),c=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=c.a}},[["8834","common/runtime","common/vendor"]]]);