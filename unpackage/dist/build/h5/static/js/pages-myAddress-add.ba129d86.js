(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myAddress-add"],{"0619":function(t,a,e){"use strict";var i,n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.isShow?e("v-uni-view",{ref:"ani",staticClass:"uni-transition",class:[t.ani.in],style:"transform:"+t.transform+";"+t.stylesObject,on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.change.apply(void 0,arguments)}}},[t._t("default")],2):t._e()},r=[];e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return r})),e.d(a,"a",(function(){return i}))},"0c90":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,"[data-v-3a901bb0] .uni-popup__wrapper-box{width:100%;height:100%}\n/* 覆盖样式修改颜色 */[data-v-3a901bb0] uni-switch .uni-switch-input.uni-switch-input-checked{background-color:#adb838!important;border-color:#adb838!important}.widthBox[data-v-3a901bb0]{width:68%}.widthBox uni-input[data-v-3a901bb0]{font-size:12px}.widthBox .radio-group[data-v-3a901bb0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.widthBox .radio-group .radio[data-v-3a901bb0]{padding:%?10?% %?30?%;border-radius:%?6?%;border:1px solid #ccc;margin-right:6px}.widthBox .radio-group .radio.checked[data-v-3a901bb0]{background-color:#adb838;color:#fff;border:1px solid #adb838}",""]),t.exports=a},"1d5a":function(t,a,e){"use strict";e.r(a);var i=e("883c"),n=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(a,t,(function(){return i[t]}))}(r);a["default"]=n.a},3169:function(t,a,e){"use strict";var i=e("d3c2"),n=e.n(i);n.a},4568:function(t,a,e){"use strict";var i=e("e8b3"),n=e.n(i);n.a},"66ac":function(t,a,e){"use strict";var i={uniNavBar:e("44c0").default,uniPopup:e("a329").default,simpleAddress:e("23fe").default},n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[e("uni-nav-bar",{attrs:{fixed:!0,"left-icon":"back",title:t.specificAreaHead?"选择收货地址":"收货地址","status-bar":!0,shadow:!1},on:{clickLeft:function(a){arguments[0]=a=t.$handleEvent(a),t.clickGo.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"main",class:t.mainStyle},[e("div",{staticClass:"setADcell"},[e("adCell",{attrs:{text:"收货人",showArrow:"false"}},[e("div",{staticClass:"widthBox"},[e("v-uni-input",{attrs:{type:"text",placeholder:"请填写收货人的姓名"},model:{value:t.form.Name,callback:function(a){t.$set(t.form,"Name",a)},expression:"form.Name"}}),e("v-uni-text",{staticClass:"iconfont icon-tongxunlu",staticStyle:{position:"absolute",right:"30px",top:"15px"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.getWxAddress.apply(void 0,arguments)}}})],1)]),e("adCell",{attrs:{text:"性别",showArrow:"false"}},[e("div",{staticClass:"widthBox"},[e("v-uni-view",{staticClass:"radio-group"},[e("v-uni-view",{staticClass:"radio",class:{checked:!t.form.Sex},staticStyle:{"margin-right":"10rpx"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.form.Sex=0}}},[t._v("先生")]),e("v-uni-view",{staticClass:"radio",class:{checked:t.form.Sex},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.form.Sex=1}}},[t._v("女士")])],1)],1)]),e("adCell",{attrs:{text:"手机号",showArrow:"false"}},[e("div",{staticClass:"widthBox"},[e("v-uni-input",{attrs:{type:"text",placeholder:"请填写收货人手机号码"},model:{value:t.form.Mobile,callback:function(a){t.$set(t.form,"Mobile",a)},expression:"form.Mobile"}})],1)]),e("adCell",{attrs:{text:"收货地址",showArrow:"false"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.tenxButton.apply(void 0,arguments)}}},[e("div",{staticClass:"widthBox"},[e("span",[t._v(t._s(t.form.Address?t.form.Address:"点击选择"))])])]),e("adCell",{attrs:{text:"门牌号",showArrow:"false"}},[e("div",{staticClass:"widthBox"},[e("v-uni-input",{attrs:{type:"text",placeholder:"详细地址，例：15号楼5层301室"},model:{value:t.form.House,callback:function(a){t.$set(t.form,"House",a)},expression:"form.House"}})],1)]),e("adCell",{attrs:{text:"设置默认地址",showArrow:"false"}},[e("div",{staticClass:"widthBox",staticStyle:{width:"40%"}},[e("v-uni-switch",{staticStyle:{position:"absolute",top:"7px",left:"33%",transform:"scale(0.8)"},attrs:{checked:t.form.Defaults},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.switchChange.apply(void 0,arguments)}}})],1)])],1),e("div",{staticStyle:{"margin-top":"50px",padding:"0 20px"}},[e("v-uni-button",{staticStyle:{"background-color":"#ADB838",color:"#fff",height:"40px","line-height":"40px","font-size":"16px"},attrs:{type:"main",size:"large",disabled:t.disabledLoad},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.saveArea.apply(void 0,arguments)}}},[t._v("保 存")])],1)]),e("uni-popup",{ref:"specificArea",staticClass:"confirm-area-popup",staticStyle:{"margin-top":"50px"}},[e("iframe",{staticStyle:{"margin-top":"50px"},attrs:{id:"mapPage",width:"100%",height:"100%",frameborder:"0",src:"https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&coord=30.59035,114.310694&key=IB5BZ-HF53W-5KLRH-R3VUL-35KO7-Y2BUT&referer=365商城管理"}})]),e("simple-address",{ref:"logisticsArea",attrs:{pickerValueDefault:t.cityPickerValueDefault,themeColor:"#007AFF"},on:{onConfirm:function(a){arguments[0]=a=t.$handleEvent(a),t.confirmArea.apply(void 0,arguments)}}})],1)},r=[];e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return r})),e.d(a,"a",(function(){return i}))},7391:function(t,a,e){"use strict";e.r(a);var i=e("f434"),n=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(a,t,(function(){return i[t]}))}(r);a["default"]=n.a},"751f":function(t,a,e){"use strict";e.r(a);var i=e("66ac"),n=e("1d5a");for(var r in n)"default"!==r&&function(t){e.d(a,t,(function(){return n[t]}))}(r);e("4568");var o,s=e("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"3a901bb0",null,!1,i["a"],o);a["default"]=c.exports},"7db7":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".uni-popup[data-v-1cc2f452]{position:fixed;\ntop:var(--window-top);\n\n\nbottom:0;left:0;right:0;\nz-index:99\n}.uni-popup__mask[data-v-1cc2f452]{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.4);opacity:0}.mask-ani[data-v-1cc2f452]{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-mask[data-v-1cc2f452]{opacity:1}.uni-bottom-mask[data-v-1cc2f452]{opacity:1}.uni-center-mask[data-v-1cc2f452]{opacity:1}.uni-popup__wrapper[data-v-1cc2f452]{\ndisplay:block;\nposition:absolute}.top[data-v-1cc2f452]{top:0;left:0;right:0;-webkit-transform:translateY(-500px);transform:translateY(-500px)}.bottom[data-v-1cc2f452]{bottom:0;left:0;right:0;-webkit-transform:translateY(500px);transform:translateY(500px)}.center[data-v-1cc2f452]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\nbottom:0;left:0;right:0;top:0;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-1cc2f452]{\ndisplay:block;\nposition:relative}.content-ani[data-v-1cc2f452]{\n\t\t/* transition: transform 0.3s;\n */-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-content[data-v-1cc2f452]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-bottom-content[data-v-1cc2f452]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-center-content[data-v-1cc2f452]{-webkit-transform:scale(1);transform:scale(1);opacity:1}",""]),t.exports=a},"883c":function(t,a,e){"use strict";var i=e("ee27");e("c975"),e("ac1f"),e("5319"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("96cf");var n=i(e("c964")),r=e("57bb"),o=i(e("afed")),s=i(e("1420")),c=e("657b"),f=i(e("c1d6")),l=i(e("241d")),u={mixins:[l.default],name:"index",components:{adCell:s.default},data:function(){return{mainStyle:getApp().globalData.mainStyle,areaInfo:{},currentDeliveryType:"",specificArea:!1,logisticsArea:!1,isAdd:!1,form:{Sex:0,Name:"",Mobile:"",Address:"",House:""},location:{},areaList:o.default,disabledLoad:!1,specificAreaHead:!1,cityPickerValueDefault:[0,0,1],publicName:"",publicMobile:""}},created:function(){if(this.getWxConfig(),this.DeliveryType=this.currentDeliveryType.indexOf("2")>-1?2:3,this.$Route.query.areaInfo&&(this.form=this.$Route.query.areaInfo,this.form.Defaults="1"===this.form.Defaults),"{}"!==JSON.stringify(this.areaInfo)){this.form=JSON.parse(JSON.stringify(this.areaInfo)),this.form.Defaults="1"===this.form.Defaults;var t=this.form.Sex.replace(/\s*/g,"");this.form.Sex="先生"===t?"0":"1",this.location={latitude:this.areaInfo.Latitude,longitude:this.areaInfo.Longitude}}else this.location=this.$store.state.currentLocation;var a=this;window.addEventListener("message",(function(t){var e=t.data;e&&"locationPicker"==e.module&&(a.$refs.specificArea&&a.$refs.specificArea.close(),a.$nextTick((function(){a.specificArea=!1,a.specificAreaHead=!1,a.$set(a.form,"Address",e.poiname),a.$set(a.form,"Latitude",e.latlng.lat),a.$set(a.form,"Longitude",e.latlng.lng)})))}),!1)},methods:{getWxAddress:function(){var t=this;f.default.openAddress({success:function(a){t.form.Name=a.userName,t.form.Mobile=a.telNumber},cancel:function(t){this.$toast.fail(t)}})},clickGo:function(){this.specificAreaHead?(this.specificArea=!1,this.specificAreaHead=!1,this.$refs.specificArea.close()):window.history.back(-1)},switchChange:function(t){this.form.Defaults=t.detail.value},tenxButton:function(){this.specificArea=!0,this.$refs.specificArea.open(),this.specificAreaHead=!0},confirmArea:function(t){this.logisticsArea=!1,this.$refs.logisticsArea.close(),this.form.Address=t.label,this.form.Type=2,this.form.Province=t.labelArr[0],this.form.City=t.labelArr[1],this.form.District=t.labelArr[2]},saveArea:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function a(){var e,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.form.Address){a.next=3;break}return t.$toast("选择地址"),a.abrupt("return");case 3:if(t.form.House){a.next=6;break}return t.$toast("填写门牌号"),a.abrupt("return");case 6:if(t.form.Name){a.next=9;break}return t.$toast("填写联系人"),a.abrupt("return");case 9:if(t.form.Mobile){a.next=14;break}return t.$toast("填写手机号"),a.abrupt("return");case 14:if((0,c.checkMobile)(t.form.Mobile)){a.next=17;break}return t.$toast("手机号格式错误"),a.abrupt("return");case 17:return t.disabledLoad=!0,t.form.Type=t.form.Type?t.form.Type:1,a.prev=19,e={Action:"SetAddress"},Object.assign(e,t.form),e.Defaults=!0===e.Defaults?1:0,a.next=25,(0,r.vipCard)(e,"UMemberOpera");case 25:i=a.sent,i.Data,t.$toast("新增成功"),t.$Router.push({path:"/pages/myAddress/myAddress",query:{flag:"towaimai"}}),t.disabledLoad=!1,a.next=35;break;case 32:a.prev=32,a.t0=a["catch"](19),t.disabledLoad=!1;case 35:case"end":return a.stop()}}),a,null,[[19,32]])})))()},bindAddress:function(t){var a=this;a.$refs.specificArea&&a.$refs.specificArea.close(),a.$nextTick((function(){a.specificArea=!1,a.specificAreaHead=!1,a.$set(a.form,"Address",t.address),a.$set(a.form,"Latitude",t.location.lat),a.$set(a.form,"Longitude",t.location.lng)}))}}};a.default=u},"9a72":function(t,a,e){"use strict";e.r(a);var i=e("f45d"),n=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(a,t,(function(){return i[t]}))}(r);a["default"]=n.a},a329:function(t,a,e){"use strict";e.r(a);var i=e("ee43"),n=e("7391");for(var r in n)"default"!==r&&function(t){e.d(a,t,(function(){return n[t]}))}(r);e("3169");var o,s=e("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"1cc2f452",null,!1,i["a"],o);a["default"]=c.exports},b44d:function(t,a,e){"use strict";e.r(a);var i=e("0619"),n=e("9a72");for(var r in n)"default"!==r&&function(t){e.d(a,t,(function(){return n[t]}))}(r);e("b95b");var o,s=e("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"e4a42030",null,!1,i["a"],o);a["default"]=c.exports},b95b:function(t,a,e){"use strict";var i=e("c64d"),n=e.n(i);n.a},c64d:function(t,a,e){var i=e("d186");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("f1538706",i,!0,{sourceMap:!1,shadowMode:!1})},d186:function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".uni-transition[data-v-e4a42030]{-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.fade-in[data-v-e4a42030]{opacity:0}.fade-active[data-v-e4a42030]{opacity:1}.slide-top-in[data-v-e4a42030]{\n\t/* transition-property: transform, opacity; */-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slide-top-active[data-v-e4a42030]{-webkit-transform:translateY(0);transform:translateY(0)\n\t/* opacity: 1; */}.slide-right-in[data-v-e4a42030]{-webkit-transform:translateX(100%);transform:translateX(100%)}.slide-right-active[data-v-e4a42030]{-webkit-transform:translateX(0);transform:translateX(0)}.slide-bottom-in[data-v-e4a42030]{-webkit-transform:translateY(100%);transform:translateY(100%)}.slide-bottom-active[data-v-e4a42030]{-webkit-transform:translateY(0);transform:translateY(0)}.slide-left-in[data-v-e4a42030]{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slide-left-active[data-v-e4a42030]{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}.zoom-in-in[data-v-e4a42030]{-webkit-transform:scale(.8);transform:scale(.8)}.zoom-out-active[data-v-e4a42030]{-webkit-transform:scale(1);transform:scale(1)}.zoom-out-in[data-v-e4a42030]{-webkit-transform:scale(1.2);transform:scale(1.2)}",""]),t.exports=a},d3c2:function(t,a,e){var i=e("7db7");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("11d7c187",i,!0,{sourceMap:!1,shadowMode:!1})},e8b3:function(t,a,e){var i=e("0c90");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("d99a03d8",i,!0,{sourceMap:!1,shadowMode:!1})},ee43:function(t,a,e){"use strict";var i={uniTransition:e("b44d").default},n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.showPopup?e("v-uni-view",{staticClass:"uni-popup",on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.clear.apply(void 0,arguments)}}},[e("uni-transition",{attrs:{"mode-class":["fade"],styles:t.maskClass,duration:t.duration,show:t.showTrans},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onTap.apply(void 0,arguments)}}}),e("uni-transition",{attrs:{"mode-class":t.ani,styles:t.transClass,duration:t.duration,show:t.showTrans},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onTap.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.clear.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1):t._e()},r=[];e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return r})),e.d(a,"a",(function(){return i}))},f434:function(t,a,e){"use strict";var i=e("ee27");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("b44d")),r={name:"UniPopup",components:{uniTransition:n.default},props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskClick:{type:Boolean,default:!0}},data:function(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0}}},watch:{type:{handler:function(t){switch(this.type){case"top":this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0};break;case"bottom":this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0};break;case"center":this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"};break}},immediate:!0}},created:function(){this.animation?this.duration=300:this.duration=0},methods:{clear:function(t){t.stopPropagation()},open:function(){var t=this;this.showPopup=!0,this.$nextTick((function(){clearTimeout(t.timer),t.timer=setTimeout((function(){t.showTrans=!0}),50)})),this.$emit("change",{show:!0})},close:function(t){var a=this;this.showTrans=!1,this.$nextTick((function(){clearTimeout(a.timer),a.timer=setTimeout((function(){a.$emit("change",{show:!1}),a.showPopup=!1}),300)}))},onTap:function(){this.maskClick&&this.close()}}};a.default=r},f45d:function(t,a,e){"use strict";var i=e("ee27");e("4160"),e("a9e3"),e("ac1f"),e("5319"),e("159b"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("f3f3")),r={name:"uniTransition",props:{show:{type:Boolean,default:!1},modeClass:{type:Array,default:function(){return[]}},duration:{type:Number,default:300},styles:{type:Object,default:function(){return{}}}},data:function(){return{isShow:!1,transform:"",ani:{in:"",active:""}}},watch:{show:{handler:function(t){t?this.open():this.close()},immediate:!0}},computed:{stylesObject:function(){var t=(0,n.default)({},this.styles,{"transition-duration":this.duration/1e3+"s"}),a="";for(var e in t){var i=this.toLine(e);a+=i+":"+t[e]+";"}return a}},created:function(){},methods:{change:function(){this.$emit("click",{detail:this.isShow})},open:function(){var t=this;for(var a in clearTimeout(this.timer),this.isShow=!0,this.transform="",this.ani.in="",this.getTranfrom(!1))"opacity"===a?this.ani.in="fade-in":this.transform+="".concat(this.getTranfrom(!1)[a]," ");this.$nextTick((function(){setTimeout((function(){t._animation(!0)}),50)}))},close:function(t){clearTimeout(this.timer),this._animation(!1)},_animation:function(t){var a=this,e=this.getTranfrom(t);for(var i in this.transform="",e)"opacity"===i?this.ani.in="fade-".concat(t?"out":"in"):this.transform+="".concat(e[i]," ");this.timer=setTimeout((function(){t||(a.isShow=!1),a.$emit("change",{detail:a.isShow})}),this.duration)},getTranfrom:function(t){var a={transform:""};return this.modeClass.forEach((function(e){switch(e){case"fade":a.opacity=t?1:0;break;case"slide-top":a.transform+="translateY(".concat(t?"0":"-100%",") ");break;case"slide-right":a.transform+="translateX(".concat(t?"0":"100%",") ");break;case"slide-bottom":a.transform+="translateY(".concat(t?"0":"100%",") ");break;case"slide-left":a.transform+="translateX(".concat(t?"0":"-100%",") ");break;case"zoom-in":a.transform+="scale(".concat(t?1:.8,") ");break;case"zoom-out":a.transform+="scale(".concat(t?1:1.2,") ");break}})),a},_modeClassArr:function(t){var a=this.modeClass;if("string"!==typeof a){var e="";return a.forEach((function(a){e+=a+"-"+t+","})),e.substr(0,e.length-1)}return a+"-"+t},toLine:function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}}};a.default=r}}]);