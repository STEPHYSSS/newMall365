;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/autoComponents/goodsGroup/index"],{"0014":function(t,n,e){"use strict";e.r(n);var i=e("29a9");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);var u,o,s,h,c=e("f0c5"),a=Object(c["a"])(i["default"],u,o,!1,null,null,null,!1,s,h);n["default"]=a.exports},"1e47":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=u(e("0014")),r=e("657b");e("57bb");function u(t){return t&&t.__esModule?t:{default:t}}var o={mixins:[i.default],name:"",props:{propsObj:{type:Object,default:function(){return{groupList:[],menuStyle:"1",followBoard:"1",listStyle:"small",goodSpace:9,pageSpace:10,imgScale:"100",goodStyle:"promotion",chamfer:"circle",contain:"contain",fontWeight:"normal",textCenter:"left",showContent:["1","2","3","4"],buyButton:"9",buyButtonText:"马上抢",typeSign:"4",typeSignImg:""}}}},data:function(){return{basisWidth:"22%",translateXline:0,menuWidth:0,lineWidth:0,groupList:null,screenWidth:0,currentMenuIndex:"0",goodList:[],allGoodList:[],Prod_InfoList:[],prodInfo:[]}},components:{},updated:function(){},created:function(){},mounted:function(){this.screenWidth=t.getSystemInfoSync().screenWidth,this.currentObj.showContent=this.currentObj.showContent?this.currentObj.showContent:[],this.setMenuWidth(),this.currentObj._Cate_Data.length>0&&(this.groupList=this.currentObj._Cate_Data),this.currentObj._Prod_Data.length>0&&(this.prodInfo=this.currentObj._Prod_Data),this.currentMenuIndex="2"===this.currentObj.followBoard?0:"0"},methods:{setMenuWidth:function(){if(this.currentObj.groupList&&this.currentObj.groupList.length<4&&!this.groupList){var t="1"===this.currentObj.showAll?this.currentObj.groupList.length+1:this.currentObj.groupList.length;this.basisWidth=100/t+"%",this.menuWidth=this.screenWidth/t,this.lineWidth=Number((this.menuWidth/2).toFixed(2)),this.translateXline=(this.menuWidth-this.lineWidth)/2,this.translateXline=Number(this.translateXline.toFixed(2))}else this.menuWidth=Number(.22*this.screenWidth),this.basisWidth="22%",this.lineWidth=Number((this.menuWidth/2).toFixed(2)),this.translateXline=Number(((this.menuWidth-this.lineWidth)/2).toFixed(2))},clickMenu:function(t,n){this.currentMenuIndex=t,"0"===t?(this.translateXline=((this.menuWidth-this.lineWidth)/2).toFixed(2),this.goodList=this.currentObj._Cate_Data,this.prodInfo=this.currentObj._Prod_Data):(this.translateXline=(Number(t)*Number(this.menuWidth)+this.lineWidth/2).toFixed(2),this.prodInfo=this.currentObj._Prod_Data.filter((function(t){return t.CateSID===n.SID})))},setImgPrex:function(t){return(0,r.GetBaseImgUrl)()+t},urlGoodClick:function(t){this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{SID:t.SID,admin:!0}})}},watch:{"currentObj.showContent":function(){this.currentObj.showContent=this.currentObj.showContent?this.currentObj.showContent:[]},"currentObj.showAll":function(){this.setMenuWidth(),this.groupList&&("2"===this.currentObj.showAll?this.basisWidth="25%":this.basisWidth="22%")},"currentObj.groupList":function(){this.currentObj.groupList&&0!==this.currentObj.groupList.length?this.groupList=null:this.groupList=this.currentObj.groupList,this.setMenuWidth()},"currentObj.followBoard":function(){this.currentMenuIndex="2"===this.currentObj.followBoard?0:"0"}}};n.default=o}).call(this,e("c11b")["default"])},"29a9":function(t,n,e){"use strict";e.r(n);var i=e("29d5"),r=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a},"29d5":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={computed:{currentObj:function(){return this.propsObj}}};n.default=i},"619d":function(t,n,e){"use strict";var i=e("7595"),r=e.n(i);r.a},"69c1":function(t,n,e){"use strict";var i,r=function(){var t=this,n=t.$createElement,e=(t._self._c,t.currentObj.showContent.indexOf("5")),i=t._f("setImgPrex")(t.currentObj.typeSignImg),r=t.currentObj.showContent.indexOf("1"),u=t.currentObj.showContent.indexOf("2"),o=t.currentObj.showContent.indexOf("4"),s=t.currentObj.showContent.indexOf("3"),h=t.currentObj.showContent.indexOf("3"),c=t.currentObj.showContent.indexOf("3"),a=t.currentObj.showContent.indexOf("4"),d=t.__map(t.prodInfo,(function(n,e){var i=t.setImgPrex(n.Img);return{$orig:t.__get_orig(n),m0:i}}));t.$mp.data=Object.assign({},{$root:{g0:e,f0:i,g1:r,g2:u,g3:o,g4:s,g5:h,g6:c,g7:a,l0:d}})},u=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}))},7595:function(t,n,e){},"86d2":function(t,n,e){"use strict";e.r(n);var i=e("1e47"),r=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a},"9f0c":function(t,n,e){"use strict";e.r(n);var i=e("69c1"),r=e("86d2");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("619d");var o,s=e("f0c5"),h=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"4a730ebf",null,!1,i["a"],o);n["default"]=h.exports}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/autoComponents/goodsGroup/index-create-component',
    {
        'components/autoComponents/goodsGroup/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("9f0c"))
        })
    },
    [['components/autoComponents/goodsGroup/index-create-component']]
]);
