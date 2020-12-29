<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="我的地址" :status-bar="true" :shadow="false"></uni-nav-bar>
		<!-- GetAddressList获取地址  SetAddress添加地址 -->
		<view v-if="!areaList.length" class="no-address-tips">
			<view class="mb-30">暂无地址信息</view>
			<view>请点击底部按钮添加地址信息</view>
		</view>
		<view class="yes-address">
			<view class="addressBox">
				<radio-group class="bottom-area" ref="checkboxAreaRef" @change="changeGroup">
					<div v-for="(item,index) in areaList" :key="index" class="bottom-area__box" @click="handleSwipeClick(item.SID)">
						<div class="bottom-area__info" @click="changeArea(item,index)">
							<div class="areaName">{{item.Address}}&nbsp;{{item.House}}</div>
							<div class="bottom-area__phone">
								{{item.Name}}
								<span v-if="item.Sex">{{item.Sex | setSex}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
								<span>{{item.Mobile?item.Mobile:item.Tel}}</span>
							</div>
						</div>
						<span v-if="radioModes===2" class="icon iconfont icon-bianji bottom-area__icon" @click.stop="clickEdit(item)"></span>
					</div>
				</radio-group>
			</view>
			<view class="btn-box">
				<button type="primary" size="default" @tap="add">新增地址</button>
			</view>
			<uni-popup ref="addEditArea" v-model="addEditArea" position="bottom" class="confirm-area-popup">
				<a-receive-address v-if="addEditArea" @clickGo="clickGo" :radioModes="radioModes" :areaInfo="areaInfo" @saveArea="saveAreaSet"
				 :currentDeliveryType="currentDeliveryType"></a-receive-address>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import { vipCard } from "@/api/http.js";
	export default {
		data() {
			return {
				showAreaList: false,
				radioModes: 2,
				addEditArea: false,
				resultArea: "",
				areaList: [],				
				areaInfo: {},// 编辑的地址
				is_choose:false,//是否选择了地址
				currentDeliveryType: "",//当前的配送类型
			}
		},
		created() {
			this.saveArea()
		},
		methods: {
			clickLeft(){
				if(this.$Route.query.flag == 'login'){
					this.$Router.push('/pages/shoppingMall/login')
				}else if(this.$Route.query.flag == 'towaimai'){
					this.$Router.push('/pages/shoppingMall/menu_naixue/menu/menu')
				}else{
					this.$Router.push('/pages/home')
				}
				
			},
			changeGroup(val) {
				this.resultArea = val.detail.value
			},
			add(){
				// this.addEditArea = true;
				this.areaInfo = {};
				this.addEditArea = true;
				this.$refs.addEditArea.open()
			},
			clickEdit(val) {
				this.areaInfo = val;
				this.$refs.addEditArea.open()
				this.addEditArea = true;
			},
			//删除地址
			handleSwipeClick(id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除？',
					success: res => {
						if(res.confirm) {
							console.log(res.confirm)
							const index = this.areaList.findIndex(item => item.SID == id)
							const addresses = JSON.parse(JSON.stringify(this.areaList))
							addresses.splice(index, 1)
						}
					}
				})
			},
			async saveArea() {
				// console.log(bool)
				try {
					let type = '1';
					if (this.currentDeliveryType.indexOf("2") > -1) {
						type = 1;
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						type = 2;
					}
					let {
						Data
					} = await vipCard({
							Action: "GetAddressList",
							Type: type
						},
						"UMemberOpera"
					);
					// if(bool){
					// 	uni.showLoading()
					// }
					this.areaList =  Data.AddressList;
				} catch (e) {
					return [];
				}
			},
			async changeArea(val, index) {
				this.showAreaList = val.SID
				let api;
				if (this.radioModes === 1) {
					api = "IsPickShop";
				} else {
					if (this.currentDeliveryType.indexOf("2") > -1) {
						//外卖
						api = "CalcFreight";
					} else if (this.currentDeliveryType.indexOf("3") > -1) {
						//物流
						api = "CalcLogistics";
					}
				}
				try {
					this.loading = true;
					uni.showLoading()
					let currentItems = JSON.parse(this.currentItem);
					let obj = {
						Action: api,
						ProdList: this.currentItem,
						Latitude: val.Latitude || "",
						Longitude: val.Longitude || "",
						Province: val.Province || "",
						PayType: this.radioPayType,
						PrefNo: this.radioDiscount === "undefined" ? "" : this.radioDiscount,
						ShopSID: val.SID
					};
			
					if (currentItems[0].hasOwnProperty("PromotionItemSID")) {
						// 活动
						obj.PromotionItemSID = currentItems[0].PromotionItemSID;
					}
					let {
						Data
					} = await vipCard(obj, "UProdOpera");
					this.currentArea = val;
					this.showAreaList = false;
					this.$refs.showAreaList.close()
					this.resultArea = val.SID;
					this.areaList.splice(index, 1);
					this.areaList.unshift(val);
					//改变位置，重新算运费和总价
					this.freight = Data.Freight;
					this.totalCurrent = parseFloat(Number(Data.SumTotal).toFixed(2));
			
					this.loading = false;
					uni.hideLoading()
				} catch (e) {
					this.loading = false;
					uni.hideLoading()
				}
			},
		}
	}
</script>

<style>
@import '@/pages/myAddress/address.css';
</style>
