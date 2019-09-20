import React, { Component } from 'react'
import {Button,InputNumber} from 'antd'
import {CSSTransitionGroup} from 'react-transition-group'
import './css.less'
export default class SelectionSort extends Component {
    constructor(props){
        super(props)
        this.state={
            arr:[2,4,8,0,9,7,1,5],
            result:[],
            resultDom:[],
            dom:[],
            isSort:false,
        }
    }
    UNSAFE_componentWillMount(){
        this.sort()
    }
    // 选择排序
    sort = () => {
        let arr = [...this.state.arr]
        // 保存每次的排序  当前index  比较index  排序结果 对比交换情况
        let result = [{current:-1,sort:-1, data:[...arr],exchange:''}]

        for(let i = 0 , l = arr.length ; i< l-1; i ++){
            for(let j = i+1 ; j < l ; j++){
                let temp = arr[i]
                let exchange = ''
                if(arr[i] > arr[j]){
                    exchange = `${arr[i]} ---> ${arr[j]}`
                    arr[i] = arr[j]
                    arr[j] = temp
                }
                result.push({current:i,sort:j,data:[...arr],exchange}) 
            }
        }
        
        let dom = this.initDom(result)
        this.setState({result,isSort:false,resultDom:dom})
        this.getDom(dom,0)
    }
    // 按步骤获取排序结果 dom 结构
    getDom = (dom,i) => {
        if(!dom[i]) return this.setState({isSort:true})
        this.setState({
            dom:i>0? [dom[0],dom[i]] :[dom[0]]
        })
        setTimeout(() => {
            this.getDom(dom,++i)
        }, 500);
    }
    // 初始化排序的 所有 dom 结构
    initDom(result){
        return result.map( (item,i) => {
                    return (
                        <div key={i} style={{marginBottom:5,border:'1px solid #ccc',padding:5,display:'flex',alignItems:'flex-end'}}>
                            <span style={{width:60,padding:'3px 10px',display:'inline-block'}}>{i === 0 ? '次数' : i}</span>
                            { 
                               item.data.map((num,j) => (
                                   <div key={j} style={{textAlign:'center'}}>
                                       <div style={{
                                                      border:'1px solid #ccc',
                                                      margin:'0 10px',
                                                      display:'inline-block',
                                                      padding:'3px 10px',
                                                      height: num*10,
                                                      background:j===item.current?'green':j===item.sort?'red':'' ,
                                                   }} 
                                       ></div>
                                       <div>{num}</div>
                                   </div>
                               ))
                            }
                            <span >{i === 0 ? '交换情况' : item.exchange}</span>
                        </div>
                    )
        })
    }
    // 显示第n次排序
    sortStep = (index)=>{
        const {resultDom} = this.state
        this.setState({
            dom:[resultDom[0],resultDom[index]]
        })
    }
    render() {
        const {arr,result,dom,isSort} = this.state
        return (
            <div className='bubble-sort'>
                <div>
                    <span>选择排序</span>
                    <Button type='primary'
                            style={{marginLeft:400,}}
                            onClick={()=> this.sort()}
                            disabled={!isSort}
                    >重新排序</Button>
                    <span style={{marginLeft:100}}>
                        <span>显示第</span>
                        
                        <InputNumber min={1} max={result.length-1} disabled={!isSort} defaultValue={0} onChange={this.sortStep}></InputNumber>
                        
                        <span>次排序结果</span>
                    </span>
                </div>
                <p>升序排列 [{arr.join(',')}] 长度{arr.length} 次数{result.length-1}</p>
                <div style={{background:'#eee'}}>
                    { dom }
                </div>
            </div>
        )
    }
}
