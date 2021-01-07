<template>
	<div class="imgNav-style">
		<!-- 权益入口页面 -->
		<div class :style="{'background-color':'rgb(249, 249, 249)','cursor': 'grab'}">
			<div v-if="currentObj.navStyle=='image'">
				<div ref="imageWrapper" class="image-wrapper" v-for="(item,index) in currentObj.listNav" :key="index">
					<a href="javascript:;"  @click="clickUrl(item)" :style="{'color':currentObj.fontColor}" class="cap-image-ad__link--image-nav cap-image-ad__link">
						<!-- <div class="cap-image-ad__image" :style="'background-image':`url(${setImgPrex(item.url)})`}"></div> -->
						<!-- <image :src="setImgPrex(item.url)"></image> -->
						<div class="boxTitle">
							<img src="/static/img/interestTip.jpg">
							<span>{{item.name}}</span>
						</div>
						<div>
							<img v-if="item.url" class="cap-image-ad__image" :style="{'width':currentObj.isScroll==1?widthBox+'px':'100%'}" 
							:src="setImgPrex(item.url)" />
						  </div>     
						  <!-- <image :src="`http://192.168.0.107:8001/`+item.url" style="width: 100%;height: 161px;"></image> -->
						<!-- <image :src="setImgPrex(item.url)" style="width: 100%;height: 161px;"></image> -->						
						<!-- <h3 class="cap-image-ad__nav-title">{{item.name}}</h3> -->
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Mixins from "../public";
	import {GetBaseImgUrl} from "@/util/publicFunction";
	export default {
		mixins: [Mixins],
		props: {
			propsObj: {
				type: Object,
				default () {
					return {
						navStyle: "",
						pageShowNum: 1,
						backGColor: "rgb(255,255,255)",
						fontColor: "rgb(0,0,0)", //rgb(0,0,0)
						listNav: [{
							img: "",
							name: "",
							urlObj: {
								name: "",
								url: ""
							}
						}]
					};
				}
			}
		},
		data() {
			return {
				widthBoxHid: '',
				HeightBoxHid: '',
				widthBox: ""
			};
		},
		mounted() {
			this.setWidth();
		},
		methods: {			
			setImgPrex(val) {
				if (
					val &&
					this.propsObj.listNav &&
					this.propsObj.listNav.length > 0
				) {
					return GetBaseImgUrl() + val;
				} else {
					return val;
				}
			},
			setWidth() {
				//手机端记得把320改成clientWidth
				let clientWidth = uni.getSystemInfoSync().windowWidth;

				let pageShowNum = Number(this.propsObj.pageShowNum) + 3;

				if (this.propsObj.isScroll == "1") {
					//横向滑动
					this.widthBox = (clientWidth + 70) * (100 / pageShowNum / 100);
					this.widthBoxHid = clientWidth * (100 / pageShowNum / 100);
				} else {
					// if (!this.widthBoxHid) {
					this.widthBoxHid = 100 / this.currentObj.listNav.length + "%";
					this.HeightBoxHid =
						clientWidth * (100 / this.currentObj.listNav.length / 100);
					// }
				}
			},
			clickUrl(item) {
				if (item.urlObj && item.urlObj.url) {
					// 跳转只能跳到内部链接，不能跳到外部链接
					// let url = item.urlObj.url.split('#');
					 window.location.href = item.urlObj.url
					// if(url!="http://dingtalk.bak365.cn"){
					//    window.location.href = item.urlObj.url
					// }else{
						// let path = url[1];
						// uni.reLaunch({
						// 	url: path
						// });
					// }
				}
			}
		},
		watch: {
			"propsObj.pageShowNum"() {
				this.setWidth();
			}
		}
	};
</script>

<style scoped lang="less">
	.imgNav-style {

		.rc-design-vue-preview {
			position: relative;
			overflow: hidden;
			line-height: initial;
		}

		.cap-image-ad {
			overflow: hidden;
			font-size: 0;
		}

		.cap-image-ad__image-nav {
			white-space: nowrap;
			/* padding-bottom: 10px; */
			/* margin-bottom: -17px; */
		}

		.cap-image-ad__image-nav::-webkit-scrollbar {
			/* width: 0px;
  height: 0px; */
		}

		.cap-image-ad__image {
			display: block;
			margin: 0 auto;
			border: 0;
		}

		.cap-image-ad__link {
			display: block;
			position: relative;
			height: 100%;
		}

		.cap-image-ad__nav-title {
			font-size: 12px;
			width: 100%;
			padding-left: 5px;
			padding-right: 5px;

			text-align: center;
			overflow: hidden;
			box-sizing: border-box;
		}

		.cap-image-ad__text-nav {
			margin-left: 0;
			margin-right: 0;
		}

		.cap-image-ad__slide {
			width: 100%;
			overflow-y: hidden;
			white-space: nowrap;
			/* padding-bottom: 10px; */
		}

		.cap-image-ad__image-nav .image-wrapper {
			display: inline-block;
			vertical-align: middle;
		}

		.cap-image-ad__image-nav .cap-image-ad__link--image-nav {
			font-size: 0;
		}
		.boxTitle{
		    width: 100%;
		    height: 50px;
		    img{
		      width:100%;
		      position: relative;
		      height: 100%;
		    }
		    span{
		      position: absolute;
		      top: 0px;
		      line-height: 50px;
		      left: 30%;
		      font-size: 14px;
		      width: 39.5%;
		      text-align: center;
		      text-overflow: ellipsis;
		      overflow: hidden;
		      white-space: nowrap;
		      display: inline-block;
		    }
		  }	
		.cap-image-ad__image-nav .cap-image-ad__image {
			background-size: cover;
			background-position: 50%;
		}

		.cap-image-ad__image-nav .cap-image-ad__nav-title {
			// padding-bottom: 9px;
			// height: 33px;
			line-height: 35px;
		}

		.cap-image-ad__text-nav .text-nav-wrapper {
			display: inline-block;
			padding: 15px 0;
		}

		.cap-image-ad__text-nav .cap-image-ad__nav-title {
			position: relative;
			font-size: 12px;
			text-align: center;
			margin-bottom: 0;
		}

		.cap-image-ad__text-nav .cap-image-ad__nav-title:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			/* width: 200%; */
			height: 200%;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
			border-right: 1px solid #eee;
		}
	}
</style>
