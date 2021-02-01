<template>
	<view class="makeUpGroup">
		<view>
			<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="拼团详情" :status-bar="true" :shadow="false"></uni-nav-bar>
			<view class="top">
				<view class="goodInfo">
					<image style="width: 100px;height: 100px;background-color: skyblue;margin: 3px;"></image>
					<view style="flex: 1;">
						<p>小分子玻尿酸紧致保湿弹润面膜</p>
						<p>
							<text>￥100</text><text>￥178</text>
						</p>
					</view>
				</view>
				<view class="tips">
					<image src="@/static/img/shangcheng1.png"></image>
					<text>拼团规则：邀请1人参团，人数不足自动退款</text>
					<text class="iconfont icon-jiantou" style="font-size: 14px;"></text>
				</view>
			</view>
			<view class="center">
				<view class="successBox">
					<p class="title">拼团成功</p>
					<image style="background-color: orange;z-index: 5;">
					</image>
					<image style="background-color: pink;margin-left: -17px;"></image>					
					<p class="detail" @click="groupInfo">查看全部团员</p>
					<span>团长</span>
				</view>
				<p class="detailBtn">查看订单详情</p>
			</view>
		</view>
	</view>
</template>

<script>
	import { vipCard } from '@/api/http.js';
	import adCell from '@/node_modules/adcell/ADCell.vue';
	export default {
		data() {
			return {
			}
		},
		components: {
			adCell
		},
		methods: {
			clickLeft(){},
			groupInfo(){
				uni.navigateTo({
				   url: '/pages/shoppingMall/makeGroup/leagueList'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
.makeUpGroup{
	.top{
		height: 214px;
		background-color: #fff;
		box-sizing: border-box;
		padding-top: 45px;
		.goodInfo{
			width:89%;
			border-radius: 5px;
			margin: 0 auto;
			display: flex;
			box-shadow: rgb(226, 226, 226) 0px 0px 4px 2px;
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
		height: 100vh;
		background-color: #fff;
		padding-top: 10px;
		margin-top: 10px;
		.successBox{
			position: relative;
			text-align: center;
			margin: 0 20px;
			image{
				width: 65px;
				height: 65px;
				border-radius: 50%;
			}
			.title{
				font-size: 15px;
				color: #fff;
				background: #f87676;
				padding: 5px;
				margin-bottom: 15px;
			}
			span{
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
