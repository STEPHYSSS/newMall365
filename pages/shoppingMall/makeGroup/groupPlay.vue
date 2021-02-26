<template>
	<view>
		<uni-nav-bar :fixed="true" left-icon="back" @clickLeft="clickLeft" title="多人拼团玩法" :status-bar="true" :shadow="false"></uni-nav-bar>
		<div class="container">
		        <div class="guide content">
		            <div class="tip">
		                <h3 class="font-size-14 bold">什么是多人拼团？</h3>
		                <p class="font-size-14">多人拼团（以下简称：拼团）是指由多人一起拼单购买的团购活动，通过拼团买家可以享受比一般网购更低的折扣。</p>
		            </div>
		            <div class="tip">
		                <h3 class="font-size-14 bold">怎样算拼团成功？</h3>
		                <p class="font-size-14">
		                    在拼团有效期内找到满足人数的好友参加拼团，即可算拼团成功。		           
		                </p>
		            </div>
		            <div class="tip">
		                <h3 class="font-size-14 bold">拼团失败，怎样退款？</h3>
		                <p class="font-size-14">若拼团有效期内没有凑齐人数，即算作拼团失败。系统会自动将所支付的货款原路退回，具体到账时间以各银行为准。</p>
		            </div>
		            <div class="tip pic-container">
		                <h3 class="font-size-14 bold">拼团流程</h3>
		                <div class="font-size-14 center">
		                    <img src="@/static/img/steps2@2x.png">
		                </div>
		            </div>
		        </div>
		    </div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.flag); //打印出上个页面传递的参数。		   
		},
		methods: {
			clickLeft(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style>
	@import url("@/assets/css/groupPlay/base_977977040fe04de93f0ef6d014d68420.css");
	@import url("@/assets/css/groupPlay/guide_e59fd5ad75eab66ee293587eef14fb82.css");
</style>
