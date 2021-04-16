import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Message from "../../views/Message";
import Emoji from "../../helpers/Emoji";
import parseEmoji from "../../helpers/Emoji";

const Container = styled(BaseContainer)`
  width: 600px;
  text-align: center;
  background: #f0f0ff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
`;

const InputField = styled.input`
  width: 100%;
  margin-right: 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #06c4ff;
  background: rgba(255, 255, 255, 0.2);
  color: #000000;
`;

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: null,
      updating: false,
      active: true,
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
      const config = {
        headers: {
          'userId': localStorage.getItem('userId'),
          'token': localStorage.getItem('token')
        }
      };

      // send request
      const response = await api.post(url, requestBody, config);

      console.log(response);    // log response
      inputField.value = "";    // reset input field

    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  async update() {
    if (!this.props.chatId) return;
    try {
      // TODO ?latest=10 for debugging purposes
      const response = await api.get(`/chat/${this.props.chatId}?latest=10`);
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
      <Container>
        {!this.state.messages ? (
          <Spinner />
        ) : (
          <div>
                {this.state.messages.map(message => {
                  return (
                      <Message message={message} />
                  );
                })}
            <ButtonContainer>
              <InputField             // this is the component where the user can write text messages
                  id="inputField"
                  type="text"
                  autoComplete="off"
                  placeholder=" ... "
                  maxLength="255"     // max length for database (+ 1 for EOS \0)
                  onChange={e => {
                    document.getElementById("inputField").value = parseEmoji(e.target.value);
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
            </ButtonContainer>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Chat);
