import {
    LOGIN_SUCCESS,
    LOGOUT,

    GET_CATEGORY,
    // ADD_CATEGORY,
    // UPDATE_CATEGORY
    GET_PRODUCT_LIST
} from './action-types'
import {message} from 'antd'

import {reqLogin,reqCategorys,reqAddCategory,reqUpdateCategory,reqProductList} from '../api/api'
export const login = (username,password) => {
    return async dispatch => {
        const res = await reqLogin(username,password)
        if(res.status === 0){
            dispatch({type:LOGIN_SUCCESS,user:res.data})
            message.success('登录成功')
        }else{
            message.error(res.msg)
        }
    }
}

export const logout = () => ( dispatch => dispatch({type:LOGOUT}))


export const getCategorys = () => {
    return async dispatch => {
        const result = await reqCategorys()
        if(result.status === 0){
            const categorys = result.data.map( item => {
                item.key = item._id
                return item
            })
            message.success('获取分类列表成功！')   
            dispatch({type:GET_CATEGORY,categorys})
        }else{
            message.error(result.msg)
        }
    }
}


export const addCategory = (categoryName) => {
    return async (dispatch) => {
        const result = await reqAddCategory(categoryName)
        if(result.status === 0){
            message.success(`添加分类  ${categoryName}  成功！`);
            dispatch(getCategorys())
        }else{
            message.error(result.msg)
        }
    }
}

export const updateCategory = ({categoryId,categoryName}) => {
    return async (dispatch) => {
        const result = await reqUpdateCategory({categoryId,categoryName})
        if(result.status === 0){
            message.success(`修改分类  ${categoryName}  成功！`)
            dispatch(getCategorys())
        }else{
            message.error(result.msg)
        }
    }
}

export const getProductList = (pageNum,pageSize) => {
    return async dispatch => {
        const res = await reqProductList(pageNum,pageSize)
        if(result.status === 0) {
            message.success(`获取商品列表第${pageSize}页成功！`)
            dispatch({type:GET_PRODUCT_LIST,data:res.data,page:pageNum})
        }else{
            message.error(res.msg)
        }
    }
}