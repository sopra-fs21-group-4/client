import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Message from "../../views/Message";

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
      chatId: null,
      messages: null,
      updating: false,
      active: true,
    };
  }

  async postMessage() {
    try {

      const requestBody = JSON.stringify({
        senderId: localStorage.getItem('userId'),
        text: this.state.input,
      });

      const response = await api.post(`/chat/${this.state.chatId}`, requestBody);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  async updateLoop() {
    // if the loop is called by multiple threads, only the first should execute it
    if (this.state.updating) return;
    else this.setState({updating: true});

    // loop runs as long as this component is active
    while (this.state.active) {
      try {

        const response = await api.get(`/chat/${this.state.chatId}`);

        // Get the returned users and update the state.
        this.setState({ messages: response.data });

        // See here to get more data.
        console.log(response);

        //wait for 100ms
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
      }
    }
  }

  componentDidMount() {
    // TODO must be able to set chatId from constructor
    if (this.props.chatId)
      this.setState({chatId: this.props.chatId});
    else
      this.setState({chatId: this.props.match.params.chatId});

    // run update loop
    this.updateLoop();
  }

  componentWillUnmount() {
    this.setState({ active: false })
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
                      <Message message={message} />
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
