import {combineReducers} from 'redux'
import {
    MENU_TITLE,

    LOGIN_SUCCESS,
    LOGOUT,

    GET_CATEGORY,
    GET_PRODUCT_LIST,
    SEARCH_PRODUCTDESC,
    SEARCH_PRODUCTNAME
} from './action-types'
import {getUser,removeUser,setUser} from '../utils/localstorage'

// 用户
const initUser = getUser()
function user (state = initUser , action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            setUser(action.user)
            return action.user
        case LOGOUT:
            removeUser()
            return {}
        default:
            return state
    }
}

// 导航标题
function title( state = '首页' , action){
    switch (action.type) {
        case MENU_TITLE:
            return action.title
        default:
            return state
    }
}

// 商品分类列表
function categorys (state = [] , action) {
    switch (action.type) {
        case GET_CATEGORY:
            return action.categorys
        default:
            return state
    }
}
/* 商品列表
    products = {
        total:0,
        stype:all  productName  productDesc   所有 名称  描述
        1: {},
        2: {},
        ...
    }
*/
const formatProducts = (state,newState) => {
    const {stype,page,data} = newState
    // antd tabel 表格需要key 
    data.list = data.list.map( item => {
        item.key = item._id
        return item
    })
    if(state.stype === stype){
        return {...state,total:data.total,[page]:data}
    }else{
        return {total:data.total,[page]:data,stype}
    }
}
function products (state = {total:0,stype:'all'}, action){
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return formatProducts(state,action)
        case SEARCH_PRODUCTNAME:
            return formatProducts(state,action)
        case SEARCH_PRODUCTDESC:
            return formatProducts(state,action)
        default:
            return state
    }
}
export default combineReducers({
    user,
    categorys,
    products,
    title
})