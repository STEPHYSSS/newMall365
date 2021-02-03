<template>
	<div class="miaosha">
		<a @click="urlGoodClick(goods)" log-params="null" class="cap-goods-layout__item card" style="margin: 5px;" :class="[currentObj.listStyle,currentObj.goodStyle,currentObj.chamfer]"
		 :style="{'margin':(currentObj.goodSpace/2)+'px'}">
			<div class="cap-goods__photo">
				<div class="cap-goods__image-wrap" :style="{'padding-top':currentObj.imgScale+ '%'}">
					<div data-lazy-log="1" :class="['cap-goods__img--'+currentObj.contain]" class="cap-goods__img" lazy="loaded"
					 :style="{'background-image':`url(${setImgPrex(goods.Img)})`}"></div>
				</div>
				<div :class="miaoStyle">
					<span :class="currentObj.listStyle==='list'?'timer-left2':'timer-left'">{{startIS?'距结束':'距开始'}}</span>
					<span class="timer-right">
						<uni-countdown :color="currentObj.listStyle==='big'?'#fe5252':'#fff'" splitor-color="#fff" :background-color="currentObj.listStyle==='big'?'#fff':'transparent'" :day="activeTimeMy.day" :hour="activeTimeMy.hours"
						 :minute="activeTimeMy.minute" :second="activeTimeMy.second" @timeup="finishTimer"></uni-countdown>
						
					</span>
				</div>
				<div>
					<div class="bgcopacity" v-if="goods.StockType != '0'&& goods.StoreQty <= '0'"></div>
					<image :class="classObject" src="@/static/img/yishouqin.png" v-if="goods.StockType != '0'&& goods.StoreQty <= '0'"></image>
				</div>
				<div v-if="currentObj.showContent.indexOf('5')>-1">
					<i v-if="currentObj.typeSign!=='4'" class="van-icon cap-goods-layout__corner-mark" :class="['type-'+currentObj.typeSign,currentObj.typeSign==='0'?'van-icon-new-arrival ':
		  currentObj.typeSign==='1'?'van-icon-hot-sale':currentObj.typeSign==='2'?'van-icon-new':
		  currentObj.typeSign==='3'?'van-icon-hot':'']"
					 style="color: rgb(255, 68, 68);"></i>

					<div v-if="currentObj.typeSign==='4'&&!currentObj.typeSignImg" style="display: inline-table;" class="cap-goods-layout__corner-mark cap-goods-layout__corner-mark--default">
						<span>角标</span>
						<br />
						<span>区域</span>
					</div>
					<img v-if="currentObj.typeSign==='4'&&currentObj.typeSignImg" :src="currentObj.typeSignImg |setImgPrex" class="cap-goods-layout__corner-mark cap-goods-layout__corner-mark--custom" />
				</div>
			</div>
			<div class="cap-goods-layout__info" v-if="currentObj.textCenter&&currentObj.showContent">
				<div class="has-title-1 has-subtitle-1 cap-goods-layout__info-title" :class="[currentObj.listStyle]" goods-index="0"
				 :style="{'text-align': currentObj.textCenter,'margin-top':'0'}">
					<h3 class="title" :style="{'font-weight': currentObj.fontWeight,'margin-top':'10px'}" v-if="currentObj.showContent.indexOf('1')>-1">{{goods.Name}}</h3>
					<p v-if="currentObj.showContent.indexOf('2')>-1&&goods.Describe" class="sub-title" style="margin-top:10px;">{{goods.Describe}}</p>
				</div>
				<div v-if="currentObj.showContent&&currentObj.showContent.length!==0
		&&(currentObj.showContent.indexOf('4')>-1||currentObj.showContent.indexOf('3')>-1)"
				 class="cap-goods-layout__info-price has-price-1 has-btn-1" :class="[currentObj.listStyle,currentObj.listStyle==='big'||currentObj.listStyle==='list'?'size--big':'size--small',
		currentObj.textCenter]">
					<div v-if="!(currentObj.textCenter==='center'&&currentObj.showContent.indexOf('3')===-1)" class="price-info"
					 :style="{'padding-right':
		  currentObj.textCenter==='center'?'0':
		  currentObj.listStyle==='big'||currentObj.listStyle==='list'||currentObj.listStyle==='hybrid'?'39px'
		  :currentObj.buyButton === '9'?'65px':'29px',
		   'font-weight': currentObj.fontWeight}">
						<span class="sale-price" v-if="currentObj.showContent.indexOf('3')>-1">
							<div class="cap-theme-view" style="color: rgb(255, 68, 68);">
								<span v-if="goods.SalePrice">
									<span :class="currentObj.listStyle==='three' || currentObj.listStyle ==='swipe'? 'price-tagThress':'price-tag'">¥{{goods.SalePrice}}</span>
									<span style="text-decoration:line-through;color: #969799;font-size:8pt;padding-left: 6px;">¥{{goods.OldPrice}}</span>
								</span>
								<span class="price-tag" v-else>¥{{goods.OldPrice}}</span>
							</div>
						</span>
					</div>
					<div v-if="currentObj.showContent.indexOf('4')>-1||currentObj.buyButton==='9'" class="cap-goods-layout__buy-btn-wrapper"
					 :class="[currentObj.listStyle==='big'||currentObj.listStyle==='list'||currentObj.listStyle==='hybrid'?'big':'small',
		  'type-'+currentObj.buyButton]">
						<i v-if="currentObj.buyButton!=='3'&& currentObj.buyButton!=='4'&& currentObj.buyButton!=='7'&& currentObj.buyButton!=='8'
		    &&currentObj.buyButton!=='9'"
						 class="van-icon" :class="['cap-goods-layout__buy-btn-'+currentObj.buyButton,
		    currentObj.buyButton==='2'?'van-icon-add-o':currentObj.buyButton==='5'?'van-icon-add ':currentObj.buyButton==='6'?'van-icon-shopping-cart-o'
		    :'van-icon-cart-circle-o',
		    ]"
						 style="color: rgb(255, 68, 68);"></i>

						<button v-else class="van-button van-button--danger van-button--small" :class="['cap-goods-layout__buy-btn-'+ currentObj.buyButton]"
						 :style="{'background-color': currentObj.buyButton==='3'?'rgb(255, 68, 68)':'',
		     'border-color': currentObj.buyButton==='3'?'rgb(255, 68, 68)':''}">
							<span class="van-button__text">{{currentObj.buyButtonText}}</span>
						</button>
					</div>
				</div>
			</div>
		</a>
	</div>
</template>

<script>
	import Mixins from "../public";
	import countDown from "./countDown.vue"
	import {
		GetBaseImgUrl
	} from "@/util/publicFunction";
	
	export default {
		mixins: [Mixins],
		name: "",
		props: {
			goods:Object,
			propsObj:Object
		},
		data() {
			return {
				currentGoodList: [],
				startIS:false,
				activeTimeMy: {},
				btnTitle: "马上抢",
				countDownInfo: null, // 定时器所需信息
				curTime: new Date().getTime(), // 当前服务器时间
				fakeData: [{
						Img: "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
						Name: "这里显示商品名称，最多显示1行",
						SalePrice: "99",
						Describe: "这里显示商品描述，最多显示1行"
					},
					{
						Img: "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
						Name: "这里显示商品名称，最多显示1行",
						SalePrice: "99",
						Describe: "这里显示商品描述，最多显示1行"
					},
					{
						Img: "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
						Name: "这里显示商品名称，最多显示1行",
						SalePrice: "99",
						Describe: "这里显示商品描述，最多显示1行"
					},
					{
						Img: "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
						Name: "这里显示商品名称，最多显示1行",
						SalePrice: "99",
						Describe: "这里显示商品描述，最多显示1行"
					}
				]
				// reportErrorsFun:true
			};
		},
		components: {countDown},
		mounted() {
			if(this.goods){
				this.getTimeout()
				if (!this.startIS) {
					//表示活动已经结束
					this.btnTitle = " 活动未开始";
				} else if (this.startIS === 'end') {
					this.btnTitle = "活动结束";
				} else if(Number(this.goods.SurplusQty)===0){
					// this.btnTitle = " 立即抢购";
					this.btnTitle = '商品不足'
				}else{
					this.btnTitle = " 立即抢购";
				}
			}
		},
		methods: {
			finishTimer() {
				setTimeout(() => {
					this.getTimeout()
				}, 1000)
			},			
			getTimeout(current) {
				let currentT = new Date().getTime()
				let End = new Date(this.goods.EndDate.replace(/-/g, '/')).getTime()
				let Start = new Date(this.goods.StartDate.replace(/-/g, '/')).getTime()
				// let End = new Date('2020-05-18 14:55:50').getTime()
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
			},
			
			setImgPrex(val) {
				if (
					val &&
					this.currentObj._Prod_Data &&
					this.currentObj._Prod_Data.length > 0
				) {
					return GetBaseImgUrl() + val;
				} else {
					return val;
				}
			},
			urlGoodClick(item) {
				this.$Router.push({
					path: '/pages/shoppingMall/list/infoGood',
					query: {
						SID: item.SID,
						seckill: "true",
						seckillHome:"true"
					}
				})
			}
		},
		computed:{
			miaoStyle:function(){
				// timer-style
				if(this.currentObj.listStyle=='big'){
					return 'bigTimerStyle'
				}else if(this.currentObj.listStyle=='three'){
					return 'timer-style2'
				}else return 'timer-style'
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "../../../assets/css/autoComponents/goods.css";
	// 倒计时样式
	.title{
		font-size: 16px !important;
	}
	.cap-goods-layout__item.list .cap-goods__photo {
	    float: left;
	    margin-right: 10px;
	    min-height: auto;
	    width: 150px;
	    height: 150px;
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
				padding:2px 0;
			}
		}
	
		.timer-left {
			padding-left: 5px;
			font-size: 14px;
		}
		.timer-left2{
			padding-left: 2px;
		}
	}
	.timer-style2{
		position: absolute;
		// height: 62rpx;
		// line-height: 62rpx;
		width: 100%;
		background: #fe5252;
		bottom: 0;
		color: #fff;
		font-size: 12px;
		.timer-left {
			margin-left: 5px;
		}
	}	
	.bigTimerStyle{
		position: absolute;
		height: 100rpx;
		line-height: 100rpx;
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
			
			/deep/.uni-countdown__number,/deep/.uni-countdown__splitor {
				height: 45px;
				font-size: 20px;
			}
			/deep/.uni-countdown__splitor{
				line-height: 45px;
			}
			/deep/.uni-countdown__number{
				width: 50px;
			}
			/deep/.uni-countdown {
				// padding:3px 0;
			}
		}
		.timer-left{
			font-size: 20px;
			letter-spacing: 2px;
			margin-left: 8px;
		}
	}
	.price-tagThress{
		font-size: 14px;
	}
	.price-tag{
		font-size: 20px !important;
	}
	.bgcopacity {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
		background-color: #5d5a5a;
		opacity: 0.6;
	}

	.cap-goods-layout {
		.el-form-item__content {
			line-height: 0;
		}

		.cap-goods-layout__buy-btn-wrapper {
			display: flex;
		}

		.cap-goods__image-wrap {
			border: 1px solid #eee;
		}
	}
</style>
