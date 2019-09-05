import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import Product from './product' 
import ProductAddUpdate from './productaddupdate'
export default class ProductIndex extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/product' component={Product}/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
            </Switch>
        )
    }
}
