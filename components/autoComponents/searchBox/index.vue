<template>
	<div class="cap-search-box" style="height:50px">
		<!-- 商品搜索 -->
		<div class="cap-search-box__view" :style="{'padding-right': '15px','top': '0px','background': currentObj.backGColor}">
			<div class="cap-search">
				<div :class="['cap-search__filed',' cap-search__filed--'+currentObj.shape,currentObj.textCenter=='1'?'cap-search__filed--center':'']"
				 :style="{'background-color': currentObj.inputBackGColor}">
					<i class="iconfont icon-sousuo" :style="{'color':currentObj.inputColor}" @click="clickInputBox"></i>
					<div class="van-cell van-cell--borderless van-field" :style="{'height':currentObj.heightInput+'px','width':vanFieldWidth,'font-size':'14px','box-sizing': 'content-box'}">
						<div class="van-cell__value van-cell__value--alone">
							<div class="van-field__body">
								<input class="van-field__control" slot="input" type="serch" @confirm="clickInputBox" v-model="value" :style="{'color':currentObj.inputColor,'height':currentObj.heightInput+'px'}"
								 placeholder="搜索商品"/>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <span class="sizeFont" style="position: fixed;left:-1000px;">搜索商品</span> -->
	</div>
</template>

<script>
	import Mixins from "../public";
	import { vipCard } from "@/api/http.js";
	export default {
		mixins: [Mixins],
		props: {
			propsObj: {
				type: Object,
				default () {
					return {
						//rect ,circle
						shape: "rect",
						heightInput: "40",
						backGColor: "rgb(249, 249, 249)",
						inputBackGColor: "rgb(255, 255, 255)",
						textCenter: 0,
						inputColor: "rgb(153, 153, 153)"
					};
				}
			}
		},
		data() {
			return {
				value: "",
				vanFieldWidth: "",
				currentStoreInfo:this.$store.state.currentStoreInfo
				// currentObj: {
				//   shape: this.propsObj.shape,
				//   heightInput: this.propsObj.heightInput,
				//   backGColor: this.propsObj.backGColor,
				//   inputBackGColor: this.propsObj.inputBackGColor,
				//   textCenter: this.propsObj.textCenter,
				//   inputColor: this.propsObj.inputColor
				// }
			};
		},
		computed: {},
		mounted() {
			uni.createSelectorQuery().in(this).select('.sizeFont').boundingClientRect().exec((res) => {
				if (res[0]) {
					this.$nextTick(function(){
						this.vanFieldWidth = res[0].width + 'px'
					})
				}
			})
			console.log(this.$store.state.currentStoreInfo)
		},
		methods: {
			clickInputBox() {				
				this.$router.push({path:'/pages/shoppingMall/list/goodsList',query:{
					searchName:this.value
				}})
			}
		}
	};
</script>

<style>
	.cap-search-box {
		width: 100%;
	}

	.cap-search-box:before {
		/* display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; */
	}

	.cap-search-box__view {
		width: 100%;
		padding: 5px 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		box-align: center;
		transition: top 0.3s linear;
	}

	.cap-search {
		display: flex;
		box-align: center;
		align-items: center;
		box-flex: 1;
		flex: 1;
		box-sizing: border-box;
		position: relative;
	}

	.cap-search__filed {
		display: flex;
		flex: 1;
		align-items: center;
		box-align: center;
		border-radius: 4px;
	}

	.cap-search .icon-sousuo {
		font-size: 16px;
		margin-left: 10px;
	}

	.cap-search .van-cell {
		box-flex: 1;
		flex: 1;
		padding: 0 10px;
		background: transparent;
	}

	.cap-search .van-cell__value {
		display: flex;
		box-align: center;
		align-items: center;
	}

	.cap-search .van-field__body {
		box-flex: 1;
		flex: 1;
	}

	.cap-search .van-cell__value .van-field__control {
		background: transparent;
	}

	.van-field__control {
		border: 0;
		margin: 0;
		padding: 0;
		width: 100%;
		resize: none;
		display: block;
		box-sizing: border-box;
	}

	.cap-search__filed--circle {
		border-radius: 20px;
		overflow: hidden;
	}

	.cap-search__filed--center {
		box-pack: center;
		justify-content: center;
	}

	.cap-search__filed--center .van-cell {
		box-flex: 0;
		flex: none;
	}
</style>
