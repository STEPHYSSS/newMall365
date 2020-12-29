// let token = ''
export default {
	isMock: true,
	AppNoMy: uni.getStorageSync('AppNo'),
	codeMy: 'code' + uni.getStorageSync('AppNo'),
	url: process.env.NODE_ENV === "development" ? "http://192.168.0.105:8001/" : "../",
	// url:process.env.NODE_ENV ==='development'? 'http://dingtalk.bak365.cn/WeixinNew/':'../',
	// process.env.NODE_ENV === "development" ? '/' : '../'
	VUE_APP_PREFIX: '../',
	homeRoute: '/bind',
	BASE_URL_OnLine: 'http://dingtalk.bak365.cn/WeixinNew/Dist/',//暂时注释
	BASE_URL_OnLine2: 'http://dingtalk.bak365.cn/WeixinNew/',
	Bak365_Dev:0
	// BASE_URL: 'http://192.168.0.101:8001'
}