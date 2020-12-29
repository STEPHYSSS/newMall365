<template>
	<div :class="mainStyle">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickGo" title="订单列表" :status-bar="true" :shadow="false"></uni-nav-bar>
		<ms-tabs :list="list" v-model="active" :lineColor="mainColor" :itemColor="mainColor"></ms-tabs>
		<a-orderBox :dataList="fromData" v-if="!loading"></a-orderBox>
	</div>
</template>

<script>
	import {
		vipCard
	} from "@/api/http.js";
	export default {
		data() {
			return {
				active: null,
				fromData: [],
				fromData0: [],
				loading: true,
				mainColor: getApp().globalData.mainColor,
				mainStyle: getApp().globalData.mainStyle,
				list: [{
						title: '全部'
					}, {
						title: '待付款'
					},
					{
						title: '已付款'
					},
					{
						title: '已提货'
					},
					{
						title: '已取消'
					}
				],
				State:'',//tab栏状态
				OrderType:'',//订单状态
			};
		},
		onLoad(option) {
			// 1、待支付 2、已支付3、已提货 0.全部 4、已取消
			this.active = Number(this.$Route.query.id) || 0;
			// if (sessionStorage.getItem("orderBoxNav")) {
			// 	this.active = sessionStorage.getItem("orderBoxNav")
			// }			
			this.getList();
		},
		methods: {
			onClick(name, title) {
				setFilter(name, this);
			},
			async getList() {
				try {
					let {
						Data
					} = await vipCard({
							Action: "GetOrderList",
							OrderType:this.OrderType?this.OrderType:''
						},
						"UOrderOpera"
					);
					this.allfromData = Data.OrderList;
					
					   // this.allfromData = [
					   //   { State: "-2" },
					   //   { State: "-1" },
					   //   { State: "0" },
					   //   { State: "1" },
					   //   { State: "2" },
					   //   { State: "3" },
					   //   { State: "4" }
					   // ];
					this.fromData = Data.OrderList;
					setFilter(this.active, this);
					this.loading = false;
				} catch (e) {
					this.loading = false;
				}
			},
			clickGo() {
				this.$Router.pushTab({
					path: "/pages/home"
				});
			}
		},
		watch: {
			active(val){
				this.loading = true;
				setTimeout(()=>{
					this.loading=false;
					setFilter(val, this);
				},200)
				
			}
		}
	};

	function setFilter(num, _this) {
		let arr = [];
		if (!_this.allfromData || _this.allfromData.length === 0) {
			_this.fromData = []
			return
		}
		if (num == "0") {
			arr = _this.allfromData;
		} else {
			if (num == "1") {
				arr = _this.allfromData.filter(item => item.State == "-1");
			} else if (num == "2") {
				arr = _this.allfromData.filter(
					item => item.State == "0" || item.State == "1" || item.State == "-2"
				);
			} else if (num == "3") {
				arr = _this.allfromData.filter(item => item.State == "3");
			}else if(num == '4'){
				arr = _this.allfromData.filter(item => item.State == "-3");
			}
			
		}
		_this.fromData = arr;
	}
</script>

<style scoped>
</style>
