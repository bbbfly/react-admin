import React, { Component } from 'react'
import {Table,Icon,Select,Input,Button,Card,message} from 'antd'
import {connect} from 'react-redux'
import {getProductList,searchProductList,editorProduct} from '../../redux/actions'
import {updateProductStatus} from '../../api/api'
class Product extends Component {
    constructor(){
        super()
        this.state={
            pageSize:1,
            searchType:'all', // 绑定下拉选项 productName productDesc
            keywords:'',
            page:1,
        }
        this.stype = 'all' // 记录当前搜索类别  productName productDesc
        this.initColumns()
    }
    componentDidMount(){
        // this.getProducts(1,this.state.pageSize)
        this.props.getProductList(1,this.state.pageSize)
    }
    // 初始化表头
    initColumns = () => {
        this.columns = [
            {
                key:'_id',
                title:'商品ID',
                dataIndex:'_id',
                // render: (id) => (
                //     <div style={{width:100, wordWrap: 'break-word',whiteSpace: 'pre-wrap' }}>{id}</div>
                // )
            },{
                key:'name',
                title:'商品名称',
                width:150,
                dataIndex:'name',
            },{
                key:'desc',
                title:'商品描述',
                dataIndex:'desc',
                width:200,
            },{
                key:'price',
                title:'商品价格',
                width:100,
                dataIndex:'price',
                render: price => ('￥'+ price)
            },{
                key:'status',
                title:'商品状态',
                width:100,
                // dataIndex:'status',
                render: ({_id,status}) => {
                    if(status === 1){
                        return (
                            <span>
                                <Button type='dashed' onClick={()=> this.updateStatus(_id,status)}>下架</Button>
                                在售
                            </span>
                        )
                    }
                    return (
                        <span>
                            <Button type='primary' onClick={() => this.updateStatus(_id,status) }>上架</Button>
                            已下架
                        </span>
                    )
                }
            },{
                key:'action',
                title:'操作',
                width:100,
                render: product => (
                    <span>
                        <Button>详情</Button>
                        <Button onClick={ () =>{ this.props.editorProduct(product);this.props.history.push('/product/addupdate')}  }>修改</Button>
                    </span>
                )
            }

        ]
    }
    getProducts = (page,pageSize) =>{
        this.setState({
            page
        })
        // 分页跳转
        const {stype,products} = this.props
        const {keywords} = this.state
        // all productName productDesc 三种类别
        // 跳转页面有数据 不再请求
        console.log(stype,this.stype,products[page]);
        if(stype === this.stype &&  products[page]) return
        if( this.stype === 'all') return this.props.getProductList(page,pageSize)    
        return this.props.searchProductList({pageNum:page,pageSize,keywords,searchType:this.stype})
    }
    searchProducts = () => {
        const {searchType,keywords,pageSize} = this.state
        this.stype = searchType
        this.setState({
            page:1
        })
        if(searchType === 'all') {
            return this.props.getProductList(1,pageSize)
        }
        return this.props.searchProductList({pageNum:1,pageSize,keywords,searchType})
    }

    updateStatus = async (_id,status) => {
        let text ='', errorText = ''
        if(status === 1){
            status = 2
            text = '商品下架成功！'
            errorText = '商品下架失败！！！'
        }else{
            status = 1
            text = '商品上架成功！'
            errorText = '商品上架失败！！！'
        }
        let res = await updateProductStatus(_id,status)
        if(res.status === 0 ) {
            message.success(text)
            const {page,keywords,pageSize} = this.state
            // 更新状态成功 刷新当前页面
            if(this.stype === 'all') {
                 await this.props.getProductList (page,pageSize)
                
            }else{
                 await this.props.searchProductList ({pageNum:page,pageSize,keywords,searchType:this.stype})
            }
        }else{
            message.error(errorText)
        }
    }
    render() {
        const {total,products} = this.props
        const {searchType,keywords,pageSize,page} = this.state
        const title = (
            <span>
                <Select value={searchType} onChange={(value)=> this.setState({searchType:value})}>
                    <Select.Option value ='all'>未选择分类</Select.Option>
                    <Select.Option value ='productName'>按名称搜索</Select.Option>
                    <Select.Option value ='productDesc'>按描述搜索</Select.Option>
                </Select>
                <Input style={{margin:'0 10px',width:200}} value={keywords} onChange={(e)=>this.setState({keywords:e.target.value}) }></Input>
                <Button type='primary' onClick={ this.searchProducts}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={()=>{this.props.editorProduct({});this.props.history.push('/product/addupdate')} }>
                <Icon type='plus'></Icon>
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table loading={false} 
                       bordered={true} 
                       columns={this.columns} 
                       dataSource={ products[page] && products[page].list} 
                       scroll={{y:400}}
                       pagination={{total,pageSize,showQuickJumper:true,onChange:this.getProducts,current:page}}></Table>
            </Card>
        )
    }
}

export default connect(
    state => ({
        stype: state.products.stype,
        total: state.products.total,
        products:state.products
    }),{
        getProductList,
        searchProductList,
        editorProduct
    }
)(Product)