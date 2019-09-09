import React, { Component } from 'react'
import {Card,Row, Col,Statistic,Icon,Tabs,Button,DatePicker,Timeline  } from 'antd'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util,
  } from 'bizcharts';
  import moment from 'moment'
  const { Line } = Guide;
  const { TabPane } = Tabs;
  const {  RangePicker } = DatePicker
export default class Home extends Component {

    initLineCharts(){
        return [
            {
                month: 'Jan',
                city: 'China',
                revenue: 7,
              },
              {
                month: 'Jan',
                city: 'Oversea',
                revenue: 3.9,
              },
              {
                month: 'Feb',
                city: 'China',
                revenue: 6.9,
              },
              {
                month: 'Feb',
                city: 'Oversea',
                revenue: 4.2,
              },
              {
                month: 'Mar',
                city: 'China',
                revenue: 9.5,
              },
              {
                month: 'Mar',
                city: 'Oversea',
                revenue: 5.7,
              },
              {
                month: 'Apr',
                city: 'China',
                revenue: 14.5,
              },
              {
                month: 'Apr',
                city: 'Oversea',
                revenue: 8.5,
              },
              {
                month: 'May',
                city: 'China',
                revenue: 18.4,
              },
              {
                month: 'May',
                city: 'Oversea',
                revenue: 11.9,
              },
              {
                month: 'Jun',
                city: 'China',
                revenue: 21.5,
              },
              {
                month: 'Jun',
                city: 'Oversea',
                revenue: 15.2,
              },
              {
                month: 'Jul',
                city: 'China',
                revenue: 25.2,
              },
              {
                month: 'Jul',
                city: 'Oversea',
                revenue: 17,
              },
              {
                month: 'Aug',
                city: 'China',
                revenue: 26.5,
              },
              {
                month: 'Aug',
                city: 'Oversea',
                revenue: 16.6,
              },
              {
                month: 'Sep',
                city: 'China',
                revenue: 23.3,
              },
              {
                month: 'Sep',
                city: 'Oversea',
                revenue: 14.2,
              },
              {
                month: 'Oct',
                city: 'China',
                revenue: 18.3,
              },
              {
                month: 'Oct',
                city: 'Oversea',
                revenue: 10.3,
              },
              {
                month: 'Nov',
                city: 'China',
                revenue: 13.9,
              },
              {
                month: 'Nov',
                city: 'Oversea',
                revenue: 6.6,
              },
              {
                month: 'Dec',
                city: 'China',
                revenue: 9.6,
              },
              {
                month: 'Dec',
                city: 'Oversea',
                revenue: 4.8,
              },
        ]
    }
    initTabsOperations(){
        const dateFormat = 'YYYY/MM/DD';
        return (
            <RangePicker
                defaultValue={[moment('2019/01/01', dateFormat), moment('2019/09/09', dateFormat)]}
                format={dateFormat}
            />
        )
    }
    initBarCharts(){
        return [
            {
                month: "1月",
                sales: 38
            },
            {
                month: "2月",
                sales: 52
            },
            {
                month: "3月",
                sales: 52
            },
            {
                month: "4月",
                sales: 52
            },
            {
                month: "5月",
                sales: 52
            },
            {
                month: "6月",
                sales: 52
            },
            {
                month: "7月",
                sales: 52
            },
            {
                month: "8月",
                sales: 52
            },
        ]
    }
    render() {
        
        return (
            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card >
                            <Statistic title="统计数据" value={112893} precision={2} style={{textAlign:'center'}}/>
                            <Row gutter={16} style={{background:'rgba(0,0,0,.1)',marginTop:10,padding:10}}>
                                <Col span={12}>
                                    <Statistic
                                        title="Active"
                                        value={11.28}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-up" />}
                                        suffix="%"
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Active"
                                        value={11.28}
                                        precision={2}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<Icon type="arrow-down" />}
                                        suffix="%"
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card >
                            <Chart height={200} data={this.initLineCharts()} scale={{}} forceFit>
                                <Legend />
                                <Axis name="month" />
                                <Axis
                                    name="revenue"
                                    label={{
                                    formatter: val => `${val}亿`,
                                    }}
                                />
                                <Tooltip
                                    crosshairs={{
                                    type: 'y',
                                    }}
                                />
                                <Geom type="line" position="month*revenue" size={2} color={'city'} />
                                <Geom
                                    type="point"
                                    position="month*revenue"
                                    size={4}
                                    shape={'circle'}
                                    color={'city'}
                                    style={{
                                    stroke: '#fff',
                                    lineWidth: 1,
                                    }}
                                />
                                <Guide>
                                    <Line
                                    top // {boolean} 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                                    start={{ month: 'Aug', revenue: 26.5 }} // {object} | {function} | {array} 辅助线结束位置，值为原始数据值，支持 callback
                                    end={{ month: 'Dec', revenue: 29 }} // 同 start
                                    lineStyle={{
                                        stroke: '#999', // 线的颜色
                                        lineDash: [0, 2, 2], // 虚线的设置
                                        lineWidth: 3, // 线的宽度
                                    }} // {object} 图形样式配置 https://bizcharts.net/products/bizCharts/api/graphic#线条样式
                                    text={{
                                        position: 'start', // 'start' | 'center' | 'end' | '39%' | 0.5 文本的显示位置
                                        autoRotate: true, // {boolean} 是否沿线的角度排布，默认为 true
                                        style: {
                                        fill: 'red',
                                        }, // {object}文本图形样式配置,https://bizcharts.net/products/bizCharts/api/graphic#文本属性
                                        offsetX: 20, // {number} x 方向的偏移量
                                        offsetY: -10, // {number} y 方向的偏移量
                                        content: '预期收益趋势线', // {string} 文本的内容
                                    }}
                                    />
                                </Guide>
                            </Chart>
                        </Card>
                    </Col>
                </Row>
                <Card style={{marginTop:10}}>
                    <Tabs tabBarExtraContent={this.initTabsOperations()}>
                        <TabPane tab="访问量" key="1">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card title='销售量'>
                                        <Chart height={400} data={this.initBarCharts()} forceFit>
                                            <Axis name="month" />
                                            <Axis name="sales" />
                                            <Tooltip
                                                crosshairs={{
                                                type: "y"
                                                }}
                                            />
                                            <Geom type="interval" position="month*sales" />
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title='任务'>
                                        <Timeline>
                                            <Timeline.Item color='green'>主页</Timeline.Item>
                                            <Timeline.Item color='yellow'>
                                                <p>产品页</p>
                                                <p>产品分类页</p>
                                                <p>产品管理</p>
                                            </Timeline.Item>
                                            <Timeline.Item color='red'>
                                                用户管理
                                            </Timeline.Item>
                                            <Timeline.Item color='red'>
                                                权限管理
                                            </Timeline.Item>
                                            <Timeline.Item color='red' dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                                图表展示
                                            </Timeline.Item>
                                        </Timeline>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="销售量" key="2">
                            Content of tab 2
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}
