import React, { Component } from 'react'
import {Table,Icon,Select,Input,Button,Card} from 'antd'
import {connect} from 'react-redux'
import {getProductList} from '../../redux/actions'
class Product extends Component {
    constructor(){
        super()
        this.state={
            pageSize:10
        }
        this.initColumns()
    }
    initColumns = () => {
        this.columns = [
            {
                key:'_id',
                title:'商品ID',
                dataIndex:'_id'
            },{
                key:'name',
                title:'商品名称',
                dataIndex:'name'
            },{
                key:'desc',
                title:'商品描述',
                dataIndex:'desc'
            },{
                key:'price',
                title:'商品价格',
                dataIndex:'price',
                render: price => ('￥'+ price)
            },{
                key:'status',
                title:'商品状态',
                dataIndex:'status',
                render: status => {
                    if(status === 1){
                        return (
                            <span>
                                <Button type='primary'>下架</Button>
                                在售
                            </span>
                        )
                    }
                    return (
                        <span>
                            <Button type='primary'>上架</Button>
                            已下架
                        </span>
                    )
                }
            },{
                key:'action',
                title:'操作',
                render: product => (
                    <span>
                        <Button>详情</Button>
                        <Button>修改</Button>
                    </span>
                )
            }

        ]
    }
    pageChanged = (page,pageSize) =>{
        const {list} = this.props.products[page]
        if(!list){
            getProductList(page,pageSize)
        }
    }
    render() {
        const title = (
            <span>
                <Select value='0'>
                    <Select.Option value ='0'>名称搜索</Select.Option>
                    <Select.Option value ='1'>id搜索</Select.Option>
                </Select>
                <Input style={{margin:'0 10px',width:200}}></Input>
                <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )
        const {total} = this.props
        const {pageSize} = this.state
        return (
            <Card title={title} extra={extra}>
                <Table loading={false} 
                       bordered={true} 
                       columns={this.columns} 
                       dataSource={[]} 
                       scroll={{y:400}}
                       pagination={{total,pageSize,showQuickJumper:true,onChange:this.pageChanged}}></Table>
            </Card>
        )
    }
}

export default connect(
    state => ({
        total: state.products.total,
        products:state.products
    }),{
        getProductList
    }
)(Product)