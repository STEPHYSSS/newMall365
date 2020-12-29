<template>
	<view class="container" v-if="!loading">
		<uni-nav-bar :fixed="true" left-icon="back"  @clickLeft="clickGo" title="权益商品" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view v-if="BeneList.length>0">
			<view class="">
				<view class="d-flex boxList"
					v-for="(item, index) in BeneList" :key="index"  @click="pay(item.PlanNo)">
					<image :src="imgUrl" style="width: 200rpx; height: 160rpx; margin-right: 20rpx;"></image>
					<view class="d-flex flex-fill flex-column justify-content-between" style="height: 160rpx;">
						<view class="font-size-lg">{{ item.PlanName }}</view>
						<view class="d-flex justify-content-between align-items-center">
							<view class="font-size-sm">￥{{ item.Price }}</view>
							<button type="primary" size="mini" plain class="pay-btn">去购买</button>
						</view>
					</view>
				</view>
			</view>
			<view class="d-flex align-items-center just-content-center"
				style="height: 150rpx;" @click="toBuyRecords">
				<!-- pages/packages/buyRecords -->
				<text>购买记录</text>
			</view>
		</view>
		<a-nodeData stringVal="暂无数据" v-if="!loading&&BeneList.length===0"></a-nodeData>
	</view>
	<!--  -->
</template>

<script>
	// import loading from '@/components/loading'
	import { vipCard } from "@/api/http.js";
	export default {
		data() {
			return {
				imgUrl:require("@/static/img/quanyi.jpg"),
				loading: true,
				packages: {},
				BeneList:[],//列表
			}
		},
		async onLoad() {
			await this.getPackages()
		},
		async onPullDownRefresh() {
			await this.getPackages()
		},
		methods: {			
			async getPackages() {
				this.loading = true
				this.packages = await vipCard({Action:'GetBeneList'}, "UBeneOpera");
				// console.log(this.packages.Data.BeneList)
				this.BeneList = this.packages.Data.BeneList||[];
				this.loading = false
			},
			pay(id) {
				uni.navigateTo({
					url: '/pages/packages/detail?id=' + id
				})
				sessionStorage.setItem('buyPackage',id)
				// this.$router.push({path:'/pages/packages/detail',query:{id:id}})
			},
			toBuyRecords(){//购买记录
				this.$router.push({path:'/pages/packages/buyRecords'})
			},
			clickGo(){
				this.$Router.pushTab({
					path: "/pages/home"
				});
			}
		}
	}
</script>

<style scoped lang="less">
	@import '@/assets/css/packages.css';
	.container {
		padding-bottom: -150rpx;
	}
	.boxList{
		padding: 15px;
		height: 80px;
		border-radius: 4px;
		background-color: rgb(222, 213, 213);
		width: 84%;
		margin: 17px auto;
	}
	.pay-btn {
		margin: 0 !important;
		height: 50rpx;
		width: 120rpx;
		font-size: 14px;
		border-radius: 50rpx;
		padding: 0;
		line-height: 50rpx;
		text-align: center;
		
	}
	.d-flex{
		/deep/uni-button[type=primary][plain]{
			color: #ADB838;
			border: 1px solid #ADB838;
		}
	}
</style>
