<template>
	<div class="bottom-submit-style">
		<div class="bottom-submit-style__bar" style="display: flex;" :class="{ active: isActive }">
			<!-- v-model="result"  -->
			<checkbox-group @change="checkAll">
				<checkbox :color="mainColor" v-if="!isOrder" style="margin-left:10px" value="true" :checked="result">全选</checkbox>
			</checkbox-group>
			<div class="bottom-submit-style__text" :style="{'opacity':batchState?0: 1}">
				<span v-if="!isOrder" class="bottom-submit-style__fare">不含运费</span>
				<!-- isType 1代表自取价格  allMoney购物车价格-->
				<!-- 合计：
				<div class="bottom-submit-style__price" style="display: inline-block;">
					<span v-if="scoreTatal">{{scoreTatal|spliceNum}}积分</span>
					<span v-if="isType === 1">¥{{objPrice.total}}</span>
					<span v-else>{{allMoney>0&&scoreTatal?'+':''}}¥{{ allMoney }}</span>
				</div> -->
				<div v-if="isOrder"> 
					<p>
						<!-- <span class="priceSty" v-if="sumPrice!=0">优惠 ¥ {{sumPrice}}</span> -->
						<span class="sumPriceSty">合计</span><span class="bottom-submit-style__price">¥ {{objPrice.total}}</span>
					</p>
				</div>
				<div v-else style="display: inline-block;">
					合计：
					<div class="bottom-submit-style__price" style="display: inline-block;">
						<span v-if="scoreTatal">{{scoreTatal|spliceNum}}积分</span>
						<span>{{allMoney>0&&scoreTatal?'+':''}}¥{{ allMoney }}</span>
					</div> 
				</div>
			</div>
			
			<div style="margin-right: 6px;">
				<button v-if="!batchState" class="bottom-submit-style__button" type="yellow" round @click="submitMoney" :disabled="disabledIntegral">结算</button>
				<button v-if="batchState" size="small" type="red" @click="delButton">删除</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import modal from '@/components/modal/modal'
	export default {
		name: "index",
		props: {
			batchState: [Boolean],
			allMoney: [String, Number],
			// ziquSumMoney:[String, Number],
			scoreTatal: [String, Number],
			isType:[String, Number],
			isOrder: {
				type: Boolean,
				default: false
			},
			allResult: {
				type: Boolean,
				default: false
			},
			isIntegral: [String],
			cardInfo: [Object],
			objPrice:[Object],//优惠价格，电子券优惠价格 总价格
			// FloatList:[Array] //优惠明细
		},
		data() {
			return {
				result: this.allResult,
				disabledIntegral: false,
				mainColor: getApp().globalData.mainColor,
				money:0,
				couponDetailModalShow: false,//明细
				priceTips:'',
				isActive:false
			};
		},
		computed:{
			sumPrice(){
				this.money = Number(this.objPrice.DiscPrice)+Number(this.objPrice.TicketPrice);
				return this.money
			}
		},
		created() {			
			if (this.isIntegral && this.cardInfo) {
				// 积分不足
				this.disabledIntegral =
					Number(this.cardInfo.Score) < Number(this.scoreTatal) ? true : false;
			}
		},
		methods: {
			changeTips(){
				this.isActive = !this.isActive;
			},
			checkAll(val) {
				let bool = val.detail.value.length > 0 ? true : false
				this.$emit("checkAll", !bool);
			},
			submitMoney() {
				this.$emit("submitMoney");
			},
			delButton() {
				this.$emit("delButton");
			}
		},
		watch: {
			allResult(val) {
				this.result = val;
			},
			// objPrice(val){
			// 	console.log(val.DiscPrice,'监听金额')
			// 	this.money = Number(val.DiscPrice)+Number(val.TicketPrice)
			// }
		}
	};
</script>

<style scoped lang="less">
	.active{
		height:80px !important;
	}
	.priceSty{
		color: #635555;font-size: 13px;padding-right: 10px;display: inline-block;
	}
	.sumPriceSty{
		padding-right: 5px;display: inline-block;font-size: 15px;
	}
	.bottom-submit-style {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		background-color: #fff;
		user-select: none;

		&__bar {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: 50px;
			font-size: 14px;
		}

		&__fare {
			margin-right: 5px;
			font-size: 10px;
			color: #999 !important;
		}

		&__text {
			flex: 1;
			padding-right: 12px;
			color: #323233;
			font-weight: 500;
			text-align: right;
		}

		&__price {
			color: #f44;
			font-size: 18px;
		}

		&__button {
			padding: 0 36px;
			line-height: 38px;
		}
	}
</style>
