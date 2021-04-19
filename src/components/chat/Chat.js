import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Input';
import { withRouter } from 'react-router-dom';
import Message from "../../views/Message";
import parseEmoji from "../../helpers/Emoji";
import { ConservativeBox } from "../../views/design/Containers";
import User from "../shared/models/User";

const Position = styled.div`
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  padding-top: 50px;
`;

const Container = styled.div`
  width: inherit;
  height: 100%;
  background: #f0f0ff;
`;

const ChatExtended = styled.div`
  width: 450px;
  height: 100%;
  padding-bottom: 75px;
`;

const ChatReduced = styled.div`
  width: 150px;
  height: 100%;
  padding-bottom: 20px;
`;

const MessageList = styled.div`
  width: inherit;
  height: 100%;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 20px;
  margin-bottom: 75px;
  overflow:auto;   
}
`;

const InputBox = styled.div`
  position: absolute;
  bottom: 0;
  width: inherit;
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f0f0ff;
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

const PinButton = styled.button`
  &:hover {
    background: #382445;
  }
  display: block;
  width: 15px;  
  height: 100%;
  padding: 0;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  border: none;
  background: #00000000;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  text-align: center;
  vertical-align: middle;
  color: #bf62ff;
  font-weight: bolder;
`;

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: null,
      pinned: true,
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
      let inputField = document.getElementById("inputField");

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
      // TODO ?latest=10 for debugging purposes
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
      <Position>
        <Container>
          {!this.state.messages ? (
              <Spinner />
          ) : (
              <ConservativeBox>
                  <div>
                      <PinButton
                          onClick={() => {this.state.pinned = !this.state.pinned;}}
                      >
                          {this.state.pinned? '▶' : '◀'}
                      </PinButton>
                  </div>
                {this.state.pinned? (
                    <ChatExtended>
                        {this.messageList()}
                        {this.inputBox()}
                    </ChatExtended>
                ) : (
                    <ChatReduced>
                        {this.messageList()}
                    </ChatReduced>
                )}
              </ConservativeBox>
          )}
        </Container>
      </Position>
    );
  }

  messageList() {
    return (<MessageList>
      {this.state.messages.map(message => {
        return (
            <Message message={message} />
        );
      })}
    </MessageList>);
  }

  inputBox() {
    return (
        <InputBox>
          <InputField             // this is the component where the user can write text messages
              id="inputField"
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
