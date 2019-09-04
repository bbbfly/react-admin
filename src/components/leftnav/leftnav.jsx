import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import img from '../../assets/images/logo.png'
import menuList from '../../utils/menulist'
import  './leftnav.less'
const {SubMenu} = Menu
class Leftnav extends Component {
    state = {
        openKey:'',
        menuData:[]
    }
    componentDidMount(){
       const {pathname} = this.props.history.location
       const data = this.getMenuNode(menuList,pathname)
       this.setState({
           menuData:data
       })
    }
    getMenuNode = (menuList,openKey) =>{
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
            const citem = item.children.find( child => child.key === openKey )
            if(citem) {   
               this.setState({
                   openKey:item.key
               })
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
                    {this.getMenuNode(item.children,openKey)}
                </SubMenu>
            )
        })
    }
    render() {
        const selectKey = this.props.history.location.pathname
        return (
            <div className='left-nav'>
                <Link className='flex-r-a top' to='/home'>
                    <img src={img} alt="logo" className='left-nav-logo'/>
                    后台系统
                </Link>

                <Menu
                    theme='dark'
                    defaultOpenKeys={[this.state.openKey]}
                    selectedKeys={[selectKey]}
                    mode="inline"
                    >
                    {
                       this.state.menuData
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(Leftnav)