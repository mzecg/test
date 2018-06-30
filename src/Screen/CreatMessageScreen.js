import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
    Icon,
    TextareaItem,
    Modal,
    ImagePicker
} from 'antd-mobile';

import messageManager from '../DataServer/MessageManager';
import userManager from '../DataServer/UserManager';


export default class CreateMessageScreen extends Component {
    componentDidMount(){
        if(userManager.isLogin() === false){
            this.props.history.replace('/');
        }
    }
    constructor(props) {
      super(props)

      this.state = {
         title:'',
         content:'',
         files:[]
      }
    }
    render(){
        return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{this.props.history.goBack()}}    
                >
                    发消息</NavBar>
                    <WhiteSpace/>
                    <List>
                        <InputItem
                            type={'text'}
                            value={this.state.title}
                            onChanger={(title)=>{this.setState({title})}}
                            placehoder={'请输入标题'}
                        >
                        标题
                        </InputItem>
                        <TextareaItem
                            type={'text'}
                            value={this.state.content}
                            onChanger={(content)=>{this.setState({content})}}
                            placehoder={'请输入内容'}
                            autoHeihgt={true}
                        />
                    </List>
                    <WhiteSpace/>
                    <WingBlank>
                        <ImagePicker
                            files={this.state.files}
                            onChanger={(files)=>{this.setState({files})}}
                            selectable={this.state.files.length<=9}
                        />
                        <WhiteSpace/>
                        <Button
                            type={'primery'}
                        >
                            提交
                        </Button>
                    </WingBlank>
            </div>
        )
    }
    submitMessage=async()=>{
        Toast.loading('内容上传中...',0);
        const result = await messageManager.postMessage(this.state.title,this.state.content,this.state.files);
        Toast.hide();
        if(result.success === false){
            Toast.fail(result.errorMessage);
            return;
        }
        HTMLModElement.alert('提交成功','点击确认键返回',[{
            text:'确认',
            onPress:()=>{this.props.history.goBack()}
        }])
    }

    
}