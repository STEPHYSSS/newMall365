<template>
	<div class="Spreadorder">
		<!--  <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的订单推广" :status-bar="true" :shadow="false"></uni-nav-bar> -->
		<!-- <a-nodeData stringVal="暂无数据" v-show="hide"></a-nodeData> -->
		<view class="fansNum">
			<view class="fanLeft">
				<view class="box">
					<text class="fanBlock num">{{SpreadMonthSumCnt}}</text>
					<text class="fanBlock">当月推广量 （笔）</text>
				</view>				
			</view>
			<view class="line"></view>
			<view class="fanRight">
				<view class="box">
					<text class="fanBlock num">{{SpreadSumCnt}}</text>
					<text class="fanBlock">总推广量 （笔）</text>
				</view>		
			</view>
		</view>		
		<view class="" v-if="SpreadList.length>0">
			<view class="myFanIcon">
				<image :src="imgUrl" style="width: 24px;height: 24px;"></image>
				<text>我的推广订单</text>
			</view>
			<view v-for="(item,index) in SpreadList" :key="index">
				<view class="flexBox">					
					<view class="flexImg"><image :src="item.Headimgurl"></image></view>
					<view class="flexName">
						<view class="flexTime">昵称：{{item.NickName}}</view>
						<view class="flexTime flexTimeC">{{item.AddTime.split(' ')[0]}}</view>
					</view>
					<view class="flexIndex">
						<view style="font-size: 18px;color: #F95E51;">{{item.PayAmt}}元</view>
						<view class="flexTimeC">支付金额</view>
					</view>
				</view>
			</view>
		</view>
		<a-nodeData stringVal="暂无数据" v-if="!loading&&SpreadList.length==0"></a-nodeData>
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	import {formatDate} from '@/util/publicFunction.js'
	export default {
		name: "Spreadorder",
		data() {
			return {
				ShopBase:{},
				SpreadList:[],
				ShopBase2:{},
				SpreadMonthSumCnt:'',
				SpreadSumCnt:'',
				loading: true,
				formatDate,
				imgUrl:require("@/static/img/tuiguangIcon.png"),
			}
		},
		// async onLoad(option) {
		// 	await this.getList();
		// },
		created(){
			this.getList();
			// console.log(formatDate('2020-08-10 00:00:00', 'm-d'));
		},
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetSpreadOrder"
					}, "UMemberOpera");
					this.SpreadList = data.Data.SpreadList;
					this.SpreadMonthSumCnt = data.Data.SpreadMonthSumCnt
					this.SpreadSumCnt=data.Data.SpreadSumCnt
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/home"
				});
			},
			goMyEng(SID){
				this.$Router.push('/pages/vip/myEarnings')
			}
		},
	}
</script>

<style scoped lang="less">
.Spreadorder{
	.fansNum{
		height: 90px;
		background-color: #ADB838;
		color: #fff;
		display: flex;
		text-align: center;		
		.fanBlock{
			display: block;
			letter-spacing: 1px;
		}
		.line{
			margin-top: 8%;
			height: 32%;
			width: 1px;
			border-left: 1px solid #fff;
		}
		.fanLeft,.fanRight{
			width: 50%;
			.box{
				width: 80%;
				margin: 0 auto;
				color: #efefef;
				font-size: 14px;
				.num{
					margin-top: 15px;
					color: #fff;
					height: 35px;
					line-height: 35px;
					font-size: 20px;
					font-weight: 600;
				}
			}
		}
		
	}	
		background-color: #fff;	
		.myFanIcon{
			height: 55px;
			display: flex;
			border-bottom: 1px solid #d3dae4;
			image{
				display: inline-block;
				margin: 15px 10px 15px 10px;
			}
			text{
				display:inline-block;
				font-size: 16px;
				letter-spacing: 1px;
				margin: 16px 0;
			}
		}
		.flexBox{
			padding: 0px 15px;
			margin: 0px 0;
			height: 70px;
			font-size: 15px;
			border-bottom: 1px dashed #d3dae4;
			display: flex;			
			.flexImg{
				padding-top: 13px;
				width: 45px;
				height: 45px;
				margin-right: 10px;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.flexName{
				flex: 1;
				margin-top: 15px;
				color: #7fa9e2;
				display: flex;
				flex-direction: column;
				color: #333333;
			}
			.flexTime{
				letter-spacing: 1px;
			}
			.flexTimeC{
				color: #b1b7bf;
				margin-top: 5px;
				font-size: 12px;
			}
			.flexIndex{
				margin-top: 15px;
				text-align: center;
				display: flex;
				flex-direction: column;
				color: #333333;
			}
		}
}
</style>
