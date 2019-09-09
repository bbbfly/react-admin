import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Select} from 'antd'
 class UserForm extends Component {
    static propTypes = {
        getForm:PropTypes.func.isRequired,
        roleList:PropTypes.array.isRequired,
        user:PropTypes.object.isRequired
    }
    componentDidMount(){
        this.props.getForm(this.props.form)
    }
    validateToNextPassword = (rule,value,callback)=> {
        const {form} = this.props
        if(value){
            form.validateFields(['confirm'], { force: true });
        }
        callback()
    }
    compareToFirstPassword = (rule,value,callback) => {
        const {form} = this.props 
        if( value && value !==form.getFieldValue('password')){
            callback('两次密码不一致！！！')
        }else{
            callback()
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const {roleList} = this.props
        const formItemLayout ={
            labelCol:{span:6},
            wrapperCol:{span:10}
        }
        const {username='',password='',phone='',email='',role_id=''} = this.props.user
        return (
            <Form {...formItemLayout}>
                <Form.Item label='用户名'>
                    {getFieldDecorator('username',{
                        initialValue:username,
                        rules:[
                            {required:true, whitespace:true,message:'用户名不能为空!'},
                            {max:16,message:'用户名不超过16位!'},
                            {min:4,message:'用户名不小于4位!'},
                        ]
                    })(
                        <Input></Input>
                    )}
                </Form.Item>

                <Form.Item label='密码'>
                    {getFieldDecorator('password',{
                        initialValue:'',
                        rules:[
                            {required: password ? false : true, whitespace:true,message:'密码不能为空!'},
                            {pattern:/^[a-zA-Z0-9_]/,message:'字母数字下划线开头'},
                            {min:5,message:'密码不能小于5位！'},
                            {max:16,message:'密码不能超过16位！'},
                            {validator: this.validateToNextPassword}
                        ]
                    })(
                        <Input.Password disabled={!!phone}></Input.Password>
                    )}
                </Form.Item>
                <Form.Item label='确认密码'>
                    {getFieldDecorator('confirm',{
                        initialValue:'',
                        rules:[
                            {required: password? false: true, whitespace:true,message:'再次输入密码!'},
                            {validator: this.compareToFirstPassword}
                        ]
                    })(
                        <Input.Password disabled={!!phone}></Input.Password>
                    )}
                </Form.Item>

                <Form.Item label='手机号'>
                    {getFieldDecorator('phone',{
                        initialValue:phone,
                        rules:[
                            {pattern:/^[0-9]+$/,message:'手机号有误'},
                            {required:true, whitespace:true,message:'手机号不能为空!'},
                            {len:11,message:'请输入11位手机号'},
                            
                        ]
                    })(
                        <Input ></Input>
                    )}
                </Form.Item>
                <Form.Item label='邮箱'>
                    {getFieldDecorator('email',{
                        initialValue:email,
                        rules:[
                            {pattern:/^.+@.+\.com/,message:'邮箱格式有误'}
                        ]
                    })(
                        <Input></Input>
                    )}
                </Form.Item>

                <Form.Item label='角色'>
                    {getFieldDecorator('role_id',{
                        initialValue:role_id,
                        rules:[
                            {required:true,message:'请指定用户所属角色！'}
                        ]
                    })(
                        <Select>
                            <Select.Option value='' key=''>未指定</Select.Option>
                            { roleList.map( role => <Select.Option value={role._id} key={role._id}>{role.name}</Select.Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(UserForm)