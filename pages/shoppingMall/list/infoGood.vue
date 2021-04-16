<template>
	<div class="boxMargin">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :status-bar="true" title="商品详情" :shadow="false"></uni-nav-bar>
		<!-- <a-info-buyPage :goods="goodList" :skuDataInfo="skuDataInfo" v-if="this.goodList.Name" :isIntegral="isIntegral"
		 :seckill="seckill" :isBrowse="isBrowse"></a-info-buyPage> -->
		<!-- 秒杀 -->
		<a-info-buyPageSeckill :goods="goodList" :skuDataInfo="skuDataInfo" v-if="seckill&&this.goodList.Name" :seckill="seckill"></a-info-buyPageSeckill>
		<!-- 拼团 -->
		<a-info-buyPageGroup :goods="goodList" :skuDataInfo="skuDataInfo" :isGroup="makeUpGroup" v-if="makeUpGroup&&this.goodList.Name"></a-info-buyPageGroup>
		<!-- 普通商品 -->
		<a-info-buyPage ref="aInfoBuyPage" :goods="goodList" :skuDataInfo="skuDataInfo" :LeaderSID="LeaderSID" v-if="this.goodList.Name&&!seckill&&!makeUpGroup"></a-info-buyPage>
		<!-- 客服 -->
		<dragball :kefuUrl="kefuUrl" v-if="start === '1'" :x="widthX" :y="heightY"></dragball>
		<!-- <view class="content">
			<view :style="{'transform':'translate3d('+xMove+'px,'+yMove+'px,0)'}" class="touch" @touchstart="handleStart"
			 @touchmove="handleMove" @touchend="handleEnd">
				<div class="cgwl-form" id="cgwl-kefu" style="background:none" v-if="start === '1'">
					<p style="width: 60px;height:60px;">
						<a :href="kefuUrl">
							<image src="@/static/img/kefu.png" style="width: 100%;height: 100%;"></image>
						</a>
					</p>
				</div>
			</view>
		</view> -->
	</div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script>
	import {
		vipCard
	} from "@/api/http.js";
	import Mixins from '@/pages/shoppingMall/mixins.js'
	import {
		GetBaseImgUrl,
		GetCrsInfo,
		GetCsrStart
	} from "@/util/publicFunction";
	import dragball from "@/components/drag-ball/drag-ball.vue";
	import Cookie from '@/config/cookie-my/index.js';
	export default {
		name: "goodsPage",
		mixins: [Mixins],
		components: {
			dragball
		},
		data() {
			return {
				goodList: {},
				skuDataInfo: {},
				SID: '', //,
				//title:this.$Route.query.title
				title: '',
				kefuUrl: GetCrsInfo(),
				start: GetCsrStart(),
				widthX:document.body.clientWidth-80,
				heightY:document.body.clientHeight-200,
				LeaderSID:''
			};
		},
		onLoad(option) {

		},
		created() {
			this.isIntegral = this.$Route.query.isIntegral || ""; //积分商城
			this.seckill = this.$Route.query.seckill || ""; //秒杀
			this.isBrowse = this.$Route.query.isBrowse || "";
			this.makeUpGroup = this.$Route.query.isGroup || ""; //拼团
			if(this.$route.query.query){
				// console.log(this.$route.query.query)
				let getDecode = decodeURIComponent(this.$route.query.query);
				// console.log(getDecode)
				let getDQuery = JSON.parse(getDecode)
				this.LeaderSID = getDQuery.LearderSID;	
			}
			this.getInfo();
			this.$store.commit("SET_HISTORY_URL", {
				path: '/pages/shoppingMall/list/infoGood',
				query: {
					SID: this.$Route.query.SID
				}
			})
			// this.wxRegister();
		},
		mounted() {
			// this.kefuUrl = `http://cs365.bak365.net/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=${this.BusinessID}&groupid=${this.GroupID}&special=${this.SpecialID}`;
		},
		methods: {
			async getInfo() {
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				try {
					let Opera = this.$Route.query.isIntegral === "true" ? 'UIntegralOpera' : this.$Route.query.seckill ?
						'UPromotionOpera' : this.$Route.query.isGroup ? 'UPromotionOpera' : 'UProdOpera'
					let action = this.$Route.query.seckill ? "GetPromotion" : this.$Route.query.isGroup ? "GetPromotion" :
						"GetProdInfo";
					let {
						Data
					} = await vipCard({
						Action: action,
						SID: this.$Route.query.SID,
						LeaderSID:this.LeaderSID ?this.LeaderSID :'',
						ShopSID: currentStore ? currentStore.data.SID : ''
					}, Opera);
					if (this.$Route.query.seckill || this.$Route.query.isGroup) {						
						this.title = Data.ProdInfo.Name;
						this.goodList = Data.ProdInfo || {};
						this.skuDataInfo = Data || {};
						if(this.goodList.PromType){
							sessionStorage.setItem('PromType', this.goodList.PromType)
						}
					} else {
						this.goodList = Data.ProdInfo || {};
						this.title = Data.ProdInfo.Name;
						this.skuDataInfo = Data || {};
					}
				} catch (e) {
					if (e == '该商品不在此门店,请切换其他门店') {
						// window.history.back(-1)
						uni.showToast({
							title: e,
							icon: 'none'
						});
						setTimeout(() => {
							this.$Router.push({
								path: "/pages/shoppingMall/index"
							})
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
				} else if (this.$Route.query.admin) {
					//从首页点击进来
					this.$Router.push('/pages/shoppingMall/index')
				} else if (this.$Route.query.seckillHome && this.seckill || this.$Route.query.seckillHome && this.makeUpGroup) {
					this.$Router.push('/pages/shoppingMall/index')
				} else if (this.seckill) {
					this.$Router.push({
						path: '/pages/shoppingMall/seckill/index',
						query: {
							Type: '1'
						}
					})
				} else if (this.$Route.query.isGroup) {
					this.$Router.push({
						path: '/pages/shoppingMall/seckill/index',
						query: {
							Type: '5'
						}
					})
				} else {
					// this.$Router.back(1)
					this.$router.go(-2)
				}
			},
			
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
	@import '@/assets/css/cgwl_online.css';

	.boxMargin {
		padding-bottom: 45px;
	}
</style>
