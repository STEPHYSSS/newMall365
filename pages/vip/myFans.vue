<template>
	<view class="myFans">
		<!-- <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的粉丝" :status-bar="true" :shadow="false"></uni-nav-bar> -->
		<view class="fansNum">
			<view class="fanLeft">
				<view class="box">
					<text class="fanBlock num">{{MonthCnt}}</text>
					<text class="fanBlock">当月新增粉丝 （人）</text>
				</view>				
			</view>
			<view class="line"></view>
			<view class="fanRight">
				<view class="box">
					<text class="fanBlock num">{{DataCount}}</text>
					<text class="fanBlock">全部粉丝 （人）</text>
				</view>		
			</view>
		</view>		
		<view class="leaderBox" v-if="myFansList.length>0">
			<view class="myFanIcon">
				<image :src="imgUrl" style="width: 24px;height: 24px;"></image>
				<text>我的粉丝</text>
			</view>
			<view v-for="(item,index) in myFansList" :key="index">
				<view class="flexBox">
					<view class="flexIndex">{{index+1}}</view>
					<view class="flexImg"><image :src="item.Headimgurl"></image></view>
					<view class="flexName">
						<view class="flexTime">{{item.NickName}}</view>
						<view class="flexTime flexTimeC">关注时间：{{item.AddTime.split(' ')[0]}}</view>
					</view>
					
				</view>
			</view>
		</view>
		<a-nodeData stringVal="暂无数据" v-if="!loading&&myFansList.length===0"></a-nodeData>
	</view>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	export default {
		name: "myFans",
		data() {
			return {
				myFansList:[],
				loading: true,
				hide:false,
				imgUrl:require("@/static/img/myFanIcon.png"),
				MonthCnt:'0',
				DataCount:'0'
			}
		},
		async onLoad(option) {
			await this.getList();
		},
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "MyFans"
					}, "UMemberOpera");
					this.MonthCnt = data.Data.MonthCnt;
					this.DataCount = data.Data.DataCount;
					this.myFansList = data.Data.FansList || [];
					this.loading = false;
				} catch (e) {
					this.$toast(e)
					this.loading = false;
				}
			},
			// 返回
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/home"
				});
			}
		}
	}
</script>

<style scoped lang="less">
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
	.leaderBox{
		height: calc(100vh - 90px);
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
			.flexIndex{
				width: 30px;
				line-height: 70px;
				font-weight: 600;
				text-align: center;
				margin-right: 15px;
			}
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
			}
		}
	}
// .fansBox{
// 	width: 78px;
// 	text-align: center;
// 	float: left;
// 	margin: 10px 5px 0 8px;
// 	image{
// 		width: 35px;
// 		height: 35px;
// 		border-radius: 50%;
// 	}
// 	span{
// 		display: block;
// 	}
// }
</style>
