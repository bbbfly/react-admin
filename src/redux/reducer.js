import {combineReducers} from 'redux'
import {
    LOGIN_SUCCESS,
    LOGOUT,

    GET_CATEGORY,
    GET_PRODUCT_LIST
} from './action-types'
import {getUser,removeUser,setUser} from '../utils/localstorage'

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

function categorys (state = [] , action) {
    switch (action.type) {
        case GET_CATEGORY:
            return action.categorys
        default:
            return state
    }
}
/* 
    products = {
        total:0,
        1: {},
        2: {},
        ...
    }
*/
function products (state = {total:0,1:{}}, action){
    switch (action.type) {
        case GET_PRODUCT_LIST:
            
            return {...state,total:action.total,[action.page]:action.data}
    
        default:
            return state
    }
}
export default combineReducers({
    user,
    categorys,
    products
})