<template>
	<view class="">
		<div class="backgroundFF">
			<!--        横-->
			<div v-if="!loading">
				<uni-nav-bar :status-bar="true" @clickLeft="clickLeft" :shadow="false" :fixed="true" left-icon="back">
					<!-- @cancel="cancels" @confirm="serch" v-model="name" -->
					<uni-search-bar cancelButton="none" clearButton="none" style="width:100%" placeholder="请输入搜索关键词"
					@confirm="sousuo" v-model="search" :radius="50"></uni-search-bar>
					<div slot="right">
						<div class="headRight"></div>
					</div>
				</uni-nav-bar>
				<div class="leftNavsidebar" v-if="sidebarList.length>0">
					<view :class="['homepageLeftFixed']">
						<view v-for="(item,index) in sidebarList" :key="index" :class="['homepageLeft',index===currentIndex?'activeCanteen':'']"
						 @click="sidebarChange(index,item)">
							{{item.Name}}
						</view>
					</view>
				</div>
				<div class="goodBox1" v-if="list.length>0">
					<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
						<div class="goodBox-row" gutter="5">
							<div class="goodBox-col" v-for="(item,index) in list" :key="index">
								<a-good-box :itemData="item" :imgHeight="imgHeight" @goodBox="goodBox" @addCart="addCart(item)"></a-good-box>
							</div>
						</div>
					</scroll-view>
				</div>
				<a-nodeData v-if="(sidebarList.length===0||list.length===0)"></a-nodeData>
			</div>
			<a-shopping-showSku :show="show" @hideShow="hideShow" :skuDataInfo="skuDataInfo"></a-shopping-showSku>		
		</div>
		<view v-show="tabShow">
			<tabBar :pagePath="'/pages/shoppingMall/list/goodsList'"></tabBar>
		</view>
	</view>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";
	import {
		goodListPublic
	} from "./public";

	export default {
		components: {
			// SkuShow,
			// nodeData
		},
		mixins: [goodListPublic],
		data() {
			return {
				activeKey: "",
				show: false,
				tabShow:true,
				skuDataInfo: {},
				currentIndex: 0,
				imgHeight: '',
				imgHeightLine: '',
				loading:true,
				name:this.$route.query.searchName?this.$route.query.searchName:'',
				only:[],
				CateSID:'',
				search:'',//商品大类搜索
				menuScrollIntoView: '',
			};
		},
		async created() {
			// if(this.$route.query.query){
			// 	this.CateSID = JSON.parse(this.$route.query.query);
			// }
			if(this.$route.query.query){
				let getDecode = decodeURIComponent(this.$route.query.query);
				let getDQuery = JSON.parse(getDecode)
				this.CateSID= getDQuery.SID
				// let abc = JSON.parse(this.$route.query.query)
				// let getDQuery = JSON.parse(getDecode)
				// let getObj = JSON.parse(getDQuery.query)
				// let key = Object.keys(getObj)
				// if(key=="SID"){
				// 	this.SID = Object.values(getObj)
				// }
			}
			this.imgHeight = (uni.getSystemInfoSync().windowWidth- 22 - 85) / 2 + "px";
			await this.getCouponList();
			await this.getList();
			this.$store.commit("SET_HISTORY_URL", {path:'/pages/shoppingMall/list/goodsList'})
		},
		mounted() {},
		methods: {
			serch (val) {
		        let result = [] // 查询结果
		        let temp = []// 存放查询到的商品
		        for (const i of this.sidebarList) { // 遍历tree
		          temp = [] // 先置空
		          for (const y of i.children) {// 匹配到符合条件得商品后  push到temp     
					   if(y.Name == val.value){
						   temp.push(y)
						   this.only.push(y)
					   }
		          }
		          // 该children 下  有符合条件的商品  就将这个节点 push到result
		          if (temp && temp.length) result.push(i)
		        }
				this.sidebarList = result
				this.list= this.only;
		    },
			cancels(){
				this.name = "";
				this.getCouponList()				
			},
			sousuo(val){
				this.search = val.value
				console.log(this.CateSID)
				this.getCouponList2();
			},
			async getCouponList2(){//获取商品树列表
				try {
					let { Data } = await vipCard({
						Action: "GetTreeProdList",
						SID:this.$store.state.currentStoreInfo.SID,//门店id
						CateSID:this.CateSID,
						Name:this.search
					}, "UProdOpera");
					this.sidebarList = Data.CateList;
					console.log(this.sidebarList.length)
					if(this.sidebarList.Length>0){
						this.getList(this.sidebarList.children);
					}else{
						// this.hideGoods = false
						// this.list = []
					}
					
				} catch (e) {
					this.$toast(e)
				}
			},
			async getCouponList(){//获取商品树列表
				try {
					let { Data } = await vipCard({
						Action: "GetTreeProdList",
						SID:this.$store.state.currentStoreInfo.SID,//门店id
						CateSID:this.CateSID,
						Name:this.name
					}, "UProdOpera");
					this.sidebarList = Data.CateList;
				
				} catch (e) {
					this.$toast(e)
				}
			},
			async getList(val) {
				try {
					this.list = val ? val : this.sidebarList[0].children;
					this.list.forEach(D => {
						D.ImgList = D.ImgList ? D.ImgList.split(",") : [];
					});
					this.loading = false;
				} catch (e) {
					this.$toast(e)
					this.loading = false;
				}
			},
			sidebarChange(index) {
				this.currentIndex = index
				this.getList(this.sidebarList[index].children);
			},
			goodBox(val) {//点击商品跳转到详情页
				this.$Router.push({
					path: "/pages/shoppingMall/list/infoGood",
					query:{SID:val.SID,isGoodList:true,title:val.Name}
				});
			},
			clickLeft(){
				this.$Router.pushTab({
					path: "/pages/shoppingMall/index"
				});
			},
			async addCart(item) {
				let currentStore = JSON.parse(localStorage.getItem('currentStoreInfo'));
				if(item.ProdType == '1'){
					// console.log('直接进入详情页')
					this.$Router.push({
						path: "/pages/shoppingMall/list/infoGood",
						query:{SID:item.SID,isGoodList:true,title:item.Name}
					});
				}else{
					this.tabShow = false;
					try {
						let obj = {
							Action: "GetProdInfo",
							ShopSID:currentStore.data.SID
						};
						Object.assign(obj, item);

						let {
							Data
						} = await vipCard(obj, "UProdOpera");
						this.show = true;
						this.skuDataInfo = Data;
					} catch (e) {
						console.log(e);
					}
				}
			},
			hideShow() {
				this.tabShow = true;
				this.show = false;
			},
			vanOnSearch() {}
		},
		filters: {}
	};
</script>

<style lang="less">
	.backgroundFF {
		background: #ffffff;
		height: 100vh;
		margin-bottom: 50px;

		/deep/.uni-navbar__header-btns-left {
			width: 60rpx;
		}

		/deep/.uni-navbar__header-right {
			// #ifdef H5
			width: 0px !important;
			padding: 0;
			// #endif
		}

		.van-search__action {
			&:hover {
				background: none;
			}
		}

		.leftNavsidebar {
			position: fixed;
			overflow-y: scroll;
			background: #f8f8f8;
			height: 100vh;
			left: 0;
			width: 85px;

			.homepageLeftFixed {
				font-size: 11pt;
				margin-bottom: 96px;
				color: #707070;
				font-weight: 500;
				background: #f9f9f9;
				padding-bottom: 15px;
			}

			.homepageLeft {
				color: #000;
				text-align: center;
				line-height: 1.4;
				position: relative;
				font-size: 28rpx;
				padding: 20px 12px 20px 8px;
			}
			
			.homepageLeft-info {
				position: absolute;
				top: 5px;
				right: 10px;
				width: 10px;
				height: 10px;
				font-size: 12px;
				font-weight: 500;
				line-height: 14px;
				color: #fff;
				text-align: center;
				white-space: nowrap;
				border: 1px solid #fff;
				border-radius: 16px;
				transform: translateX(50%);
				box-sizing: border-box;
				transform-origin: 100%;
			}

			.activeCanteen {
				background: #FFFFFF !important;
			}

			// .van-sidebar {
			// 	bottom: 0;
			// 	padding: 0 0 54px;
			// }

			// .van-hairline--top-bottom::after {
			// 	border-width: 0;
			// }
		}

		.van-sidebar-item--select::after {
			border-right: none;
		}

		.goodBox1 {
			padding: 8px;
			box-sizing: border-box;
			margin-left: 85px;
			background: #fff;
			overflow: hidden;
			height: 90vh;
			.menus {
				height: 100%;
				overflow: hidden;
				.goodBox-row {
					display: flex;
					flex-wrap:wrap;
				
					:nth-child(2n).goodBox-col {
						margin-left: 6px;
					}
				}
			}
			
		}
	}
</style>
