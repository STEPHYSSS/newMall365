<template>
	<div class="cap-goods-layout">
		<!-- 商品 -->
		<ul class="cap-goods-layout__container card" :class="[currentObj.listStyle,currentObj.goodStyle]" :style="{'padding-left':currentObj.pageSpace +'px','padding-right':currentObj.pageSpace +'px',
          'margin-left':-(currentObj.goodSpace/2)+'px','margin-right':-(currentObj.goodSpace/2)+'px'}">
			<li class="cap-goods-layout__wrapper cap-goods-layout__wrapper--0" :class="swipeTimeStyle" v-for="(item,index) in currentGoodList" :key="index">				
				<miaosha-goods :propsObj = "propsObj" :goods="item"></miaosha-goods>
			</li>
		</ul>
	</div>
</template>

<script>
	import Mixins from "../public";
	import countDown from "./countDown.vue"
	import miaoshaGoods from "./miaoshaGoods.vue"
	import {
		GetBaseImgUrl
	} from "@/util/publicFunction";
	
	export default {
		mixins: [Mixins],
		name: "",
		props: {
			propsObj: {
				type: Object,
				default () {
					return {
						goodSource: "0",
						//small  big   three list hybrid swipe
						listStyle: "small",
						// 商品间距
						goodSpace: 9,
						// 页面边距
						pageSpace: 10,
						// 图片比例  3:2 -->66.6667  1:1 3:4-->133.333  16:9-->56.25
						imgScale: "100",
						// 商品样式 无边白底 --> card  卡片投影--> card-shadow 描边白底--> card2 无边透明底 --> simple 促销-->promotion
						goodStyle: "promotion",
						// 圆角 circle 直角rect
						chamfer: "circle",
						// 图片填充 周边留白-->contain  填充 -->cover
						contain: "contain",
						// 文本样式 normal  bold
						fontWeight: "normal",
						// left center
						textCenter: "left",
						// 显示内容 1商品名称 2商品描述 3商品价格 4购买按钮
						showContent: ["1", "2", "3", "4"],
						// 购买按钮样式 1 到 9
						buyButton: "9",
						// 购买按钮样式 === 3 或者4 时，有个按钮文字
						buyButtonText: "马上抢",
						// 商品角标 0 到 4
						typeSign: "4",
						// 商品角标 === 4时，自定义的图片
						typeSignImg: "",

					};
				}
			}
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
		components: {countDown,miaoshaGoods},
		mounted() {
			this.currentObj.showContent = this.currentObj.showContent ?
				this.currentObj.showContent : [];
			if (
				this.currentObj._Prod_Data &&
				this.currentObj._Prod_Data.length > 0
			) {
				let goodsMaxNum
				if (this.currentObj.goodSource === '1') {
					let goodsNum = Number(this.currentObj.goodsMaxNum)
					goodsMaxNum = goodsNum > 50 ? 50 : goodsNum
					this.currentObj._Prod_Data = this.currentObj._Prod_Data.splice(0, goodsMaxNum)
				}
				this.currentGoodList = this.currentObj._Prod_Data;
				// console.log(this.currentGoodList,'获取信息')
				// this.finishTimer()
				
			} else {
				this.currentGoodList =[];
			}
		},
		created() {
			// this.getTimeout()
			// console.log(this.propsObj,'商品',GetBaseUrl())

		},
		methods: {
			finishTimer() {
				setTimeout(() => {
					this.getTimeout()
				}, 1000)
			},
			
			getTimeout(current) {
				let currentT = new Date().getTime()
				let End = "";
				let Start = "";
				this.currentGoodList.forEach((item,index)=>{
					End =  new Date(item.EndDate.replace(/-/g, '/')).getTime();
					Start = new Date(item.StartDate.replace(/-/g, '/')).getTime();
					this.startIS = Start - currentT >= 0 ? false : End - currentT > 0 ? true : 'end'
					
					let activeTimeMy = this.startIS ? End - currentT : Start - currentT
					let myTime = activeTimeMy
					this.activeTimeMy = {
						day: parseInt(myTime / (1000 * 60 * 60 * 24)),
						hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
						minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
						second: parseInt((myTime % (1000 * 60)) / 1000)
					}
				})
				// let End = new Date(this.currentGoodList[0].EndDate.replace(/-/g, '/')).getTime()
				// let Start = new Date(this.currentGoodList[0].StartDate.replace(/-/g, '/')).getTime()
				// let End = new Date('2020-05-18 14:55:50').getTime()
				// false 活动未开始 true 活动开始了 end为活动结束
				// this.startIS = Start - currentT >= 0 ? false : End - currentT > 0 ? true : 'end'
				
				// let activeTimeMy = this.startIS ? End - currentT : Start - currentT
				// let myTime = activeTimeMy
				// this.activeTimeMy = {
				// 	day: parseInt(myTime / (1000 * 60 * 60 * 24)),
				// 	hours: parseInt((myTime % (1000 * 60 * 60 * 24)) / (60 * 60 * 1000)),
				// 	minute: parseInt((myTime % (1000 * 60 * 60)) / (60 * 1000)),
				// 	second: parseInt((myTime % (1000 * 60)) / 1000)
				// }
				if (!this.startIS) {
					//表示活动已经结束
					this.btnTitle = " 活动未开始";
				} else if (this.startIS === 'end') {
					this.btnTitle = "活动结束";
				} else if(Number(this.itemData.SurplusQty)===0){
					// this.btnTitle = " 立即抢购";
					this.btnTitle = '商品不足'
				}else{
					this.btnTitle = " 立即抢购";
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
			reportErrorsFun() {
				let _dataString = "";
				if (Array.isArray(this.currentObj._data)) {
					_dataString = this.currentObj._data.join(",");
				} else {
					_dataString = this.currentObj._data;
				}

				return !!_dataString ? '请选择商品' : '';
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
		watch: {
			"currentObj.showContent"() {
				this.currentObj.showContent = this.currentObj.showContent ?
					this.currentObj.showContent : [];
			},
			"currentObj._Prod_Data"(val) {
				if (this.currentObj.goodSource === "0" && val.length > 0) {
					this.currentGoodList = val;
				}
			},
			"currentObj.goodSource"() {
				this.currentObj._Prod_Data = [];
				this.currentGoodList = this.fakeData;
			}
		},
		computed: {
			classObject: function() {
				if (this.currentObj.listStyle == 'small') {
					return 'isActive2'
				} else if (this.currentObj.listStyle == 'big' || this.currentObj.listStyle == 'hybrid') {
					return 'isActiveBig'
				} else if (this.currentObj.listStyle == 'three' || this.currentObj.listStyle == 'swipe') {
					return 'isActivethree'
				} else if (this.currentObj.listStyle == 'list') {
					return 'isActivelist'
				}

			},
			swipeTimeStyle:function(){
				// timer-style
				if(this.currentObj.listStyle=='swipe'){
					return 'swipeTimes'
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "../../../assets/css/autoComponents/goods.css";
	// 倒计时样式
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
		.timer-left2{
			padding-left: 0;
		}
	}
	
	.bgcopacity {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
		background-color: #5d5a5a;
		opacity: 0.6;
	}

	.isActive2 {
		position: absolute;
		top: 26%;
		width: 100px;
		height: 88px;
		left: 23%;
	}

	.isActiveBig {
		position: absolute;
		top: 21%;
		left: 21%;
		width: 60%;
		height: 54%;
	}

	.isActivethree {
		position: absolute;
		top: 14%;
		width: 100px;
		height: 88px;
		left: 10%;
	}

	.isActivelist {
		position: absolute;
		top: 19%;
		width: 100px;
		height: 88px;
		left: 17%;
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
	.swipeTimes{
		    -webkit-box-flex: 0;
		    -webkit-flex: 0 0 40%;
		    -moz-box-flex: 0;
		    -ms-flex: 0 0 40%;
		    flex: 0 0 40% !important;
		    width: 40%;
		    float: none;
	}
</style>
