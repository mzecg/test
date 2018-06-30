import React,{Commponent} from 'react'
import moment from 'moment';
import {
    WingBlank,
    WhiteSpace,
    Card,
  } from "ant-mobile";
  import './HomeListItem.css'

  export default class CommentListItem extends Component{
      render(){
        <div>
            <WingBlank>
                <WhiteSpace/>
                <Card>
                    <Card.Header
                        title={this.props.message_user.username}
                        extra={moment(this.props.createdAt).format('YYYY-MM-DD HH:mm')}
                    />
                    <Card.Body>
                        <span id="content">
                            {this.props.content}
                        </span>
                    </Card.Body>
                </Card>
            </WingBlank>
        </div>
      }
  }