import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
const base = ''
//全局请求拦截器 
axios.interceptors.request.use((config) => {
    const { method , data } = config
    if ( method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config
})
// 全局响应拦截器
axios.interceptors.response.use( res => {
    return res.data
},err => {
    message.error(err.message)
    return new Promise(()=>{})
})
// 登录
export const reqLogin = (username,password) => {
    return axios({
                url: base + '/login',
                method:'POST',
                data:{
                    username,
                    password
                }
           })
}
// 获取分类列表
export const reqCategorys = () => (
    axios({
        url: base + '/manage/category/list'
    })
)
 // 新增分类
export const reqAddCategory = (categoryName) => (
    axios({
        url:base+'/manage/category/add',
        method:'POST',
        data:{
            categoryName
        }
    })
)
// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => (
    axios({
        url:base+'/manage/category/update',
        method:'POST',
        data:{
            categoryId,
            categoryName
        }
    })
)

// 获取商品列表
export const reqProductList = (pageNum,pageSize) => {
    return axios.get(base+'/manage/product/list',
        {
            params:{
                pageNum,
                pageSize
            }
        }
    )
}

// ## 11. 根据Name/desc搜索产品分页列表
// ### 请求URL：
//     http://localhost:5000/manage/product/search?pageNum=1&pageSize=5&productName=T
export const reqSearchProductList = ({
    pageNum,pageSize,keywords,searchType
}) => {
    return axios.get(
        base+'/manage/product/search',
        {
            params:{
                pageNum,
                pageSize,
                [searchType]:keywords
            }
        }
        
    )
}

// ## 15. 对商品进行上架/下架处理
// ### 请求URL：
//     http://localhost:5000/manage/product/updateStatus

// ### 请求方式：
//     POST

// ### 参数类型:

//     |参数		      |是否必选 |类型     |说明
//     |productId    |Y       |string   |商品名称
//     |status       |Y       |number   |商品状态值

export const updateProductStatus = (productId,status) => {
    debugger
    return axios({
        url:base+'/manage/product/updateStatus',
        method:'POST',
        data:{
            productId,status
        }
    })
}
// ## 17. 删除图片
// ### 请求URL：
//     http://localhost:5000/manage/img/delete

export const deleteImage = (name) => (
    axios({
        url: base + '/manage/img/delete',
        method:'POST',
        data:{
            name
        }
    })
)

// ## 13. 添加商品
// ### 请求URL：
//     http://localhost:5000/manage/product/add

// ### 请求方式：
//     POST

// ### 参数类型:
//     |参数		       |是否必选 |类型     |说明
//     |categoryId    |Y       |string   |分类ID
//     |name          |Y       |string   |商品名称
//     |desc          |N       |string   |商品描述
//     |price         |N       |string   |商品价格
//     |detail        |N       |string   |商品详情
//     |imgs          |N       |array   |商品图片名数组

export const reqAddProduct = (product) => (
    axios({
        url:base+ '/manage/product/add',
        method:'POST',
        data: product
    })
)

// ## 14. 更新商品
// ### 请求URL：
//     http://localhost:5000/manage/product/update

// ### 请求方式：
//     POST

// ### 参数类型:
//     |参数		       |是否必选 |类型     |说明
//     |_id           |Y       |string   |商品ID
//     ...... 同上
export const reqUpdateProduct = (product) => (
    axios({
        url:base + '/manage/product/update',
        method:'POST',
        data:product
    })
)