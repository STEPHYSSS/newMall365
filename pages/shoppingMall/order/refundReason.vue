<template>
	<div :class="[classHome,'refund-reason']">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="申请退款" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div v-if="$Route.query.refund==='1'">
			<picker @change="onConfirm" :range="columns" range-key="name">
				<adCell text="退款原因" :detail="refundTypeObj.TypeRemark" />
			</picker>
			<div class="addBottomline">
				<adCell text="退款金额" showArrow="false" showBottomLine="true">
					<span class="refund-money">¥{{$Route.query.PayAmt}}</span>
				</adCell>
			</div>
			<div style="display: flex;padding:30rpx 24rpx;border-top:0;">
				<div class="textView">退款说明</div>
				<input style="flex:1;font-size: 14px;" v-model="refundTypeObj.UserRemark" placeholder="请输入退款说明" />
			</div>
			<div class="btnfixedBottom" v-if="!loading">
				<button :disabled="loading" class="buttonPage" type="redRaduis" @click="OrderCardPay" :loading="loading">确认提交</button>
			</div>
		</div>
		<div v-if="$Route.query.refund!=='1'">
			<div class="backgroundColorA refundTop">
				<div>{{$Route.query.refund==='3'?'退款成功':$Route.query.refund==='4'?" 退款失败":'请等待商家处理'}}</div>
				<div v-if="$Route.query.refund==='2'" class="refundTop-Time">申请时间：{{$Route.query.RefundTime}}</div>
				<div v-else-if="$Route.query.RefCompleteTime" class="refundTop-Time">处理时间：{{$Route.query.RefCompleteTime}}</div>
			</div>
			<div class="wait-refund">
				<adCell text="退款总金额" showArrow="false" showBottomLine="false">
					<template slot="default">
						<span class="refund-money">¥{{$Route.query.PayAmt}}</span>
					</template>
				</adCell>
			</div>
			<div v-if="$Route.query.refund==='4'&&$Route.query.Reply" style="margin-top:10px;background:#fff;padding:12px 16px;">
				<div class="refund-reason-info">退款失败原因：</div>
				<div>{{$Route.query.Reply}}</div>
			</div>
		</div>
		<!-- :value="data.industry" -->

		<!-- 	<uni-popup ref="reimburse" type="bottom" :style="{ 'max-height': '50%' }">
			<picker mode='selector' value-key="name" title="退款原因" :range="columns" @cancel="$refs.reimburse.close()" @change="onConfirm">
			</picker>
		</uni-popup> -->
	</div>
</template>

<script>
	import {
		refundTypeList
	} from "@/config/util";
	import {
		vipCard
	} from "@/api/http.js";
	import adCell from '@/node_modules/adcell/ADCell.vue';
	export default {
		name: "",
		components: {
			adCell
		},
		data() {
			return {
				classHome: getApp().globalData.mainStyle,
				show: false,
				columns: refundTypeList,
				refundTypeObj: {
					TypeRemark: "请选择",
					Type: "",
					UserRemark: ""
				},
				loading: false
			};
		},
		mounted() {
			//   订单正常 = 1,
			//    申请退款 = 2,
			//    退款成功 = 3,
			//    退款失败 = 4
			//     console.log(this.$Route.query.refund, "5454");
			//     console.log(this.$Route.query.PayAmt, "5454");
		},
		methods: {
			onConfirm(val) {
				this.show = false;
				this.refundTypeObj.Type = this.columns[val.detail.value].name;
				this.refundTypeObj.TypeRemark = this.columns[val.detail.value].name;
			},
			async OrderCardPay() {
				try {
					if (!this.refundTypeObj.Type) {
						uni.showToast({
							title: '请选择退款原因',
							duration: 2000,
							icon: 'none'
						});
						return;
					}
					// if (!this.refundTypeObj.UserRemark) {
					// 	uni.showToast({
					// 		title: '请填写退款说明',
					// 		duration: 2000,
					// 		icon: 'none'
					// 	});
					// 	return;
					// }
					let obj = {
						Action: "ApplyRefund",
						SID: this.$Route.query.SID,
						OrderType:this.$Route.query.OrderType
					};
					obj = Object.assign(obj, this.refundTypeObj);
					//    console.log(obj, "obj");
					this.loading = true
					await vipCard(obj, "UOrderOpera");
					uni.showToast({
						title: '操作成功',
						duration: 2000,
						icon: 'none'
					});
					this.$Router.push({
						path: '/pages/shoppingMall/order/orderInfo',
						query: {
							order_id: this.$Route.query.SID
						}
					});
				} catch (e) {
					this.loading = true
				};
			},
			clickGo() {
				this.$Router.push({
					path: '/pages/shoppingMall/order/orderInfo',
					query: {
						order_id: this.$Route.query.SID
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.refund-reason {
		background-color: #fff;

		.textView {
			text-align: left;
			font-size: 14px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: rgb(94, 94, 94);
			margin-right: 20px;
		}

		.wait-refund {
			/deep/.adBaseView {
				padding: 15px 0;
			}
		}

		.addBottomline {
			/deep/.bottomLine {
				border-bottom: 1px solid #DDDDDD;
			}
		}

	}

	.custom-title {
		color: #000;
		display: inline-block;
		width: 90px;
	}

	.refund-money {
		color: #ff5402;
	}

	.action-container {
		margin: 100px 10px 0;
	}

	.refundTop {
		padding: 20px;
		color: #fff;

		.refundTop-Time {
			font-size: 14px;
			margin-top: 6px;
		}
	}

	.refund-reason-info {
		margin-bottom: 6px;
	}
</style>
