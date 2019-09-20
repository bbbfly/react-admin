import React, { Component } from 'react'
import './carousel.less'
export default class Carousel extends Component {
    constructor(props){
        super(props)
        this.state={
            list:[1,2,3,4,5,6],
            current:0,
            wrapperDeg:0
        }
    }
    //上一张
    prev = () =>{
        let {current,list,wrapperDeg} = this.state
        current--
        wrapperDeg += 360/ list.length
        if(current < 0){
            current = list.length -1
        }
        this.setState({current,wrapperDeg})
    }
    // 下一张
    next = () => {
        let {current,list,wrapperDeg} = this.state
        current ++
        wrapperDeg -= 360/ list.length
        if(current > list.length-1){
            current = 0
        }
        this.setState({current,wrapperDeg})
    }
    // 模拟触摸 事件 实现轮播图切换
    _onMouseDown = (e) => {
        e.stopPropagation();
        this.startX = e.pageX
        this.distanceX = 0
        this.isMouseDown = true
    }
    _onMouseMove = (e) => {
        e.stopPropagation();
        if(!this.isMouseDown) return
        this.distanceX = e.pageX - this.startX
    }
    _onMouseUp = (e) => {
        e.stopPropagation();
        this.isMouseDown = false
        if(Math.abs(this.distanceX) < 50) return
        let {wrapperDeg,list,current} = this.state
        const length = list.length
        if(this.distanceX <0){
            wrapperDeg -= 360/length
            current ++
            if(current > length-1) current = 0
        }else{
            wrapperDeg += 360/length
            current --
            if(current < 0) current = length-1
        }
        this.setState({wrapperDeg,current})
    }
    render() {
        const { list,current,wrapperDeg } = this.state
        // let rotateWrapper = `rotateY(${360/list.length*current}deg)`
        // 轮播图切换时 整体旋转 的角度
        let rotateWrapper = `rotateY(${wrapperDeg}deg)`
        return (
            <div className='carousel'>
                <div className='wrapper' onMouseDown={this._onMouseDown} onMouseMove={this._onMouseMove} onMouseUp={this._onMouseUp}>
                    <div className='swiper1' 
                        style={{
                            transition:'all .5s',
                            transformOrigin:'center center -200px', // 旋转中心往z轴方向移动 -200
                            transform:rotateWrapper
                        }}>
                        {
                            list.map( (item,i) =>{
                                // 将 图片 平均分布在 360度 上
                                let transform = `rotateY(${360/list.length*i}deg)`
                            return  (
                                    <div className={['item', `item${item}`].join(' ')} key={item} 
                                        style={{
                                            transformOrigin:' center center -200px',
                                            transform:transform
                                        }}
                                    >{item}</div>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div style={{margin:'0 auto',width:200,display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
                    <span className='prev' onClick={this.prev}>{'<'}</span>
                    <span>{ current + 1}</span>
                    <span className='next' onClick={this.next}>{'>'}</span>
                </div>
            </div>
        )
    }
}
