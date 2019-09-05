import React, { Component } from 'react'
import {Table,Icon,Select,Input,Button,Card} from 'antd'
import {connect} from 'react-redux'
import {getProductList,searchProductList} from '../../redux/actions'
class Product extends Component {
    constructor(){
        super()
        this.state={
            pageSize:10,
            searchType:'productName',
            keywords:''
        }
        this.initColumns()
    }
    componentDidMount(){
        this.getProducts(1,this.state.pageSize)
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
    getProducts = (page,pageSize) =>{
        const {keywords,searchType} = this.state
        if(keywords){
            this.props.searchProductList({pageNum:page,pageSize,keywords,searchType})
        }else{
            const {list} = this.props.products[page]
            if(!list){
                this.props.getProductList(page,pageSize)
            }
        }
    }
    render() {
        const {total} = this.props
        const {searchType,keywords,pageSize} = this.state
        const title = (
            <span>
                <Select value={searchType} onChange={(value)=> this.setState({searchType:value})}>
                    <Select.Option value ='productName'>按名称搜索</Select.Option>
                    <Select.Option value ='productDesc'>按描述搜索</Select.Option>
                </Select>
                <Input style={{margin:'0 10px',width:200}} value={keywords} onChange={(e)=>this.setState({keywords:e.target.value}) }></Input>
                <Button type='primary' onClick={() => this.getProducts(1,pageSize)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=> this.props.history.push('/product/addupdate')}>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table loading={false} 
                       bordered={true} 
                       columns={this.columns} 
                       dataSource={[]} 
                       scroll={{y:400}}
                       pagination={{total,pageSize,showQuickJumper:true,onChange:this.getProducts}}></Table>
            </Card>
        )
    }
}

export default connect(
    state => ({
        total: state.products.total,
        products:state.products
    }),{
        getProductList,
        searchProductList
    }
)(Product)