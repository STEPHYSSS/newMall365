;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/AutoTabBar"],{"240c":function(t,e,n){"use strict";var a,c=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},6529:function(t,e,n){"use strict";var a=n("8672"),c=n.n(a);c.a},8672:function(t,e,n){},a8c9:function(t,e,n){"use strict";n.r(e);var a=n("240c"),c=n("e03e");for(var i in c)"default"!==i&&function(t){n.d(e,t,(function(){return c[t]}))}(i);n("6529");var o,s=n("f0c5"),g=Object(s["a"])(c["default"],a["b"],a["c"],!1,null,"6a4162c3",null,!1,a["a"],o);e["default"]=g.exports},e03e:function(t,e,n){"use strict";n.r(e);var a=n("febc"),c=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=c.a},febc:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{pagePath:null},data:function(){return{page:"contact",showPage:!1,containerHeight:400,tabbar:[],ShopRadio:localStorage.getItem("ShopRadio")}},mounted:function(){"1"===this.ShopRadio?this.tabbar=[{pagePath:"/pages/shoppingMall/login",text:"首页",iconPath:"static/img/shangcheng1.png",selectedIconPath:"static/img/select-shangcheng1.png"},{pagePath:"/pages/shoppingMall/menu_naixue/menu/menu",text:"点餐",iconPath:"static/img/drink.png",selectedIconPath:"static/img/drink_selected2.png"},{pagePath:"/pages/home",text:"个人中心",iconPath:"static/img/home.png",selectedIconPath:"static/img/select-home1.png"}]:this.tabbar=[{pagePath:"/pages/shoppingMall/index",text:"商城首页",iconPath:"static/img/home.png",selectedIconPath:"static/img/select-home1.png",fontIcon:"static/img/home.png"},{pagePath:"/pages/shoppingMall/list/goodsList",text:"商品",iconPath:"static/img/home.png",selectedIconPath:"static/img/select-home1.png",fontIcon:"static/img/home.png"},{pagePath:"/pages/shoppingMall/shoppingCart/index",text:"购物车",iconPath:"static/img/gouwuche.png",selectedIconPath:"static/img/select-gouwuche1.png",fontIcon:"icon-shouye"},{pagePath:"/pages/home",iconPath:"static/img/home.png",selectedIconPath:"static/img/select-home1.png",text:"个人中心",fontIcon:"icon-shouye"}]},methods:{changeTab:function(e){this.page=e.pagePath,t.reLaunch({url:this.page})}}};e.default=n}).call(this,n("c11b")["default"])}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/AutoTabBar-create-component',
    {
        'components/AutoTabBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("a8c9"))
        })
    },
    [['components/AutoTabBar-create-component']]
]);