import {combineReducers,createStore} from '../学习/react-redux'
const ADD_COUNT = 'add_count'
const LOG = 'log'
// 导出 action
export const addCount = (step=1) => {
   return dispatch => {
        dispatch({type:ADD_COUNT,step})
        dispatch({
            type:LOG,
            log:JSON.stringify({type:ADD_COUNT,step}),
            date: Date.now()
        })
    }
} 

// 计数 reducer
function count (state = 0, action) {
    switch (action.type) {
        case ADD_COUNT:
            console.log(action)
            return state+action.step
        default:
            return state
    }
}
// 日志 reducer
function log (state=[{date:1,log:'null'}],action){
    switch (action.type) {
        case LOG:
            return [{date:action.date,log:action.log},...state]
        default:
            return state
    }
}
// 合并reducers
const reducer = combineReducers({count,log})
// 导出store
export const store = createStore(reducer)
