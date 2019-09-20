import React, { Component } from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import Header from '../../components/header/header'
import Leftnav from '../../components/leftnav/leftnav'
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import BarCharts from '../charts/bar'
import PieCharts from '../charts/pie'
import LineCharts from '../charts/line'
import ProductIndex from '../product/index'
import NotFound from '../404/404'
import Context from '../study/context'
import BubbleSort from '../study/bubblesort'
import QuickSort from '../study/quickSort'
import ReactRedux from '../study/react-redux.jsx'
import InsertSort from '../study/insertsort'
import SelectionSort from '../study/selectionsort'
import BinaryTree from '../study/binarytree'
import Carousel from '../study/carousel/carousel'
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
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <Leftnav></Leftnav>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content>
                            <Switch>
                                <Redirect exact from='/' to='/home'/>
                                <Route  path='/home' component={Home}/>
                                <Route  path='/category' component={Category}/>
                                <Route  path='/user' component={User}/>
                                <Route  path='/product' component={ProductIndex}/>
                                <Route  path='/role' component={Role}/>
                                <Route path='/charts/bar' component={BarCharts} />
                                <Route path='/charts/pie' component={PieCharts} />
                                <Route path='/charts/line' component={LineCharts} />
                                <Route path='/study/context' component={Context}/>
                                <Route path='/study/redux' component={ReactRedux}/>
                                <Route path='/study/bubble' component={BubbleSort}/>
                                <Route path='/study/quick' component={QuickSort}/>
                                <Route path='/study/insert' component={InsertSort}/>
                                <Route path='/study/select' component={SelectionSort}/>
                                <Route path='/study/binary' component={BinaryTree}/>
                                <Route path='/study/carousel' component={Carousel}/>
                                <Route  component={NotFound} />
                            </Switch>
                        </Content>
                        {/* <Footer>
                        </Footer> */}
                    </Layout>
                </Layout>
                
        )
    }
}
const mapStateToProps = (state) => {
    return {
        _id:state.user._id
    }
}
const mapDispatchToProps = () => {
    return {
        logout
    }
}
// export default connect(
//     state => ({
//         _id: state.user._id
//     }),{logout}
// )(Admin)
export default connect(mapStateToProps,mapDispatchToProps)(Admin)
