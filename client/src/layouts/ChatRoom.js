import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import io from 'socket.io-client'
import moment from 'moment'
import zh from 'moment/locale/zh-tw'
@inject('store')
@observer

class ChatRoom extends React.Component {

    constructor(props) {
        super(props)
        this.messages = this.props.store.messages
        this.socket = io.connect('ws://192.168.1.161:3001');
    }
    componentDidMount() {

        this.socket.on('history', (obj) => {
            if (obj.length > 0) {
                this.appendData(obj);
            }
        });
        this.socket.on('message', (obj) => {
            console.log(obj);
            this.appendData([obj]);
        });
    }
    appendData(obj) {
        let el = document.querySelector('.ChatRoomContent');
        let html = el.innerHTML;

        obj.forEach(element => {
            html +=
                `
                <div class="ChatContentList">
                ${element.name}：${element.msg}<span>${moment(element.time).fromNow()}</span>
            </div>
    `;
        });
        el.innerHTML = html.trim();
        el.scrollTo(0,el.scrollHeight)
    }
    ValueChange(e) {
        // console.log(e.target.nam)
        this.messages[e.target.name] = e.target.value
    }
    send() {
        if (this.messages.name !== '' && this.messages.content !== '') {
            let data = {
                name: this.messages.name,
                msg: this.messages.content
            }
            this.socket.emit('message', data);
            // this.messages.name=''
            this.messages.content = ''
        } else {
            alert('請輸入大名和訊息')
            return;
        }
       
    }
    render() {
        return (
            <div className="ChatRoomContainer">
                <div className="ChatRoomContent">
                    {/* <div className="ChatContentList">
                        Robby：Hi~ <span>11分鐘前</span>
                    </div> */}
                </div>
                <div className="InputBox">
                    <div className="inputName">
                        <input type="text" name="name" placeholder="Enter name" onChange={this.ValueChange.bind(this)} value={this.props.store.messages.name} />
                    </div>
                    <div className="inputMessage">
                        <input type="text" name="content" placeholder="Enter message" onChange={this.ValueChange.bind(this)} value={this.props.store.messages.content} />
                    </div>
                    <div className="submit">
                        <div className="send" onClick={this.send.bind(this)}>送出</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ChatRoom)