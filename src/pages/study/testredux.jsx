import React, { Component } from 'react'
import {Button,Icon} from 'antd'
import {connect} from '../学习/react-redux'
import {addCount} from './store.js'

 class TestRedux extends Component {
    updateCount = (step) => {
        this.props.addCount(step)
    }
    formatDate(times){
        const t =  new Date(times)
        return `${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()} -- ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    }
    render() {
        const {count,log} = this.props
        return (
            <div style={{background:'#ccc',padding:20}}>
                <p>测试使用自己实现的 react-redux</p> 
                <p>count:  {count}</p>
                <Button type='primary' onClick={()=> this.updateCount(2)}><Icon type='plus'></Icon></Button>               
                <Button type='primary' onClick={()=> this.updateCount(-2) }><Icon type='minus'></Icon></Button> 
                <div>
                    <p>日志打印</p>
                    { log.map( item => <p key={item.date}>{ this.formatDate(item.date)}---------{item.log}</p>)}
                </div>              
            </div>
        )
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addCount: () => dispatch({type:'add_count',step:1})
//     }
// }
export default connect(
    state=>({
        count: state.count,
        log: state.log
    }),
    {addCount}
)(TestRedux)
