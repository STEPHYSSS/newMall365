<template>
	<view>
		<view class="scanCoupons" v-if="TicketList.length>0">
			<view>
				<view class="centerBox2"></view>
				<view class="box">
					<view class="couponBox" v-for="(item,index) in TicketList" :key="index" @click="toGoodsTree">
						<view class="flexLeft">
							<sub class="sign" >￥</sub><span class="num">{{item.TakeMoney}}</span>
							<view class="useTick">立即使用</view>
						</view>
						<view class="flexRight">
							<view class="name">{{item.TypeName}}</view>
							<view class="Time">有效期：{{item.StartTime.split(' ')[0]}}-{{item.ValidTime.split(' ')[0]}}</view>
						</view>
					</view>
				</view>
				<view class="centerBox" @click="toGoodsTree">
					<!-- <image :src="imgUrl" style="width: 100%;height: 100%;margin-top: 5%;"></image> -->
				</view>
				<view class="bott" @click="toMyticket">
					<!-- <image :src="imgUrl2" style="width: 100%;height: 100%"></image> -->
				</view>
			</view>
		</view>
		<view class="noCoupons" v-show="show">
			<view class="tips">活动数量已发放完毕 <br/>下次记得早点来哟</view>
		</view>
	</view>
</template>

<script>
	import {vipCard} from "@/api/http.js";
	import Cookie from '@/config/cookie-my/index.js';
	import {getQueryString2} from '@/util/publicFunction.js'
	export default {
		data() {
			return {
				SID:'',
				imgUrl:require("@/static/img/ScanCouponBtn.png"),
				imgUrl2:require("@/static/img/myCoupon.png"),
				TicketList:[
				// 	{
				// 	StartTime:"2020-04-20 00:00:00",
				// 	TakeMoney: "10",
				// 	TypeName: "10元蛋糕券111111",
				// 	ValidTime: "2099-01-01 00:00:00"
				// },{
				// 	StartTime:"2020-04-20 00:00:00",
				// 	TakeMoney: "100",
				// 	TypeName: "10元电子券",
				// 	ValidTime: "2099-01-01 00:00:00"
				// },{
				// 	StartTime:"2020-04-20 00:00:00",
				// 	TakeMoney: "10",
				// 	TypeName: "吐司5元电子券",
				// 	ValidTime: "2099-01-01 00:00:00"
				// },
				],
				show:false
			}
		},
		created() {
			this.init()
		},		
		methods: {
			init(){ //初始化
				uni.showLoading({
					title: '加载中'
				});
				let url = Cookie.get('searchUrl')
				if(url!=null&&url.indexOf('FlagScan')>-1){
					if(url!=null&&url.lastIndexOf("?")){
						let index = url.lastIndexOf("?");
				        url = url.slice(index);
				        this.SID = getQueryString2("SID", url);
					}
				}			
				this.getScanCoupons();
			},
			async getScanCoupons() {
				try {
					let { Data } = await vipCard({
							Action: "ScanCoupon",
							// SID: '4972049891066583173'
							SID:this.SID?this.SID:''
						},
						"UPromotionOpera"						
					);
					this.TicketList = Data.TicketList||[];
				} catch (e) {
					this.show = true;
				}
			},
			toGoodsTree(){
				this.$router.push('/pages/shoppingMall/list/goodsList')
			},
			toMyticket(){
				this.$router.push('/pages/vip/myCoupon/myCoupon')
			}
		}
	}
</script>

<style lang="less" scoped>
.noCoupons{
	position: relative;
	height: 100vh;
	background-image: url(../../static/img/noScanCouponBgc.jpg);
	background-size: 100% 100%;
	background-position-y: -11vh;
	.tips{
		width: 100%;
		height: 20vh;
		text-align: center;
		position: absolute;
		top: 53%;
		letter-spacing: 1px;
		font-size: 14px;
		color: #333;
	}
}
.scanCoupons{
	position: relative;
	height: 100vh;
	background-image: linear-gradient(to right, #F23132, #EA3031);
	// background-color: #EA3031;
	// background-image: url(../../static/img/scanBg.jpg);
	background-size: 100% 100%;
	.box{
		margin: 0 auto;
		display: block;
		max-height: 46vh;
		min-height: 15vh;
		padding-top: 15px;
		overflow-y: scroll;
		.couponBox{
			position: relative;
			height: 90px;
			border-radius:5px;
			width: 92%;
			margin: 0 auto 15px;
			background-color: #fff;
			display: flex;
			  &::before,
			  &::after {
			   content: "";
			   display: block;
			   width: 30px;
			   height: 30px;
			   background-size: 30px 30px;
			   /* 一个repeat的大小 */
			   background-image: radial-gradient(#e83030 8px, transparent 8px);
			   position: absolute;
			   // top: 63px;
			  }
			
			  &::before {
				top: -15px;
				left: 22.4%;
			   /* 半圆，只显示一个repeat的一半 */
			  }
			
			  &::after {
			   left: 22.4%;
			   top: 75px;
			  }
				.flexLeft{
					color: #f11031;
					text-align: center;
					height: 100%;
					width: 100px;
					background-color: #FFF3CB;
					border-radius: 5px 0 0 5px;
					.sign{
						font-size:16px;
						font-weight: 600;
					}
					.num{
						font-size: 32px;
						font-weight: bold;
						line-height: 52px;
					}
					.useTick{
						border: 1px solid;
						width: 70%;
						margin: 0 auto;
						box-sizing: border-box;
						padding: 3px 0px;
						border-radius: 5px;
						font-size: 13px;
					}
				}
				.flexRight{
					flex: 1;
					color: #dca154;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 14px;
					.name{
						font-size: 18px;
					}
					.Time{
						font-size: 13px;
					}
				}
		}
	}
	.centerBox2{
		height: 145px;
		min-height: 15vh;
		max-height: 20vh;
		background-size: 100% 100%;
		background-image: url(../../static/img/ScanTips.jpg);
		
	}
	.centerBox{
		height: 80px;
		margin-top: 6%;
		background-size: 100% 100%;
		background-image: url(../../static/img/ScanCouponBtn.png);
	}
	.bott{
		width: 100%;
		height: 60px;
		position: fixed;
		bottom: 0;
		background-image: url(../../static/img/myCoupon.png);
		background-size: 100% 100%;
	}
}
</style>
