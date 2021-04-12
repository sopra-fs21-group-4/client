import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import MessageView from "../../views/MessageView";

class ChatCreator extends React.Component {

  async createChat() {
    try {
      const response = await api.post(`/chat/create`);
      console.log(response);
      this.props.history.push(`/chat/${response.data.chatId}`);
    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  render() {
    return <Button  onClick={ () => {
      this.createChat();
    }}
    >
      create new chat
    </Button>;
  }
}

export default withRouter(ChatCreator);
