<template>	
	<!-- <wxs module="dateFr" src="../../../../filter/index.wxs"></wxs> -->
	<view style="padding:0px 10px 10px">
		<radio-group :value="currentCodeNo">
			<view v-if="isOrder" @click="onClickCoupon(0)">
				<radio :value="0" class="custom-class-noradio" :checked="currentCodeNo === 0"></radio>
				<text style="font-size: 10pt;">暂不使用券</text>
			</view>
			<view class="radio-couponFa-style" @click="onClickCoupon(item.TicketNo)" v-for="item in dataList" :key="item.CodeNo">
				<view class="saleDateStyle">
					{{item.TicketNo}}
				</view>
				<view class="radio-coupon-style">
					<view class="radio-center-style">
						<view class="radio-title-style">{{item.TicketName}}</view>
						<view class="radio-title-style">￥{{item.TakeDisc}}</view>
						<view v-if="activeUser != 1" class="radio-time-style">
							有效期 {{item.StartTime|timeFil}}至{{item.ValidTime|timeFil}}
						</view>
						<view v-if="activeUser=='1'" class="radio-time-style">
							使用时间 {{item.SaleTime}}
						</view>
					</view>

					<view v-if="!isOrder" class="my-default-btn user-coupon-style">
						<!-- <navigator :url="'/pages/indexVip/couponQRCode/index?item='+ encodeURIComponent(JSON.stringify(item))"
						 hover-class="none">
							<button hover-class="btn-hover" class="user-coupon-btn">立即使用</button>
						</navigator> -->
						<button hover-class="btn-hover" class="user-coupon-btn" v-if="activeUser=='0'" @click="userCoupon(item.TicketNo)">立即使用</button>
						<button hover-class="btn-hover" class="user-coupon-btn" v-if="activeUser=='1'">已使用</button>
						<button hover-class="btn-hover" class="user-coupon-btn" v-if="activeUser=='2'">已过期</button>
					</view>
					<view style="flex:1;text-align: right;" v-if="isOrder">
						<radio :value="item.CodeNo" class="custom-class-radio" :checked="item.CodeNo === currentCodeNo"></radio>
					</view>

					<view class="mask-box-style" v-if="activeUser != 0"></view>
				</view>
			</view>
		</radio-group>
		<no-data v-if="dataList.length===0">
		</no-data>
	</view>
</template>

<script>
	import noData from '@/components/nodeData/index.vue';
	export default {
		components: {
			noData
		},
		props: {
			dataList: Array,
			activeUser: [Number, String],
			isOrder: {
				type: Boolean,
				default: false
			},
			currentId: [Number, String] //当前点击的
		},
		data() {
			return {
				// dataList: []
				currentCodeNo: 0,
				colorIndex: getApp().globalData.colorIndex
				// showInfo: false
			}
		},
		created() {
			this.currentCodeNo = this.currentId
		},
		filters:{
			timeFil(value){
				if (value) {
				      return value.slice(0, 10)
				    }
			}
		},
		methods: {
			onClickCoupon(e) {
				this.currentCodeNo = e
				this.$emit('onClickCoupon', e)
			},
			userCoupon(val){
				let ShopRadio = localStorage.getItem("ShopRadio")
				if(ShopRadio === '1'){
					uni.navigateTo({
					   url: '/pages/shoppingMall/login'
					});
				}else{				
					uni.navigateTo({
					   url: '/pages/shoppingMall/index'
					});
				}
				console.log(val)
			},
			setCouponInfo(val) {
				var newStr = val.replace(RegExp('~', 'g'), ';')
				var paramsStr = newStr.slice(0, 30)
				return paramsStr
			},
			// onCloseInfo(bool) {
			// 	if (!bool.show) {
			// 		this.showInfo = false
			// 	}
			// },
			viewMore(val) {
				// 查看更多
				var str = val
				str = str.replace(/~/g, '\n')
				// this.currentShowStr = str
				this.$emit('viewMore', str)
				// this.showInfo = true
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.radio-couponFa-style {
		background: #fff;
		padding: 10px;
		margin-top: 10px;
		border-radius: 5px;
	}

	.radio-coupon-style {
		display: flex;
		position: relative;
	}

	.saleDateStyle {
		padding-bottom: 6px;
		color: rgb(236, 163, 78);
		font-size: 10pt;
	}

	.radio-img-style {
		min-width: 80px;
		width: 80px;
		height: 86px;
		background-size: 100% 100%;
		background-repeat: none;
		margin-right: 12px;
		color: #fff;
		text-align: center;
		box-sizing: border-box;
		padding-top: 14px;
	}

	.radio-limit-style {
		margin-top: 4px;
		font-size: 7pt;
	}

	.radio-center-style {
		color: rgb(148, 146, 146);
		font-size: 8pt;
		width: 69%;
	}

	.radio-title-style {
		margin-top: 4px;
		font-weight: 700;
		font-size: 11pt;
		color: #000;
	}

	.radio-title-order-style {
		margin-top: 15px;
	}

	.arrow-more-style {
		display: inline-block;
		color: rgb(236, 163, 78);
		font-size: 10px;
		line-height: 20px;
	}

	.user-coupon-style {
		text-align: right;
		flex: 1;
	}

	.radio-info-style {
		min-height: 45px;
	}

	.custom-class-radio {
		margin-top: 30px;
		justify-content: flex-end;
	}

	.custom-class-noradio {
		margin-top: 12px;
		margin-left: 10px;
	}

	.mask-box-style {
		position: absolute;
		background: rgba(250, 250, 250, 0.4);
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}


	.user-coupon-btn {
		background: #fdcc63 !important;
		color: #fff !important;
		border: 1px solid #fdcc63 !important;
		// margin-top: 29px;
	}

	@media screen and (max-width: 320px) {
		.radio-info-style {
			font-size: 24rpx;
		}

		.radio-time-style {
			font-size: 24rpx;
		}
	}
</style>
