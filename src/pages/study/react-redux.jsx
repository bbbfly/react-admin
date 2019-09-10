import React, { Component } from 'react'
import {Provider} from '../学习/react-redux'
import {store} from './react-redux.js'
import TestRedux from './testredux'
export default class ReactRedux extends Component {
    render() {
        return (
            <Provider store={store}>
                <TestRedux></TestRedux>
            </Provider>
        )
    }
}
