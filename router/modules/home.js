const home = [{
		path:'/pages/shoppingMall/login',	
		// aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
		name: 'login',
		meta: {
			title: '首页',
		}
	},
	{
		path: '/pages/shoppingMall/index',	
		// aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
		name: 'shoppingMallHome',
		meta: {
			title: '商城',
		}
	},
	{
		path: '/pages/shoppingMall/menu_naixue/menu/menu',
		name: 'menu',
		meta: {
			title: '点餐',
		}
	},
	{
		path: '/pages/error/index',
		name: 'error',
		meta: {
			title: '错误页面',
		}
	}, {
		path: '/pages/home',
		name: 'vip',
		meta: {
			title: '会员中心',
		}
	},
	{
		path: '/pages/shoppingMall/shoppingCart/index',
		name: 'shoppingCart',
		meta: {
			title: '购物车',
		}
	},
	{
		path: '/Grant',
		name: 'Grant',
		meta: {
			title: '授权页面',
		}
	}, {
		path: '/GrantMiddle',
		name: 'GrantMiddle',
		meta: {
			title: '授权页面',
		}
	},
	{
		path: '/pages/homePage/homePage',
		name: 'homePage',
		aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
		meta: {
			title: '授权页面',
		}
	}
]
export default home
