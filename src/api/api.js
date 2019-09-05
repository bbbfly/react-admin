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
export const reqProductList = (pageNum,pageSize) => (
    axios({
        url:base+'/manage/product/list',
        data:{
            pageNum,
            pageSize
        }
    })
)

// ## 11. 根据Name/desc搜索产品分页列表
// ### 请求URL：
//     http://localhost:5000/manage/product/search?pageNum=1&pageSize=5&productName=T
export const reqSearchProductList = ({
    pageNum,pageSize,keywords,searchType
}) => {
    return axios({
        url:base+'/manage/product/search',
        data:{
            pageNum,
            pageSize,
            [searchType]:keywords
        }
    })
}
    
