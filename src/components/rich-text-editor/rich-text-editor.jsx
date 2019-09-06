import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { EditorState, convertToRaw ,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
    static propTypes = {
        detail:PropTypes.string
    }
  state = {
    editorState: EditorState.createEmpty(),
  }
  componentDidMount(){
      const {detail} = this.props
      if(detail){
        const contentBlock = htmlToDraft(detail);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
            editorState
        })
        
      }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  // 返回 富文本html结构
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  uploadImage = (file) => {
    return new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/manage/img/upload');
          xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
          const data = new FormData();
          data.append('image', file);
          xhr.send(data);
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          });
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
          });
        }
      )
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorStyle={{border:'1px solid #ccc', height:200 , padding:'0 20px'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback:this.uploadImage, alt: { present: true, mandatory: true } },
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
