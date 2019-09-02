import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import img from '../../assets/images/logo.png'
import menuList from '../../utils/menulist'
import  './leftnav.less'
const {SubMenu} = Menu
class Leftnav extends Component {
    state = {
        current:'/home'
    }
    componentDidMount(){
       const {pathname} = this.props.history.location
       this.setState({
           current:pathname
       })
    }
    getMenuNode = (menuList) =>{
        return menuList.map( item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }
            return (
                <SubMenu
                    key={item.key}
                    title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                    }
                >
                    {this.getMenuNode(item.children)}
                </SubMenu>
            )
        })
    }
    handleClick = e => {
        this.setState({
          current: e.key,
        });
    }
    render() {
        return (
            <div className='left-nav'>
                <Link className='flex-r-a top' to='/home'>
                    <img src={img} alt="logo" className='left-nav-logo'/>
                    欢迎使用
                </Link>

                <Menu
                    theme='dark'
                    defaultOpenKeys={['']}
                    selectedKeys={[this.state.current]}
                    onClick={this.handleClick}
                    mode="inline"
                    >
                    {
                        this.getMenuNode(menuList)
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(Leftnav)