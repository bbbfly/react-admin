import React, { Component } from 'react'

export default class QuickSort  extends Component {
    constructor(props){
        super(props)
        this.state={
            arr:[5,3,0,8,4,6,2,9,7,1]
        }
    }
    componentDidMount(){
        const{arr} = this.state
        let step = []
        let result = this.quickSort(arr,step)
        console.log(result,step)
    }
    quickSort = (arr,step=[],result={}) =>{
        if(arr.length<=1) return arr
        let l = arr.length
        let cindex = Math.floor(l/2)
        let cnum = arr[cindex]
        arr.splice(cindex,1)
        let left = [], right = []
        // step.push({...{left,cnum,right}})
        for(let i = 0; i < l-1 ; i++){
            if(arr[i]<cnum){
                left.push(arr[i])
                step.push({...{left:[...left],cnum,right:[...right]}})       

            }else{
                right.push(arr[i])
                step.push({...{left:[...left],cnum,right:[...right]}})       
            }
        }
        // step.push({...{left,cnum,right}})    
        
        result = {left:[...left],cnum,right:[...right]}
        console.log(left,cnum,right,result)
        return this.quickSort(left,step,result).concat(cnum,this.quickSort(right,step,result))
    }
    render() {
        return (
            <div className='quick-sort'>
                
            </div>
        )
    }
}
