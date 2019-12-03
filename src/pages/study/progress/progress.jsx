import React, { Component } from 'react'
import {Button} from 'antd'
import './progress.less';
export default class Progress extends Component {
    constructor(props){
        super(props)
        this.state = {
            percent:50,
        }
    }
    onProgress = (type) =>{
        const {percent} = this.state
        if(type){
            this.setState({
                percent:percent+10
            })
        }else{
            this.setState({
                percent:percent - 10
            })
        }
    }
    render() {
        const {percent} = this.state
        const rotate = `rotate(${360 * percent / 100}deg)`
        return (
            <div className='progress-box'>

                <div className='circle'>
                    <div className={["all",percent<=50 ? "clip" : null].join(" ")}>
                        <div className = 'left' style={{transform:rotate}}></div>
                        <div className={["right", percent <= 50 ? "hide" : null].join(" ")}></div>
                    </div>
                    <div className='progress'>
                        <span>{percent}%</span>
                    </div>
                </div>
                <div className='progress'>
                    <Button type='primary' onClick={()=> this.onProgress(1)} disabled={percent === 100} >+</Button>
                    <span>{percent}</span>
                    <Button type='primary' onClick={()=> this.onProgress(0)} disabled={percent === 0}>-</Button>
                </div>
            </div>
        )
    }
}
