;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/popup-layer/popup-layer"],{"0153":function(t,n,o){},"57e0":function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"popup-layer",model:{prop:"showPop",event:"change"},props:{showPop:{type:Boolean,default:!1},direction:{type:String,default:"top"},autoClose:{type:Boolean,default:!0}},data:function(){return{ifshow:!1,translateValue:-100,timer:null,iftoggle:!1}},computed:{_translate:function(){var t={top:"transform:translateY(".concat(-this.translateValue,"%)"),bottom:"transform:translateY(".concat(this.translateValue,"%)"),left:"transform:translateX(".concat(-this.translateValue,"%)"),right:"transform:translateX(".concat(this.translateValue,"%)")};return t[this.direction]},_location:function(){var t={top:"bottom:0px;width:100%;",bottom:"top:0px;width:100%;",left:"right:0px;height:100%;",right:"left:0px;height:100%;"};return t[this.direction]+this._translate}},mounted:function(){this.showPop&&this.show()},watch:{showPop:function(t){console.log(t),t?this.show():this.close()}},methods:{stopMove:function(t){console.log(11),console.log(t)},show:function(t){var n=this;this.ifshow=!0;setTimeout((function(){n.translateValue=0,null}),100),setTimeout((function(){n.iftoggle=!0,null}),300)},close:function(){var t=this;null===this.timer&&this.iftoggle&&(this.translateValue=-100,this.timer=setTimeout((function(){t.ifshow=!1,t.timer=null,t.iftoggle=!1,t.$emit("closeCallBack",null),t.$emit("change",!1)}),300))},ableClose:function(){this.autoClose&&this.close()},stopEvent:function(t){},doSome:function(){console.log(0x6527ea6c87c7)}}};n.default=e},"77e3":function(t,n,o){"use strict";o.r(n);var e=o("b88c"),a=o("b232");for(var i in a)"default"!==i&&function(t){o.d(n,t,(function(){return a[t]}))}(i);o("a4cc");var l,s=o("f0c5"),u=Object(s["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],l);n["default"]=u.exports},a4cc:function(t,n,o){"use strict";var e=o("0153"),a=o.n(e);a.a},b232:function(t,n,o){"use strict";o.r(n);var e=o("57e0"),a=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,(function(){return e[t]}))}(i);n["default"]=a.a},b88c:function(t,n,o){"use strict";var e,a=function(){var t=this,n=t.$createElement;t._self._c},i=[];o.d(n,"b",(function(){return a})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return e}))}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/popup-layer/popup-layer-create-component',
    {
        'components/popup-layer/popup-layer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("77e3"))
        })
    },
    [['components/popup-layer/popup-layer-create-component']]
]);
