import React, { Component } from 'react'
import {Card,Button,Table,Icon,message,Modal} from 'antd'
import UserForm from './user-form'
import {reqUserList} from '../../api/api'
export default class User extends Component {
    constructor(props){
        super(props)
        this.state ={
            list:[],
            isShow:false,
            confirmLoading:false,
        }
    }
    componentDidMount(){
        this.getUserList()
    }

    getUserList = async () => {
        const res = await reqUserList()
        if(res.status === 0){
            message.success('获取用户列表成功！')
            this.setState({
                list:res.data
            })
        }else{
            message.error('获取用户列表失败！')
        }
    }
    handleOk = () => {
        console.log(this.form)
        this.setState({isShow:false})
    }
    handleCancel = () =>{
        this.setState({isShow:false})
    }
    render() {
        const title = (
            <Button type='primary' onClick = {()=> this.setState({isShow:true})}>
                <Icon type='plus'></Icon>
                <span>添加用户</span>
            </Button>
        )
        const columns = [
            {
                title:'用户名',
                dataIndex:'username',
                key:'name',
                width:200
            },
            {
                title:'邮箱',
                dataIndex:'email',
                key:'email',
                width:200
            },
            {
                title:'电话',
                dataIndex:'phone',
                key:'phone',
                width:200
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                key:'create_time',
                width:200
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                key:'role_id',
                width:200
            },
            {
                title:'操作',
                key:'action',
                width:200,
                render: ()=> (
                    <div>
                        <Button type='link'>修改</Button>
                        <Button type='link'>删除</Button>
                    </div>
                )
            },
        ]
        const {isShow,confirmLoading} = this.state
        return (
            <Card title={title} >
                <Table columns={columns} dataSource={[]} bordered={true}>

                </Table>

                <Modal
                    title="Title"
                    visible={isShow}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <UserForm getForm={(form) => this.form = form}></UserForm>
                </Modal>
            </Card>
        )
    }
}
