import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    Icon,
    TextareaItem,
    Modal
} from 'antd-mobile';

import messageManager from '../DataServer/MessageManager';
import userManager from '../DataServer/UserManager';


export default class CreateMessageScreen extends Component {
    componentDidMount() {
        if (!userManager.isLogin()) {
            this.props.history.replace('/');
        }
    }
    constructor(props) {
      super(props)

      this.state = {
         title:'',
         content:''
      }
    }
    submitComment=async()=>{
        Toast.loading('内容上传中...',0);
        const messageID=this.props.match.params.id;
        const result =await messageManager.postComment(messageID);
        Toast.hide();
        if(result.success===false){
            Toast.fail(result.errorMessage);
            if(result.errorCode===10004){
                userManager.logout();
                this.props.history.replace('/')
            }
            return;
        }
        Modal.alert('提交成功','点击确认键返回',[{
            text:'确认',
            onPress:()=>{this.props.history.goBack()}
        }])
    }

    render(){
        return(
            <div>
                <NavBar
                    mode='dark'
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{this.props.history.goBack()}}
                >
                    发评论
                </NavBar>
                <WhiteSpace/>
                <List>
                    <TextareaItem
                        type="text"
                        value={this.state.content}
                        onChange={(content)=>{this.setState({content})}}
                        placeholder={'请输入评论内容'}
                        autoHeight={true}
                    />  
                </List> 
                <WhiteSpace/>
                <WingBlank>
                    <Button
                        type={'primary'}
                    >
                        提交
                        </Button>
                </WingBlank>
            </div>
        )
    }
}