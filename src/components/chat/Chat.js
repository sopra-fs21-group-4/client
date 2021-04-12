import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import MessageView from "../../views/MessageView";

const Container = styled(BaseContainer)`
  width: 600px;
  color: white;
  text-align: center;
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
      messages: null
    };
  }

  async postMessage() {
    try {
      const { chatId } = this.props.match.params

      const requestBody = JSON.stringify({
        senderId: localStorage.getItem('userId'),
        text: this.state.input,
      });

      const response = await api.post(`/chat/${chatId}`, requestBody);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  async componentDidMount() {
    try {

      const { chatId } = this.props.match.params

      const response = await api.get(`/chat/${chatId}`);

      // Get the returned users and update the state.
      this.setState({ messages: response.data });

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
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
                      <MessageView message={message} />
                  );
                })}
            <ButtonContainer>
              <InputField
                  placeholder="..."
                  onChange={e => {
                    this.handleInputChange('input', e.target.value);
                  }}
              />
              <Button
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
