<template>
	<view class="leagueList">
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="团员情况" :status-bar="true" :shadow="false"></uni-nav-bar>
		<view class="list" v-for="(item,index) in list" :key="index">
			<div class="display:flex">
				<image :src="item.img"></image>
				<view style="flex: 1;">
					<p>{{item.user}}</p>
					<p>{{item.time}}&nbsp;{{isStatus|isStatus}}</p>
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
		background-color: #FFF7CC;
	}
	.list{
		margin-left: 15px;
		margin-top: 10px;
		background-color: #fff;
		image{
			width:45px;
			height: 45px;
			border-radius: 50px;
		}
	}
</style>
