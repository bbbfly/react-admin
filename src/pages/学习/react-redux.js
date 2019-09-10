// 实现 provider connect 

import PropTypes from 'prop-types'
import React,{Component} from 'react'

// 合并多个 reducer 里的 state  {state1,state2}
export function combineReducers(reducers){
    // 返回一个 reducer() 
    return (state={},action) => {
        // 遍历 reducers 对象 返回合并的新 state
        let newState = Object.keys(reducers).reduce((totalState,key)=>{
            totalState[key] = reducers[key](state[key],action)
            return totalState
        },{})
        return newState
    }
}

export function createStore(reducer){
    // 初始化传入的reducer 得到 state
    let state = reducer({},{type:'@@init'})
    const listeners = []
    
    function getState(){
        return state
    }
    function dispatch (action) {
        // 得到新的 state
        const newState = reducer(state,action)
        // 替换state
        state = newState
        // 执行监听
        listeners.forEach( listener => listener())
    }
    function subscritbe (listener){
        listeners.push(listener)
    }
    return {
        getState,
        dispatch,
        subscritbe
    }
}
export  class Provider extends Component {
    // 申明接收一个 store 对象
    static propTypes = {
        store:PropTypes.object.isRequired
    }
    // 申明向子节点传递 props
    static childContextTypes = {
        store:PropTypes.object
    }
    // 向子节点传递包含store的 context 
    getChildContext(){
        return {store:this.props.store}
    }
    render(){
        // 返回 provider 里 的子节点
        return this.props.children
    }
}

export function connect(mapStateToProps,mapDispatchToProps){
    // 对传入的 ui 组件 包装并绑定 mapStateToProps,mapDispatchToProps 后返回 
    return (UiComponent) => {
        return class wrapperComponent extends Component{
            // 申明接收 store
            static contextTypes = {
                store:PropTypes.object
            }
            constructor(props,context){
                super(props)
                const {store} = context
                console.log(store)
                //数据属性 从store 里读取 需要的 state 保存到 wrapperComonent 状态响应 state 里 
                this.state = mapStateToProps(store.getState()) 
                // 方法属性
                if( typeof mapDispatchToProps === 'function'){
                    // 当 传入 mapDispatchToProps (dispatch) => {
                    //     return {
                    //         xxx: ()=> dispatch({})
                    //     }
                    // }
                    this.actions = mapDispatchToProps(store.dispatch)
                }else{
                    // 当传入 mapDispatchToProps{
                    //     xxx:xxx
                    // }
                    this.actions = Object.keys(mapDispatchToProps).reduce((actions,key)=>{
                        //mapDispatchToProps[key](...arg) 将返回函数 (dispatch)=> dispatch({type:xxx})
                        actions[key] = (...arg) => mapDispatchToProps[key](...arg)(store.dispatch)
                        return actions
                    },{})
                    // console.log(this.actions)
                }
                // 监听store state改变后 对wrapperComonent state做相应改变 从而改变 UICompoent 状态
                store.subscritbe(()=> {
                    this.setState({...mapStateToProps(store.getState())})
                })
            }
            render(){
                //对ui组件 绑定 mapStateToProps,mapDispatchToProps 
                return (
                    <UiComponent {...this.state} {...this.actions}></UiComponent>
                )
            }
        }
    }
}