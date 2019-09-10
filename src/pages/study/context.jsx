import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
export default class ComponentA extends Component {
    constructor(props){
        super(props)
        this.state={
            colorToB:'red',
            colorToC:'pink',
            colorToD:'blue'
        }
    }
    // 申明向子组件中传递 propTypes
    static childContextTypes = {
        colorToB: PropTypes.string,
        colorToC: PropTypes.string,
        colorToD: PropTypes.string,
    }
    // 向子组件传递 指定props 的context 对象
    getChildContext(){
        return {
            colorToB:this.state.colorToB,
            colorToC:this.state.colorToC,
            colorToD:this.state.colorToD,
        }
    }
    render() {
        const {colorToB,colorToC} = this.state
        return (
            <div style={{background:'#333',padding:20,color:'white'}}>
                <p>父组件向子组件传递 context {`{colorToB:${colorToB},colorToC:${colorToC}}`}</p>
                <div style={{marginBottom:20}}>
                    <Button type='primary' onClick={()=> this.setState({colorToB:'green'})}>colorToB: green</Button>
                    <Button type='danger' onClick={()=> this.setState({colorToB:'red'})}>colorToB: red</Button>
                    <Button type='primary' onClick={()=> this.setState({colorToC:'green'})}>colorToC: green</Button>
                    <Button type='danger' onClick={()=> this.setState({colorToC:'red'})}>colorToC: red</Button>
                </div>
                <ComponentB></ComponentB>
            </div>
        )
    }
}

class ComponentB extends Component{
    constructor(props,context){
        super(props)
        console.log(context)
    }
    // 申明接收 父组件  propTypes
    static contextTypes={
        colorToB:PropTypes.string
    }
    render(){
        return (
            <div style={{background:this.context.colorToB,padding:20}}>
                <p>子组件B 接收到 A 传递的 context {`{colorToB:${this.context.colorToB}}`}</p>
                <ComponentC></ComponentC>
            </div>
        )
    }
}



class ComponentC extends Component {
    static contextTypes = {
        colorToC: PropTypes.string
    }
    render() {
        const {colorToC} = this.context
        return (
            <div style={{background:colorToC,padding:20}}>
                <p>嵌套子组件C 接收到 A 传递的 context {`{colorToC:${this.context.colorToC}}`}</p>
                <ComponentD></ComponentD>
            </div>
        )
    }
}

function ComponentD (){
        return (
            <div style={{background:'blue',padding:20}}>
                <p>嵌套子组件D </p>
            </div>
        )
}
