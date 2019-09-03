import React, { Component } from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Button,Layout} from 'antd'
import {removeUser,getUser} from '../../utils/localstorage'
import Header from '../../components/header/header'
import Leftnav from '../../components/leftnav/leftnav'
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Product from '../product/product'
import './admin.less'
const { Footer, Sider, Content} = Layout
export default class Admin extends Component {
    loginOut = () => {
        removeUser()
        this.props.history.replace('/login')
    }
    render() {
        const user = getUser()
        if(!user._id){
            return <Redirect to='/login'></Redirect>
        }
        return (
            <div style={{height:'100%'}}>
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <Leftnav></Leftnav>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/user' component={User}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Redirect to ='/home'/>
                            </Switch>
                        </Content>
                        <Footer>
                            <Button type='primary' onClick={this.loginOut}>退出</Button>
                        </Footer>
                    </Layout>
                </Layout>
                
            </div>
        )
    }
}
