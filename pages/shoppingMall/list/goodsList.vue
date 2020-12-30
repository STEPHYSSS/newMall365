<template>
	<view>
		<div class="backgroundFF">
			<div>
				<!-- 搜索栏 -->
				<uni-nav-bar :status-bar="true" @clickLeft="clickLeft" :shadow="false" :fixed="true" left-icon="back">
					<uni-search-bar cancelButton="none" clearButton="none" style="width:100%" placeholder="请输入搜索关键词"
					@confirm="searchGood" v-model="search" :radius="50"></uni-search-bar>
					<div slot="right">
						<div class="headRight"></div>
					</div>
				</uni-nav-bar>
				<!-- 左侧类别 -->
				<div class="leftNavsidebar" v-if="sidebarList.length>0">
					<view :class="['homepageLeftFixed']">
						<div @click="clickMenu(index,item)" :class="['homepageLeft',index===currentIndex?'activeCanteen':'']" 
						v-for="(item,index) in sidebarList" :key="index">
							<span >{{item.Name}}</span>
						</div>
					</view>
				</div>	
				<!-- 右侧商品 -->
				<div class="goodBox1">
					<scroll-view class="menus" :scroll-into-view="menuScrollIntoView" scroll-with-animation scroll-y>
						<div class="goodBox-row" gutter="5">
							<div class="goodBox-col" v-for="(item,index) in rightGoodsList" :key="index">
								<a-good-box :itemData="item" :imgHeight="imgHeight" @goodBox="goodBox" @addCart="addCart(item)"></a-good-box>
							</div>
						</div>
					</scroll-view>
				</div>
			</div>
		</div>
	</view>
</template>
<script>
	import { vipCard } from "@/api/http.js";
	export default{
		data(){
			return{
				show: false,
				tabShow:true,
				loading:true,
				currentIndex: 0,
				imgHeight: '',
				imgHeightLine: '',
				search:'',//搜索名称
				CateSID:'',
				searchName:'',//商品大类搜索
				menuScrollIntoView: '',
				sidebarList:[],//分类列表
				rightGoodsList:[],//右侧商品列表
			}
		},
		async created(){
			if(this.$route.query.query){
				let getDecode = decodeURIComponent(this.$route.query.query);
				let getDQuery = JSON.parse(getDecode);
				this.CateSID= getDQuery.SID;
			}
			this.imgHeight = (uni.getSystemInfoSync().windowWidth- 22 - 85) / 2 + "px";
			await this.getCouponList();
			this.$store.commit("SET_HISTORY_URL", {path:'/pages/shoppingMall/list/goodsList'})
		},
		methods:{
			// this.prodInfo = this.currentObj._Prod_Data.filter(D=>D.CateSID === item.SID);	
			async getCouponList(){//获取商品树列表
				let Name = "";
				if(this.$route.query.searchName){
					Name = this.$route.query.searchName;
				}else if(this.search!=''){
					Name = this.search;
				}else{
					Name = "";
				}
				try {
					let { Data } = await vipCard({
						Action: "GetTreeProdList",
						SID:this.$store.state.currentStoreInfo.SID,//门店id
						CateSID:this.CateSID,
						Name:Name
					}, "UProdOpera");
					this.sidebarList = Data.CateList;
					console.log(this.sidebarList,'suos')
					this.rightGoodsList = this.sidebarList[0].children;
				} catch (e) {
					this.$toast(e)
				}
			},
			clickMenu(index,item){
				this.currentIndex = index;
				this.rightGoodsList = item.children.filter(D=>D.CateSID === item.SID);
			},
			searchGood(val){//当前页面搜索
				this.search = val.value;
				this.getCouponList()
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
							ShopSID:currentStore?currentStore.data.SID:''
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
		}
	}
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