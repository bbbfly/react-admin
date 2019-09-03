import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {getUser,removeUser} from '../../utils/localstorage'
import {Modal} from 'antd'
import menuList from '../../utils/menulist'
import './header.less'
 class Header extends Component {
    state = {
        titles:{},
        clock:''
    }
    componentWillMount(){
        this.formatDate()
        const titles = {}
        this.getTitle(titles,menuList)
        this.setState({
            titles
        })
    }
    componentWillUnmount(){
        clearInterval(this.timer)
        
    }
    logOut = () => {
        Modal.confirm({
            title:'确认退出？',
            onOk:()=>{
                removeUser()
                this.props.history.replace('/login')
            },
        })
    }
    getTitle = (titles={},menuList) => {
        menuList.map( item => {
            titles[item.key] = item.title
            if(item.children){
                this.getTitle(titles,item.children)
            }
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
        const {pathname} = this.props.history.location
        return (
            <div className='header'>
                <div className='top'>
                    <span>
                        欢迎 {getUser().username} , 
                        <a  onClick={this.logOut}>退出</a>
                    </span>
                </div>
                <div className='bottom flex-r-b'>
                    <div className='left'>
                        {this.state.titles[pathname]}
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

export default withRouter(Header)