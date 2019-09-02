import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd';
import logo from '../../assets/images/logo.png' 
import './login.less'
import {reqLogin} from '../../api/api'
import {getUser,setUser} from '../../utils/localstorage'

 class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err,value) =>{
            if(!err){
                const result = await reqLogin(value.username,value.password)
                if( result.status === 0){
                    const user = result.data
                    setUser(user)
                    this.props.history.replace('/admin')
                    message.success('登录成功')
                }else{
                    message.error(result.msg)
                }       
            }
        })
    }
    render() {
        const user = getUser()
        if(user._id){
            return <Redirect to='/'></Redirect>
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <div className='login-header flex'>
                    <img className='login-logo' src={logo} alt='logo'/>
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-box'>
                    <h3 className='login-title'>欢迎使用后台系统</h3>
    
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace:true, message: '用户名不能为空！' },
                                    {min: 4,message:'用户名不能小于4位！'},
                                    {max: 14,message:'用户名不能大于14位！'},
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, whitespace:true, message: '密码不能为空！' },
                                    { min: 5, message: '密码不能小于5位！' },
                                    { max: 14, message: '密码不能大于14位！' },
                                    { pattern: /^[\w\d_]+/, message: '字母数字或下划线开头' },
                                ],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Form.create()(Login)