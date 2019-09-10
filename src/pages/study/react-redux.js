import {combineReducers,createStore} from '../学习/react-redux'
const ADD_COUNT = 'add_count'
const LOG = 'log'
//action
export const addCount = (step=1) => ( dispatch => dispatch({type:ADD_COUNT,step}))
export const actionLog = ({date,action}) => ( dispatch => dispatch({type:LOG,log:{date,action}}))
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
function log (state=[{date:'1',action:'1'}],action){
    switch (action.type) {
        case LOG:
            return [...state,action.log]
        default:
            return state
    }
}
const reducer = combineReducers({count,log})
export const store = createStore(reducer)
