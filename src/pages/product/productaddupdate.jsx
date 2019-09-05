import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Card,Icon,Form,Button,Input,Select} from 'antd'
import {getCategorys} from '../../redux/actions'
import PicturesWall from '../../components/uploadimage/uploadimage'
class ProductAddUpdate extends Component {
    componentDidMount(){
        if(!this.props.categorys.length){
            this.props.getCategorys()
        }
    }
    validatorPrice = (rule,value,callback) => {
        if(value === '') {
            callback()
        }else if(value *1 <= 0){
            callback('价格不能小于0')
        }else{
            callback()
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields( (err , value) => {
            if(!err){
                const {name,price,desc,categoryId}  = value
                console.log(name,price,desc,categoryId)
            }else{
                console.log(err)
            }
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form
        const {categorys} = this.props
        const title = (
            <div>
                <Button onClick={() => this.props.history.go(-1)}>
                    <Icon type='arrow-left' style={{color:'green',margin:'0 10px'}}></Icon>
                    <span>返回</span>
                </Button>
                <span style={{marginLeft:'40%'}}>新增商品</span>
            </div>
        )
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
            labelAlign: 'left'
        }
        
        return (
            <Card title={title}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label='商品名称'  >
                        {
                            getFieldDecorator('name',{
                                rules:[
                                    {required:true,message:'商品名称不能为空！'}
                                ]
                            })(<Input placeholder='请输入商品名称'></Input>)
                        }
                    </Form.Item>

                    <Form.Item label='商品名称'  >
                        {
                            getFieldDecorator('desc',{
                                rules:[
                                    {required:true,message:'商品描述不能为空！'}
                                ]
                            })(<Input.TextArea rows={3} placeholder='请输入商品名称'></Input.TextArea>)
                        }
                    </Form.Item>

                    <Form.Item label='商品价格' >
                        {
                            getFieldDecorator('price',{
                                rules:[
                                    {required: true, message:'商品价格不能为空！'},
                                    {validator: this.validatorPrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter="元"></Input>)
                        }
                    </Form.Item>

                    <Form.Item label='商品分类'>
                    {
                            getFieldDecorator('categoryId',{
                                initialValue: '',
                                rules:[
                                    {required:true,message:'请选择商品分类！'}
                                ]
                            })(
                                <Select>
                                    <Select.Option value=''>未选择</Select.Option>
                                    { categorys.map( item => <Select.Option value={item._id} key={item.key}>{item.name}</Select.Option>)}
                                </Select>
                            )
                        }
                    </Form.Item>

                    <Form.Item label='商品图片' >
                        <PicturesWall></PicturesWall>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>保存并提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default connect(
    state =>({
        categorys: state.categorys
    }),{
        getCategorys
    }
)(withRouter(Form.create()(ProductAddUpdate)))

