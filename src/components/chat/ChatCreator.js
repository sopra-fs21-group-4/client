import React from 'react';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Interaction';
import { withRouter } from 'react-router-dom';

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
