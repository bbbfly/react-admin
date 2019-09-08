import React, { Component } from 'react'
import {connect}  from 'react-redux'
import {Form,Button,Card,Icon,Table,Modal,Input,message,Tree} from 'antd'
import {getRoleList} from '../../redux/actions'
import {reqAddRole,reqUpdateRole} from '../../api/api'
import {formatDate} from '../../utils/tools'
import menuList from '../../utils/menulist'
const {TreeNode} = Tree
 class Role extends Component {
    constructor(props){
        super(props)
        this.state={
            isAddRole:false,
            confirmLoading:false,
            isAuth:false,
            authKeys:[],
            role:{}, // 更改授权的角色,
            authNode:[], // 权限树节点
        }
    }
    componentDidMount(){
        if(!this.props.roleList.length){
            this.props.getRoleList()
        }
        this.setState({
            authNode:this.getAuthNode(menuList)
        })
    }
    getAuthNode = (menulist) => {
        return menulist.map( node => {
            return (
                <TreeNode title={node.title} key={node.key}>
                    { node.children? this.getAuthNode(node.children) : null}
                </TreeNode>
            )
        })
    }
    handleRoleOk = () =>　{
        this.props.form.validateFields(async (err,value) => {
            if(!err){
                this.props.form.resetFields()
                this.setState({confirmLoading:true})
                const res = await reqAddRole(value.name)
                if(res.status === 0) {
                    message.success(`${value.name}  添加成功！`)
                    this.setState({isAddRole:false,confirmLoading:false})
                    this.props.getRoleList()
                }
            }else{
                message.error(err)
            }
        })
        
    }
    handleRoleCancel = () => {
        console.log(this.props.form)
        this.setState({isAddRole:false})
    }
    deleteRole = () => {

    }
    onCheck = (checkedKeys) => {
        this.setState({
            authKeys:checkedKeys
        })
    }
    handleAuthOk = async () => {
        const {_id} = this.state.role
        const {authKeys} = this.state
        const {auth_name} = this.props
        const res = await reqUpdateRole({_id,menus:authKeys,auth_time:Date.now(),auth_name})
        if(res.status === 0){
            message.success('权限设置成功！')
            this.props.getRoleList()
            this.setState({
                isAuth:false
            })
        }else{
            message.error(res.msg)
        }
    }
    render() {
        const title = (
            <Button type='primary' onClick={()=>{this.setState({isAddRole:true})} }>
                <Icon type='plus'></Icon>
                <span>添加角色</span>
            </Button>
        )

        const formItemLayout ={
            labelCol:{span:6},
            wrapperCol:{span:10}
        }
        const columns = [
            {
                title:'角色名称',
                dataIndex:'name',
                key:'name',
                width:200
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                key:'create_time',
                width:200,
                render: time => formatDate(time) // 简写 formatDate
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                key:'auth_time',
                width:200,
                render: formatDate
            },
            {
                title:'授权人',
                dataIndex:'auth_name',
                key:'auth_name',
                width:200
            },
            {
                title:'操作',
                width:300,
                render: (role)=> (
                    <span>
                    <Button ghost type='danger' style={{marginRight:10}} onClick={this.deleteRole}>删除</Button>
                    <Button type='primary' onClick={()=> { this.setState({isAuth:true,role,authKeys:role.menus})}}>更改权限</Button>
                    </span>
                )
            }
        ]
        const {isAddRole,confirmLoading,isAuth,role,authNode,authKeys} = this.state
        const {getFieldDecorator} = this.props.form
        const {roleList} = this.props
        return (
            <Card title={title}>
                <Table rowKey='_id'  columns={columns} dataSource={roleList} bordered></Table>
                <Modal
                    title='添加角色'
                    visible={isAddRole}
                    onOk={this.handleRoleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleRoleCancel}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label='角色名称'>
                            {getFieldDecorator('name',{
                                initialValue:'',
                                rules:[
                                    {required:true,whiteSpace:true,message:'角色名称不能为空！！！'}
                                ]
                            })(
                                <Input></Input>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title='授权管理'
                    visible={isAuth}
                    onOk={this.handleAuthOk}
                    confirmLoading={confirmLoading}
                    onCancel={() => this.setState({isAuth:false})}
                >
                    <Form.Item label='角色名称' {...formItemLayout}>
                        <Input disabled value={role.name}></Input>
                    </Form.Item>

                    <Tree
                        checkable
                        defaultExpandAll
                        showLine
                        checkedKeys={authKeys}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                    >
                        <TreeNode title='平台权限' >
                            {authNode}
                        </TreeNode>
                    </Tree>
                </Modal>
            </Card>
        )
    }
}

export default connect(
    state => ({
        auth_name:state.user.username,
        roleList:state.roleList
    }),{
        getRoleList
    }
)(
    Form.create()(Role)
)

