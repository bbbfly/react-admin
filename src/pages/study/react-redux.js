import {combineReducers,createStore} from '../学习/react-redux'
const ADD_COUNT = 'add_count'
//action
export const addCount = (step=1) => ( dispatch => dispatch({type:ADD_COUNT,step}))
// reducer
function count (state = 0, action) {
    switch (action.type) {
        case ADD_COUNT:
            console.log(action)
            return state+action.step
        default:
            return state
    }
}
const reducer = combineReducers({count})
export const store = createStore(reducer)
