<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="会员权益" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="interests">
			<view class="boxList" v-if="list.length>0">
				<view class="topBgc">
					<image src="@/static/img/quanyiTop.png"></image>
				</view>
				<view class="d-flex justify-content-between align-items-center">
					<h3>我的权益卡</h3>
					<view class="font-size-sm">全部</view>
				</view>
				<view v-for="(item,index) in list" :key="index" class="van-cell">
					<view class="flexBox">
						<view class="leftB"></view>
						<view class="flexTitle">
							<view class="">
								<text class="BeneTitle">{{item.BeneName}}</text>
								<text class="BeneBorder">{{item.CardNo}}</text>
							</view>
							<text class="validTime">有效期：{{item.UseTime | setTime}}~{{item.ValidTime | setTime}}</text><br/>
							<text class="validTime">订单号：{{item.ExchNo}}</text>
						</view>
						<view class="flexBtn" @click="toDetail(item)">详情<text class="iconfont icon-jiantou"></text></view>
					</view>
				</view>
			</view>
			<a-nodeData stringVal="暂无数据" v-if="!loading&&list.length===0"></a-nodeData>
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
				couponDetailModalShow: false,
				coupon:{},
				list:[]
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
			clickGo(){
				this.$Router.pushTab({
					path: "/pages/home"
				});
			},
			// 获取我的权益信息
			async getInfo(){
				this.loading = true;
				uni.showLoading({
					title: '加载中'
				})
				try {
					let { Data } =  await vipCard({Action:'GetCardBene'}, "UBeneOpera");
					this.list = Data.BeneList||[];
					if(Data.BeneList.length===0){//如果长度为0，则跳转到购买权益页面
						uni.navigateTo({ url: '/pages/packages/index'})
					}
					uni.hideLoading()
					this.loading = false;
				} catch (e) {
					this.$toast(e)
					this.loading = false;
				}
			},
			toDetail(val){
				// uni.navigateTo({
				// 	url: '/pages/vip/interests/detail?id=' + val.SID
				// })				
				this.$router.push({path:'/pages/vip/interests/detail',query:{SID:val.SID,BeneNo:val.BeneNo}})
				sessionStorage.setItem('detailPackage',val.SID)
				sessionStorage.setItem('detailBeneNo',val.BeneNo)
			},
		}
	}
</script>

<style lang="less">
	@import '@/assets/css/packages.css';
	.interests{
		background-color: #f3f9ff;
		.boxList{
			.topBgc{
				width: 100%;
				height: 144px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.d-flex{
				width: 87%;
				margin: 15px auto;
				padding: 10px 0;
				h3{
					font-size: 16px;
					// font-weight: normal;
					font-stretch: normal;
					line-height: 19px;
					letter-spacing: 1px;
					color: #333333;
				}
				.font-size-sm{
					font-size: 14px;
					font-weight: normal;
					font-stretch: normal;
					line-height: 19px;
					letter-spacing: 0px;
					color: #333333;
				}
			}
		}
			.van-cell{
				width: 87%;
				margin: 10px auto;
				box-sizing: border-box;
				height: 100px;
				background-color: #ffffff;
				border-radius: 6px;
				position: relative;
				&::before {
					content: " ";
					position: absolute;
					background-color: #f3f9ff;
					width: 25px;
					height: 25px;
					border-radius: 100%;
					bottom: -10px;
					right: 76px;
				}
				&::after {
					content: " ";
					position: absolute;
					background-color: #f3f9ff;
					width: 25px;
					height: 25px;
					border-radius: 100%;
					top: -10px;
					right: 76px;
				}
				.flexBox{
					display: flex;
					.leftB{
						position: absolute;
						width: 6px;
						height: 50px;
						background-color: #7ee0fa;
						bottom: 70rpx;
						left: 0rpx;
						top: 25px;
						border-radius: 0 25px 25px 0px;
					}
					.flexTitle{
						flex: 1;
						padding-left: 5%;
						.BeneTitle{
							font-size: 15px;
							font-weight: normal;
							font-stretch: normal;
							line-height: 19px;
							letter-spacing: 0px;
							color: #333333;
							margin: 15px 20px 15px 0;
							display: inline-block;
						}
						.BeneBorder{
							border-radius: 5px;
							border: solid 1px #71cbee;
							padding: 0 10px;
							line-height: 19px;
							letter-spacing: 0px;
							color: #333333;
						}
						.validTime{
							margin-bottom: 3px;
							font-size: 13px;
							font-weight: normal;
							font-stretch: normal;
							line-height: 19px;
							letter-spacing: 0px;
							color: #999999;
						}
					}
					.flexBtn{
						width: 80px;
						text-align: center;
						font-size: 17px;
						font-weight: normal;
						font-stretch: normal;
						line-height: 101px;
						letter-spacing: 0px;
						color: #71cbee;
						.jiantou{
							width: 6px;
							height: 12px;
							background-color: #71cbee;
						}
					}
				}
			}
	}

</style>
