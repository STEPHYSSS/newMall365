<template>
	<view class="makeUpGroup">
		<view>
			<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="拼团详情" :status-bar="true" :shadow="false"></uni-nav-bar>
			<view class="top">
				<view class="goodInfo">
					<image style="width: 100px;height: 100px;margin: 3px;margin: 8px;border: 1px solid #f2f2f2;border-radius: 4px;" :src="ProdInfo.Img|fmtImgUrl"></image>
					<view style="flex: 1;">
						<p>{{ProdInfo.Name}}</p>
						<p>
							<text>￥{{ProdInfo.SalePrice}}</text><text style="text-decoration: line-through;">￥{{ProdInfo.OldPrice}}</text>
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
					<!-- <p v-for="(item,index) in GroupList" :key="index"> -->
						
						<image class="photo" :src="item.Headimgurl" style="z-index: 5;" v-for="(item,index) in GroupList" :key="index"></image>
						<!-- <image class="photo" :src="item.Headimgurl" style="margin-left: -17px;"></image> -->
					<!-- </p>				 -->
					<p class="detail" @click="groupInfo">查看全部团员</p>
					<span class="captain">团长</span>
				</view>
				<p class="detailBtn" @click="OrderInfo">查看订单详情</p>
			</view>
			<view class="center" v-else>
				<view class="successBox">
					<text class="spanTips">拼团剩余时间</text>
					<!-- <uni-countdown color="#fff" splitor-color="#fff" background-color="pink" :hour="activeTimeMy.hours"
					 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>	 -->
					 
					<p v-for="(item,index) in GroupList" :key="index">
						<image class="photo" :src="item.Headimgurl" style="background-color: orange;z-index: 5;"></image>
						<image class="photo" :src="imgUrl" style="background-color: #fff;border: 1px dotted #ff0000;margin-left: -17px;"></image>
					</p>									
					<span class="captain">团长</span>
					<p style="margin: 24px 0;">仅剩<span style="color: Red;padding: 0 5px;">{{GroupInfo.SurplusCnt}}</span>人，快来加入我的团吧！</p>
				</view>
				<p class="detailBtn" @click="toOrderInfo">立即参团</p>
				<showSkuSeckill :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo" :couGroup = "couGroup"></showSkuSeckill>
			</view>
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
				activeTimeMy: {},
				VirtualTime:'',//倒计时
				show: false,
				skuDataInfo:{},
				couGroup:true
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
		methods: {
			clickLeft(){
				window.history.back(-1)
			},
			toOrderInfo(){
				this.show = true;
			},
			hideShow() {
				this.show = false;				
			},
			OrderInfo(){
				this.$Router.push({
					path: "/pages/shoppingMall/order/orderInfo",
					query: {
						order_id: this.GroupInfo.OrderSID,
						OrderType:'2'			
					}
				});
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
					if(this.GroupInfo.GroupNum === this.GroupInfo.SurplusCnt){
						this.successGroup = 1
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
		// result = hour + ":" + middle ;
		return result;
	}
</script>

<style lang="less" scoped>
.makeUpGroup{
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
			box-shadow: rgb(226, 226, 226) 1px 1px 4px 2px;;
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
			.captain{
				padding: 2px 6px;
				border-radius: 10px;
				background-color: #f87676;
				color: #fff;
				position: absolute;
				bottom: 37px;
				left: 37.5%;
				z-index: 5;
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
			color: #e7e7e7;
			background-color: #f87676;
		}
	}
}
</style>
