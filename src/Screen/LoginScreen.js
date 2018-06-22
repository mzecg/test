import React, { Component } from 'react'
import {
    NavBar,
    Icon,
    List,
    InputItem,
    WhiteSpace,
    Button,
    WingBlank,
    Toast,
} from 'antd-mobile';
import userManager from '../DataServer/UserManager';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }
    render() {

        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >
                    登录
                </NavBar>
                <WhiteSpace />

                <List>
                    <InputItem
                        type={'text'}
                        value={this.state.username}
                        onChange={(username) => { this.setState({ username }) }}
                        placeholder={"请输入用户名"}
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        type={'text'}
                        value={this.state.password}
                        onChange={(password) => { this.setState({ password }) }}
                        placeholder={"请输入密码"}
                    >
                        密码
                    </InputItem>
                </List>
                <WhiteSpace />
                <WingBlank>
                    <Button
                        type={"primary"}
                        onClick={async () => {
                            const result = await userManager.login(this.state.username, this.state.password)
                            if (result.success == false) {
                                Toast.fail(result.errorMessage)
                                return;
                            }
                            this.props.history.replace('/HomeScreen');
                        }}
                    >
                        登录
                </Button>
                <WhiteSpace/>
                <Button
                        type={"primary"}
                        onClick={async () => {
                            this.props.history.replace('/RegisterScreen');
                        }}
                    >
                        注册
                </Button>
                </WingBlank>
            </div>
        );
    }
}