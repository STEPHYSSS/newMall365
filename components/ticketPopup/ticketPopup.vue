<template>
	<view v-if="getCoupon.length>0">
		<div v-show="showPopu" class="popSty"></div>
		<div class="activeBox" v-show="showPopu">
			<!-- <image src="../../static/img/ticketBoxS.png" style="width: 100%;height: 100%;"></image> -->
			<image src="@/static/img/close.png" class="close" @click="close"></image>
			<div class="ticketPart">
				<h3>进店送券</h3>
				<div class="Box">
					<div class="smallbox" v-for="(item,index) in getCoupon" :key="index">
						<span>¥{{item.TakeMoney}}</span>
						<div style="float: right;width: 61%;margin-top: 12px;">
							<p style="font-weight: 800;font-size: 14px;">{{item.TypeName}}</p>
							<!-- <p>{{item.TakeDisc}}</p> -->
							<p style="position: absolute;bottom: 15px;">{{item.StartTime|fomartData}}-{{item.ValidTime|fomartData}}</p>
						</div>
					</div>
				</div>
				<p class="receive" @click="close">立即使用</p>
			</div>
		</div>
		<!-- <popup-layer type="center" :show-pop="cartPopupVisible">
			<template slot="content" type="center">
				进店送券活动弹窗
			</template>
		</popup-layer> -->
	</view>
</template>

<script>
	import { vipCard } from '@/api/http.js';
	export default {
		data() {
			return {
				showPopu:true,
				// getCoupon:[{
				// 	ticketNo:'001',
				// 	Name:'进店有礼',
				// 	disc:'100元生日蛋糕券',
				// 	time:'2020.11.12-2020-11.30',
				// 	price:'100'					
				// },{
				// 	ticketNo:'001',
				// 	Name:'进店有礼',
				// 	disc:'100元生日蛋糕券',
				// 	time:'2020.11.12-2020-11.30',
				// 	price:'100'					
				// },{
				// 	ticketNo:'001',
				// 	Name:'进店有礼',
				// 	disc:'100元生日蛋糕券',
				// 	time:'2020.11.12-2020-11.30',
				// 	price:'100'					
				// }]
			};
		},
		components: {
		},
		props:['getCoupon'],
		methods:{
			close(){
				this.showPopu = false;
			},
		},
		filters:{
			fomartData(value){
				if (value) {
				      return value.slice(0, 10)
				    }
			}
		}
	}
</script>

<style lang="less">
	.popSty{
		background-color: #4C4C4C;
		z-index: 999;
		display: block;
		height: 100vh;
		width: 100vw;
		position: flex;
		position: fixed;
		top: 0;
		opacity: 0.5;
	}
	.activeBox{
		width: 100%;
		height: 415px;
		position: fixed;
		top: 14%;
		z-index: 1000;
		background-image: url(../../static/img/ticketBoxS.png);
		background-size: 100% 100%;
		.close{
			width: 35px;
			height: 35px;
			position: absolute;
			right: 13px;
			top: 60px;
		}
	}
	.ticketPart{
		position: absolute;
		top: 30%;
		left: 10%;
		width: 80%;
		.receive{
			width: 150px;
			height: 36px;
			letter-spacing: 4px;
			background-color: orange;
			color: rgb(255, 255, 255);
			margin: 10px auto;
			text-align: center;
			line-height: 36px;
			font-size: 16px;
			border-radius: 16px;
			box-shadow: 0px 0px 4px 1px #f1a979;
		}
	}
	h3{
		color: #fff;
		font-size: 18px;
		text-align: center;
		letter-spacing: 4px;
		margin-bottom: 18px;
	}
	.Box{
		overflow-y: scroll;height: 172px;
	}
	.smallbox{
		background-image: url(../../static/img/smallticket.png);
		background-size: 100% 100%;
		width: 90%;
		height: 86px;
		margin: 0 auto;
		position: relative;
		span{
			position: absolute;
			top: 25%;
			left: 11%;
			font-size: 15px;
			font-weight: 600;
			color: red;
			width: 38px;
			/* border: 1px solid; */
			text-align: center;
		}
	}
	/deep/.popup-layer{
		z-index: 999 !important;
	}
	/deep/.popup-content{
		z-index: 1000;
	}
	/deep/.popup-content{
		display: inline-block;
		width: 200px;
		height: 200px;
		background-color: skyblue;
	}

</style>
