// 获取商户编号 获取 ?name='' 的值
import Cookies from '@/config/cookie-my/index.js';
export function GetQueryString(name) {
	// console.log(name,'huoz')
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r
	if (window.location.search) {
		r = window.location.search.substr(1).match(reg);
	} else {
		let a = window.location.href
		if (a.indexOf('query') > -1) {
			a = decodeA(a)
			if (JSON.stringify(a) != '{}') return a[name]
		} else {
			let b = a.substr(a.indexOf(name), a.length - 1)
			r = b.match(reg)
			if (r != null) return unescape(r[2]);
		}
	}
	return null;
}

export function GetAppNo() {
	 if(window.location.hostname == "localhost" || window.location.hostname == "dingtalk.bak365.cn" ){
		  let AppNo='001';
		  Cookies.set(AppNo,'001')
		  sessionStorage.setItem('AppNo',AppNo)
		  return AppNo;
	 }else{
		 let AppNo=window.location.hostname.substr(0,window.location.hostname.indexOf('.'));
		 sessionStorage.setItem('AppNo',AppNo)
		  Cookies.set(AppNo,AppNo)
         return  AppNo;
	 }
}

export function GetBaseUrl() {//获取当前url
     
	 if(window.location.hostname == "localhost" ){
           return 'http://localhost/';
	 }else if( window.location.hostname == "dingtalk.bak365.cn" ){
		  return 'http://dingtalk.bak365.cn/WeixinNew/Dist/';
	 }else{
		  return 'http://'+window.location.hostname+'/WebApp/Mobile/';
	 }
}

export function GetBaseImgUrl() {//获取当前图片url
     
	 if(window.location.hostname == "localhost" ){
           return 'http://dingtalk.bak365.cn/WeixinNew/';
	 }else if( window.location.hostname == "dingtalk.bak365.cn" ){
		  return 'http://dingtalk.bak365.cn/WeixinNew/';
	 }else{
		  return 'http://'+window.location.hostname+'/WebApp/';
	 }
}


function decodeA(a) {
	// console.log(a,'5555')
	if (a.indexOf('query') > -1) {
		let queryObj = a.substr(a.indexOf('query') + 6, a.length - 1)
		// console.log(queryObj)
		try {
			let queryObjP = JSON.parse(queryObj)
			// console.log(queryObjP)
			if (typeof queryObjP == 'object') {
				return queryObjP
			}
		} catch (e) {
			a = decodeURIComponent(a)
			return decodeA(a)
		}

	} else {
		return a
	}
}

export function getTime(time, bool, dataBool) {
	let z = '- -'
	let date
	if (time) {
		// time.replace(/-/g,"/")
		date = new Date(time)
	} else {
		date = new Date()
	}
	if (!isNaN(date) && date !== 0) {

		let y = date.getFullYear()
		let m = date.getMonth() + 1
		m = m < 10 ? ('0' + m) : m
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		let minute = date.getMinutes()
		let second = date.getSeconds()
		minute = minute < 10 ? ('0' + minute) : minute
		second = second < 10 ? ('0' + second) : second
		if (bool) {
			z = y + '-' + m + '-' + d
		} else if (dataBool) {
			z = h + ':' + minute + ':' + second
		} else {
			z = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
		}
	}

	return z
}

export function bottomScrollbar(_this, Dom, faDom, bottom = 0, top = 0) {
	let {
		windowWidth,
		windowHeight
	} = uni.getSystemInfoSync();
	let faDomHeight = ''
	let faDomInfo = uni.createSelectorQuery().select(faDom)
	faDomInfo.boundingClientRect(function(data) {
		console.log(data.height) // 获取元素宽度
		faDomHeight = data.height
	}).exec()
	let a = windowHeight - faDomHeight - top - 10
	
	if (a <= 0) {
		uni.createSelectorQuery().select(faDom).boundingClientRect(function(data) {})
		uni.createSelectorQuery().select(Dom).boundingClientRect(function(data) {})
		// $(Dom).css('transform', `translateY(0px)`)
		// $(faDom).css({
		// 	'marginBottom': 60 + 'px'
		// })
	} else {
		// $('.btnBottom').css('transform', `translateY(${a}px)`)
		// $(Dom).css({
		// 	'position': `absolute`,
		// 	'bottom': bottom + 'px',
		// 	'width': `96%`
		// })
	}
}

export function setUrlDelCode() {
	var url = document.location.toString();
	// console.log(url,'url---')
	if (!url) {
		return url
	}
	if (url.indexOf('?') < 0) {
		return url
	}
	var arrUrl = url.split("?");
	var para = arrUrl[1];
	if (para.indexOf('&')) {
		para = para.split("&"); //获取url的参数
	}
	para.forEach((D, index) => { //删除原本url上的code
		if (D.indexOf('code') > -1) {
			para.splice(index, 1)
		}
	})
	para = para.join(',')
	// let currentUrl = arrUrl[0] + '?' + para
	return arrUrl[0] + '?' + para
}

// export function setImg(img){
// 	return process.env.VUE_APP_PREFIX + img
// }

export function checkMobile(s) {
	var regu = /^1[3456789]\d{9}$/;
	var re = new RegExp(regu);
	if (re.test(s)) {
		return true;
	} else {
		return false;
	}
}

export function weChatPayment(that, Data, bool) {
	var Data = Data;
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();

	}

	function onBridgeReady() {
		WeixinJSBridge.invoke(
			"getBrandWCPayRequest", {
				appId: Data.appId,
				timeStamp: Data.timeStamp,
				nonceStr: Data.nonceStr,
				package: Data.package,
				signType: Data.signType,
				paySign: Data.paySign
			},
			function(res) {
				// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
				if (res.err_msg === "get_brand_wcpay_request:ok") {
					// if (bool) {
					// 	that.$router.push({
					// 		path: "/home/index"
					// 	});
					// } else {
					// 	that.$router.push({
					// 		path: "/home/index"
					// 	});
					// }
					// that.$Router.push('/shoppingMall/order/OrderPaySuccess')
					if(res.route == 'pages/vip/weiFull'){//微卡充值支付
						that.$Router.push({path:'/pages/home'})
					}else if(res.route == 'pages/vip/detail'){//会员权益支付
						that.$Router.push({path:'/pages/home'})
					}else{
						that.$Router.push({path:'/pages/shoppingMall/order/paySuccess'})
					}
					// 
				} else {
					//失败
					that.$toast.fail("支付失败");
					that.$Router.push({path:'/pages/home'})
					// that.$Router.push({path:'/pages/vip/allMyOrder'})
					// setTimeout(() => {
					// 	if (bool) {
					// 		that.$Router.push({
					// 			path: "/shoppingMall/order/orderInfo?order_id=" +
					// 				that.OrderInfo.SID
					// 		});
					// 		that.$router.push({path:'/pages/vip/allMyOrder'})
					// 	} else {
					// 		that.$router.push({
					// 			path: "/home/myOrder",
					// 			query: {
					// 				id: "1"
					// 			}
					// 		}, 2000);
					// 	}

					// });
					// if(bool){
					// 	that.$router.push({path:'/pages/vip/allMyOrder'})
					// }else{
					// 	that.$router.push({
					// 		path: "/home/myOrder",
					// 		query: {
					// 			id: "1"
					// 		}
					// 	})
					// }
				}
			}
		);
	}
}

export const formatDate = (dateObj, fmt = 'Y-m-d H:i', empty = false) => {
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const months = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月',
      ];
      const lz = (n) => {
        const num = n.toString();
        if (num.length === 1) return `0${num}`;
        return num;
      };
      let t = dateObj;
      // typeof dateObj !== 'string'是为了判断万一传过来的是y-m-d h:i:s格式，会直接执行最后一个else if，格式化为日期格式
      if (dateObj === null || Number.isNaN(dateObj) && typeof dateObj !== 'string') {
        if (typeof empty === 'string') return empty;
        t = new Date();
      } else if (typeof dateObj === 'number') {
        t = new Date(dateObj * 1000);
      } else if (typeof dateObj === 'string') {
        t = new Date(dateObj.replace(/-/g, '/'));
      }
      if (!(t instanceof Date)) {
        throw new Error('被处理的只能是Date对象');
      }
      if (Number.isNaN(t.getTime())) {
        throw new Error('非法日期对象');
      }
      const date = t.getDate();
      const year = t.getFullYear();
      const hours = t.getHours();
      const day = t.getDay();
      const dayName = days[day];
      const min = t.getMinutes();
      const sec = t.getSeconds();
      const month = t.getMonth();
      const am = hours < 12 ? 'am' : 'pm';
      const ms = t.getTime() % 1000;
      let hours12 = hours % 12;
      hours12 = hours12 || 12;
      const fd = new Date(t.getFullYear(), 0, 1);
      const dayOfYear = Math.round((t - fd) / 8.64e7);
      const weekNum = Math.ceil((((t - fd) / 8.64e7) + fd.getDay() - 1) / 7);
      const a = {
        d: lz(date),
        D: dayName.substr(0, 3),
        l: dayName,
        w: day,
        j: date,
        z: dayOfYear,
        W: weekNum,
        M: months[month].substr(0, 3),
        F: months[month],
        Y: year,
        a: am,
        A: am.toUpperCase(),
        y: year.toString().substr(2, 2),
        c: t.toISOString(),
        m: lz(month + 1),
        U: Math.round(t / 1000),
        g: hours12,
        G: lz(hours12),
        h: hours,
        H: lz(hours),
        i: lz(min),
        s: lz(sec),
        e: ms,
      };
      const v = [];
      Object.keys(a).forEach((k) => {
        v.push(`(\\\\)?${k}`);
      });
      return fmt.replace(new RegExp(v.join('|'), 'g'), (k) => {
        if (a[k]) return a[k];
        return k.replace('\\', '');
      });
    };
