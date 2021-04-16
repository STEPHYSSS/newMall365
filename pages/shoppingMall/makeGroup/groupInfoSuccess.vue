	<template>
	<view class="makeUpGroup">
		<view v-if="ProdInfo">
			<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="拼团详情" :status-bar="true" :shadow="false"></uni-nav-bar>
			<view class="top">
				<view class="goodInfo">
					<image :src="ProdInfo.Img|fmtImgUrl"></image>
					<view class="Prodinfoaa">
						<p>{{ProdInfo.Name}}</p>
						<p>
							<text class="price">￥{{ProdInfo.SalePrice}}</text>
							<text class="price2">￥{{ProdInfo.OldPrice}}</text>
						</p>
					</view>
				</view>
				<view class="tips" v-if="GroupInfo.SurplusCnt!='0'">
					<image src="@/static/img/shangcheng1.png"></image>
					<text @click="toGroupPlay">拼团规则：邀请 {{GroupInfo.SurplusCnt}} 人参团，人数不足自动退款</text>
					<text class="iconfont icon-jiantou" style="font-size: 14px;"></text>
				</view>
			</view>
			<!-- 开启虚拟成团 并且倒计时为0 时 个人拼团成功 -->
			<view class="center" v-if="isTist===false&&GroupInfo.SurplusCnt!='0'&&GroupInfo.Virtual==='1'">
				<view class="successBox">					
					<p class="title" style="width: 95%; margin: 0 auto;">
						<image class="bgTips" src="../../../static/img/groupTips.png"></image>
						<span style="position: absolute;top: 0;left: 43%;line-height: 37px;">拼团成功</span>							
					</p>
					<div style="position: relative;">
						<p v-for="(item,index) in GroupList" :key="index" class="pBox">
							<image class="photo" :src="item.Headimgurl" v-if="index==0"></image>
							<span class="captain3" v-if="item.MyGroup==='1'">团长</span>
						</p>
					</div>
					
				</view>
				<p class="detailBtn" @click="OrderInfo">查看订单详情</p>
			</view>
			<view class="center" v-else-if="GroupInfo.SurplusCnt === '0'">
				<view class="successBox">					
					<p class="title" style="width: 95%; margin: 0 auto;">
						<image class="bgTips" src="../../../static/img/groupTips.png"></image>
						<span style="position: absolute;top: 0;left: 43%;line-height: 37px;">拼团成功</span>							
					</p>
					<div style="position: relative;">
						<p v-for="(item,index) in GroupList" :key="index" class="pBox">
							<image class="photo photoKong2" :src="item.Headimgurl"></image>
							<span class="captain2" v-if="item.MyGroup==='1'">团长</span>
						</p>
					</div>
					
				</view>
				<p class="detailBtn" @click="OrderInfo">查看订单详情</p>
			</view>
			<view class="center" v-else>
				<view class="successBox">
					<div v-if="VirtualTime&&VirtualTime!=''">
						<text class="spanTips surplusTime">拼团剩余时间</text>
						 <div>
							 <uni-countdown color="red" splitor-color="red" background-color="pink" :hour="ctiveTimeMy.hours"
							  :minute="ctiveTimeMy.minute" :second="ctiveTimeMy.second" @timeup="finishTimer2"></uni-countdown>
						 </div>
					</div>
					<text class="spanTips surplusTime">活动剩余时间</text>
					<div>
						<uni-countdown color="red" splitor-color="red" background-color="pink" :day="activeTimeMy.day" :hour="activeTimeMy.hours"
						 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
					</div>
					<div class="Headimgurl">
						<p v-for="(item,index) in isMyGroup" :key="index" class="pBox">
							<image class="photo photoKong" :src="item.Headimgurl"></image>
							<span class="captain" v-if="item.MyGroup==='1'">团长</span>
						</p>
					</div> 					
					<p class="shengxia">仅剩<span style="color: Red;padding: 0 5px;">{{GroupInfo.SurplusCnt}}</span>人，快来加入我的团吧！</p>
				</view>
				<p class="detailBtn" @click="toOrderInfo">{{msg}}</p>
				<p class="detailBtn2" @click="OrderInfo" v-if="msg != '立即参团'">查看订单详情</p>
				<showSkuSeckill :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo" :couGroup = "couGroup" :isAgain = "isAgain"></showSkuSeckill>
			</view>			
		</view>
		<!-- Virtual 等于1并且时间等于0的时候就是虚拟拼团成功 -->
		<a-nodeData stringVal="暂无数据" v-if="!loading&&ProdInfo.length===0"></a-nodeData>
		<!-- 遮罩层 -->
		<view class="mask" v-show="hideMask" @click="hideMask2">
			<!-- <image :src="maskShare" class="maskShare" @click="hideMask2"></image> -->
			<image src="@/static/img/share.png" class="maskShare" @click="hideMask2"></image>			
		</view>
	</view>
</template>

<script>
	import { vipCard } from '@/api/http.js';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import Cookie from '@/config/cookie-my/index.js';
	import Mixins from '@/pages/shoppingMall/mixins.js'
	import {GetBaseImgUrl,getQueryString2,GetAppNo} from "@/util/publicFunction";
	import wx from 'weixin-js-sdk'
	import showSkuSeckill from '@/components/a-shopping-showSku/a-shopping-showSkuSeckill';
	export default {
		mixins: [Mixins],
		data() {
			return {
				historyUrlSID:Cookie.get('historyUrl'),
				GroupSID:this.$route.query.GroupSID,				
				ProdInfo:{},//商品信息
				GroupInfo:{},//团信息
				GroupList:[],//团列表信息
				isMyGroup:[],//自己开团的
				successGroup:0,
				imgUrl:require("@/static/img/defaultPhoto.png"),
				maskShare:require("@/static/img/share.png"),
				activeTimeMy: {},//活动时间
				ctiveTimeMy:{},
				VirtualTime:'',//倒计时
				show: false,
				skuDataInfo:{},
				couGroup:true,
				msg:'邀请好友参团',
				hideMask:false,//邀请遮罩层
				loading:true,
				isTist:'',
				myVirtualGroup:[],//个人虚拟团
				promtionSID:'',
				shareInfo:{},
				isAgain:''
			}
		},
		components: {
			adCell,
			showSkuSeckill
		},
		/*  流程梳理：
			1、商品活动页面---->开团---->下单页面---->回跳到拼团详情页---->展示邀请别人参团文字和查看订单详情
			2、点击邀请别人参加活动---->别人从邀请链接进入拼团详情页---->应展示立即参团文字---->下单---->回跳到拼团详情页---->表示拼团成功和查看订单详情
			3、个人拼团 开启虚拟成团条件 个人拼团时间倒计时和活动时间倒计时为0 时 ----> 展示拼团成功
			4、个人拼团 未开启虚拟成团 个人拼团时间倒计时为0 时---->展示重新开团（不要传递GroupSID)---->下单---->回跳拼团详情页---->展示邀请别人参团文字和查看订单详情
			5、活动时间为0时 展示活动已结束 并 回跳到活动列表页
			
		*/ 
		created() {
			// let url = 'http://localhost:9000/#/pages/shoppingMall/makeGroup/groupInfoSuccess?GroupSID=5256108584298561698&info=5605220078862142189'
			let url = Cookie.get('GroupUrl');
			if(url!=null&&url.indexOf('GroupSID')>-1){
				if(url!=null&&url.lastIndexOf("?")){
					let index = url.lastIndexOf("?");
			        url = url.slice(index);
			        this.GroupSID = getQueryString2("GroupSID", url);
					this.promtionSID = getQueryString2("info",url)
					
				}
			}
			// console.log(url,this.GroupSID,this.promtionSID,'---created---')
			if(this.promtionSID){
				this.getWxConfig();
				this.getShopList();
			}
			this.getMyGroupInfo();
			
		},
		methods: {
			clickLeft(){
				window.history.back(-1)
			},
			toOrderInfo(){
				// 如果是自己是团长的话 可邀请别人参加 反之加入团
				// if(this.GroupInfo.PerValidity == '1' && this.GroupInfo.MyGroup == '1'){
				// 	this.hideMask = true;					
				// 	this.wxRegister();
				// }else{
				// 	// 参与别人的团
					
				// 	this.show = true;					
				// }
				if(this.msg === '重新开团' ){
					this.show = true;
					this.isAgain = "重新开团"
				}else if(this.msg === '立即参团'){
					sessionStorage.setItem('GroupSID',this.GroupSID)
					this.show = true;
				}else if(this.GroupInfo.PerValidity == '1' && this.GroupInfo.MyGroup == '1'){
					this.hideMask = true;
					this.wxRegister();
				}
				
				console.log(this.msg)
			},
			hideMask2(){
				this.hideMask = false;
			},
			hideShow() {
				this.show = false;				
			},
			OrderInfo(){
				if(this.ProdInfo.ProdType=='1'){//电子券订单详情
					this.$Router.push({
						path: "/pages/shoppingMall/order/orderInfo",
						query: {
							order_id: this.GroupInfo.OrderSID,
							OrderType:'3',
							GroupSID: this.GroupSID
						}
					});
				}else{
					this.$Router.push({
						path: "/pages/shoppingMall/order/orderInfo",
						query: {
							order_id: this.GroupInfo.OrderSID,
							OrderType:'2',
							GroupSID: this.GroupSID
						}
					});
				}
			},			
			async getMyGroupInfo(){//我的团
				console.log(this.GroupSID,this.promtionSID,'getMyGroupInfo')
				let GroupSID = sessionStorage.getItem('GroupSID')
				this.loading = true;
				uni.showLoading({
					title: '加载中'
				})
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				let GroupSID2='';
				let proSId ='';
				let ShopSID ='';
				console.log(this.historyUrlSID.query.SID,'555',this.GroupSID,GroupSID,currentStore.data.SID,'currentStorecurrentStore')
				if(this.promtionSID){//活动SID
					console.log(this.promtionSID,'proSId = this.historyUrlSID.query.SID;')
					proSId = this.promtionSID
				}else {
					proSId = this.historyUrlSID.query.SID;
					console.log(proSId,'prodSId')
				}
				if(this.GroupSID){//活动SID
					GroupSID2 = this.GroupSID
				}else {
					GroupSID2 = sessionStorage.getItem('GroupSID')
				}
				if(currentStore.data.SID){
					ShopSID = currentStore.data.SID
				}else {
					ShopSID = ''
				}
				console.log(proSId,'888888')
				try {
					let {
						Data
					} = await vipCard({
						Action: 'MyPromotion',
						    GroupSID:GroupSID2,
							SID:proSId,
							ShopSID:ShopSID
					}, 'UPromotionOpera')
					this.skuDataInfo = Data;
					this.ProdInfo = Data.ProdInfo;//拼团商品信息
					this.GroupInfo = Data.GroupInfo;//拼团规则信息
					this.loading = false;
					uni.hideLoading()
					let arr = Data.GroupList; //数组；
					let a_id = '1'
					let index = arr.findIndex(item => item.MyGroup == a_id); //根据 已知id（this.a_id） 获取在数组中的位置(index)；
					let thobj = arr.splice(index, 1); //从数据组移出当前数据；
					arr.splice(0, 0, ...thobj); // 把当前数据插入到数组第一位；
					this.GroupList = arr; //团列表信息
					let isMyGroup = this.GroupList;
					let min = Number(this.GroupInfo.GroupNum)
					let imgArr = {Headimgurl:this.imgUrl}
					let leng = isMyGroup.length;
					let ar = []
					// 如果groupList的长度
					if(isMyGroup.length<=min){
						for(let i=leng;i<min;i++){
							if(i<min){
								isMyGroup.push(imgArr)
							}
						}
						this.isMyGroup = isMyGroup;
					}
					
					/*
						1、如果是自己开的团的话 进入这个页面应该是邀请好友参团
						2、如果是别人的团 进入这个页面是立即参团
						3、如果是自己的团并且有效期过期了之后就是重新开团
					*/
					if(this.GroupInfo.MyGroup === '1' && this.GroupInfo.PerValidity == '1'){
						this.msg = '邀请好友参团'
					}else if(this.GroupInfo.MyGroup != '1' && this.GroupInfo.PerValidity == '1'){
						this.msg = '立即参团'
					}else if(this.GroupInfo.MyGroup === '1' && this.GroupInfo.PerValidity != '1' && this.isTist===false){
						this.msg = '重新开团'
					}
					this.VirtualTime = this.GroupInfo.VirtualTime
					let acTime = Number(this.VirtualTime) * 60 * 60;//提前小时	
					
					this.getTimeout()
					this.getViTime(acTime);
				} catch (e) {
					this.loading = false;
					this.$toast(e)
					// setTimeout(() => {
					// 	uni.navigateTo({
					// 	    url: '/pages/shoppingMall/makeGroup/groupPlay?flag=info'
					// 	});
					// }, 3000)
				}
			},
			toGroupPlay(){//拼团玩法
				uni.navigateTo({
				    url: '/pages/shoppingMall/makeGroup/groupPlay?flag=info'
				});
			},
			groupInfo(){
				uni.navigateTo({
				   url: '/pages/shoppingMall/makeGroup/leagueList'
				});
				
			},
			finishTimer() {
				setTimeout(() => {
					this.getTimeout();
				}, 1000)
			},
			finishTimer2(){
				setTimeout(() => {
					this.getViTime();
				}, 1000)
			},
			getTimeout(current) {
				let currentT = new Date().getTime()
				let End = new Date(this.ProdInfo.EndDate.replace(/-/g, '/')).getTime()
				let Start = new Date(this.ProdInfo.StartDate.replace(/-/g, '/')).getTime()
				// let End = new Date('2020-05-18 14:55:50').getTime()
				// false 活动未开始 true 活动开始了 end为活动结束
				this.startIS = Start - currentT >= 0 ? false : End - currentT > 0 ? true : 'end'				
				let activeTimeMy = this.startIS ? End - currentT : Start - currentT
				let myTime = activeTimeMy
				this.activeTimeMy = {
					day: parseInt(myTime / (1000 * 60 * 60 * 24)),
					hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
					minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
					second: parseInt((myTime % (1000 * 60)) / 1000)
				}				
			},
			getViTime(acTime){//拼团个人有效期
				/*
					1、首先获取当前时间
					2、添加时间+有效期=拼团倒计时时间
					3、判断当前时间是否小于等于第二步，
				*/ 
			   let currentT = new Date().getTime()//系统当前时间时间戳
			   let VirtualTime = this.GroupInfo.VirtualTime*60*60*1000;
			   let all = "";
			   if(this.GroupInfo.MyAddTime){
				   all = new Date(this.GroupInfo.MyAddTime.replace(/-/g, '/')).getTime();
			   }else{
				   all = new Date(this.isMyGroup[0].AddTime.replace(/-/g, '/')).getTime();
			   }
			   let Start = all+VirtualTime;//开团时间时间戳
			   this.stTs = currentT<=Start?true:false;
			   this.isTist = this.stTs;
			   let activeTimeMy = this.stTs ? Start - currentT :'';
			   let myTime = activeTimeMy
			   this.ctiveTimeMy = {
			   	day: parseInt(myTime / (1000 * 60 * 60 * 24)),
			   	hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
			   	minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
			   	second: parseInt((myTime % (1000 * 60)) / 1000)
			   }
			},
			// 微信分享
			async getWxConfig() {
				try {
					let {
						Data
					} = await vipCard({
						Action: "GetJSSDK",
						Url: window.location.href
					}, "UProdOpera");
					wx.config({
						debug: false,
						appId: Data.SDK.appId,
						timestamp: Data.SDK.timestamp,
						nonceStr: Data.SDK.noncestr,                                                                                                                                                                                                                                             
						signature: Data.SDK.signature,
						jsApiList: ["getLocation", "openAddress", "scanQRCode"]
					});
					wx.ready(res => {
						let _this = this;
						wx.getLocation({
							type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
							success: function(res) {
								// alert(JSON.stringify(res))
								// _this.location.latitude = res.latitude;// 纬度，浮点数，范围为90 ~ -90
								// _this.location.longitude = res.longitude;// 经度，浮点数，范围为180 ~ -180。
								_this.location = {
									longitude: res.longitude,
									latitude: res.latitude
								}
								_this.$store.commit("SET_CURRENT_LOCATION", _this.location);
								sessionStorage.setItem('location', JSON.stringify(_this.location))
							},
							cancel: function(res) {
								this.$toast.fail(res);
							}
						});
						wx.error(function(res) {
							this.$toast.fail(res);
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							console.log("调用微信接口获取当前位置失败", res);
						});
					})
				} catch (e) {
					this.$toast.fail(e);
				}
			},
			async getShopList() {//获取门店
				let {
					Data
				} = await vipCard({
						Action: "GetShopList",
						// DefLongitude: this.location.longitude,
						// DefLongitude: this.location.latitude
						Longitude: this.$store.state.currentLocation.longitude,//获取授权的经纬度
						Latitude: this.$store.state.currentLocation.latitude
					},
					"UShopOpera"
				);
				let currentStoreInfo = {
					Name: Data.ShopList[0].Name,
					Address: Data.ShopList[0].Address,
					SID: Data.ShopList[0].SID,
					Latitude: Data.ShopList[0].Latitude,
					Longitude: Data.ShopList[0].Longitude
				}
				this.$store.commit("SET_CURRENT_STORE",currentStoreInfo)
				localStorage.setItem("localShop",JSON.stringify(currentStoreInfo))
				// localStorage.setItem(GetAppNo()+"_"+ "localShop",JSON.stringify(this.currentStoreInfo))
			},
			async wxRegister() { //data是微信配置信息，option是分享的配置内容
				let link = window.location.href;
				let shareInfo = {
					link:link,
					title:this.ProdInfo.PromName,
					Img:GetBaseImgUrl()+this.ProdInfo.Img
				}
				// console.log(shareInfo,'分享')
				try{
					let {
						Data
					} = await vipCard({
						Action: "GetJSSDK",
						Url: window.location.href
					}, "UProdOpera");
					// console.log(Data,'----')
					wx.config({
						debug: false, // 开启调试模式
						appId: Data.SDK.appId, // 必填，公众号的唯一标识
						timestamp: Data.SDK.timestamp, // 必填，生成签名的时间戳
						nonceStr: Data.SDK.noncestr, // 必填，生成签名的随机串
						signature: Data.SDK.signature, // 必填，签名，见附录1
						jsApiList: ['checkJsApi','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					})
					
					wx.ready(function () {	
						// let link = Cookie.get('GroupUrl')
						// let link = 'http://dingtalk.bak365.cn/WeixinNew/Dist/index.html#/pages/shoppingMall/list/infoGood?query=GroupSID=5380348266591920579&info=5353681525118539308'
						
	// 					wx.updateAppMessageShareData({
	
	// 						title: '【疯抢中..】余杭区儿童联盟千人狂抢！不超值，拿锤砸！手快有！手慢无！',
	
	// 						desc: '我刚抢了，你也快来抢吧~~还有红包呢！',
	
	// 						link: link,
	
	// 						imgUrl: 'https://sjimg.95qy.cn/21?imageView2/1/w/200/h/200/q/85',
	
	// 						success:function(res){
	// 							alert(res,'000');
	// 						},
	// 						cancel: function (res) {
	// 							alert(res,'11');//这里官网说已经不支持回调了
	// 						},
	// 						fail: function (res) {
	// 							alert(JSON.stringify(res));//这里官网说已经不支持回调了
	// 						}
	
	// 					});
						// console.log(shareInfo.title,'readay----6986')
						wx.onMenuShareTimeline({//分享到朋友圈
							title:shareInfo.title,
							desc: '快把参团链接分享给好友或朋友圈，邀请好友参团吧！',
							link: shareInfo.link,
							imgUrl:shareInfo.Img,
							success:function(){
							
							}
							
						});
						wx.onMenuShareAppMessage({//分享给朋友
							title:shareInfo.title,
							desc:'快把参团链接分享给好友或朋友圈，邀请好友参团吧！',
							link:shareInfo.link,
							imgUrl:shareInfo.Img,
							success:function(){
							
							}
							
						});
						// wx.updateTimelineShareData({
						// 	title: '【疯抢中..】余杭区儿童联盟千人狂抢！不超值，拿锤砸！手快有！手慢无！',
							
						// 	desc: '我刚抢了，你也快来抢吧~~还有红包呢！',
							
						// 	link: link,
							
						// 	imgUrl: 'https://sjimg.95qy.cn/21?imageView2/1/w/200/h/200/q/85',
							
						// 	success:function(){
							
						// 	}
						// })
					
					})
					wx.error(function (res) {
										
					console.log("页面加载异常！" + res.errMsg);
	
					});
				}catch(e){
					 
				}				
			}
		}
	}
	function changeCountDown(value) {
		//秒转换为 20:08:90
		var theTime = parseInt(value);
		var middle = 0;
		var hour = 0;
		var result = "";
		if (theTime > 60) {
			middle = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (middle > 60) {
				hour = parseInt(middle / 60);
				middle = parseInt(middle % 60);
			}
		}
		hour = hour < 10 ? "0" + hour : hour;
		middle = middle < 10 ? "0" + middle : middle;
		theTime = theTime < 10 ? "0" + theTime : theTime;
		result = hour + ":" + middle + ":" + theTime;
		return result;
	}
</script>

<style lang="less" scoped>
.makeUpGroup{
	.mask{
		display: inline-block;
		z-index: 9999;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		background-color: #111;
		opacity: 0.6;
		.maskShare{
			position: absolute;
			top: 0;
			width: 48%;
			right: 0;
		}
	}
	.top{
		height: 214px;
		// background-color: #fff;
		background-image: url(../../../static/img/groupBg.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-top: 45px;
		.goodInfo{
			width:89%;
			border-radius: 5px;
			margin: 0 auto;
			display: flex;
			background-color: #fff;
			box-shadow: rgb(226, 226, 226) 1px 1px 4px 2px;
			image{
				width: 100px;
				height: 100px;
				margin: 3px;
				margin: 8px;
				border: 1px solid #f2f2f2;
				border-radius: 4px;
			}
			.Prodinfoaa{
				display: flex;
				flex-direction: column;
				margin:8px 0 8px 5px;
				box-sizing: border-box;
				font-size: 14px;
				p:first-child {
					height: 75%;
				}
				.price{
					color: #f83f3f;
					font-size: 15px;
				}
				.price2{
					font-size: 13px;
					text-decoration: line-through;
					padding-left: 5px;
					padding-top: 2px;
				}
			}
		}
		.tips{
			margin: 20px 20px 0 20px;
			font-size: 14px;
			position: relative;
			image{
				width:15px;
				height: 15px;				
			}
		}
	}
	.center{
		height: calc(100vh - 278px);;
		background-color: #fff;
		padding-top: 10px;
		margin-top: 10px;
		.successBox{
			position: relative;
			margin: 0 20px;
			text-align: center;
			.photo{
				width: 65px;
				height: 65px;
				border-radius: 50%;
			}
			.active{
				z-index: 0;
				margin-right: -17px;
			}
			.title{
				text-align: center;
				position: relative;
				display: block;				
				line-height: 40px;
				font-size: 15px;
				color: #fff;
				.bgTips{
					position: relative;
					// width: 410px;
					width: 120%;
					height: 40px;
					display: inline-block;
					margin-left: -32px;		
				}
				.spanTips{
					position: absolute;
					top: -2px;
					left: 41%;
				}				
			}
			.captain2{
				padding: 2px 6px;
				border-radius: 10px;
				background-color: #f87676;
				color: #fff;
				position: absolute;
				bottom: 0;
				left: -1px;
				z-index: 9;
			}
			.captain3{
				padding: 2px 6px;
				border-radius: 10px;
				background-color: #f87676;
				color: #fff;
				position: absolute;
				bottom: 0;
				left: 15px;
				z-index: 9;
			}
			.photoKong2{
				background-color: #fff;
				margin-left: -17px;
				box-sizing: border-box;
			}
			.Headimgurl{
				position: relative;
				margin: 15px 0;
				.captain{
					padding: 2px 6px;
					border-radius: 10px;
					background-color: #f87676;
					color: #fff;
					position: absolute;
					bottom: 0px;				
					left: 0px;
					z-index: 5;
				}
				.photo{
					background-color: orange;
					z-index: 5;
				}
				.photoKong{
					background-color: #fff;
					border: 1px dotted #ff0000;
					margin-left: -17px;
					box-sizing: border-box;
				}
			}
			.surplusTime{
				color:#f87676 ;
				font-size: 15px;
				display: inline-block;
				// background-color: skyblue;
			}			
			.shengxia{
				margin-bottom: 15px;
				font-size: 15px;
			}
		}
		
		.detail{
			text-align: center;
			margin: 10px 0 20px 36%;
			width: 25%;
			padding: 5px;
			border-radius: 20px;
			border: 1px solid #f80000;
			color: #f87676;
			background-color: #fff;
		}
		.detailBtn{
			line-height: 40px;
			font-size: 15px;
			letter-spacing: 2px;
			margin: 10px 20px;
			text-align: center;
			border-radius: 50px;
			box-shadow: 1px 1px 1px 1px #f87676;
			color: #fff;
			background-color: #f87676;
		}
		.detailBtn2{
			line-height: 40px;
			font-size: 15px;
			letter-spacing: 2px;
			margin: 10px 20px;
			text-align: center;
			border-radius: 50px;
			color: #f87676;
			background-color: #fff;
			border: 1px solid #f87676;
		}
	}
	.pBox{
		display: inline-block;
		position: relative;
		// width: 65px;
	}
	.uni-countdown{
		margin-left: 28%;
		margin-bottom: 15px;
		margin-top: 5px;
	}
}
</style>
