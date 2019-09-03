import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,message} from 'antd'
import CategoryInput from '../../components/categoryinput/categoryinput'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api/api'


export default class Category extends Component {
    state={
        categorys:[],
        currentCategory:{},
        visible: 0, // 0 不显示 1 添加分类 2 修改
    }
    componentWillMount(){
        this.initTable()
        this.getCategorys()
    }
    initTable(){
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                width:300
              },
              {
                title: '操作',
                width:300,
                render: (category) =>{
                    return (<Button onClick={()=>{
                        this.setState({
                            currentCategory:category,
                            visible:2
                        })
                    }}>编辑</Button>
                )}
              },
        ]
    }
    async getCategorys (){
        const result = await reqCategorys()
        if(result.status === 0){
            const categorys = result.data.map( item => {
                item.key = item._id
                return item
            })     
            this.setState({
                categorys
            })
        }else{
            message.error(result.msg)
        }
    }
    modalCancel =()=>{
        this.form.resetFields()
        this.setState({
            visible:0
        })
    }
    handleOk = () => {
        const {visible,currentCategory} = this.state
        this.form.validateFields(async (err,value)=>{
            if(!err){
                this.form.resetFields()
                let res = {}
                // 添加
                if(visible === 1){
                    res = await reqAddCategory(value.categoryName)
                }else{
                    //修改
                    res = await reqUpdateCategory({categoryId:currentCategory._id,categoryName:value.categoryName})
                }
                if(res.status === 0){
                    message.success('操作成功')
                    this.getCategorys()
                }else{
                    message.error(res.msg)
                }
            }
        })
    }
    render() {
        const extra = (
            <Button type='primary' onClick={()=>{this.setState({visible:1})}}>
                <Icon type="plus" />
                添加
            </Button>
        )
        const {visible,categorys,currentCategory} = this.state
        return (
            <div>
                <Card extra={extra}>
                    <Table bordered={true} scroll={{ y: 400 }} dataSource={categorys} columns={this.columns} />
                </Card>
                <Modal
                    title={visible=== 1 ? '新增分类' : visible=== 2 ?'修改分类':null}
                    visible={visible !== 0}
                    onOk={this.handleOk}
                    confirmLoading={false}
                    onCancel={this.modalCancel}
                    >
                    <CategoryInput setForm={(form)=>this.form = form} categoryName={currentCategory.name}></CategoryInput>
                </Modal>
            </div>
        )
    }
}
