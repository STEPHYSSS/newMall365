<template>
	<view class="makeUpGroup">
		<view>
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
				<view class="tips">
					<image src="@/static/img/shangcheng1.png"></image>
					<text>拼团规则：邀请1人参团，人数不足自动退款</text>
					<text class="iconfont icon-jiantou" style="font-size: 14px;"></text>
				</view>
			</view>
			<view class="center" v-if="GroupInfo.SurplusCnt === '0'">
				<view class="successBox">					
					<p class="title">
						<image class="bgTips" src="../../../static/img/groupTips.png"></image>
						<text class="spanTips">拼团成功</text>
					</p>
					<image class="photo" :src="item.Headimgurl" style="z-index: 5;" v-for="(item,index) in GroupList" :key="index"></image>
					<p class="detail" @click="groupInfo">查看全部团员</p>
					<span class="captain">团长</span>
				</view>
				<p class="detailBtn" @click="OrderInfo">查看订单详情</p>
			</view>
			<view class="center" v-else>
				<view class="successBox">
					<text class="spanTips surplusTime">拼团剩余时间</text>
					<!-- <uni-countdown color="#fff" splitor-color="#fff" background-color="pink" :hour="activeTimeMy.hours"
					 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>	 -->
					 <uni-countdown color="red" splitor-color="red" background-color="pink" :hour="activeTimeMy.hours"
					  :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
					<text class="spanTips surplusTime">活动剩余时间</text>
					<uni-countdown color="red" splitor-color="red" background-color="pink" :hour="activeTimeMy.hours"
					 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
					<div class="Headimgurl">
						<p v-for="(item,index) in GroupList" :key="index">
							<image class="photo" :src="item.Headimgurl" style="background-color: orange;z-index: 5;"></image>
							<image class="photo" :src="imgUrl" style="background-color: #fff;border: 1px dotted #ff0000;margin-left: -17px;"></image>
						</p>									
						<span class="captain">团长</span>
					</div> 
					
					<p class="shengxia">仅剩<span style="color: Red;padding: 0 5px;">{{GroupInfo.SurplusCnt}}</span>人，快来加入我的团吧！</p>
				</view>
				<p class="detailBtn" @click="toOrderInfo">{{msg}}</p>
				<p class="detailBtn2" @click="OrderInfo" v-if="msg != '立即参团'">查看订单详情</p>
				<showSkuSeckill :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo" :couGroup = "couGroup"></showSkuSeckill>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-show="hideMask" @click="hideMask = false">
			<image :src="maskShare" class="maskShare" @click="hideMask = false"></image>
		</view>
	</view>
</template>

<script>
	
	import { vipCard } from '@/api/http.js';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	import Cookie from '@/config/cookie-my/index.js';
	import showSkuSeckill from '@/components/a-shopping-showSku/a-shopping-showSkuSeckill';
	export default {
		data() {
			return {
				historyUrlSID:Cookie.get('historyUrl'),
				GroupSID:this.$route.query.GroupSID,
				ProdInfo:{},//商品信息
				GroupInfo:{},//团信息
				GroupList:[],//团列表信息
				successGroup:0,
				imgUrl:require("@/static/img/defaultPhoto.png"),
				maskShare:require("@/static/img/share.png"),
				activeTimeMy: {},//活动时间
				VirtualTime:'',//倒计时
				show: false,
				skuDataInfo:{},
				couGroup:true,
				msg:'',
				hideMask:false//邀请遮罩层
			}
		},
		components: {
			adCell,
			showSkuSeckill
		},
		created() {
			this.getMyGroupInfo();
			
			// this.finishTimer();
		},
		mounted() {
			setTimeout(() => {
				this.getViTime();
			}, 1000)
		},
		methods: {
			clickLeft(){
				window.history.back(-1)
			},
			toOrderInfo(){
				// 如果是自己是团长的话 可邀请别人参加 反之加入团
				if(this.GroupInfo.PerValidity == '1' && this.GroupInfo.MyGroup == '1'){
					this.hideMask = true
				}else{
					this.show = true;
				}
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
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				let historSId = Cookie.get('historyUrl')
				try {
					let {
						Data
					} = await vipCard({
						Action: 'MyPromotion',
						GroupSID: this.GroupSID,
						SID:this.historyUrlSID.query.SID,
						ShopSID:currentStore?currentStore.data.SID:''
					}, 'UPromotionOpera')
					this.skuDataInfo = Data;
					this.ProdInfo = Data.ProdInfo;//拼团商品信息
					this.GroupInfo = Data.GroupInfo;//拼团规则信息
					this.GroupList = Data.GroupList;//团列表信息
					/*
						1、如果是自己开的团的话 进入这个页面应该是邀请好友参团
						2、如果是别人的团 进入这个页面是立即参团
						3、如果是自己的团并且有效期过期了之后就是重新开团
					*/
					if(this.GroupInfo.MyGroup === '1' && this.GroupInfo.PerValidity == '1'){
						this.msg = '邀请好友参团'
					}else if(this.GroupInfo.MyGroup != '1' && this.GroupInfo.PerValidity == '1'){
						this.msg = '立即参团'
					}else if(this.GroupInfo.MyGroup === '1' && this.GroupInfo.PerValidity != '1'){
						this.msg = '重新开团'
					}
					this.VirtualTime = this.GroupInfo.VirtualTime
					let acTime = Number(this.VirtualTime) * 60 * 60;//提前小时	
					this.getTimeout(acTime)					
				} catch (e) {
					this.$toast(e)		
				}
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
			getViTime(){//拼团个人有效期
				/*
					1、首先获取当前时间
					2、添加时间+有效期=拼团倒计时时间
					3、判断当前时间是否小于等于第二步，
				*/ 
			   let currentT = new Date().getTime()//系统当前时间时间戳
			   let VirtualTime = this.GroupInfo.VirtualTime*60*60;
			   let miao = changeCountDown(VirtualTime);
			   let year = new Date() .getFullYear(); //获取完整的年份(4位)
			   let month=new Date() .getMonth(); //获取当前月份(0-11,0代表1月)
			   let day=new Date() .getDate(); //获取当前日(1-31)
			   let all = year+'-'+month+'-'+day+' '+ miao;
			   let dd = 
			   let Start = new Date(all.replace(/-/g, '/')).getTime();//开团时间时间戳	
			   let stTs = currentT<=Start?true:false;
			   let activeTimeMy = stTs ? Start - currentT :'';
			   let myTime = activeTimeMy
			  let ctiveTimeMy = {
			   	day: parseInt(myTime / (1000 * 60 * 60 * 24)),
			   	hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
			   	minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
			   	second: parseInt((myTime % (1000 * 60)) / 1000)
			   }	
					   console.log(ctiveTimeMy,'ctiveTimeMy')
			}
		}
	}
	function shijianc(value){
		var s = '';
		
		var hour = value.split(':')[0];
		var min = value.split(':')[1];
		var sec = value.split(':')[2];

		// s = Number(hour*3600) + Number(min*60) + Number(sec);
		return s;
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
		width: 100vh;
		position: fixed;
		top: 0;
		background-color: #111;
		opacity: 0.6;
		.maskShare{
			position: absolute;
			top: 0;
			width: 37%;
			left: 25%;
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
			image{
				width:15px;height: 15px
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
			.title{
				text-align: center;
				position: relative;
				display: block;				
				line-height: 40px;
				font-size: 15px;
				color: #fff;
				.bgTips{
					width: 400px;
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
					left: 38.5%;
					z-index: 5;
				}
			}
			.surplusTime{
				color:#f87676 ;
				font-size: 15px;
				display: inline-block;
				height: 55px;
				background-color: skyblue;
			}
			.captain{
				padding: 2px 6px;
				border-radius: 10px;
				background-color: #f87676;
				color: #fff;
				position: absolute;
				bottom: 37px;
				left: 38.5%;
				z-index: 5;
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
}
</style>
