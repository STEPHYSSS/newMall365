<template>
	<view class="makeUpGroup">
		<view>
			<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="拼团活动" :status-bar="true" :shadow="false"></uni-nav-bar>
			<!-- <a-info-buyPageGroup ref="buyPageGroup"></a-info-buyPageGroup> -->
		</view>
	</view>
</template>

<script>
	import { vipCard } from '@/api/http.js';
	import Mixins from '@/pages/shoppingMall/mixins.js'
	import {GetBaseImgUrl,GetCrsInfo,GetCsrStart} from "@/util/publicFunction";
	import Cookie from '@/config/cookie-my/index.js';
	export default {
		mixins: [Mixins],
		data() {
			return {
				goodList: {},
				skuDataInfo: {},
				SID:'',//,
				//title:this.$Route.query.title
				title:'',
				kefuUrl:GetCrsInfo(),
				start:GetCsrStart()
			}
		},
		created() {
		},
		methods: {
			async getGrouplist() {
				try {
					let res = await Promise.all([
						vipCard({
							Action: "GetPromotionList",
							Type: 5
						}, "UPromotionOpera")
					]);
					console.log(res)
				} catch (e) {}
			},
			clickLeft(){
				this.$Router.push({
					path: "/pages/shoppingMall/index"
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.makeUpGroup {
		.Mkpadd{
			padding: 8px;
		}
		.seckill-goodsBox {
			display: inline-block;
		}

		.seckill-goodsBox:nth-child(2n + 1) {
			margin-right: 6px;
		}
	}
</style>
