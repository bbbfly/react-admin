import React, { Component } from 'react'
import {Card,Button} from 'antd'
import ReactCharts from 'echarts-for-react'
export default class BarCharts extends Component {
    constructor(props){
        super(props)
        this.init()
    }
    init(){
        this.cardTitle = (
            <Button type='primary'>更新</Button>
        )
    }
    initBarCharts = () =>{
        return {
            // color: ['#3398DB'],
            title:{
                text:'柱状图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            legend:{
                data:['访问1','访问2']
            },
            series : [
                {
                    name:'访问1',
                    type:'bar',
                    // barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name:'访问2',
                    type:'bar',
                    data:[5, 52, 10, 334, 600, 500, 800]
                }
            ]
        };
    }
    render() {
        return (
            <Card title={this.cardTitle}>
                <ReactCharts option={this.initBarCharts()}></ReactCharts>
            </Card>
        )
    }
}
