<template>
	<div class="boxMargin">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :status-bar="true" title="商品详情":shadow="false"></uni-nav-bar>
		<!-- <a-info-buyPage :goods="goodList" :skuDataInfo="skuDataInfo" v-if="this.goodList.Name" :isIntegral="isIntegral"
		 :seckill="seckill" :isBrowse="isBrowse"></a-info-buyPage> -->
		<a-info-buyPageSeckill :goods="goodList" :skuDataInfo="skuDataInfo" v-if="seckill&&this.goodList.Name" :seckill="seckill" ></a-info-buyPageSeckill>
		<a-info-buyPage ref="aInfoBuyPage" :goods="goodList" :skuDataInfo="skuDataInfo" v-if="this.goodList.Name&&!seckill" ></a-info-buyPage>
	</div>
</template>
<!-- <script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script> -->
<script>
	import {
		vipCard
	} from "@/api/http.js";
	import Mixins from '@/pages/shoppingMall/mixins.js'
	export default {
		name: "goodsPage",
		mixins: [Mixins],
		components: {},
		data() {
			return {
				goodList: {},
				skuDataInfo: {},
				SID:'',//,
				//title:this.$Route.query.title
				title:''
			};
		},
		onLoad(option) {
			
		},
		created() {	
			// await this.getWxConfig();
			this.getInfo();
			this.isIntegral = this.$Route.query.isIntegral || "";//积分商城
			this.seckill = this.$Route.query.seckill || "";//秒杀
			this.isBrowse = this.$Route.query.isBrowse || "";
			// this.makeUpGroup = this.$Route.query.makeUpGroup || "";//拼团
			this.$store.commit("SET_HISTORY_URL", {
				path: '/pages/shoppingMall/list/infoGood',
				query: {
					SID: this.$Route.query.SID
				}
			})
			console.log(this.$Route.query.SID,'sid')
		},
		methods: {
			async getInfo() {
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				try {
					let Opera =
						this.$Route.query.isIntegral == "true" ?
						"UIntegralOpera" :
						this.$Route.query.seckill ?
						"UPromotionOpera" :
						"UProdOpera";
					let action = this.$Route.query.seckill ? "GetPromotion" : "GetProdInfo";
					let {
						Data
					} = await vipCard({
							Action: action,
							SID: this.$Route.query.SID,
							ShopSID:currentStore?currentStore.data.SID:''
						},
						Opera
					);
					if (this.$Route.query.seckill) {
						this.title = Data.ProdInfo.Name;
						// if (Data.ProdInfo.SpecType === "1") {
						// 	// 单规格商品
						// 	Data.ProdInfo.SalePrice = Data.SpecList[0].SalePrice;
						// } else {
						// 	setSalePrice('SalePrice', Data)
						// 	setSalePrice('OldPrice', Data)
						// }
						
						// let ProdInfo = Object.assign(Data.ProdInfo, Data.ProdInfo);
						// this.goodList = ProdInfo || {};
						// Data.SpecList.forEach(D => {
						// 	//可购买的规格的数量，剩余库存
						// 	D.StoreQty = D.SurplusQty;
						// });
						// Data.SpecList = Data.SpecList;
						this.goodList = Data.ProdInfo || {};
						this.skuDataInfo = Data || {};
					} else {
						this.goodList = Data.ProdInfo || {};
						this.title = Data.ProdInfo.Name;
						this.skuDataInfo = Data || {};
					}
				} catch (e) {
					if(e == '该商品不在此门店,请切换其他门店'){
						// window.history.back(-1)
						setTimeout(() => {
							this.$Router.push({
								path:"/pages/shoppingMall/index"})
						}, 2000);
					}
				}
			},
			clickLeft() {
				if (this.$Route.query.isCard) {
					this.$Router.pushTab('/pages/shoppingMall/shoppingCart/index')
				} else if (this.$Route.query.isGoodList) {
					this.$Router.push('/pages/shoppingMall/list/goodsList')
				} else if (this.$Route.query.isIntegral) {
					this.$Router.push('/pages/integralMall/index')
				} else if (this.seckill) {
					this.$Router.push('/pages/shoppingMall/seckill/index')
				} else if (this.$Route.query.admin) {
					//从首页点击进来
					this.$Router.push('/pages/shoppingMall/index')
				}
				// else if(this.$Route.query.makeUpGroup){
				// 	this.$Router.push('/pages/shoppingMall/makeUpGroup/index')
				// }
				else {
					this.$Router.back(1)
				}
			}
		}
	};

	function setSalePrice(params, Data) {
		let objReduce = Data.SpecList.reduce((num1, num2) => {
			let a = Number(num1[params]);
			let b = Number(num2[params]);
			let obj = {
				max: a > b ? a : b,
				min: a < b ? a : b
			};
			return obj;
		});
		//活动价格的 最大值到最小值
		Data.ProdInfo[params] = objReduce.min ?
			objReduce.min :
			Data.SpecList[0][params];
		Data.ProdInfo[params + 'MaxPrice'] = (objReduce.min === objReduce.max ? 0 : objReduce.max) || 0;
	}
</script>

<style scoped>
	.boxMargin{
		padding-bottom: 45px;
	}
</style>
