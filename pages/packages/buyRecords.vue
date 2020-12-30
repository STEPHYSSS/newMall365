<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="购买记录" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="surplusBottom" v-if="!loading">
			<!-- <van-cell-group> -->
			<div v-if="OrderList.length>0">
				<div v-for="(item,index) in OrderList" :key="index" class="van-cell">
					<div class="van-cell__title">
						<div v-if="item.CardPay>0">
							<span>消费金额</span>
							<div class="custom-time" style="float: right">-{{item.CardPay}}</div>
						</div>
						<div class="custom-label">名称：{{item.BeneName}}</div>
						<div class="custom-label">会员卡号：{{item.CardNo}}</div>
						<div class="custom-label">时间：{{item.OptTime}}</div>
						<div class="custom-label" v-if="item.ExchNo">订单号：{{item.ExchNo}}</div>
					</div>
				</div>
			</div>
			<a-nodeData stringVal="暂无购买记录" v-if="!loading&&OrderList.length===0"></a-nodeData>
		</div>
		
	</view>
</template>

<script>
	import { vipCard } from "@/api/http.js";
	export default {
		data() {
			return {
				OrderList:[],
				loading: true,
			}
		},
		async onLoad() {
			this.loading = true;
			await this.getBuyList()
			this.loading = false;
		},
		methods: {
			// 获取购买记录列表
			async getBuyList(){
				try {
					let { Data } =  await vipCard({Action:'GetBeneOrderList'}, "UBeneOpera");
					this.OrderList = Data.OrderList;
				} catch (e) {
					this.$toast(e)
				}
			},
			clickGo(){
				//#ifdef H5
					this.$router.go(-1);//返回上一层
				//#endif
			}
		}
	}
</script>

<style scoped lang="less">
.surplusBottom {
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
