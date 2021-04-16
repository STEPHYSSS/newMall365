<!-- <script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></script> -->
<script>
	import Cookie from '@/config/cookie-my/index.js'
	
	export default {
		onLaunch: function() {
			let mainStyle = getApp().globalData.mainStyle
			if (mainStyle === 'theme2') {
				let mainColor = 'rgb(173,184,56)'
				// let mainColor = Cookie.get('mallColor')
				// window.document.documentElement.setAttribute( "theme", mainColor );
				// uni.setNavigationBarColor({
				// 	frontColor: '#ffffff',
				// 	backgroundColor: '#8d8bdb'
				// })

				uni.setTabBarStyle({
					color: '#646566',
					selectedColor: mainColor
				})
				uni.setTabBarItem({
					index: 0,
					text: '首页',
					iconPath: 'static/img/shangcheng1.png',
					selectedIconPath: 'static/img/select-shangcheng1.png'
				})
				uni.setTabBarItem({
					index: 1,
					text: '点餐',
					iconPath: 'static/img/drink.png',
					selectedIconPath: 'static/img/drink_selected2.png'
				})
				uni.setTabBarItem({
					index: 2,
					text: '个人中心',
					iconPath: 'static/img/home.png',
					selectedIconPath: 'static/img/select-home1.png'
				})
				uni.setTabBarItem({
					index: 3,
					text: '购物车',
					iconPath: 'static/img/gouwuche.png',
					selectedIconPath: 'static/img/select-gouwuche1.png'
				})
				uni.setTabBarItem({
					index: 4,
					text: '自定义模块',
					iconPath: 'static/img/home.png',
					selectedIconPath: 'static/img/select-home1.png'
				})
				// uni.setTabBarItem({
				// 	index: 0,
				// 	text: '自定义模块',
				// 	iconPath: 'static/img/home.png',
				// 	selectedIconPath: 'static/img/select-home1.png'
				// })
				// uni.setTabBarItem({
				// 	index: 1,
				// 	text: '购物车',
				// 	iconPath: 'static/img/gouwuche.png',
				// 	selectedIconPath: 'static/img/select-gouwuche1.png'
				// })
				// uni.setTabBarItem({
				// 	index: 2,
				// 	text: '个人中心',
				// 	iconPath: 'static/img/home.png',
				// 	selectedIconPath: 'static/img/select-home1.png'
				// })
				getApp().globalData.mainColor = mainColor
				Cookie.set('mainColor', mainColor)
			}
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		},
		mounted() {
		},
		globalData: {
			// getApp().globalData.mainStyle   主模板
			mainStyle: '',
			mainColor: Cookie.get('mainColor'),
			ShopRadio: Cookie.get('ShopRadio'),//商城模式
			
		},
	};
</script>
<style>
</style>

<style lang="less">
	@import "./assets/css/theme.less";
	body {
		background: #f9f9f9;
		font-size: 12px;
	}

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */

	.theme1 {
		.theme(); //默认的样式
	}

	.theme2 {
		// .theme(rgb(141, 139, 219), pink, #eee, rgba(141, 139, 219, 0.5));
		.theme(rgb(173,184,56), pink, #eee, rgba(173,184,56, 0.5));
		// .theme();
	}

	.theme3 {
		.theme(rgb(172, 214, 200), #615f5f, #333, rgb(91, 139, 123));
	}

	body {
		background: #f9f9f9;
		font-size: 12px;
	}

	a {
		text-decoration: none;
	}

	/*正常的未被访问过的链接*/
	a:link {
		text-decoration: none;
	}

	/*已经访问过的链接*/
	a:visited {
		text-decoration: none;
	}

	/*鼠标划过(停留)的链接*/
	a:hover {
		text-decoration: none;
	}

	/* 正在点击的链接，鼠标在元素上按下还没有松开*/
	a:active {
		text-decoration: none;
	}

	/* 获得焦点的时候 鼠标松开时显示的颜色*/
	a:focus {
		text-decoration: none;
	}

	// a:link,
	// a:visited,
	// a:hover,
	// a:active {
	// 	color: #000 !important;
	// }

	// #app {
	// 	font-family: "Avenir", Helvetica, Arial, sans-serif;
	// 	-webkit-font-smoothing: antialiased;
	// 	-moz-osx-font-smoothing: grayscale;
	// 	color: #2c3e50;
	// }

	// #nav {
	// 	padding: 30px;

	// 	a {
	// 		font-weight: bold;
	// 		color: #2c3e50;

	// 		&.router-link-exact-active {
	// 			color: #42b983;
	// 		}
	// 	}
	// }

</style>
