;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/autoComponents/titleBox/index"],{"0014":function(t,n,e){"use strict";e.r(n);var r=e("29a9");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);var i,a,c,l,o=e("f0c5"),f=Object(o["a"])(r["default"],i,a,!1,null,null,null,!1,c,l);n["default"]=f.exports},"17f3":function(t,n,e){"use strict";var r,u=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return r}))},"1d9d":function(t,n,e){},"29a9":function(t,n,e){"use strict";e.r(n);var r=e("29d5"),u=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=u.a},"29d5":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={computed:{currentObj:function(){return this.propsObj}}};n.default=r},"3e37":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("0014"));function u(t){return t&&t.__esModule?t:{default:t}}var i={mixins:[r.default],props:{propsObj:{type:Object,default:function(){return{title:"",traditionStyle:"0",textAlign:"left",subtitle:"",backGColor:"rgb(249, 249, 249)",navName:"",navNameUrl:"",dataTitle:"",authorTitle:"",titleUrlName:"",titleUrl:""}}}},data:function(){return{}},computed:{},mounted:function(){},methods:{reportErrorsFun:function(){return this.currentObj.title?"1"===this.currentObj.traditionStyle&&this.currentObj.titleUrlName&&!this.currentObj.titleUrl?"请填写标题的链接":void 0:"请填写标题内容"},clickUrl:function(){if(this.currentObj.titleUrl){var n=this.currentObj.titleUrl.split("#"),e=n[1];t.reLaunch({url:e})}}}};n.default=i}).call(this,e("c11b")["default"])},"5c28":function(t,n,e){"use strict";e.r(n);var r=e("17f3"),u=e("d03f");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("f39e");var a,c=e("f0c5"),l=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,"6ba20681",null,!1,r["a"],a);n["default"]=l.exports},d03f:function(t,n,e){"use strict";e.r(n);var r=e("3e37"),u=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=u.a},f39e:function(t,n,e){"use strict";var r=e("1d9d"),u=e.n(r);u.a}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/autoComponents/titleBox/index-create-component',
    {
        'components/autoComponents/titleBox/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("5c28"))
        })
    },
    [['components/autoComponents/titleBox/index-create-component']]
]);
