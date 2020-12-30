<template>
	<view class="w-100 h-100">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo"  title="购买权益" :status-bar="true" :shadow="false"></uni-nav-bar>
		<image :src="imgUrl" class="w-100" style="height: 50vh;"></image>
		<view style="padding: 30rpx 40rpx; padding-bottom: 100rpx;">
			<view class="d-flex justify-content-between align-items-center" style="margin-bottom: 20rpx;">
				<view class="font-size-lg">{{ BeneInfo.Name  }}</view>
				<view class="text-color-primary font-size-sm" @click="toBuyRecords">购买记录</view>
			</view>
			<view class="text-color-assist font-size-sm" style="margin-bottom: 20rpx;">
				<!-- 共{{couponNum}}张优惠券 -->
			</view>
			<!-- 优惠券列表 begin -->
			<view class="d-flex flex-column w-100">
				<view class="coupon d-flex flex-column bg-white" v-for="(coupon, index) in BeneTypeItem" :key="index" @tap="openCouponDetailModal(coupon)">
					<view class="d-flex flex-fill overflow-hidden" style="margin-bottom: 20rpx;">
						<!-- <image :src="coupon.detail.image" style="margin-right: 40rpx;width: 150rpx; height: 150rpx;"></image> -->
						<view class="flex-fill flex-column justify-content-start overflow-hidden" style="width: 50%;">
							<view class="text-right text-color-assist" v-if="coupon.FrequType!='5'">x{{ coupon.FrequNum }}</view>
							<view class="text-right text-color-assist" v-else>无限</view>
							<span class="tips">{{coupon.BeneDesc}}</span>
							<!-- <view class="text-truncate font-size-extra-lg text-color-base w-80 tip" >
								{{coupon.BeneDesc}}
							</view> -->
							<!-- <view class="font-size-sm text-color-assist">{{ coupon.detail.expire }}</view> -->
						</view>
					</view>
					<!-- <view class="bottom d-flex font-size-sm justify-content-between align-items-center">
						<view class="text-color-assist">
							使用时段：{{ coupon.detail && coupon.detail.coupon_use_time[0].use_time_start}}-{{coupon.detail && coupon.detail.coupon_use_time[0].use_time_end}}
						</view>
					</view> -->
				</view>
			</view>
			<!-- 优惠券列表 end -->
			<view class="font-size-extra-lg" style="margin-bottom: 40rpx;">购买须知</view>
			<view class="font-size-base text-color-base">
				售卖时间：{{ BeneInfo.StartTime | setTime}}~{{ BeneInfo.EndTime | setTime}}
			</view>
			<view class="font-size-base text-color-base" style="margin: 30rpx 0;padding-bottom: 30rpx;">
				购买限制：无限制
			</view>
			<!-- <view class="font-size-sm text-color-assist pre-line">
				{{ package.content }}
			</view> -->
		</view>
		<view class="pay-box d-flex just-content-center align-items-center position-fixed fixed-bottom bg-white">
			<button type="primary" class="pay-btn font-size-base text-color-white rounded-pill" @tap="openBuyModal(BeneInfo)"
				style="width: 90%;height: 80rpx; line-height: 80rpx;">
				￥{{ BeneInfo.Price }}购买
			</button>
		</view>
		<uni-popup ref="BuyModalShow" type="bottom">
			<view style="width: 86%; margin: 0 auto;" class="deepSty">
				<p style="text-align: center;margin: 15px 0;">￥<span style="font-size: 28px;">{{ BeneInfo.Price }}</span></p>
				<view class="payStyle">支付方式</view>
				<radio-group @change="radioPayChange" v-if="BeneInfo.LimitPay ==''|| (BeneInfo.LimitPay.indexOf(',')>-1)">
					<div>
						<div class="radio-group-item" @click="PayTypeClick('1')">
							<div>
								<img class="wechat" src="@/static/assets/img/moneyPay.png" slot="right-icon" />
								<span class="custom-title">卡支付（余额:{{CardInfo.Balance}}）</span>
							</div>
							<div style="flex:1;text-align: right;">
								<radio style="" slot="right-icon" value="1" :checked="radioPayType == '1'" v-if="Number(CardInfo.Balance)>=BeneInfo.Price" />
								<span class="summaryNum" style="color:#777" v-else>余额不足</span>
							</div>
						</div>
						<div @click="PayTypeClick('2')" class="radio-group-item">
							<div>
								<img class="wechat" src="@/static/assets/img/weixinPay.png">
								<span class="custom-title">微信支付</span>
							</div>
							<radio style="flex:1;text-align: right;" slot="right-icon" value="2" :checked="radioPayType == '2'" />
						</div>
					</div>
				</radio-group>
				<radio-group @change="radioPayChange" v-else>
					<div>
						<div class="radio-group-item" @click="PayTypeClick('1')" v-if="BeneInfo.LimitPay==='1'">
							<div>
								<img class="wechat" src="@/static/assets/img/moneyPay.png" slot="right-icon" />
								<span class="custom-title">卡支付（余额:{{CardInfo.Balance}}）</span>
							</div>
							<div style="flex:1;text-align: right;">
								<radio style="" slot="right-icon" value="1" :checked="radioPayType == '1'" v-if="Number(CardInfo.Balance)>=BeneInfo.Price" />
								<span class="summaryNum" style="color:#777" v-else>余额不足</span>
							</div>
						</div>
						<div @click="PayTypeClick('2')" class="radio-group-item" v-if="BeneInfo.LimitPay==='9902'">
							<div>
								<img class="wechat" src="@/static/assets/img/weixinPay.png">
								<span class="custom-title">微信支付</span>
							</div>
							<radio style="flex:1;text-align: right;" slot="right-icon" value="2" :checked="radioPayType == '2'" />
						</div>
					</div>
				</radio-group>
				<button type="primary" class="pay-btn font-size-base text-color-white rounded-pill" :disabled="isDisabled" @tap="payClick(coupon)"
					style="height: 80rpx; line-height: 80rpx;margin: 15px 0;border-radius: 20px;" :loading="isDisabled" :class="{ active: isActive }">
					购买
				</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import modal from '@/components/modal/modal'
import { vipCard } from "@/api/http.js";
import { GetAppNo } from "@/util/publicFunction";
export default {
	components: {
		modal
	},
	data() {
		return {
			imgUrl:require("@/static/img/quanyi.jpg"),
			coupon: {
				detail: {}
			},
			loading: true,
			BeneList:[],//列表
			couponDetailModalShow: false,
			BuyModalShow:false,//支付弹窗
			BeneInfo:{},//详情
			CardInfo:{},//卡信息
			radioPayType: "1",//默认微卡支付
			isDisabled:false,
			isActive :false,//用于控制点击充值按钮，样式置灰
			mainStyle: getApp().globalData.mainStyle,
			BenePayMode:'',
			BeneTypeItem:[],//权益项
		};
	},
	computed: {
		couponNum() {
			return this.package.coupons && this.package.coupons.reduce((acc, coupon) => acc + coupon.coupon_num, 0)
		}
	},
	async onLoad(option) {
		this.loading = true;
		await this.getInfo()
		this.loading = false;
		if (Number(this.CardInfo.Balance) < Number(this.BeneInfo.Price)) {
			//余额不足默认微信支付
			this.radioPayType = "2";
		}else {
			this.radioPayType = "1";
		}
	},
	methods: {
		async getInfo(){//获取详情
			let PlanNo = sessionStorage.getItem('buyPackage');
			try {
				let { Data } =  await vipCard({Action:'GetBeneInfo',PlanNo:PlanNo}, "UBeneOpera");
				this.BeneInfo = Data.PlanInfo;
				// 判断是否有BenePayMode权益购买方式 如果有两个值代表微卡和微信都可以支付，否则只展示其中一个支付方式
				// this.BeneInfo.LimitPay = '9902,1'
				this.BeneTypeItem = Data.BeneTypeItem;
				if(Data.CardInfo){
					this.CardInfo = Data.CardInfo
				}else{
					this.$toast('您还未绑定卡，请前往绑定')
					setTimeout(()=>{
						window.location.href = "http://manage.bak365.cn/WebApp/WXCard/?Type=PayCode&AppNo="+GetAppNo()
					},200)
				}
				// console.log(BeneInfo)
			} catch (e) {
				this.$toast(e)
			}
		},
		PayTypeClick(item) {//支付方式
			if (this.CardInfo && Number(this.CardInfo.Balance) < this.totalCurrent) {
				return;
			}
			this.radioPayType = item;
		},
		radioPayChange(val) {
			if (this.CardInfo && Number(this.CardInfo.Balance) < Number(this.BeneInfo.Price)) {
				return;
			}
			this.radioPayType = val.detail.value
		},
		async payClick(){//确定支付按钮
			this.isDisabled = true;
			this.isActive = true;
			setTimeout(() => {
			  this.isDisabled = false;
			}, 5000)
			try{
				let {Data} =  await vipCard({Action:'BenePay',PlanNo:this.BeneInfo.PlanNo,PayType:this.radioPayType}, "UBeneOpera");
				if(this.radioPayType === "1"){//微卡支付
					this.$toast("订单正在处理中...");
					setTimeout(() => {
						this.$Router.push({
							path:"/pages/home"
						})
					}, 3000);
					this.isActive = false;
					this.isDisabled = false;
					this.BuyModalShow = false;
					this.$refs.BuyModalShow.close();
				}else{//微信支付
					try {
						weChatPayment(this, Data, false);
					} catch (e) {
						that.$toast.fail(e);
						this.isActive = false;
						this.loading = false;
						uni.hideLoading();
					}
				}
			}catch(e){
				this.isActive = false;
				this.$refs.BuyModalShow.close();
				this.BuyModalShow = false;
				this.$toast.fail(e)
			}
		},
		clickGo(){//返回
			this.$Router.pushTab({
				path: "/pages/packages/index"
			});
		},
		openCouponDetailModal(coupon) {
			this.coupon = coupon
			this.couponDetailModalShow = true
		},
		closeCouponDetailModal() {
			this.couponDetailModalShow = false
		},
		openBuyModal(){//点击购买弹出窗
			this.$refs.BuyModalShow.open();
			this.BuyModalShow = true;
		},
		closeBuyModalShow(){
			this.$refs.BuyModalShow.close();
			this.BuyModalShow = false;
		},
		toBuyRecords(){//购买记录
			this.$router.push({path:'/pages/packages/buyRecords'})
		},
	}
};
</script>

<style scoped lang="less">
@import '@/assets/css/packages.css';
.w-100 {
	width: 100% !important;
}
.font-size-lg {
    font-size: 16px;
}
.active{
	background-color: #CCCCCC !important;
}
.pay-box {
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 10rpx 0;
	height: 100rpx;
	/deep/uni-button[size=mini],button[type=main] {
		padding:0 1em;
		font-size: 24rpx;
	}
	/deep/uni-button[type=primary].button-hover{
		background-color: #ADB838;
	}
	uni-button[type=primary]{
		background-color: #ADB838;
		color: #Fff;
	}
}
.radio-group-item {
	padding: 6px 0;
	display: flex;
}
/deep/.uni-transition{
	background-color: #fff;
	border-radius: 4px 4px 0 0;
}
.deepSty{
	/deep/uni-button[type=primary]{
		background-color: #ADB838;
	}
	/deep/uni-button[type=primary].button-hover{
		background-color: #ADB838;
	}
}
.payStyle{
	margin: 10px 0;
	font-size: 14px;
}
.wechat {
	width: 18px;
	height: 18px;
	margin-right: 8px;
	display: inline-block;
	font-size: 18px;
	vertical-align: middle;
	image {
		width: 100%;
		height: 100%;
	}
}
/deep/.uni-radio-input-checked{
	background-color: #ADB838 !important;
	border-color:#ADB838 !important;
}
.coupon {
	border-radius: 6rpx;
	padding: 20rpx 40rpx; 
	margin-bottom: 40rpx;
	box-shadow: 0 10px 10px -10px rgba(51, 51, 51, 0.1);
	position: relative;
	
	&::before {
		content: " ";
		position: absolute;
		background-color: #f9f9f9;
		width: 30rpx;
		height: 30rpx;
		bottom: 46rpx;
		left: -15rpx;
		border-radius: 100%;
	}
	
	&::after {
		content: " ";
		position: absolute;
		background-color: #f9f9f9;
		width: 30rpx;
		height: 30rpx;
		bottom: 46rpx;
		right: -15rpx;
		border-radius: 100%;
	}
	
	.bottom {
		height: 70rpx;
		position: relative;
		
		&::before {
			content: '';
			border-top: 2rpx dashed #E2E2E2;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			transform: scaleY(0.2);
		}
	}
	.tips{
		font-size: 15px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: 80%;
		display: inline-block;
	}
}
</style>
