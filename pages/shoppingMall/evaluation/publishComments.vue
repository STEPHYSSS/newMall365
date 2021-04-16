<template>
	<div class="publishComments">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" :status-bar="true" title="发表评价" :shadow="false"></uni-nav-bar>
		<view class="bgcInfo">
			<view class="goodsInfo">
				<image class="img" :src="obj.Img|fmtImgUrl"></image>
				<text class="word">{{obj.Name}}</text>
			</view>
			<view class="describe">
				<text class="left">描述相符</text>
				<span class="right">
					<uni-rate v-model="stars" @change="onChange" :margin="20" class="stars" />
				</span>				 
			</view>
			<view class="textareaSty">
				<textarea @blur="bindTextAreaBlur" auto-height placeholder="从多个角度评价宝贝,可以帮助更多想买的人"/>
			</view>
			
			<!-- <p type="mini" :loading="loading" :disabled="disabled" @click="upload">选择照片</p> -->
			<view class="cu-form-group">
			    <view class="grid col-4 grid-square flex-sub">
			        <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
			              :data-url="imgList[index].url" style="float: left;">
			            <image :src="imgList[index].url" mode="aspectFill" class="imgSty"></image>
			            <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							 <icon type="clear" class="cuIcon-close" size="20"/>
			            </view>
			        </view>
			        <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
			            <text class='cuIcon-cameraadd'></text>
			        </view>
			    </view>
			</view>
			<!-- <view class="solids2" @tap="ChooseImage" v-if="imgList.length<4">
				<view class="fontBox">
					<text class='iconfont icon-shangchuantupian iconSize'></text>
					<text class="addPic">选择照片</text>
				</view>
			</view> -->
			
			<button type="primary" class="btn" @click="OrderComment">发 布</button>
		</view>
	</div>
</template>
<script>
	import dataConfig from '@/config/index'
	import {vipCard} from "@/api/http.js";
	var _self;
	export default {
		data() {
			return {
				stars: '5',
				percent: 0,
				loading: false,
				disabled: false,
				imgList: [],
				obj:{},
				detail:""
			}
		},
		created() {
			let info = sessionStorage.getItem('publishComments')
			this.obj = JSON.parse(info)
		},
		methods: {
			bindTextAreaBlur: function (e) {
				this.detail = e.detail.value;
			},
			onChange(e) {
				this.stars = JSON.stringify(e.value)
			},
			ChooseImage() {
				let self = this;
				uni.chooseImage({
					count: 4, //可选择数量，默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择或从使用相机
					success: async (res) => {
						//上传图片大小限制
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							if (res.tempFiles[0].size > 2 * 1024 * 1000) { //上传图片大小限制
								uni.showToast({
									title: "照片大小不能超过2MB",
									icon: "none"
								});
								return
							}
						}
						try {
							uni.showLoading({
								title: "上传中...",
								mask: true
							});
							let urlaspx = 'Web/Upload/UploadImg.ashx';
							// 请求地址
							let url = dataConfig.url + urlaspx;
							let formData = new FormData()
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								uni.uploadFile({
									url: url, //post请求的地址
									filePath: res.tempFilePaths[i],
									name: 'file',
									formData: {
										folder: 'Appraisement',
										// 'username': this.userInfo.username  //formData是指除了图片以外，额外加的字段
									},
									success: (uploadFileRes) => {
										//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
										let obj = JSON.parse(uploadFileRes.data);
										
										let imgfile = {
											src:obj.Message,
											url:res.tempFilePaths[i]
										};
										console.log(imgfile,'2222')
										self.imgList.push(imgfile);
										console.log(self.imgList)

									},
									fail: (res) => {
										console.log(res);
									}
								})
							}
						} catch (e) {
							console.log(e);
						} finally {
							uni.hideLoading();
						}
					}
				});
			},
			//查看图片
			ViewImage(e) {
				let urls = [];
				for (let i = 0; i < this.imgList.length; i++) {
					urls.push(this.imgList[i].url);
				}
				uni.previewImage({
					urls: urls,
					current: e.currentTarget.dataset.url
				});
			},
			//删除图片
			DelImg(e) {
				let self = this;
				uni.showModal({
					title: '',
					content: '确定要删除么',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							let index = e.currentTarget.dataset.index;
							if (self.imgList.length != 0) {
								self.imgList.splice(index, 1);
								// let id = self.imgList[index].id;
								// let url = self.$serverPath.UF + 'file/delete/' + id;
								// this.$util.urlRequest(url, {}, 'POST', function (ret) {
								// 	let res = ret.data;
								// 	if (res.code == 0) {
								// 		self.imgList.splice(index, 1);
								// 	} else {
								// 		uni.showToast({
								// 			title: "删除失败，请重试",
								// 			icon: "none"
								// 		});
								// 		console.log('请求失败:', res)
								// 	}
								// });
							}

						}
					}
				})
			},
			clickLeft() {
				window.history.back(-1)
			},
			async OrderComment(){//发起评论
				this.loading = true;
				let url=""
				for (let i of this.imgList) {
					if(i){
						url+=i.src+','
					}			
				}
				url = url.substring(0, url.length - 1)
				try {
					let data = await vipCard({
						Action: 'OrderComment',
						Type:this.obj.Type=='2'?'0':'',
						Details:this.detail,
						GoodsSID:this.obj.GoodsSID,
						CommentSID:this.obj.CommentSID,
						StarClass:this.stars,
						ImgList:url
					}, 'UOrderOpera')
					setTimeout(() => {
						this.$Router.push({
							path: "/pages/shoppingMall/order/orderInfo",
							query: {
								order_id: this.obj.OrderSID,
								OrderType:this.obj.Type			
							}
						});
					}, 1000)
				} catch (e) {
					this.loading = false
				}
			},
		},

	}
</script>
<style lang="less">
	.publishComments {
		.bgcInfo {
			padding: 10px;
			margin: 10px;
			box-sizing: border-box;
			border-radius: 5px;
			background-color: #FFFFFF;

			.goodsInfo {
				display: flex;

				.img {
					width: 80px;
					height: 80px;
					// border: 1px solid;
					border-radius: 5px;
				}

				.word {
					padding-left: 15px;
					flex: 1;
					line-height: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.describe {
			margin-top: 10px;
			display: flex;

			.left,
			.right {
				display: inline-block;
				height: 40px;
				line-height: 38px;
			}

			.left {
				letter-spacing: 2px;
				font-size: 14px;
				color: #333333;
				width: 80px;
				text-align: left;
			}

			.stars {
				padding-top: 19px;
			}
		}
		.textareaSty{
			height: 147px;
		}
		.imgSty{
			width: 80px;
			height: 80px;
			padding-bottom: 8px;
			padding-right: 10px;
			border-radius: 4px;
		}
		.solids2{
			margin: 15px 0;
			.fontBox{
				border-radius: 5px;
				width: 100px;
				clear: both;
				border: 1px dashed #ccc;
				background: #f8f8f8;
				.iconSize{
					display: block;
					text-align: center;
					font-size: 24px;
					color: #ffb400;
					margin: 14px 0 10px;
				}
				.addPic{
					text-align: center;
					display: block;
					margin-bottom: 16px;
				}
			}			
		}	
		/deep/.uni-textarea-placeholder{
			font-size: 12px;
			letter-spacing: 1px;
		}
		.cu-form-group{
			// height: 80px;
			// max-height: 180px;
			margin-bottom: 20px;
			.bg-img{
				position: relative;
			}
			.cuIcon-close{
				position: absolute;
				top: -9px;
				right: 0;
			}
		}
		.btn{
			clear: both;
		}
	}
</style>
