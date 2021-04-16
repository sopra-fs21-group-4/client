import React from 'react';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import Lobby from "../lobby/Lobby";
import Chat from "../chat/Chat";
import {HorizontalBox} from "../../views/design/Containers";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      chatId: null,
      game: null,
      updating: false,
      active: true,
    };
  }



  async update() {

    try {
      const response = await api.get(`/game/${this.props.match.params.gameId}`);
      console.log(response);
      this.setState({
        game: response.data,
        chatId: response.data.chatId,
      });
    } catch (error) {
      if (error.response && error.response.status) {
        alert(`Something went wrong while fetching game info: \n${error.response.status}`);
      }
      alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
    }
  }

  async componentDidMount() {
    this.props.updateLoop.addClient(this);
  }

  async componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    return (
      <HorizontalBox>
        {this.currentGameStateUI()}
        <Chat
            updateLoop={this.props.updateLoop}
            chatId={this.state.chatId}
        />
      </HorizontalBox>
    );
  }

  currentGameStateUI() {
    // TODO return right game UI dependent on game state
    if (!this.state.game) return (<Spinner/>);
    switch (this.state.game.state) {
      case 'LOBBY':  return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'TITLE':  return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'VOTE':   return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'POINTS': return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'FINISH': return (<Lobby updateLoop={this.props.updateLoop} />);
      default: //throw "unknown game state!"; TODO implement
    }
  }

}

export default withRouter(Game);
