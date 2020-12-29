import Vue from 'vue'
import dataConfig from '@/config/index'
import {GetBaseImgUrl} from "@/util/publicFunction";

Vue.filter('setName', (val) => {
	 // + String(val).slice(-1)
	return String(val).slice(0, 1) + '**'
})

// 剪切0-6
// <span>{{String(Balance).length>6?'+':''}}</span>
Vue.filter('spliceNum', (num) => {
	let newNum = String(num)
	if (newNum.length > 6) {
		return newNum.slice(0, 6) + '+'
	} else {
		return num
	}
})

Vue.filter('orderState', (num) => {
	if (num === '') {
		return '已作废'
	}
	num = Number(num)
	switch (num) {
		case -3:
			return '已取消';		
		case -2:
			return '已付款';
		case -1:
			return '待付款';
		case 0:
			return '已付款';
		case 1:
			return '生产中';
		case 2:
			return '已送货';
		case 3:
			return '已提货';
		case 4:
			return '已作废';
		default: '已作废'
	}
})
Vue.filter('orderType', (num) => {
	// 2普通商品类型
	num = Number(num)
	switch (num) {
		case 1:
			return '充值';
		case 3:
			return '电子券';
		case 4:
			return '积分兑换';
		case 5:
			return '活动';
		default: ''
	}
})

Vue.filter('RefundState', (num) => {
	console.log(num)
	if (!num) {
		return '--'
	}
	num = Number(num)
	switch (num) {
		case 1:
			return '退款';
		case 2:
			return '退款中';
		case 3:
			return '退款成功';
		case 4:
			return '退款失败';
	}
})

Vue.filter('numSet', (num) => {
	if (!num) {
		return num
	}
	return parseFloat(Number(num).toFixed(2))
})

Vue.filter('setMoney', (val) => {
	val = Number(val)
	if (val > 10000) {
		let thousand = (val / 10000).toFixed(1)
		return thousand + '万+'
	} else {
		return val
	}
})
Vue.filter('setImgPrex', (val) => {
	if (val) {
		// return dataConfig.VUE_APP_PREFIX + val
		return GetBaseImgUrl() + val
	} else {
		return ''
	}
})
Vue.filter('fmtImgUrl', (val) => {
     if (val) {
          return GetBaseImgUrl() + val
     } else {
          return ''
     }
})

Vue.filter('payTypeOrder', (val) => {
	let num = Number(val)
	if(num===1){
		return '微卡支付'
	}else if(num===2){
		return '微信支付'
	}else if(num===3){
		return '货到付款'
	}else if(num===4){
		return '券支付'
	}else{
		return ''
	}
})

Vue.filter('deliveryType', (val) => {
	let num = Number(val)
	if (num) {
		return num === 1 ? '到店取餐' : num === 2 ? '外卖配送' : '物流配送'
	} else {
		return ''
	}
})

Vue.filter('setSex', (val) => {
	if (!val) {
		return ''
	}
	let num = Number(val)
	if (num) {
		return num == 0 ? '先生' : '女士'
	} else {
		return num
	}
})
Vue.filter('setBuyTime', (val) => {
	let str = val
	if (val) {
		str = val.split(",").join("至");
	}
	return str
})
