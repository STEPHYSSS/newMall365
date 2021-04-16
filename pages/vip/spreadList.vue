<template>
	<div class="spreadList">
		<!-- <uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="我的分享" :status-bar="true" :shadow="false"></uni-nav-bar> -->		
			<!-- 推广图片， 推广链接 商品名称 -->
		<view class="myFanIcon">
			<image :src="imgUrl" style="width: 20px;height: 20px;"></image>
			<text>我的分享</text>
		</view>
		<view v-if="spreadArr.length>0">
			<view class="d-flex boxList" v-for="(item, index) in spreadArr" :key="index" @click="toGoodsInfo(item.ProdSID)">
				<image :src="item.Img|setImgPrex"></image>
				<view class="d-flex flex-fill flex-column justify-content-between" style="height: 160rpx;">
					<view class="font-size-lg">{{ item.Name }}</view>
					<view class="font-size-sm fontColor">时间：{{ item.AddTime}}</view>
					<view class="d-flex justify-content-between align-items-center">
						<view class="font-size-sm fontColor2">￥{{ item.SalePrice }}</view>
						<view class="font-size-sm fontColor2">详情 ></view>
					</view>
				</view>
			</view>
		</view>
		<a-nodeData stringVal="暂无数据" v-if="!loading&&spreadArr.length==0"></a-nodeData>
	</div>
</template>

<script>
	import {vipCard} from '@/api/http.js'
	import adCell from '@/node_modules/adcell/ADCell2.vue';
	export default {
		name: "spreadList",
		components: {
			adCell
		},
		data() {
			return {
				loading: true,
				spreadArr:[],				
				imgUrl:require("@/static/img/shareIcon.png"),
			}
		},
		async onLoad(option) {
			await this.getList();
		},
		// filters: {
		// 	imgFilter(val) {
		// 		let localUrl = window.location.href;
		// 		let localToken = localUrl.split("#")[0]
		// 		return `http://dingtalk.bak365.cn/WeixinNew/Dist/../` + val
		// 	}
		// },
		methods: {
			// 列表信息
			async getList() {
				this.loading = true;
				try {
					let data = await vipCard({
						Action: "GetSpreadList"
					}, "UMemberOpera");
					this.spreadArr =data.Data.List;
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
			toGoodsInfo(item){
				this.$Router.push({path:"/pages/shoppingMall/list/infoGood",query:{
					SID:item
				}})
			}
		}
	}
</script>
<style scoped lang="less">
	@import '@/assets/css/packages.css';
	.spreadList{
		height: 100vh;
		background-color: #fff;
	}
	.myFanIcon{
		height: 55px;
		display: flex;
		border-bottom: 1px solid #f9f9f9;
		image{
			display: inline-block;
			margin: 17px 10px 15px 10px;
		}
		text{
			display:inline-block;
			font-size: 16px;
			letter-spacing: 1px;
			margin: 16px 0;
		}
	}
	.boxList{
		box-sizing: border-box;
		border-bottom: 1px solid #eeeeee;
		background-color: #ffffff;
		width: 94%;
		margin: 17px auto;
		padding-bottom: 13px;
		.fontColor{
			color: #ccc;
		}
		.fontColor2{
			font-size: 16px ;
			color: #F95E51;
		}
		image{
			border-radius: 5px;
			width: 160rpx; height: 160rpx; margin-right: 20rpx;
		}
	}
</style>
