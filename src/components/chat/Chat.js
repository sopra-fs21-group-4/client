import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Interaction';
import { withRouter } from 'react-router-dom';
import Message from "../../views/Message";
import parseEmoji from "../../helpers/Emoji";
import { VerticalBox, VerticalScroller } from "../../views/design/Containers";
import User from "../shared/models/User";

const InputBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const InputField = styled.input`
  width: 100%;
  margin-right: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #06c4ff;
  background: #ffffff88;
  color: #000000;
`;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const config = { headers: User.getUserAuthentication()};
      const response = await api.post(url, requestBody, config);
      console.log(response);
      inputField.value = "";    // reset input field

    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  async update() {
    if (!this.props.chatId) return;
    try {
      const response = await api.get(`/chat/${this.props.chatId}`);
      console.log(response);
      this.setState({ messages: response.data });
    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  componentDidMount() {
    this.props.updateLoop.addClient(this);
  }

  componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    return (
        <VerticalBox
            style={{
                position: 'relative',
                bottom: 0,
                height: '100%',
            }}
        >
          <div
              style={{
                  position: 'relative',
                  height: '100%',
                  paddingBottom: '65px',
              }}
          >
            {this.state.messages? this.messageList() : <Spinner/>}
          </div>
            {this.inputBox()}
        </VerticalBox>
    );
  }

  messageList() {
    return (<VerticalScroller style={{
        position: 'relative',
        bottom: '0px',
        height: '100%',
        width: '100%',
        overflow:'auto',
        paddingRight: '10px',
        paddingLeft: '10px',
        display: 'flex',
        flexDirection: 'column-reverse',
    }}>
      {/* double reverse the message list to stay scrolled on the bottom */}
      {this.state.messages.slice().reverse().map(message => {
        return (
            <Message message={message} />
        );
      })}
    </VerticalScroller>);
  }

  inputBox() {
    return (
        <InputBox>
          <InputField             // this is the component where the user can write text messages
              id={`chatInput${this.props.chatId}`}
              type="text"
              autoComplete="off"
              placeholder=" ... "
              maxLength="255"     // max length for database (+ 1 for EOS \0)
              onChange={e => {
                e.target.value = parseEmoji(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key == 'Enter') this.postMessage();
              }}
          />
          <Button                 // with this button the text message will be sent off
              width="80px"
              onClick={() => {
                this.postMessage();
              }}
          >
            Send
          </Button>
        </InputBox>
    );
  }
}

export default withRouter(Chat);
