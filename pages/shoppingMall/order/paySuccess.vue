<template>
  <div :class="mainStyle">
    <div class="noOder">
      <image style="width:300rpx;height: 300rpx;" src="@/static/assets/img/paySuccess.png" alt />
      <br />
      <div style="margin-top:10px;color:#777">{{$route.query.error?'支付失败':'您已支付成功'}}</div>
      <button @click="clickOrderPage" type="main" style="margin-top:60px">返回订单列表</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
	  return{
		  mainStyle:getApp().globalData.mainStyle
	  }
  },
  created() {
  },
  methods: {
    clickOrderPage() {
      this.$Router.push({
        path: "/pages/vip/allMyOrder",
        query: {
          id: "0"
        }
      });
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