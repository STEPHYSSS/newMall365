<template>
	<div class="seckill">
		<div v-if="!loading">
			<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :title="title" :status-bar="true" :shadow="false"></uni-nav-bar>
			<!-- 秒杀列表 -->
			<div style="padding: 8px;" v-if="queryType==='1'|| seckillSID">
				<div v-for="(item,index) in list" :key="index" class="seckill-goodsBox">
					<a-good-box :itemData="item" :imgHeight="imgHeight" @goodBox="goodBox" :seckill="true"></a-good-box>
				</div>
			</div>
			<!-- 拼团列表 -->
			<div style="padding: 8px;" v-if="queryType==='5'">
				<div v-for="(item,index) in list" :key="index" class="seckill-goodsBox">
					<a-good-box :itemData="item" :imgHeight="imgHeight" @goodBox="goodBox" :isGroup="true"></a-good-box>
				</div>
			</div>
			<a-nodeData v-if="(list.length===0)"></a-nodeData>
		</div>
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";
	import {getQueryString2} from '@/util/publicFunction.js'
	import Cookies from '@/config/cookie-my/index.js';
	export default {
		name: "",
		components: {},
		data() {
			return {
				title:'',
				list: [],
				loading: true,
				seckillSID:'',
				queryType:this.$Route.query.Type,
			};
		},
		created() {
			let url = sessionStorage.getItem('searchUrl');
			if(url!=null&&url.indexOf('Flag')>-1){
				if(url!=null&&url.lastIndexOf("?")){
					let index = url.lastIndexOf("?");
			        url = url.slice(index);
			        this.seckillSID = getQueryString2("SID", url);
				}
			}
			if(this.$Route.query.Type === '1' || this.seckillSID){
				this.title = "秒杀活动"
			}else {
				this.title = "拼团活动 "
			}
		},
		mounted() {
			this.$store.commit("SET_HISTORY_URL", {path:'/pages/shoppingMall/seckill/index'})
			this.imgHeight = (uni.getSystemInfoSync().windowWidth - 22) / 2 + "px";
			
			if(this.queryType === "1" || this.seckillSID){
				this.getlist();
			}else {
				this.getGrouplist();
			}
			
		},
		methods: {
			// 活动类型（1秒杀，2爆款，3套餐，4买赠，5团购，6满赠,7进店送礼）
			async getlist() {
				uni.showLoading()
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
				try {
					let res = await Promise.all([
						vipCard({
							Action: "GetPromotionList",
							Type: 1,
							ShopSID:currentStore?currentStore.data.SID:'',
							SID:this.seckillSID?this.seckillSID:''
						}, "UPromotionOpera")
					]);
					this.list = res[0].Data.ProdList;
					uni.hideLoading();
					this.loading = false;
				} catch (e) {}
			},
			async getGrouplist() {
				uni.showLoading()
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'))
				try {
					let res = await Promise.all([
						vipCard({
							Action: "GetPromotionList",
							ShopSID:currentStore?currentStore.data.SID:'',
							Type: 5
						}, "UPromotionOpera")
					]);
					this.list = res[0].Data.ProdList;
					uni.hideLoading();
					this.loading = false;
				} catch (e) {}
			},
			goodBox(val) {
				if(this.$Route.query.Type === '1'){
					this.$Router.push({
						path: "/pages/shoppingMall/list/infoGood",
						query: {
							SID: val.SID,
							seckill: "true"
						}
					});
				}else {
					this.$Router.push({
						path: "/pages/shoppingMall/list/infoGood",
						query: {
							SID: val.SID,
							isGroup: "true"
						}
					});
				}
				
			},
			clickLeft() {
				this.$Router.push({
					path: "/pages/shoppingMall/index"
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.seckill {
		.seckill-goodsBox {
			display: inline-block;
		}

		.seckill-goodsBox:nth-child(2n + 1) {
			margin-right: 6px;
		}
	}
</style>
