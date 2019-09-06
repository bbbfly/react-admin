import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import img from '../../assets/images/logo.png'
import menuList from '../../utils/menulist'
import {setMenuTitle} from '../../redux/actions'
import  './leftnav.less'
const {SubMenu} = Menu
class Leftnav extends Component {
    constructor(props){
        super(props)
        this.state = {
            openKey:'',
            menuData:[],
            selectKey:'/home'
        }
       
    }
    UNSAFE_componentWillMount(){
        const {pathname} = this.props.history.location
        const data = this.getMenuNode(menuList,pathname)
        this.setState({
            menuData:data
        })
    }
    setTitleKey = (key,title) => {
        this.props.setMenuTitle(title)
        this.setState({
            selectKey:key
        })
        
    }
    getMenuNode = (menuList,openKey) =>{
        return menuList.map( item => {
            if(!item.children){
                if(openKey.indexOf(item.key) === 0) {
                    this.props.setMenuTitle(item.title)
                    this.setState({
                        selectKey: item.key
                    })
                }
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key} onClick={ () => this.setTitleKey(item.key,item.title)}>
                            <Icon type={item.icon} />
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }
            const citem = item.children.find( child => openKey.indexOf(child.key) === 0 )
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
        // const selectKey = this.props.history.location.pathname
        const {selectKey} = this.state
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

export default connect(
    (state) => ({title:state.title}),{
        setMenuTitle
    }
)(withRouter(Leftnav))
