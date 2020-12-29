<template>
	<!--    竖着-->
	<div :class="['goodBoxTwo',mainStyle]" @click.stop="goodBoxCoupon(itemData)" :style="{width:imgHeight}">
		<div class="vanImage-style">
			<a-up-img :key="itemData.Img" :url="itemData.Img|setImgPrex" :height="imgHeight" width="100%"></a-up-img>
			<image src="@/static/img/shouqin.png" style="width: 100%;height: 100%;position: absolute;top: 0;" v-if="itemData.StockType != '0'&& itemData.StoreQty <= '0'"></image>
			<div class="timer-style" style v-if="seckill">
				<span class="timer-left">{{startIS?'距结束':'距开始'}}</span>
				<span class="timer-right">
					<uni-countdown color="#FFFFFF" splitor-color="#fff" background-color="transparent" :day="activeTimeMy.day" :hour="activeTimeMy.hours"
					 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
				</span>
			</div>
		</div>
		<!-- <div class="oneBoxTitle">{{seckill?itemData.PromName:itemData.Name}}</div> -->
		<div class="oneBoxTitle">{{seckill?itemData.Name:itemData.Name}}</div>
		<div v-if="startIS" class="progress-style">
			<!-- 进度条展示 -->
			<progress :percent="setProgress()" activeColor="#fe5252" active stroke-width="5" />
		</div>
		<div class="oneBoxTitleSell" v-if="seckill&&startIS">已抢{{Number(itemData.StoreQty)-Number(itemData.SurplusQty)}}件</div>
		<div v-if="seckill&&!startIS" class="oneBoxTitleSell">总共{{itemData.StoreQty|setMoney}}件</div>
		<div class="oneBoxMoney">
			<span v-if="isIntegral">{{itemData.Score}}积分</span>
			<span v-if="itemData.SalePrice>0&&isIntegral">+</span>
			<div style="display: inline-block;" v-if="itemData.MemberPrice>0">				
				<span>¥</span>
				<span>{{itemData.MemberPrice}}</span>
				<div style="text-decoration:line-through;color: #969799;font-size:8pt">
				<span>¥</span>{{itemData.SalePrice}}</div>
			</div>
			<div style="display: inline-block;" v-else>
				<span>¥</span>
				<span>{{itemData.SalePrice}}</span>
			</div>
			<span @click.stop="addCart">
				<uni-icons v-if="!isIntegral&&!seckill" style="color:#fe5252" type="plus" class="addIcon"></uni-icons>
			</span>
			<div class="addIconBtn" v-if="seckill">
				<button style="background: #fe5252;bottom: 0;color: #fff;" size="mini">{{btnTitle}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Mixin
	} from "../a-good-lineBox/public.js";

	export default {
		mixins: [Mixin],
		data() {
			return {
				mainColor: getApp().globalData.mainColor,
				mainStyle: getApp().globalData.mainStyle,
				stepperValue: "",
				timeCountDown: "",
				btnTitle: "马上抢",
				activeTimeMy: {},
				startIS:false
			};
		},
		props: {},
		created() {
			if (this.itemData.StartDate && this.seckill) {
				this.getTimeout()
			}
		},
		methods: {
			addCart() {
				// 加入购物车
				this.$emit("addCart");
			},
			finishTimer() {
				setTimeout(() => {
					this.getTimeout()
				}, 1000)
			},
			getTimeout(current) {
				let currentT = new Date().getTime()
				let End = new Date(this.itemData.EndDate.replace(/-/g, '/')).getTime()
				let Start = new Date(this.itemData.StartDate.replace(/-/g, '/')).getTime()
				// let Start = new Date('2020-05-18 13:34:00').getTime()
				// let End = new Date('2020-05-18 13:34:50').getTime()
				// false 活动未开始 true 活动开始了 end为活动结束
				this.startIS = Start - currentT >= 0 ? false : End - currentT > 0 ? true : 'end'
				let activeTimeMy = this.startIS ? End - currentT : Start - currentT
				let myTime = activeTimeMy
				this.activeTimeMy = {
					day: parseInt(myTime / (1000 * 60 * 60 * 24)),
					hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
					minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
					second: parseInt((myTime % (1000 * 60)) / 1000)
				}

				if (!this.startIS) {
					//表示活动已经结束
					this.btnTitle = " 活动未开始";
				} else if (this.startIS === 'end') {
					this.btnTitle = "活动结束";
				} else {
					this.btnTitle = " 立即抢购";
				}
			},
			setProgress() {
				let val = (1 - Number(this.itemData.SurplusQty) / Number(this.itemData.StoreQty)) * 100
				val = Math.round(val * 100) / 100;
				return val >= 100 ? 100 : val;
			}
		}
	};
</script>

<style scoped lang="less">
	.goodBoxTwo {
		display: inline-block;
		margin-bottom: 10px;
		border-radius: 12px;
		background: #ffffff;
		overflow: hidden;
		/*box-shadow: 1px 1px 1px #eee;*/
		box-shadow: 1px 1px 3px #eee;

		.progress-style {
			padding: 0 8px;

			/deep/.uni-progress-bar,
			/deep/.uni-progress-inner-bar {
				border-radius: 20px;
			}
		}

		.addIconBtn {
			float: right;

			.van-button--mini {
				padding: 0 5px;
			}
		}

		.vanImage-style {
			position: relative;
		}

		.timer-style {
			position: absolute;
			height: 62rpx;
			line-height: 62rpx;
			width: 100%;
			background: #fe5252;
			bottom: 0;
			color: #fff;
			font-size: 12px;

			.van-count-down {
				font-size: 12px;
				color: #fff;
				line-height: 30px;
			}

			.timer-right {
				float: right;
				transform: scale(0.9);

				/deep/.uni-countdown__number {
					width: 15px;
				}

				/deep/.uni-countdown {
					// padding:3px 0;
				}
			}

			.timer-left {
				padding-left: 5px;
			}
		}

		.oneBoxTitle {
			color: #313131;
			font-size: 14px;
			height: 19px;
			overflow: hidden;
			margin: 8px;
			word-wrap: break-word;
			overflow-wrap: break-word;
		}

		.oneBoxTitleSell {
			color: #969799;
			font-size: 12px;
			word-wrap: break-word;
			overflow-wrap: break-word;
			overflow: hidden;
			margin: 5px 0;
			margin-right: -8px;
			text-align: right;
			transform: scale(0.85)
		}

		.goodBoxInfo {
			margin-bottom: 10px;
			background: #ffffff;
		}

		.oneBoxMoney {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin: 5px 8px;
			color: #fe5252;
			font-size: 14px;

			.addIcon {
				float: right;
				font-size: 20px !important;
				cursor: pointer;
			}
		}
	}
</style>
