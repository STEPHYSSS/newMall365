<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<!-- <p v-if="skuDataInfo.StockType != '0'&& skuDataInfo.StoreQty <= '0'|| skuDataInfo.TotalSurplusQty<='0'" class="xiajia">商品已经售罄啦~要不要瞧瞧别的~</p>
		<p v-if="isStartIS!=true" class="xiajia">还未到开始时间~要不要瞧瞧别的~</p> -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-left">
				<view v-for="(item,index) in options" :key="index" class="flex uni-tab__cart-button-left uni-tab__shop-cart" @click="onClick(index,item)">
					<view class="uni-tab__icon">
						<uni-icons :type="item.icon" size="20" color="#646566"></uni-icons>
						<!-- <image class="image" :src="item.icon" mode="widthFix" /> -->
					</view>
					<text class="uni-tab__text">{{ item.text }}</text>
					<view class="flex uni-tab__dot-box">
						<text v-if="item.info" :class="{ 'uni-tab__dots': item.info > 9 }" class="uni-tab__dot ">{{ item.info }}</text>
					</view>
				</view>
			</view>
			
			<!-- 这一块是用来判断活动不能够购买的 isStartIS IsSeckillTime 到时候再传一个下架的状态来控制按钮不能点击-->
			<view :class="{'uni-tab__right':fill}" class="flex uni-tab__cart-sub-right " v-if="isStartIS==false || IsSeckillTime == false  || (skuDataInfo.StockType != '0'&& skuDataInfo.StoreQty <= '0'|| skuDataInfo.TotalSurplusQty<='0')">
				<view v-for="(item,index) in buttonGroup" :key="index" style="opacity: .3;" :style="{backgroundColor:item.backgroundColor,color:item.color,'border-radius':item.borderRadius}"
				 class="flex uni-tab__cart-button-right2">
					<text class="uni-tab__cart-button-right-text">{{ item.text }}</text>
				</view>
			</view>
			<view :class="{'uni-tab__right':fill}" class="flex uni-tab__cart-sub-right" v-else>
				<view v-for="(item,index) in buttonGroup" :key="index" :style="{backgroundColor:item.backgroundColor,color:item.color,'border-radius':item.borderRadius}"
				 class="flex uni-tab__cart-button-right" @click="buttonClick(index,item)">
					<text class="uni-tab__cart-button-right-text">{{ item.text }}</text>
					<view class="disabled-style" v-if="item.disabled"></view>
				</view>
			</view>
		</view>
		<p class="xiajia" v-show="hideTips">{{showTips}}</p>
		<!-- <p v-if="skuDataInfo.StockType != '0'&& skuDataInfo.StoreQty <= '0'||
		 skuDataInfo.TotalSurplusQty<='0'" class="xiajia">商品已经售罄啦~要不要瞧瞧别的~</p>
		<p v-if="isStartIS==false" class="xiajia">活动还未开始~请稍后再来~</p>
		<p v-if="IsSeckillTime == false" class="xiajia">不在活动时间范围内~</p> -->
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	/**
	 * GoodsNav 商品导航
	 * @description 商品加入购物车、立即购买等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=865
	 * @property {Array} options 组件参数
	 * @property {Array} buttonGroup 组件按钮组参数
	 * @property {Boolean} fill = [true | false] 组件按钮组参数
	 * @event {Function} click 左侧点击事件
	 * @event {Function} buttonClick 右侧按钮组点击事件
	 * @example <uni-goods-nav :fill="true"  options="" buttonGroup="buttonGroup"  @click="" @buttonClick="" />
	 */
	export default {
		name: 'UniGoodsNav',
		components: {
			uniIcons
		},
		data(){
			return{
				showTips:"",
				hideTips:false
			}
		},
		props: {
			options: {
				type: Array,
				default () {
					return [{
						icon: 'shop',
						text: '店铺'
					}, {
						icon: 'cart',
						text: '购物车'
					}]
				}
			},
			buttonGroup: {
				type: Array,
				default () {
					return [{
							text: '加入购物车',
							backgroundColor: '#ffa200',
							color: '#fff',
							borderRadius: 0
						},
						{
							text: '立即抢购',
							backgroundColor: '#ff0000',
							color: '#fff',
							borderRadius: 0
						}
					]
				}
			},
			skuDataInfo: {
				type: Object,
				default () {
					return {};
				}
			},
			isStartIS: {
				type: Boolean,
				default: false
			},
			IsSeckillTime: {
				type: Boolean,
				default: false
			},
			IsGoodBuyTime: {
				type: Boolean,
				default: false
			},
			fill: {
				type: Boolean,
				default: false
			},
			goods:{
				type: Object,
			}
		},
		created() {
			// if(this.isStartIS==false){
			// 	this.showTips = "活动还未开始~请稍后再来~"
			// 	this.hideTips = true;
			// }else 
			if(this.skuDataInfo.StockType != '0'&& this.skuDataInfo.StoreQty <= '0'|| this.skuDataInfo.TotalSurplusQty<='0'){
				this.showTips = "商品已经售罄啦~要不要瞧瞧别的~"
				this.hideTips = true;
			}else if(this.IsSeckillTime == false){
				this.showTips = "不在活动时间范围内~"
				this.hideTips = true;
			}else if(this.skuDataInfo.State !='1'){
				this.showTips = "此商品已下架~要不要瞧瞧别的~"
				this.hideTips = true;
			}
			
		},
		methods: {
			onClick(index, item) {
				this.$emit('click', {
					index,
					content: item,

				})
			},
			buttonClick(index, item) {
				if (uni.report) {
					uni.report(item.text, item.text)
				}
				this.$emit('buttonClick', {
					index,
					content: item
				})
			}
		}
	}
</script>

<style scoped>
	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
	}
	.xiajia{
		    position: absolute;
		    bottom: 50px;
		    background: #929394;
		    line-height: 34px;
		    width: 100%;
		    text-align: center;
		    color: #ffffff;
		    letter-spacing: 1px;
	}
	.uni-tab__cart-box {
		flex: 1;
		height: 40px;
		background-color: #fff;
		z-index: 900;
	}
	
	.uni-tab__cart-sub-left {
		padding: 0 5px;
	}

	.uni-tab__cart-sub-right {
		flex: 1;
		padding-right: 10px;
	}

	.disabled-style {
		position: absolute;
		width: 100%;
		height: 100%;
		/* background-color: rgba(255, 255, 255, .4); */
	}

	.uni-tab__right {
		margin: 5px 0;
		margin-right: 10px;
		border-radius: 100px;
		overflow: hidden;
		border: 1px solid #000;
	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* flex: 1;
 */
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0 10px;
	}

	.uni-tab__icon {
		width: 18px;
		height: 18px;
	}

	.image {
		width: 18px;
		height: 18px;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: 24rpx;
		color: #646566;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.uni-tab__cart-button-right2 {
		background-color:rgb(255, 200, 104);
		flex: 1;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.uni-tab__cart-button-right-text {
		font-size: 28rpx;
		color: #fff;
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: -2px;
		top: 2px;
		justify-content: center;
		align-items: center;
		/* width: 0;
 */
		/* height: 0;
 */
	}

	.uni-tab__dot {
		/* width: 30rpx;
 */
		/* height: 30rpx;
 */
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}

	.uni-tab__dots {
		padding: 0 4px;
		/* width: auto;
 */
		border-radius: 15px;
	}

	.uni-tab__color-y {
		background-color: #ffa200;
	}

	.uni-tab__color-r {
		background-color: #ff0000;
	}
</style>
