import {
    MENU_TITLE,
    LOGIN_SUCCESS,
    LOGOUT,

    GET_CATEGORY,
    // ADD_CATEGORY,
    // UPDATE_CATEGORY
    GET_PRODUCT_LIST,
    EDITOR_PRODUCT,

    GET_USER_LIST,
    GET_ROLE_LIST
} from './action-types'
import {message} from 'antd'

import {reqLogin,
        reqCategorys,
        reqAddCategory,
        reqUpdateCategory,
        reqProductList,
        reqSearchProductList,
        reqRoleList,
        reqUserList
    } from '../api/api'

// 登录
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

// 退出
export const logout = () => ( dispatch => dispatch({type:LOGOUT}))

// 设置页面 标题
export const setMenuTitle = (title) => ( dispatch => dispatch({type:MENU_TITLE,title}))

// 分类列表
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

//添加分类
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

// 更新分类
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

// 商品列表
export const getProductList = (pageNum,pageSize) => {
    return async dispatch => {
        const res = await reqProductList(pageNum,pageSize)
        if(res.status === 0) {
            message.success(`获取商品列表第${pageNum}页成功！`)
            dispatch({type:GET_PRODUCT_LIST,data:res.data,page:pageNum,stype:'all'})
        }else{
            message.error(res.msg)
        }
    }
}

// 搜索商品

export const searchProductList = ({pageNum,pageSize,keywords,searchType}) => {
    console.log(pageNum,pageSize,keywords,searchType)
    return async dispatch => {
        const res = await reqSearchProductList({pageNum,pageSize,keywords,searchType})
        if(res.status === 0){
            message.success(`按${searchType} 搜索成功！`)
            const type = 'search_'+ searchType.toLowerCase()
            dispatch({type,page:pageNum,data:res.data,stype:searchType})
        }else{
            message.error(res.msg)
        }
    }
}

// 编辑修改商品
export const editorProduct = product => ( dispatch => dispatch({type:EDITOR_PRODUCT,product}))

// 获取角色列表
export const getRoleList = () => {
    return async dispatch => {
        const res = await reqRoleList()
        if(res.status === 0){
            message.success('获取角色列表成功')
            dispatch({type:GET_ROLE_LIST,roleList:res.data})
        }else{
            message.error(res.msg)
        }    
    }
}

// 获取用户列表
export const getUserList = () => {
    return async dispatch => {
        const res = await reqUserList()
        if(res.status === 0){
            message.success('获取用户列表成功！')
            dispatch({type:GET_USER_LIST,userList:res.data})
        }else{
            message.error(res.msg)
        }
    }
}
