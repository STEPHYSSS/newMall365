(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cc5ebf80"],{"066b":function(e,a,t){"use strict";var i=t("20f1"),n=t.n(i);n.a},"20f1":function(e,a,t){var i=t("c1f5");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=t("4f06").default;n("ae64d876",i,!0,{sourceMap:!1,shadowMode:!1})},"3aff":function(e,a,t){"use strict";var i=t("ee27");t("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(t("e4c5")),r=t("ca79"),o={mixins:[n.default],props:{propsObj:{type:Object,default:function(){return{navStyle:"",pageShowNum:1,backGColor:"rgb(255,255,255)",fontColor:"rgb(0,0,0)",listNav:[{img:"",name:"",urlObj:{name:"",url:""}}]}}}},data:function(){return{widthBoxHid:"",HeightBoxHid:"",widthBox:""}},mounted:function(){this.setWidth()},methods:{setImgPrex:function(e){return e&&this.propsObj.listNav&&this.propsObj.listNav.length>0?(0,r.GetBaseImgUrl)()+e:e},setWidth:function(){var e=uni.getSystemInfoSync().windowWidth,a=Number(this.propsObj.pageShowNum)+3;"1"==this.propsObj.isScroll?(this.widthBox=(e+70)*(100/a/100),this.widthBoxHid=e*(100/a/100)):(this.widthBoxHid=100/this.currentObj.listNav.length+"%",this.HeightBoxHid=e*(100/this.currentObj.listNav.length/100))},clickUrl:function(e){e.urlObj&&e.urlObj.url&&(window.location.href=e.urlObj.url)}},watch:{"propsObj.pageShowNum":function(){this.setWidth()}}};a.default=o},"47bf":function(e,a,t){e.exports=t.p+"static/img/interestTip.f5c5c0ea.jpg"},"4b43":function(e,a,t){"use strict";t.r(a);var i=t("3aff"),n=t.n(i);for(var r in i)"default"!==r&&function(e){t.d(a,e,(function(){return i[e]}))}(r);a["default"]=n.a},7794:function(e,a,t){"use strict";var i,n=function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",{staticClass:"imgNav-style"},[i("div",{style:{"background-color":"rgb(249, 249, 249)",cursor:"grab"}},["image"==e.currentObj.navStyle?i("div",e._l(e.currentObj.listNav,(function(a,n){return i("div",{key:n,ref:"imageWrapper",refInFor:!0,staticClass:"image-wrapper"},[i("a",{staticClass:"cap-image-ad__link--image-nav cap-image-ad__link",style:{color:e.currentObj.fontColor},attrs:{href:"javascript:;"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickUrl(a)}}},[i("div",{staticClass:"boxTitle"},[i("img",{attrs:{src:t("47bf")}}),i("span",[e._v(e._s(a.name))])]),i("p",{staticStyle:{"text-align":"center","background-color":"#fff"}},[""===a.url?i("v-uni-image",{staticStyle:{width:"100%",height:"180px",display:"inline-block"},attrs:{src:t("ff65").replace(/^\./,"")}}):i("v-uni-image",{attrs:{src:e.setImgPrex(a.url)}})],1)])])})),0):e._e()])])},r=[];t.d(a,"b",(function(){return n})),t.d(a,"c",(function(){return r})),t.d(a,"a",(function(){return i}))},9122:function(e,a,t){"use strict";t.r(a);var i=t("a292"),n=t.n(i);for(var r in i)"default"!==r&&function(e){t.d(a,e,(function(){return i[e]}))}(r);a["default"]=n.a},a292:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={computed:{currentObj:function(){return this.propsObj}}};a.default=i},c1f5:function(e,a,t){var i=t("24fb");a=i(!1),a.push([e.i,'.imgNav-style .rc-design-vue-preview[data-v-6e28aeb2]{position:relative;overflow:hidden;line-height:normal}.imgNav-style .cap-image-ad[data-v-6e28aeb2]{overflow:hidden;font-size:0}.imgNav-style .cap-image-ad__image-nav[data-v-6e28aeb2]{white-space:nowrap\n  /* padding-bottom: 10px; */\n  /* margin-bottom: -17px; */}.imgNav-style .cap-image-ad__image-nav[data-v-6e28aeb2]::-webkit-scrollbar{\n  /* width: 0px;\n  height: 0px; */}.imgNav-style .cap-image-ad__image[data-v-6e28aeb2]{display:block;margin:0 auto;border:0}.imgNav-style .cap-image-ad__link[data-v-6e28aeb2]{display:block;position:relative;height:100%}.imgNav-style .cap-image-ad__nav-title[data-v-6e28aeb2]{font-size:12px;width:100%;padding-left:5px;padding-right:5px;text-align:center;overflow:hidden;box-sizing:border-box}.imgNav-style .cap-image-ad__text-nav[data-v-6e28aeb2]{margin-left:0;margin-right:0}.imgNav-style .cap-image-ad__slide[data-v-6e28aeb2]{width:100%;overflow-y:hidden;white-space:nowrap\n  /* padding-bottom: 10px; */}.imgNav-style .cap-image-ad__image-nav .image-wrapper[data-v-6e28aeb2]{display:inline-block;vertical-align:middle}.imgNav-style .cap-image-ad__image-nav .cap-image-ad__link--image-nav[data-v-6e28aeb2]{font-size:0}.imgNav-style .boxTitle[data-v-6e28aeb2]{width:100%;height:50px}.imgNav-style .boxTitle img[data-v-6e28aeb2]{width:100%;position:relative;height:100%}.imgNav-style .boxTitle span[data-v-6e28aeb2]{position:absolute;top:0;line-height:50px;left:30%;font-size:14px;width:39.5%;text-align:center;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block}.imgNav-style .cap-image-ad__image-nav .cap-image-ad__image[data-v-6e28aeb2]{background-size:cover;background-position:50%}.imgNav-style .cap-image-ad__image-nav .cap-image-ad__nav-title[data-v-6e28aeb2]{line-height:35px}.imgNav-style .cap-image-ad__text-nav .text-nav-wrapper[data-v-6e28aeb2]{display:inline-block;padding:15px 0}.imgNav-style .cap-image-ad__text-nav .cap-image-ad__nav-title[data-v-6e28aeb2]{position:relative;font-size:12px;text-align:center;margin-bottom:0}.imgNav-style .cap-image-ad__text-nav .cap-image-ad__nav-title[data-v-6e28aeb2]:after{content:"";position:absolute;top:0;left:0;\n  /* width: 200%; */height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;pointer-events:none;box-sizing:border-box;border-right:1px solid #eee}',""]),e.exports=a},e4c5:function(e,a,t){"use strict";t.r(a);var i=t("9122");for(var n in i)"default"!==n&&function(e){t.d(a,e,(function(){return i[e]}))}(n);var r,o,l,s,c=t("f0c5"),d=Object(c["a"])(i["default"],r,o,!1,null,null,null,!1,l,s);a["default"]=d.exports},ff65:function(e,a,t){e.exports=t.p+"static/img/quanyiTop.608b8eb6.png"},ff95:function(e,a,t){"use strict";t.r(a);var i=t("7794"),n=t("4b43");for(var r in n)"default"!==r&&function(e){t.d(a,e,(function(){return n[e]}))}(r);t("066b");var o,l=t("f0c5"),s=Object(l["a"])(n["default"],i["b"],i["c"],!1,null,"6e28aeb2",null,!1,i["a"],o);a["default"]=s.exports}}]);