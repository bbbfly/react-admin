import React, { Component } from 'react'
import {Button} from 'antd'
export default class BubbleSort extends Component {
    constructor(props){
        super(props)
        this.state={
            arr:[2,0,4,8,3,6,9,7,1,5],
            result:[],
            dom:[],
            isSort:false,
        }
    }
    componentDidMount(){
        this.sort()
    }
    // 冒泡排序
    sort = () => {
        let arr = [...this.state.arr]
        // 结果保存每次的排序过程  当前index  比较index  排序结果 对比交换情况
        let result = [{current:-1,sort:-1, data:[...arr],exchange:''}]

        for(let i = 0 , l = arr.length ; i< l-1; i ++){
            for(let j = i+1 ; j < l ; j++){
                let temp = arr[i]
                let exchange = ''
                if(arr[i] > arr[j]){
                    exchange = `${arr[i]} --- ${arr[j]}`
                    arr[i] = arr[j]
                    arr[j] = temp
                }
                result.push({current:i,sort:j,data:[...arr],exchange}) 
            }
        }
        this.setState({result,isSort:false})

        let dom = this.initDom(result)

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
    // 初始化排序过程的 所有 dom 结构
    initDom(result){
        return result.map( (item,i) => {
                    return (
                        <div key={i} style={{marginBottom:5,border:'1px solid #ccc',padding:5,display:'flex',alignItems:'flex-end'}}>
                            <span style={{width:60,padding:'3px 10px',display:'inline-block'}}>{i === 0 ? '次数' : i}</span>
                            { 
                               item.data.map((num,j) => (
                                   <div>
                                       <div style={{
                                                      border:'1px solid #ccc',
                                                      margin:'0 10px',
                                                      display:'inline-block',
                                                      padding:'3px 10px',
                                                      height: num*10,
                                                      background:j===item.current?'green':j===item.sort?'red':'' ,
                                                   }} 
                                             key={j}
                                       ></div>
                                       <span>{num}</span>
                                   </div>
                               ))
                            }
                            <span >{i === 0 ? '交换情况' : item.exchange}</span>
                        </div>
                    )
        })
    }
    render() {
        const {arr,result,dom,isSort} = this.state
        return (
            <div>
                <p>
                    <span>冒泡排序</span>
                    <Button type='primary'
                            style={{marginLeft:400,}}
                            onClick={()=> this.sort()}
                            disabled={!isSort}
                    >重新排序</Button>
                </p>
                <p>升序排列结果 [{arr.join(',')}] 长度{arr.length} 次数{result.length-1}</p>
                <div style={{background:'#eee'}}>
                    { dom }
                </div>
            </div>
        )
    }
}
