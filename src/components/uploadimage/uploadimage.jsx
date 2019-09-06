import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal,message } from 'antd';
import { deleteImage} from '../../api/api'

const base = 'http://localhost:5000/upload/'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs:PropTypes.array
  }
  state = {
    previewVisible: false, // 大图预览
    previewImage: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    ],
  };
  componentDidMount(){
    const {imgs} = this.props
    if(imgs && imgs.length){
      const fileList = imgs.map( (item,index) => (
        {
          uid: -index,
          name:item,
          status:'done',
          url: base + item
        }
      ))
      this.setState({ fileList })
    }
  }
// 关闭大图预览
  handleCancel = () => this.setState({ previewVisible: false });
// 预览 并对图片进行一次base64 编码
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
//  fileList , file , event 
  handleChange = async ({ fileList ,file}) =>{
    console.log(file.status);
    // 上传图片成功时
    if(file.status === 'done'){
      
      // file 与 fileList[fileList.length -1] 在上传服务器过程中 不都是同一个对象
      file = fileList[fileList.length -1]
      const {name,url} = file.response.data
      file.name = name
      file.url = url
    }
    // 删除图片时
    else if(file.status === 'removed'){
      const res = await deleteImage(file.name)
      if(res.status === 0) {
        message.success(`图片 ${file.name} 删除成功！`)
      }
    }
    this.setState({ fileList });
  } 
  // 返回给父组件 图片名称列表
  getFileList = () => this.state.fileList.map( item => item.name)

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

