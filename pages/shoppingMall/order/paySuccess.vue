<template>
  <div :class="mainStyle">
    <div class="noOder">
      <image style="width:300rpx;height: 300rpx;" src="@/static/assets/img/paySuccess.png" alt />
      <br />
      <div style="margin-top:10px;color:#777">{{$route.query.error?'支付失败':'您已支付成功'}}</div>
      <button @click="clickOrderPage" type="main" style="margin-top:60px">{{message}}</button>
    </div>
  </div>
</template>

<script>
 import Cookies from '@/config/cookie-my/index.js';
export default {
  name: "index",
  data(){
	  return{
		  mainStyle:getApp().globalData.mainStyle,
		  message:"",
		  historyUrl:Cookies.get('historyUrl') || {},
	  }
  },
  created() {
	  // 返回订单列表
	  let PathV = Object.values(this.historyUrl)[0]
	  if(PathV == '/pages/vip/weiFull'){
		this.message = "返回"
	  }else if(PathV == '/pages/packages/detail'){
		this.message = "返回权益列表"
	  }else{
		  this.message = "返回订单列表"
	  }
  },
  methods: {
    clickOrderPage() {
		let PathV = Object.values(this.historyUrl)[0]
		if(PathV == '/pages/vip/weiFull'){//微卡充值支付
			this.$Router.push({path:'/pages/home'})
		}else if(PathV == '/pages/packages/detail'){//会员权益支付
			this.$Router.push({path:'/pages/vip/interests/interests'})												
		}else{
			this.$Router.push({
				path: "/pages/vip/allMyOrder",
				query: {
				  id: "0"
				}
			});
		}
    }
  }
};
</script>

<style scoped>
.noOder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>