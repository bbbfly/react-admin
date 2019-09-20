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
    {
        title:'图表展示',
        key:'/charts',
        icon: 'file',
        children:[
            {
                title:'柱状图',
                key:'/charts/bar',
                icon:'file'
            },
            {
                title:'饼图',
                key:'/charts/pie',
                icon:'file'
            },
            {
                title:'折线图',
                key:'/charts/line',
                icon:'file'
            },
        ]
    },
    {
        title:'学习react-redux',
        key:'/study',
        icon:'tool',
        children:[
            {
                title:'context',
                key:'/study/context',
                icon:'file'
            },
            {
                title:'react-redux',
                key:'/study/redux',
                icon:'file'
            },
            {
                title:'bubble-sort',
                key:'/study/bubble',
                icon:'file'
            },
            {
                title:'quick-sort',
                key:'/study/quick',
                icon:'file'
            },

            {
                title:'insert-sort',
                key:'/study/insert',
                icon:'file'
            },
            {
                title:'selection-sort',
                key:'/study/select',
                icon:'file'
            },{
                title:'binary-tree',
                key:'/study/binary',
                icon:'file'
            },{
                title:'css 3d 轮播图',
                key:'/study/carousel',
                icon:'file'
            }
        ]
    }
]

export default menuList