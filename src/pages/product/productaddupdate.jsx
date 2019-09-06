import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Card,Icon,Form,Button,Input,Select,message} from 'antd'
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor'
import {getCategorys} from '../../redux/actions'
import PicturesWall from '../../components/uploadimage/uploadimage'
import {reqAddProduct} from '../../api/api'
class ProductAddUpdate extends Component {
    constructor(props){
        super(props)
        this.pwRef = React.createRef()
        this.editorRef = React.createRef()
    }
    componentDidMount(){
        // 获取表单中分类列表
        if(!this.props.categorys.length){
            this.props.getCategorys()
        }
        // 是否进行更新商品操作
        this.isUpdate = false
    }
    // 自定义表单中价格校验
    validatorPrice = (rule,value,callback) => {
        if(value === '') {
            callback()
        }else if(value *1 <= 0){
            callback('价格不能小于0')
        }else{
            callback()
        }
    }
    // 表单提交 与统一验证
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async (err , value) => {
            if(!err){
                const {name,price,desc,categoryId}  = value
                const imgs = this.pwRef.current.getFileList()
                const detail = this.editorRef.current.getDetail()
                console.log(name,price,desc,categoryId,imgs,detail)
                if(this.isUpdate){

                }else{
                    const product = {name,price,desc,categoryId,imgs,detail}
                    const res = await reqAddProduct(product)
                    if(res.status === 0){
                        message.success(`${name} 添加成功！`)
                    }else{
                        message.error( `${name}  添加失败！` )
                    }
                }
            }else{
                console.log(err)
                message.error('表单验证不通过！')
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

                    <Form.Item label='商品图片' wrapperCol={{span:20}}>
                        <PicturesWall ref={this.pwRef} imgs={['image-1567739612345.jpg']}></PicturesWall>
                    </Form.Item>

                    <Form.Item label='商品详情' wrapperCol={{span:20}}>
                        <RichTextEditor detail={'<h1>测试</h1>'} ref={this.editorRef}></RichTextEditor>
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

