import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card,Button,Table,Icon,message,Modal} from 'antd'
import UserForm from './user-form'
import {reqAddUser,reqUpdateUser,reqDeleteUser} from '../../api/api'
import {getRoleList,getUserList} from '../../redux/actions'
import {formatDate} from '../../utils/tools'
 class User extends Component {
    constructor(props){
        super(props)
        this.state ={
            isShow:false,
            isUpdate:false, // 更新用户
            confirmLoading:false,
            roleObj:{} //{_id:rolename}
        }
        if(!this.props.userList.users || !this.props.userList.users.length) {
            this.props.getUserList()
        }
        if(!this.props.roleList.length){
            this.props.getRoleList()
        }
    }
    componentDidMount(){    
        const {roles} = this.props.userList
        this.initRoleObj(roles)
    }
    componentWillReceiveProps(nextProps){
        const {roles} = nextProps.userList
        this.initRoleObj(roles)
    }
    initRoleObj = (roles)=>{
        const roleObj = {}
        roles.forEach( role => {
            roleObj[role._id] = role.name
        })
        this.setState({
            roleObj
        })
    }
    handleOk = () => {
        this.form.validateFields( async (err,value) => {
            if(err) return message.error(err)
            this.form.resetFields()
            const {email,password,phone,username,role_id } = value
            // 更新用户
            let  res = {} , text = ''
            if(this.state.isUpdate){
                const {_id} = this.user
                text = '更新用户'
                res = await reqUpdateUser({_id,email,phone,username,role_id})
            }else{
                // 新增用户
                text = '新增用户'
                res = await reqAddUser({email,password,phone,username,role_id })
            }
            if(res.status === 0){
                message.success(`${username}  ${text}成功！`)
                this.props.getUserList()
                this.setState({isShow:false})
            }else{
                message.error(res.msg)
            }
             
            
        })
    }
    deleteUser = (user) => {
        Modal.confirm({
            title: '操作提示' ,
            content: `正在删除用户 ${user.username} !!!`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk : async () => {
                const res = await reqDeleteUser(user._id)
                if(res.status === 0) {
                    message.success(`用户${user.username}删除成功！`)
                    this.props.getUserList()
                }else{
                    message.error(res.msg)
                }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        
    }
    handleCancel = () =>{
        this.setState({isShow:false})
    }
    render() {
        const {isShow,confirmLoading,roleObj,isUpdate} = this.state
        const {roleList,userList} = this.props
        const title = (
            <Button type='primary' onClick = {()=>{this.setState({isShow:true,isUpdate:false});this.user={}} }>
                <Icon type='plus'></Icon>
                <span>添加用户</span>
            </Button>
        )
        const columns = [
            {
                title:'用户名',
                dataIndex:'username',
                key:'name',
                width:200,
                align:'center'
            },
            {
                title:'邮箱',
                dataIndex:'email',
                key:'email',
                width:200,
                align:'center'
            },
            {
                title:'电话',
                dataIndex:'phone',
                key:'phone',
                width:200,
                align:'center'
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                key:'create_time',
                width:200,
                align:'center',
                render: formatDate
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                key:'role_id',
                align:'center',
                width:200,
                render: _id => roleObj[_id]
            },
            {
                title:'操作',
                key:'action',
                align:'center',
                width:300,
                render: (user)=> (
                    <div>
                        <Button type='primary' style={{marginRight:10}} onClick={()=>{this.user = user; this.setState({isUpdate:true,isShow:true})}}>修改</Button>
                        <Button type='danger' onClick={()=>this.deleteUser(user)}>删除</Button>
                    </div>
                )
            },
        ]
        
        return (
            <Card title={title} >
                <Table columns={columns} dataSource={userList.users} bordered={true} rowKey='_id'>

                </Table>

                <Modal
                    title={ isUpdate ? '修改用户' : '新增用户'}
                    visible={isShow}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <UserForm getForm={(form) => this.form = form} roleList={roleList} user={this.user || {} }></UserForm>
                </Modal>
            </Card>
        )
    }
}

export default connect(
    state => ({
        roleList: state.roleList,
        userList: state.userList
    }),{
        getRoleList,
        getUserList
    }
)(User)