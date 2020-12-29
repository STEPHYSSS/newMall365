<template>
	<div class="couponList">
		<uni-nav-bar :status-bar="true" @clickLeft="clickLeft" :shadow="false" :fixed="true" left-icon="back">
			<uni-search-bar cancelButton="none" :disabledMy="true" style="width:100%" placeholder="请输入搜索关键词" :radius="50"></uni-search-bar>
			<div slot="right">
				<div class="headRight"></div>
			</div>
		</uni-nav-bar>
		<!-- 	<van-sticky>
			<van-search shape="round" class="backgroundColor" placeholder="请输入搜索关键词" v-model="valueSearch" />
		</van-sticky> -->
		<!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height:100vh;"> -->
		<div class="goodBox1">
			<div class="goodBox-row">
				<div class="goodBox-col" v-for="item in couponList">
					<div class="goodBoxInfo" @click="goodBoxCoupon(item)">
						<a-up-img :url="item.ImgList.length>0?item.ImgList[0]:'' |setImgPrex" :height="setHeight" :width="setHeight"></a-up-img>
						<div class="oneBoxTitle">{{item.Name}}</div>
						<div class="oneBoxMoney">
							<span>¥</span>
							<span>{{item.SalePrice}}</span>
							<span>{{item.SaleCnt |setMoney}}件已售</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- </van-pull-refresh> -->
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";

	export default {
		data() {
			return {
				valueSearch: "",
				setHeight: "",
				couponList: [
					// {ImgList:['/img/norder.4ec0662e.png'] }
				],
				isLoading: false
			};
		},
		created() {
			this.setHeight = (uni.getSystemInfoSync().windowWidth - 26) / 2 + "px"
			this.getCouponList();
		},
		mounted() {},
		methods: {
			async onRefresh() {
				await this.getCouponList();
				this.isLoading = false;
			},
			async getCouponList() {
				try {
					let data = await vipCard({
						Action: "GetTicketList"
					}, "UTicketOpera");
					this.couponList = data.Data.TicketList;

					this.couponList.forEach(D => {
						D.ImgList = D.ImgList.split(",");
					});
				} catch (e) {}
			},
			goodBoxCoupon(val) {
				this.$Router.push({
					path: "/shoppingMall/couponPage/",
					query: {
						SID: val.SID
					}
				});
			},
			clickLeft() {
				this.$Router.pushTab({
					path: "/pages/shoppingMall/index"
				});
			},
		},
		filters: {}
	};
</script>

<style scoped lang="less">
	.couponList {
		.goodBox {
			margin: 10px;
			background: #ffffff;
			display: flex;
			padding: 10px;
			border-radius: 8px;

			.leftBox {
				min-width: 150px;
				margin-right: 10px;
			}

			.rightBox {
				position: relative;

				.rightBoxTitle {
					overflow: hidden;
					height: 40px;
				}

				.rightBoxBottom {
					position: absolute;
					bottom: 0;
					color: red;
				}
			}
		}

		.goodBox1 {
			padding: 10px;

			.goodBox-row {
				display: flex;
				flex-wrap: wrap;

				:nth-child(2n).goodBox-col {
					margin-left: 6px;
				}
			}

			.oneBoxTitle {
				color: #313131;
				font-size: 14px;
				height: 19px;
				overflow: hidden;
				margin: 8px;
			}

			.goodBoxInfo {
				margin-bottom: 10px;
				background: #ffffff;
			}

			.oneBoxMoney {
				margin: 8px;
				padding-bottom: 10px;

				span:nth-child(1),
				span:nth-child(2) {
					color: red;
				}

				span:nth-child(1) {
					font-size: 12px;
				}

				span:nth-child(3) {
					float: right;
					font-size: 10px;
					color: #999;
				}
			}
		}
	}
</style>
