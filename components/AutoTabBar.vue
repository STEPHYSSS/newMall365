<template>
    <view class="uni-tabbar">
        <view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
            <view class="icon" :class="[item.fontIcon , item.pagePath == pagePath?'uni-active':'']"></view>
            <!-- 上面使用的是字体图标，解决切换页面的时候图标会闪的效果，毕竟每切换一个页面都会闪一下不太好看，可以切换使用下面的图片方式 -->
            <view v-if="false" class="uni-tabbar__bd">
                <view class="uni-tabbar__icon">
                    <image v-if="item.pagePath == pagePath" class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.selectedIconPath"></image>
                    <image v-else class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.iconPath"></image>
                </view>
            </view>
            <view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
                {{item.text}}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            pagePath: null
        },
        data() {
            return {
                page: 'contact',
                showPage: false,
                containerHeight: 400,
                tabbar: [],
				ShopRadio:localStorage.getItem("ShopRadio")
            };
        },
        mounted() {
            // true为判断条件，根据实际的需求替换即可
            if(this.ShopRadio === '1') {
				this.tabbar = [{
						"pagePath": "/pages/shoppingMall/login",
						'text': '首页',
						'iconPath': 'static/img/shangcheng1.png',
						'selectedIconPath': 'static/img/select-shangcheng1.png'
					}, {
						"pagePath": "/pages/shoppingMall/menu_naixue/menu/menu",
						'text': '点餐',
						'iconPath': 'static/img/drink.png',
						'selectedIconPath': 'static/img/drink_selected2.png'
					}, {
						"pagePath": "/pages/home",
						'text': '个人中心',
						'iconPath': 'static/img/home.png',
						'selectedIconPath': 'static/img/select-home1.png'
					}]
     //            this.tabbar.splice(1,0,
					// {
					// 	"pagePath": "/pages/shoppingMall/index",
					// 	"text": '自定义首页',
					// 	"iconPath": 'static/img/home.png',
					// 	"selectedIconPath": 'static/img/select-home1.png',
					// 	"fontIcon": "static/img/home.png"
					// },
					// {
					// 	"pagePath": "/pages/shoppingMall/list/goodsList",
					// 	"text": '商品',
					// 	"iconPath": 'static/img/home.png',
					// 	"selectedIconPath": 'static/img/select-home1.png',
					// 	"fontIcon": "static/img/home.png"
					// },
					// {
					// 		"pagePath": "/pages/shoppingMall/shoppingCart/index",
					// 		"text": '购物车',
					// 		"iconPath": 'static/img/gouwuche.png',
					// 		"selectedIconPath": 'static/img/select-gouwuche1.png',
					// 		"fontIcon": "icon-shouye"
					// },
					// {
					//     "pagePath": "/pages/home",
					//     "iconPath": 'static/img/home.png',
					//     "selectedIconPath": 'static/img/select-home1.png',
					//     "text": "个人中心",
					// 	"fontIcon": "icon-shouye"
					// }
     //            )
            }
			else{
				this.tabbar = [
					{
						"pagePath": "/pages/shoppingMall/index",
						"text": '商城首页',
						"iconPath": 'static/img/home.png',
						"selectedIconPath": 'static/img/select-home1.png',
						"fontIcon": "static/img/home.png"
					},
						{"pagePath": "/pages/shoppingMall/list/goodsList",
						"text": '商品',
						"iconPath": 'static/img/home.png',
						"selectedIconPath": 'static/img/select-home1.png',
						"fontIcon": "static/img/home.png"
					},
					{
							"pagePath": "/pages/shoppingMall/shoppingCart/index",
							"text": '购物车',
							"iconPath": 'static/img/gouwuche.png',
							"selectedIconPath": 'static/img/select-gouwuche1.png',
							"fontIcon": "icon-shouye"
					},
					{
					    "pagePath": "/pages/home",
					    "iconPath": 'static/img/home.png',
					    "selectedIconPath": 'static/img/select-home1.png',
					    "text": "个人中心",
						"fontIcon": "icon-shouye"
					}]
			}
        },
        methods: {
            changeTab(item) {
                this.page = item.pagePath;
　　　　　　　　　　// 这里使用reLaunch关闭所有的页面，打开新的栏目页面
                uni.reLaunch({
                    url: this.page
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

    [nvue] uni-scroll-view, [nvue] uni-swiper-item, [nvue] uni-view {
        flex-direction: unset;
    }
    [nvue-dir-column] uni-swiper-item, [nvue-dir-column] uni-view {
        flex-direction: unset;
    }
    .uni-tabbar {
        position: fixed;
        bottom: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 50px;
        padding: 16upx 0;
        box-sizing: border-box;
        // border-top: solid 1upx #ccc;
        background-color: #fff;
        box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
        .uni-tabbar__item {
            display: block;
            line-height: 24upx;
            font-size: 20upx;
            text-align: center;
        }
        .uni-tabbar__icon {
            height: 42upx;
            line-height: 42upx;
            text-align: center;
        }
        .icon {
            display: inline-block;
        }
        .uni-tabbar__label {
            line-height: 24upx;
            font-size: 24upx;
            color: #999;
            &.active {
                color: #1ca6ec;
            }
        }
    }
</style>