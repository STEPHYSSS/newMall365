<template>	
	<!-- <wxs module="dateFr" src="../../../../filter/index.wxs"></wxs> -->
	<view style="padding:0px 10px 10px;background-color:#fff;">
		<div  @click="onClickCoupon(item.TicketNo)" v-for="item in dataList" :key="item.TicketNo" style="padding-top: 20px;">
			<!--<div class="ticketSty">
				 <p>{{item.TicketNo}}</p>
				<p>{{item.TicketName}}</p>
				<p>￥{{item.TakeDisc}}</p>
				<view v-if="activeUser != 1" class="radio-time-style">
					有效期 {{item.StartTime|timeFil}}至{{item.ValidTime|timeFil}}
				</view>
				<view v-if="activeUser=='1'" class="radio-time-style">
					使用时间 {{item.SaleTime}}
				</view> 
			</div>-->
			<div class='ticketSty'>
			    <div class="left">
					<!-- {{parseFloat((money/10).toFixed(1))}}折 -->
			         <div class="flex1" v-if="item.TakeDisc==='100'"><sub class="sign" >￥</sub><span class="num">{{item.TakeMoney}}</span></div>
					 <div class="flex1" v-else><span class="num">{{parseFloat((item.TakeDisc/10).toFixed(1))}}折</span></div>
					 <div class="ticketNo">{{item.TicketNo}}</div>
			    </div>
			    <div class="right">
			          <div class="flex1 ticketName"><span>{{item.TicketName}}</span></div>
			          <div class="date" v-if="activeUser != 1">有效期:{{item.StartTime|timeFil}} 至 {{item.ValidTime|timeFil}}</div>
					  <div class="date" v-if="activeUser=='1'">使用时间:{{item.SaleTime}}</div>
			    </div>
			</div>
			
		</div>
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
	.ticketSty{
		width:95%;
		box-sizing: border-box;
		position: relative;
		// background-color: #fc813b;
		background-image: linear-gradient(to right,#FFA200, #fc813b);
		margin: 0 auto;
		display: flex;
		color:#fff;
		margin-bottom: 20px;
		padding:10px;
		box-sizing: border-box;
	}
	.ticketSty:before,
	.ticketSty:after {
	  content: '';
	  display: block;
	  width: 30px;
	  height: 100%;
	  background-size: 30px 30px;/* 一个repeat的大小 */
	  background-repeat: repeat-y;
	  background-image: radial-gradient(#fff 6px, transparent 6px);
	  position: absolute;
	  top: 0;
	}
	.ticketSty:before {
	  left: -15px; /* 半圆，只显示一个repeat的一半 */
	}
	.ticketSty:after {
	  right: -15px; 
	}
	.left{
		display:flex;
		flex-direction:column;
		border-right: 1px dashed #fff;
		padding-right: 10px;
	}
	.flex1{
		flex:0 0 40px;
	}
	.ticketName{
		font-size: 16px;
	}
	.sign{
		 font-size:12px;
	}
	.num{
		font-size: 18px;
		font-weight: bold;
	}
	.ticketNo{
		font-size: 12px;
	}
	.right{
	    flex:2;
		display: flex;
		flex-direction: column;
		padding-left: 10px;
	}
	
</style>
