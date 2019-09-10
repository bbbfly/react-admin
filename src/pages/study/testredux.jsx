import React, { Component } from 'react'
import {Button,Icon} from 'antd'
import {connect} from '../学习/react-redux'
import {addCount} from './react-redux.js'

 class TestRedux extends Component {
    updateCount = (step) => {
        this.props.addCount(step)
    }
    render() {
        const {count,log} = this.props
        return (
            <div style={{background:'#ccc',padding:20}}>
                <p>测试使用自己实现的 react-redux</p> 
                <p>{count}</p>
                <Button type='primary' onClick={()=> this.updateCount(2)}><Icon type='plus'></Icon></Button>               
                <Button type='primary' onClick={()=> this.updateCount(-2) }><Icon type='minus'></Icon></Button> 
                <div>
                    { log.map( item => <p key={item.date}>{item.date}---------{item.action}</p>)}
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
