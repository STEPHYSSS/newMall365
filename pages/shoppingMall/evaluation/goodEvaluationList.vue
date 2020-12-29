<template>
	<div class="">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="用户评价" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div v-if="!loading">
			<div class="userEvaList" v-for="(item,index) in lists" :key="index">
				<span>
					<uni-icons type="person" :style="{'color':mainColor,'margin-right':'4px'}"></uni-icons>
				</span>
				<span>{{item.UserName |setName}}</span>
				<div class="userEvaTime">
					<span>{{item.AddTime}}</span>&nbsp;
					<span>产品：{{item.Name}}</span>
				</div>
				<div>
					<div class="content-Details">{{item.Details}}</div>
					<div style="margin-bottom:5px;display: flex; flex-wrap:wrap">
						<div v-for="(img,indexImg) in item.ImgList" style="display: inline-block;" @click="clickImg(item.ImgList,indexImg)"
						 :key="indexImg">
							<a-up-img :width="'80px'" :height="'80px'" :url="img" style="margin-right:5px" />
						</div>
					</div>
				</div>
				<div class="reply-style" v-if="item.Reply">
					<span style="font-weight:700">商家回复：</span>
					{{item.Reply}}
				</div>
			</div>
		</div>
		<a-nodeData v-if="lists.length===0"></a-nodeData>

		<div class="imgPopup">
			<uni-popup ref="imgPopup">
				<swiper class="swiper" @click="clickswiper" :current="currentIndex" :style="{'width':SystemWidth,'height':Systemheight}">
					<swiper-item v-for="(item,index) in imgs" :key="index">
						<a-up-img :url="item" height="auto" width="auto"></a-up-img>
					</swiper-item>
				</swiper>
			</uni-popup>
		</div>
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";

	export default {
		name: "userEvaluation",
		components: {},
		data() {
			return {
				mainColor: getApp().globalData.mainColor,
				lists: [
					// {
					// 	ImgList: ['https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg',
					// 		'http://img4.cache.netease.com/photo/0001/2010-04-17/64EFS71V05RQ0001.jpg',
					// 	]
					// },
					// {
					// 	ImgList: ['http://pic25.nipic.com/20121112/11177122_133935259121_2.jpg',
					// 		'http://img4.cache.netease.com/photo/0001/2010-04-17/64EFS71V05RQ0001.jpg',
					// 		'http://pic63.nipic.com/file/20150401/3135727_150042729000_2.jpg'
					// 	]
					// }
				],
				showImgs: false,
				imgs: [],
				loading: true,
				Systemheight: 0,
				SystemWidth: 0,
				currentIndex:0
			};
		},
		created() {
			this.getList();
			this.SystemWidth = (uni.getSystemInfoSync().windowWidth) + "px";
			this.Systemheight = (uni.getSystemInfoSync().windowHeight) + "px";
		},
		methods: {
			async getList() {
				try {
					// this.lists = [];
					let data = await vipCard({
							Action: "GetAppraisement",
							ProdSID: this.$Route.query.id
						},
						"UProdOpera"
					);
					this.lists = data.Data.CommentList || [];
					if (this.lists.length > 0) {
						this.lists.forEach(D => {
							D.ImgList = D.ImgList ? D.ImgList.split(",") : [];

							D.ImgList.forEach((item, key) => {
								//加图片前缀
								D.ImgList[key] = this.$VUE_APP_PREFIX + item;
							});
						});
					}
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			clickImg(row, index) {
				this.$refs.imgPopup.open()
				this.showImgs = true;
				this.imgs = row;
				this.currentIndex = index
			},
			clickLeft() {
				// this.$Router.back(2) 
				this.$Router.push({
					path: '/pages/shoppingMall/list/infoGood',
					query: {
						SID: this.$Route.query.id
					}
				})
			},
			clickswiper(){
				this.$refs.imgPopup.close()
			}
		}
	};
</script>

<style lang="less">
	.imgPopup {
		.uni-popup {
			background-color: rgba(0, 0, 0, 0.8);
			z-index: 999
		}

		/deep/img,
		image {
			width: auto;
			height: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			max-width: 100%;
			max-height: 100%;
			position: absolute;
		}
	}

	.userEvaList {
		background: #ffffff;
		padding: 20px;
		margin-bottom: 10px;

		.iconUser {
			vertical-align: middle;
			margin-right: 10px;
		}

		.userEvaTime {
			font-size: 12px;
			color: #999;
			line-height: 40px;
		}

		.showImgs {
			width: 85%;
			/*height: 80vh;*/

			img,image {
				width: 100%;
				/*vertical-align: middle;*/
			}
		}

		.vanSwipe {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: #ffffff;
			z-index: 1;
		}

		.content-Details {
			margin-bottom: 10px;
			word-wrap: break-word;
			word-break: normal;
		}

		.reply-style {
			background: #fafafa;
			padding: 5px;
			font-size: 10px;
			word-break: break-all;
			word-wrap: break-word;
		}
	}
</style>
