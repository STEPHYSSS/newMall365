(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/shoppingMall/index"],{"0aa6":function(t,e,n){"use strict";(function(t){n("d977");o(n("66fd"));var e=o(n("a76e"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("c11b")["createPage"])},3233:function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(n("4795")),r=n("57bb"),a=u(n("a055")),s=u(n("b867"));n("657b");function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,o,i,r,a){try{var s=t[r](a),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(o,i)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var r=t.apply(e,n);function a(t){c(r,o,i,a,s,"next",t)}function s(t){c(r,o,i,a,s,"throw",t)}a(void 0)}))}}var l=function(){n.e("components/ms-dropdown/dropdown-menu").then(function(){return resolve(n("f50e"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/ms-dropdown/dropdown-item").then(function(){return resolve(n("3d2b"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/ticketPopup/ticketPopup").then(function(){return resolve(n("3cb6"))}.bind(null,n)).catch(n.oe)},h={mixins:[a.default],components:{msDropdownMenu:l,msDropdownItem:f,ticketPop:p},data:function(){return{classHome:getApp().globalData.mainStyle,valueSearch:"",value1:0,getCoupon:[],list:[{text:"全部门店",value:0},{text:"item2",value:1},{text:"item3",value:2}],listMode:[],filterDropdownValue:{},innerAudio:null,oldAudioObj:{},loadding:!0,currentStoreInfo:{},addressName:{},SID:"",location:{}}},created:function(){this.init()},computed:{currentStore:function(){return this.$store.state.currentStoreInfo},addressInfo:function(){return this.$store.state.addressInfo}},watch:{currentStore:function(t){this.getAutoMode()},addressInfo:function(){this.getAutoMode()}},mounted:function(){},methods:{init:function(){if(sessionStorage.getItem("IsCoupon")||this.getCouponInfo(),localStorage.getItem("currentLocation")||this.getWxConfig(),t.showLoading({title:"加载中"}),this.$route.query.query){var e=JSON.parse(this.$route.query.query),n=Object.keys(e);"SID"==n&&(this.SID=Object.values(e))}this.addresses,this.addressName=JSON.parse(sessionStorage.getItem("takeOutAddress")),JSON.parse(localStorage.getItem("localShop"))?this.currentStoreInfo.Name=JSON.parse(localStorage.getItem("localShop")).Name:this.getShopList(),this.getAutoMode()},getWxConfig:function(){var t=this;return d(i.default.mark((function e(){var n,a;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.vipCard)({Action:"GetJSSDK",Url:window.location.href},"UProdOpera");case 3:n=e.sent,a=n.Data,o.config({debug:!1,appId:a.SDK.appId,timestamp:a.SDK.timestamp,nonceStr:a.SDK.noncestr,signature:a.SDK.signature,jsApiList:["getLocation","openAddress","scanQRCode"]}),o.ready((function(e){var n=t;o.getLocation({type:"gcj02",success:function(t){n.location={longitude:t.longitude,latitude:t.latitude},n.$store.commit("SET_CURRENT_LOCATION",n.location),sessionStorage.setItem("location",JSON.stringify(n.location)),console.log(JSON.stringify(n.location),"经纬度")},cancel:function(t){this.$toast.fail(t)}}),o.error((function(t){this.$toast.fail("获取当前位置失败"),console.log("调用微信接口获取当前位置失败",t)}))})),e.next=11;break;case 9:e.prev=9,e.t0=e["catch"](0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))()},getShopList:function(){var t=this;return d(i.default.mark((function e(){var n,o;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,r.vipCard)({Action:"GetShopList",Longitude:t.$store.state.currentLocation.longitude,Latitude:t.$store.state.currentLocation.latitude},"UShopOpera");case 2:n=e.sent,o=n.Data,t.currentStoreInfo={Name:o.ShopList[0].Name,Address:o.ShopList[0].Address,SID:o.ShopList[0].SID,Latitude:o.ShopList[0].Latitude,Longitude:o.ShopList[0].Longitude},t.$store.commit("SET_CURRENT_STORE",t.currentStoreInfo),localStorage.setItem("localShop",JSON.stringify(t.currentStoreInfo));case 7:case"end":return e.stop()}}),e)})))()},getCouponInfo:function(){var t=this;return d(i.default.mark((function e(){var n,o;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.vipCard)({Action:"GiveCoupon"},"UPromotionOpera");case 3:n=e.sent,o=n.Data,t.getCoupon=o.TicketList?o.TicketList:[],e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},clickClear:function(){s.default.remove("UserMACPhone")},clickCoupon:function(){this.$Router.push("/pages/shoppingMall/list/couponList")},clickGoods:function(){this.$Router.push("/pages/shoppingMall/list/goodsList")},clickGoods_two:function(){this.$Router.push("/shoppingMall/goodsList_two")},integralMall:function(){this.$Router.push("/pages/integralMall/index")},seckill:function(){this.$Router.push("/pages/shoppingMall/seckill/index")},makeUpGroup:function(){this.$Router.push("/pages/shoppingMall/makeGroup/makeGroup")},setVoice:function(){},voicePlay:function(e){var n=this,o=t.getStorageSync("arrVoice");if(e.indexMy!==this.oldAudioObj.indexMy&&(this.innerAudio.src=e.url,this.innerAudio.loop="True"===e.loopPlay),this.oldAudioObj=e,this.innerAudio.paused){var i=o.filter((function(t){return t.index===e.indexMy}))[0].startTime;i&&(this.innerAudio.startTime=i),this.innerAudio.play()}else"2"==e.anewAudio?(this.innerAudio.pause(),o.forEach((function(t){t.index===e.indexMy&&(t.startTime=n.innerAudio.duration)})),t.setStorageSync("arrVoice",o)):"1"==e.anewAudio&&this.innerAudio.stop()},getAutoMode:function(){var e=this;return d(i.default.mark((function n(){var o,a,s;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"加载中"}),o=JSON.parse(localStorage.getItem("currentStoreInfo")),n.prev=2,n.next=5,(0,r.vipCard)({Action:"GetDecorate",Type:"0",SID:e.SID[0]?e.SID[0]:"",ShopSID:o?o.data.SID:""},"UShopOpera");case 5:a=n.sent,s=a.Data,t.hideLoading(),e.loadding=!1,e.listMode=s.Decorate.HtmlInfo?s.Decorate.HtmlInfo:[],n.next=15;break;case 12:n.prev=12,n.t0=n["catch"](2),console.log(n.t0);case 15:case"end":return n.stop()}}),n,null,[[2,12]])})))()},toziqu:function(){this.$store.commit("SET_ORDER_TYPE","takein");var t=JSON.parse(localStorage.getItem("currentStoreInfo"));this.currentStoreInfo={Name:t.data.Name,Address:t.data.Address,SID:t.data.SID,Length:t.data.Length}},toShopAddress:function(){this.$Router.push({path:"/pages/myAddress/myAddress",query:{flag:"shopAuto"}})},toAddress:function(){this.$store.commit("SET_ORDER_TYPE","takeout"),this.$Router.push({path:"/pages/myAddress/myAddress",query:{flag:"AutoWaimai"}})}}};e.default=h}).call(this,n("c11b")["default"],n("c11b")["default"])},7407:function(t,e,n){"use strict";n.r(e);var o=n("3233"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},a559:function(t,e,n){},a76e:function(t,e,n){"use strict";n.r(e);var o=n("bff3"),i=n("7407");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("a973");var a,s=n("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"eaa38f7e",null,!1,o["a"],a);e["default"]=u.exports},a973:function(t,e,n){"use strict";var o=n("a559"),i=n.n(o);i.a},bff3:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement,n=(t._self._c,JSON.stringify(t.location));t.$mp.data=Object.assign({},{$root:{g0:n}})},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}))}},[["0aa6","common/runtime","common/vendor"]]]);