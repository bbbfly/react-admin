import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Modal} from 'antd'
import {logout} from '../../redux/actions'
import './header.less'
 class Header extends Component {
    state = {
        titles:{},
        clock:''
    }
    componentDidMount(){
        this.formatDate()
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    logOut = () => {
        Modal.confirm({
            title:'确认退出？',
            onOk:()=>{
                this.props.logout()
            },
        })
    }
    
    formatDate(){
        this.timer = setInterval(() => {
            const t = new Date()
            let Y = t.getFullYear()
            let M = t.getMonth() +1
            M = M < 10 ? '0'+M : M
            let D = t.getDate()
            D = D <10 ? '0' + D : D
            let h = t.getHours()
            h = h < 10 ? '0' + h : h
            let m = t.getMinutes()
            m = m < 10 ? '0' + m : m 
            let s = t.getSeconds()
            s = s <10 ? '0' + s : s            
            this.setState({
                clock:`${Y}-${M}-${D}  ${h}:${m}:${s}`
            })
        }, 1000);
    }
    render() {
        const {title} = this.props
        return (
            <div className='header'>
                <div className='top'>
                    <span>
                        欢迎 {this.props.username} , 
                        <a href='#####' onClick={this.logOut}>退出</a>
                    </span>
                </div>
                <div className='bottom flex-r-b'>
                    <div className='left'>
                        {title}
                    </div>
                    <div className='right'>
                        <span>{this.state.clock}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt=""/>
                        <span>雨</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    
    state => ({
        username: state.user.username,
        title:state.title
    }),{logout}
)( withRouter(Header))
