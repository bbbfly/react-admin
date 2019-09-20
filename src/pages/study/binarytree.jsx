import React, { Component } from 'react'

export default class BinaryTree extends Component {
    constructor(props){
        super(props)
        this.state = {
            binaryTree:{},
            arr:[4,1,0,8,5,9,7,3,2,6]
        }
    }
    componentDidMount(){
        const binaryTree = {
            root:null
        }
        const {arr} = this.state
        arr.forEach( (item,index) => {
            if(index === 0){
                binaryTree.root = {
                    key:item,
                    left:null,
                    right:null
                }
            }else{
                let newNode = {
                    key:item,
                    left:null,
                    right:null,
                }
                this.insertNode(binaryTree.root,newNode)
            }
        })
        console.log(binaryTree)
        let dom = this.initDom(binaryTree.root)
        this.setState({
            binaryTree,
            dom
        })    
    }
    insertNode = (node,newNode) =>{
        if(node.key>newNode.key){
            if(node.left === null){
                node.left = newNode
            }else{
                 this.insertNode(node.left,newNode)
            }
        }else{
            if(node.right === null){
                node.right = newNode
            }else{
                this.insertNode(node.right,newNode)
            }
        }
    }
    initDom(node=null){
        return (
            <div>
                <div style={{display:'flex',justifyContent:'space-around'}}>
                    <span style={{border:'1px solid #ccc',margin:10,padding:10}}>{node?node.key:'/'}</span>
                </div>
                {
                    node?(
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <span >{this.initDom(node.left)}</span> 
                            <span >{this.initDom(node.right)}</span>
                        </div>
                    ): null
                }
            </div>
        )
    }
    render() {
        const{dom} = this.state
        return (
            <div>
                {dom}
            </div>
        )
    }
}

function Node (key) {
    this.key = key
    this.left = null
    this.right = null
}
function Tree (){
    this.root = null
    this.insert = function (key){
        const newNode = new Node(key)
        if(this.root === null){
            this.root = newNode
        }else{
            this.insertNode(this.root,newNode)
        }
    }
    this.insertNode= function (root,newNode){
        if(root.key>newNode.key){
            if(root.left === null){
                root.left = newNode
            }else{
                this.insertNode(root.left,newNode)
            }
        }else{
            if(root.right === null){
                root.right = newNode
            }else{
                this.insertNode(root.right,newNode)
            }
        }
    }
}
