import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'antd'
class NotFound extends Component {
    render() {
        return (
            <div>
                <h1>404</h1>
                <Button type='primary' onClick={()=> this.props.history.replace('/home')}>返回首页</Button>
            </div>
        )
    }
}

export default withRouter(NotFound)
