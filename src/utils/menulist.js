const menuList = [
    {
        title:'首页',
        key : '/home',
        icon: 'home'
    },
    {
        title:'商品',
        key : '/products',
        icon: 'tool',
        children:[
            {
                title:'品类管理',
                key : '/category',
                icon: 'file'
            },
            {
                title:'商品管理',
                key : '/product',
                icon: 'file'
            },
        ]
    },
    {
        title:'用户',
        key : '/user',
        icon: 'user'
    },
    {
        title:'权限管理',
        key : '/role',
        icon: 'file'
    },
]

export default menuList