<template>
	<div class="intergral-list">
		<div v-if="!loading">
			<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="积分商城" :status-bar="true" :shadow="false"></uni-nav-bar>
			<div class="leftNavsidebar" v-if="sidebarList.length>0">
				<view :class="['homepageLeftFixed']">
					<view v-for="(item,index) in sidebarList" :key="index" :class="['homepageLeft',index===currentIndex?'activeCanteen':'']"
					 @click="sidebarChange(index)">
						{{item.Name}}
					</view>
				</view>
			</div>
			<div :class="['goodBox1',sidebarList.length>0?'goodBox1Width':'']" v-if="list.length>0">
				<div gutter="5" style="display: flex;">
					<div span="12" class="goodBox-col" style="flex:1" v-for="(item,index) in list" :key="index">
						<a-good-box :itemData="item" :imgHeight="imgHeight" @goodBox="goodBox" :isIntegral="true"></a-good-box>
					</div>
				</div>
			</div>
			<a-nodeData v-if="(sidebarList.length===0||list.length===0)"></a-nodeData>

			<!-- <SkuShow :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo"></SkuShow> -->
		</div>
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";
	export default {
		name: "",
		components: {},
		data() {
			return {
				loading: true,
				sidebarList: [],
				activeKey: "",
				list: [],
				show: false,
				skuDataInfo: {},
				currentIndex: 0
			};
		},
		async mounted() {
			this.imgHeight = (uni.getSystemInfoSync().windowWidth - 21 - 85) / 2 + "px";
			await this.getCouponList();
			await this.getlist();
		},
		methods: {
			async getCouponList() {
				try {
					let {
						Data
					} = await vipCard({
							Action: "GetCateList"
						},
						"UIntegralOpera"
					);
					this.sidebarList = Data.ProdCateList;
				} catch (e) {
					console.log(e);
				}
			},
			async getlist(val) {
				uni.showLoading()
				try {
					let params = val ? val : this.sidebarList[0].SID;
					let {
						Data
					} = await vipCard({
							Action: "GetProdInfoList",
							CateSID: params
						},
						"UIntegralOpera"
					);
					this.list = Data.Prod_InfoList;
					this.loading = false;
				} catch (e) {
				}
			},
			sidebarChange(index) {
				this.currentIndex = index
				this.getlist(this.sidebarList[index].SID);
			},
			goodBox(val) {
				this.$Router.push({
					path: "/pages/shoppingMall/list/infoGood",
					query: {
						SID: val.SID,
						isIntegral: "true"
					}
				});
			},
			hideShow() {
				this.show = false;
			},
			async addCart(item) {},
			clickLeft() {
				this.$Router.pushTab('/pages/shoppingMall/index')
			}
		}
	};
</script>

<style lang="less" scoped>
	.intergral-list {
		background: #fff;
		height: 100vh;
	}

	.goodBox1Width {
		margin-left: 85px;
	}

	.goodBox1 {
		padding: 8px;
		box-sizing: border-box;
		background: #fff;

		:nth-child(2n).goodBox-col {
			margin-left: 6px;
		}
	}

	.leftNavsidebar {
		position: fixed;
		overflow-y: scroll;
		background: #f8f8f8;
		height: 100vh;
		left: 0;
		width: 85px;


		.homepageLeftFixed {
			font-size: 11pt;
			margin-bottom: 96px;
			color: #707070;
			font-weight: 500;
			background: #f9f9f9;
			padding-bottom: 15px;
		}

		.homepageLeft {
			color: #000;
			text-align: center;
			line-height: 1.4;
			position: relative;
			font-size: 28rpx;
			padding: 20px 12px 20px 8px;
		}

		.homepageLeft-info {
			position: absolute;
			top: 5px;
			right: 10px;
			width: 10px;
			height: 10px;
			font-size: 12px;
			font-weight: 500;
			line-height: 14px;
			color: #fff;
			text-align: center;
			white-space: nowrap;
			border: 1px solid #fff;
			border-radius: 16px;
			transform: translateX(50%);
			box-sizing: border-box;
			transform-origin: 100%;
		}

		.activeCanteen {
			background: #FFFFFF !important;
		}
	}
</style>
