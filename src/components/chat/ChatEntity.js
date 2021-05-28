import React from 'react';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import Message from "./Message";
import parseEmoji from "../../helpers/Emoji";
import {VerticalBox, VerticalScroller} from "../../views/design/Containers";
import User from "../shared/models/User";
import InputField from "../general/InputField";
import Data from "../shared/models/Data";


class ChatEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: null,
            messages: null,
            collapsed: false,
        };
    }

    /**
     * this method posts a message.
     * It takes the current value of the input field and the userId from the local storage
     * to send a message-post-request to the server.
     * The input field's content is cleared afterwards.
     * If the input field is empty beforehand, the operation is canceled.
     */
    async postMessage() {
        try {
            let inputField = document.getElementById(`chatInput${this.props.chatId}`);

            // if there's nothing to send, we cancel the operation
            if (!inputField.value) return;

            // request setup
            const url = `/chat/${this.props.chatId}`;
            const requestBody = JSON.stringify({text: inputField.value});
            const config = {headers: User.getUserAuthentication()};
            const response = await api.post(url, requestBody, config);
            console.log(response);
            inputField.value = "";    // reset input field

        } catch (error) {
            alert(`Something went wrong while sending the message: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        this.setState({
            chat: await Data.get(this.props.chatId),
        })
    }

    render() {
        if (!this.state.chat) return <Spinner/>

        return (
            <VerticalBox
                style={{
                    // position: 'relative',
                    // bottom: 0,
                    //
                    // maxHeight:'100%',
                    // display: 'flex',
                    // flexFlow: 'column',
                    display:'flex',
                    flexDirection:'column',
                    overflow:'hidden',
                    flexGrow:'1',
                }}
            >
                <div
                    style={{
                        // height:'100%',
                        // marginTop:'0px',
                        // marginBottom:'10px',
                        // position:'relative',
                        overflow:'hidden',
                        display:'flex',
                        flexDirection:'column',
                        flexGrow:'1',
                    }}
                >
                    {this.state.chat ? this.messageList() : <Spinner/>}
                </div>
                <div style={{
                    // alignSelf:'flex-end',
                    // position: 'absolute',
                    // bottom: 0,
                    width: '100%',
                    padding: '15px',
                }}>
                    <InputField
                        id={`chatInput${this.props.chatId}`}
                        submitAction={() => this.postMessage()}
                        submitButtonText='Send'
                        textFilters={[parseEmoji]}
                    />
                </div>
            </VerticalBox>
        );
    }

    messageList() {
        return (<VerticalScroller style={{

            flexGrow:'1',
            height: '100%',
            width: '100%',
            overflow: 'auto',
            paddingRight: '10px',
            paddingLeft: '10px',
            display: 'flex',
            flexDirection: 'column-reverse',
        }}>
            {/* double reverse the message list to stay scrolled on the bottom */}
            {this.state.chat.messages.slice().reverse().map(messageId => {
                return <Message messageId={messageId} updateLoop={this.props.updateLoop}/>;
            })}
        </VerticalScroller>);
    }
}

export default withRouter(ChatEntity);
