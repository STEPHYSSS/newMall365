<template>
	<view class="leagueList">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="团员情况" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="list" v-for="(item,index) in list" :key="index">
			<div class="listBox">
				<image :src="item.img"></image>
				<span class="captain" v-if="item.isStatus==='1'">团长</span>
				<view style="flex: 1;">
					<p class="userName">
						<template>
							{{item.user?item.user.replace(/(?<=...)./g, '*'):""}}
						</template>
					</p>
					<p class="Time">{{item.time}}&nbsp;{{item.isStatus|isStatus}}</p>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					img:"https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
					user:'stephy',
					time:'2021-02-01 15:59:07',
					isStatus:'1'
				},{
					img:"https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png",
					user:'stephy2',
					time:'2021-02-01 15:59:07',
					isStatus:'2'
				}]
			}
		},
		methods: {
			clickLeft(){}
		},
		filters:{
			isStatus(val){
				if(val=='1'){
					return '开团'
				}else{
					return '参团'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.leagueList{
		background-color: #fff;
	}
	.list{
		margin: 10px 15px 0;
		.listBox{
			display: flex;
			padding-bottom: 10px;
			position: relative;
			.captain{
				position: absolute;
				bottom: 10px;
				left: 6px;
				display: inline-block;
				border: 1px solid red;
				color: #eee;
				background-color: #ef3434;
				border-radius: 20px;
				padding-left: 5px;
				padding-right: 5px;
			}
		}
		image{
			width:45px;
			height: 45px;
			border-radius: 50px;
			margin-right: 5px;
			border: 2px solid #ffcbcb;
		}
		.userName{
			font-size: 15px;
			margin-bottom: 6px;
		}
		.Time{
			color: #bdbdbd;
		}
	}
</style>
