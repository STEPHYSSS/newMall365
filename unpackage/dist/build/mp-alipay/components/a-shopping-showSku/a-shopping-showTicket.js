;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/a-shopping-showSku/a-shopping-showTicket"],{2775:function(t,e,o){"use strict";o.r(e);var n=o("ecd35"),i=o.n(n);for(var r in n)"default"!==r&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},"658d":function(t,e,o){"use strict";var n=o("76ff"),i=o.n(n);i.a},"76ff":function(t,e,o){},ecd35:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o("57bb");var n={name:"showSku",props:{show:Boolean,skuDataInfo:Object},data:function(){return{mainStyle:getApp().globalData.mainStyle,mainColor:getApp().globalData.mainColor,isShow:!1,showImg:!1,currentIndex:0,valueStepper:1,objProdInfo:{},normsList:[],flavorList:[],partsList:[],currentNorms:{},currentTast:[],currentParts:[],images:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg",resultPrice:0}},created:function(){},computed:{sumPrice:function(){this.resultPrice=0;var t=Number(this.objProdInfo.SalePrice);return(this.objProdInfo.MemberPrice||0==this.objProdInfo.MemberPrice)&&(t=Number(this.objProdInfo.MemberPrice)),this.resultPrice=(this.resultPrice+t)*this.valueStepper,this.resultPrice=parseFloat(this.resultPrice.toFixed(2)),this.resultPrice}},methods:{onClickButton:function(){var t={ProdList:[]},e=[];e[0]={ProdNo:this.objProdInfo.ProdNo,ProdType:1,BuyCnt:this.valueStepper,ProdSID:this.objProdInfo.SID},t.ProdList=JSON.stringify(e);var o=t.ProdList;o.length>0&&(this.$store.commit("SET_CURRENT_CARD",o),this.$Router.push("/pages/shoppingMall/order/confirmOrderTic"))},closePopup:function(t){t.show||(this.valueStepper=1,this.$emit("showPop",this.isShow))},crossIcon:function(){this.$refs.popupSku.close()},stepperMain:function(t){this.valueStepper=t.inputValue},overlimitParts:function(t){},setStepperMax:function(){if(Number(this.valueStepper)>=Number(this.objProdInfo.StoreQty))return Number(this.objProdInfo.StoreQty)},overlimit:function(t){if("minus"===t&&this.$toast("至少选择一件"),"plus"===t){var e="";Number(this.valueStepper)>=Number(this.objProdInfo.StoreQty)?e="商品库存不足":Number(this.valueStepper)>=Number(this.objProdInfo.MaxBuyCnt)&&(e="每人限购"+this.objProdInfo.MaxBuyCnt+"件"),this.$toast(e)}},viewImg:function(t){this.$refs.imgPopup.open(),this.showImg=!0,this.images=this.$VUE_APP_PREFIX+t}},watch:{show:function(t){var e=this;if(this.isShow=t,t){this.$refs.popupSku.open();var o=this.skuDataInfo;this.normsList=[];this.objProdInfo=this.skuDataInfo.ProdInfo,this.partsList=o.PartsList||[],this.partsList.forEach((function(t){e.$set(t,"Stepper",0)})),this.disabledPay="0"===this.skuDataInfo.IsBuy,this.currentIndex=0}else this.$refs.popupSku.close(),this.flavorList=[],this.currentTast=[],this.currentParts=[],this.partsList.forEach((function(t){e.$set(t,"isActive",!1)}))}}};e.default=n},f819:function(t,e,o){"use strict";o.r(e);var n=o("fd39"),i=o("2775");for(var r in i)"default"!==r&&function(t){o.d(e,t,(function(){return i[t]}))}(r);o("658d");var s,u=o("f0c5"),a=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=a.exports},fd39:function(t,e,o){"use strict";var n={uniPopup:function(){return o.e("components/uni-popup/uni-popup").then(o.bind(null,"a329"))},uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-icons/uni-icons")]).then(o.bind(null,"6508"))},aUpImg:function(){return o.e("components/a-up-img/a-up-img").then(o.bind(null,"ba08"))},uniNumberBox:function(){return o.e("components/uni-number-box/uni-number-box").then(o.bind(null,"b6a3"))}},i=function(){var t=this,e=t.$createElement,o=(t._self._c,t._f("setImgPrex")(t.objProdInfo.Img)),n=t._f("setBuyTime")(t.objProdInfo.BuyTime),i=t.setStepperMax();t.$mp.data=Object.assign({},{$root:{f0:o,f1:n,m0:i}})},r=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return n}))}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/a-shopping-showSku/a-shopping-showTicket-create-component',
    {
        'components/a-shopping-showSku/a-shopping-showTicket-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("f819"))
        })
    },
    [['components/a-shopping-showSku/a-shopping-showTicket-create-component']]
]);