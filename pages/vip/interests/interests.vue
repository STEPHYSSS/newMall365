<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="会员权益" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="interests">
			<div v-if="list.length>0">
				<div v-for="(item,index) in list" :key="index" class="van-cell">
					<div class="van-cell__title" @click="toDetail(item)">						
						<div>
							<span>{{item.BeneName}}</span>
						</div>
						<div>
							<span class="custom-label">卡号：{{item.CardNo}}</span>
						</div>
						<div class="custom-label">有效期：{{item.UseTime | setTime}}~{{item.ValidTime | setTime}}</div>
						<div class="custom-label" v-if="item.ExchNo">订单号：{{item.ExchNo}}</div>
					</div>
				</div>
			</div>
			<a-nodeData stringVal="暂无数据" v-if="!loading&&list.length===0"></a-nodeData>
		</view>
		<!-- <modal custom :show="couponDetailModalShow" @cancel="closeCouponDetailModal">
			<view class="d-flex flex-column">
				<view class="text-center font-size-extra-lg text-color-base" style="margin-bottom: 30rpx;">
					{{ coupon.Name}}
				</view>
				<view class="text-center font-size-sm text-color-assist" style="margin-bottom: 40rpx;">
					{{ coupon.expire }}
				</view>
				<view class="text-color-assist font-size-sm pre-line">
					{{ coupon.desc }}
				</view>
			</view>
		</modal> -->
	</view>
</template>

<script>
	import { vipCard } from "@/api/http.js";
	import modal from '@/components/modal/modal'
	import { GetAppNo } from "@/util/publicFunction";
	export default {
		data() {
			return {
				loading:true,
				couponDetailModalShow: false,
				coupon:{},
				list:[]
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
			clickGo(){
				this.$Router.pushTab({
					path: "/pages/home"
				});
			},
			// 获取我的权益信息
			async getInfo(){
				this.loading = true;
				uni.showLoading({
					title: '加载中'
				})
				try {
					let { Data } =  await vipCard({Action:'GetCardBene'}, "UBeneOpera");
					this.list = Data.BeneList||[];
					uni.hideLoading()
					this.loading = false;
				} catch (e) {
					this.$toast(e)
					this.loading = false;
				}
			},
			toDetail(val){
				uni.navigateTo({
					url: '/pages/vip/interests/detail?id=' + val.SID
				})
				sessionStorage.setItem('detailPackage',val.SID)
				// this.$router.push({path:'/pages/vip/interests/detail',query:{SID:val.SID}})
			},
		}
	}
</script>

<style lang="less">
	.interests{
		width: 94%;
		margin: 0 auto;		
	}
	.interests {
			margin: 10px;
	
			.van-cell-group {
				background-color: transparent;
			}
	
			.titleHear {
				padding-bottom: 16px;
				position: relative;
	
				&:after {
					position: absolute;
					box-sizing: border-box;
					content: " ";
					pointer-events: none;
					right: -15px;
					left: 0;
					bottom: 6px;
					border-bottom: 1px solid #ebedf0;
					transform: scaleY(0.5);
				}
			}
	
			.custom-time {
				margin-top: 3px;
				color: #969799;
				font-size: 14px;
				line-height: 18px;
			}
	
			.custom-label {
				margin-top: 3px;
				color: #969799;
				font-size: 12px;
				line-height: 18px;
			}
	
			.noneData {
				text-align: center;
				position: relative;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				margin: 40px 0;
				padding-bottom: 20px;
			}
		}
	
		.van-cell {
			margin-bottom: 10px;
			position: relative;
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 16px;
			overflow: hidden;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
		}
	
		.van-cell__title {
			flex: 1;
		}
</style>
