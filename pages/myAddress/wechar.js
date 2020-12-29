// import request from './request'; //笔者自己封装的网络请求类，也可以直接使用uni.request
import { vipCard } from "@/api/http.js";
// import {
//     post
// } from './wxRequest';
var jweixin = require('jweixin-module');

export default {  
        //判断是否在微信中  
    isWechat:function(){  
        var ua = window.navigator.userAgent.toLowerCase();  
        if(ua.match(/micromessenger/i) == 'micromessenger'){  
            return true;  
        }else{  
            return false;  
        }  
    },  
        //初始化sdk配置  
    async initJssdk(callback ,url){  
		let { Data } = await vipCard({ Action: "GetJSSDK" }, "UProdOpera");
		jweixin.config({
			debug: true,
			appId: Data.SDK.appId,
			timestamp: Data.SDK.timestamp,
			nonceStr: Data.SDK.nonceStr,
			signature: Data.SDK.signature,
			jsApiList: ["getLocation","openAddress"]
	    });
    },
	//在需要定位页面调用
   location: function(callback) {
        if (!this.isWechat()) {
            console.log('不是微信客户端')
            return;
        }
        console.info('定位')
        this.initJssdk(function(res) {
            jweixin.ready(function() {
                console.info('定位ready')
                 jweixin.getLocation({
                     type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                         // console.log(res);
                         callback(res,'222')
                     },
                     fail:function(res){
                         console.log(res)
                     },
                     // complete:function(res){
                     //     console.log(res)
                    // }
                 });
            });
         });
     }
   
}