import React, { Component } from 'react'
import {Button} from 'antd'
export default class InsertSort extends Component {
    constructor(props){
        super(props)
        this.state = {
            arr:[2,5,0,8,6,7,3,9,4,1],
            dom:'',
            newArr:[],
            step:[],
            current:null
        }
    }
    componentDidMount(){
        const {arr} = this.state
        let {newArr,step} = this.insertSort([...arr])

        this.setState({
            newArr,
            step
        })
        this.initDom(step,0)
    }
    insertSort = (arr,step=[]) =>{
        let newArr = [arr[0]]
        for(let i = 1,l=arr.length;i<l;i++){
            for(let j=newArr.length-1; j>=0;j--){
                // debugger
                let current = arr[i]
                step.push({newArr:[...newArr],current,sort:newArr[j]})
                if(arr[i]<newArr[j]){
                    if(j===0){
                        newArr.unshift(arr[i])
                    }
                }else{
                    newArr.splice(j+1,0,arr[i])
                    break
                }
            }
        }
        step.push({newArr})
        return {newArr,step}
    }
    initDom = (step,i) =>{
        if(!step[i]) return
        let dom = (
            <div style={{display:'flex',alignItems:'flex-end',textAlign:'center'}}>
                <div style={{width:100,margin:10}}>{i}</div>
                <div style={{display:'flex',alignItems:'flex-end',padding:20,textAlign:'center',width:440}}>
                    { step[i].newArr.map( (item,index) => {
                        return (
                            <div style={{margin:'0 10px'}} key={index}>
                                <div style={{height:item*10,background: item===step[i].sort?'red':'green',border:'1px solid #ccc',padding:'5px 10px'}}></div>
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
                <div style={{width:50,margin:30,background:step[i].current>step[i].sort?'green':'red',color:'#fff' }}>{`${step[i].sort}`}</div>
            </div>
        )
        this.setState({
            dom,
            current:step[i].current
        })
        setTimeout(() => {
            this.initDom(step,++i)
        }, 500);
    }
    render() {
        const {dom,arr,step,newArr,current} = this.state
        return (
            <div className='insert-sort'>
                <h1>插入排序   <Button type='primary' style={{marginLeft:200}} onClick={()=> this.initDom(step,0)}>重新排序</Button></h1>
                <p>{`[${arr.join(',')}]`}</p>
                <p>完成{`[${newArr.join(',')}]`} 所需次数:{step.length-1}次</p>
                <div style={{border:'1px solid #ccc',padding:20}}>
                    
                    <div style={{display:'flex',alignItems:'flex-end',padding:10,textAlign:'center'}}>
                        <div style={{width:100,margin:10}}> 次数</div>
                        { arr.map( (item,index) => {
                            return (
                                <div style={{margin:'0 10px'}} key={index}>
                                    <div style={{height:item*10,background: item===current?'green':'',border:'1px solid #ccc',padding:'5px 10px'}}></div>
                                    <span>{item}</span>
                                </div>
                            )
                        })}
                        <div style={{width:100,margin:10}}>插入</div>
                    </div>
                </div>
                <div style={{border:'1px solid #ccc',padding:20}}>
                    {dom}
                </div>

            </div>
        )
    }
}
