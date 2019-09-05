import React, { Component } from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button,Layout} from 'antd'
import Header from '../../components/header/header'
import Leftnav from '../../components/leftnav/leftnav'
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import ProductIndex from '../product/index'
import {logout} from '../../redux/actions'
import './admin.less'
const { Footer, Sider, Content} = Layout
 class Admin extends Component {
    logout = () => {
        this.props.logout()
    }
    render() {
        if(!this.props._id){
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
                                <Route  path='/home' component={Home}/>
                                <Route  path='/category' component={Category}/>
                                <Route  path='/user' component={User}/>
                                <Route  path='/product' component={ProductIndex}/>
                                <Route  path='/role' component={Role}/>
                                {/* <Redirect to ='/home'/> */}
                            </Switch>
                        </Content>
                        <Footer>
                            <Button type='primary' onClick={this.logout}>é€€å‡º</Button>
                        </Footer>
                    </Layout>
                </Layout>
                
            </div>
        )
    }
}

export default connect(
    state => ({
        _id: state.user._id
    }),{logout}
)(Admin)
