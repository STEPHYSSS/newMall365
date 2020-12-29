// let token = ''
let  BASE_URL_OnL= window.location.host+'/WebApp/Mobile/'

export default {
	isMock: true,
	AppNoMy: uni.getStorageSync('AppNo'),
	codeMy: 'code' + uni.getStorageSync('AppNo'),
	url: process.env.NODE_ENV === "development" ? "http://192.168.0.107:8001/" : "../",
	// url:process.env.NODE_ENV ==='development'? 'http://dingtalk.bak365.cn/WeixinNew/':'../',
	// process.env.NODE_ENV === "development" ? '/' : '../'
	VUE_APP_PREFIX: '../',
	homeRoute: '/bind',
	// BASE_URL_OnLine: 'http://dingtalk.bak365.cn/WeixinNew/Dist/',
	BASE_URL_OnLine:BASE_URL_OnL,
	BASE_URL_OnLine2:process.env.NODE_ENV === "development" ?'http://dingtalk.bak365.cn/WeixinNew/': BASE_URL_OnL,
	Bak365_Dev:1
	// BASE_URL: 'http://192.168.0.101:8001'
}