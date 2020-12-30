<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="权益详情" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="interests">
			<div v-if="NumList.length>0" class="leaderBox" style="">
				<div v-for="(item,index) in NumList" :key="index" class="numList">
					<p>{{item.BeneDesc}}</p>
					<div class="useList">
						<span v-if="item.FrequType!='5'">总次数：{{item.FrequNum}}</span></br>
						<span v-if="item.FrequType!='5'">剩余次数：{{item.ResidueNum}}</span>
						<span v-else>无限制</span>
					</div>
				</div>
			</div>
			<a-nodeData stringVal="暂无数据" v-if="!loading&&NumList.length===0"></a-nodeData>
		</view>
		<view class="interests">
			<div v-if="UseList.length>0" class="leaderBox" style="background-color: #fff;">
				<h3 style="padding: 10px 10px 0px;color: #cfcfcf;">已使用</h3>
				<div v-for="(item,index) in UseList" :key="index" class="userInfo">
					<div class="useList">
						<span>名称：{{item.BeneItemDesc}}</span></br>
						<span>金额：¥ {{item.Consume}}</span></br>
						<span>优惠：¥ {{item.FloatAmt}}</span></br>
						<span>时间：{{item.OptTime}}</span>
					</div>
				</div>
			</div>
			<!-- <a-nodeData stringVal="暂无数据" v-if="!loading&&UseList.length===0"></a-nodeData> -->
		</view>
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
				NumList:[],//剩余数量
				UseList:[],//使用次数
				SID:sessionStorage.getItem("detailPackage"),
			}
		},
		created() {
			this.getInfo();			
		},
		methods: {
			clickGo(){
				this.$Router.pushTab({
					path: "/pages/vip/interests/interests"
				});
			},
			// 获取我的权益信息
			async getInfo(){
				this.loading = true;
				uni.showLoading({
					title: '加载中'
				})
				try {
					let { Data } =  await vipCard({Action:'GetCardBeneInfo',SID:this.SID}, "UBeneOpera");
					this.NumList = Data.NumList||[];
					this.UseList = Data.UseList||[];
					this.loading = false;
					uni.hideLoading()
				} catch (e) {
					this.$toast(e)
					this.loading = false;
				}
			}
		}
	}
</script>

<style lang="less">
	.interests{
		width: 94%;
		height: 100%;
		margin: 0 auto;		
	}
	.interests {
			margin: 10px;
			.van-cell{
				display: inline-block;
			}
			.van-cell-group {
				background-color: transparent;
			}
			.leaderBox{
				// background-color: #fff;
				.numList{
					position: relative;
					background-color: #ffffff;
					margin: 20px 0px;
					border-radius: 5px;
					p{
						display: inline-block;
						background: orange;
						padding: 5px 10px;
						font-size: 14px;
						border-radius: 5px 0;
						color: #fff;
						box-shadow: 0px 1px 1px #d2cbbe;
					}
				}
				.text{
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 80%;
					padding: 5px 8px;
					.num{
						color: #D6A874;
						position: absolute;
						right: 4px;
					}
				}
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
			.useList{
				width: 95%;
				margin: 0 auto;
				color: #b1acac;
				padding-bottom: 10px;
				span{
					display: inline-block;
					margin: 5px 0;
				}
			}
			.userInfo{
				margin: 5px 0;
				border-bottom: 1px dotted #cfcfcf;
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