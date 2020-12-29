<template>
	<div class="bottom-submit-style">
		<div class="bottom-submit-style__bar">
			<!-- v-model="result"  -->
			<checkbox-group @change="checkAll">
				<checkbox :color="mainColor" v-if="!isOrder" style="margin-left:10px" value="true" :checked="result">全选</checkbox>
			</checkbox-group>
			<div class="bottom-submit-style__text" :style="{'opacity':batchState?0: 1}">
				<span v-if="!isOrder" class="bottom-submit-style__fare">不含运费</span>
				<!--                <span v-if="isOrder" class="bottom-submit-style__fare">共2件</span>-->
				合计：
				<div class="bottom-submit-style__price" style="display: inline-block;">
					<span v-if="scoreTatal">{{scoreTatal|spliceNum}}积分</span>
					<span v-if="isType === 1">¥{{ziquSumMoney}}</span>
					<span v-else>{{allMoney>0&&scoreTatal?'+':''}}¥{{ allMoney }}</span>
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
	export default {
		name: "index",
		props: {
			batchState: [Boolean],
			allMoney: [String, Number],
			ziquSumMoney:[String, Number],
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
			cardInfo: [Object]
		},
		data() {
			return {
				result: this.allResult,
				disabledIntegral: false,
				mainColor: getApp().globalData.mainColor
			};
		},
		computed:{
		},
		created() {
			if (this.isIntegral && this.cardInfo) {
				// 积分不足
				this.disabledIntegral =
					Number(this.cardInfo.Score) < Number(this.scoreTatal) ? true : false;
			}
		},
		methods: {
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
			}
		}
	};
</script>

<style scoped lang="less">
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
