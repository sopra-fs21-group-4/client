import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import Lobby from "../lobby/Lobby";
import Chat from "../chat/Chat";
import { ConservativeBox } from "../../views/design/Containers";
import { Label } from "../../views/design/Text";
import { InputField } from "../../views/design/InputField";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      chatId: null,
      game: null,
      password: null,
      issue: 'password',
    };
  }

  async tryJoin() {
    try {
      // request setup
      const url = `/lobbies/${this.props.match.params.gameId}/join`;
      const config = {
        headers: {
          userId: localStorage.getItem('userId'),
          token: localStorage.getItem('token'),
          password: this.state.password,
        }
      };
      const response = await api.put(url, "", config);
      console.log(response);

      this.setState({
        game: response.data,
        chatId: response.data.chatId,
        issue: null,
      });
    } catch (error) {
      // since we try joining with every input change of lobbyPassword, there's no use in error spamming
      switch(error.response.status) {
        case 401:   this.setState({issue: 'password'}); break;
        case 403:   this.setState({issue: 'full'}); break;
        case 404:   this.setState({issue: 'not-found'}); break;
      }

    }
  }

  async fetchGameData() {

    try {
      // request setup
      const url = `/lobbies/${this.props.match.params.gameId}`;
      const config = {
        headers: {
          userId: localStorage.getItem('userId'),
          token: localStorage.getItem('token'),
        }
      };

      const response = await api.get(url, config);
      console.log(response);
      this.setState({
        game: response.data,
      });
    } catch (error) {
      alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
    }
  }



  async update() {
    switch(this.state.issue) {
      case null: this.fetchGameData(); break;
      default: this.tryJoin();
    }
  }

  async componentDidMount() {
    this.props.updateLoop.addClient(this);
  }

  async componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    switch(this.state.issue) {
      case null:
        return (
            <ConservativeBox>
              <ConservativeBox>
                {this.currentGameStateUI()}
              </ConservativeBox>
              <Chat
                  updateLoop={this.props.updateLoop}
                  chatId={this.state.chatId}
              />
            </ConservativeBox>
        );
      case 'password':
        return (
          <div>
            <Label>
              This lobby seems to be password protected.
            </Label>
            <InputField onChange={e => {
              this.setState({password: e.target.value})
            }} />
          </div>
        );
      case 'full':
        return (
            <Label>
              This lobby seems to be full.
            </Label>
        );
      case 'full':
        return (
            <Label>
              This lobby doesn't seem to exist.
            </Label>
        );
    }
  }

  currentGameStateUI() {
    // TODO return right game UI dependent on game state
    switch (this.state.game.gameState) {
      case 'LOBBY':  return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'TITLE':  return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'VOTE':   return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'POINTS': return (<Lobby updateLoop={this.props.updateLoop} />);
      case 'FINISH': return (<Lobby updateLoop={this.props.updateLoop} />);
      default: throw "unknown game state!";
    }
  }

}

export default withRouter(Game);
