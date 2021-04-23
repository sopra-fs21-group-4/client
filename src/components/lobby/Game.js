import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import Lobby from "./Lobby";
import Chat from "../chat/Chat";
import { ConservativeBox } from "../../views/design/Containers";
import { Label } from "../../views/design/Text";
import { InputField } from "../../views/design/Input";
import User from "../shared/models/User";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      game: null,
      password: null,
      status: null,
    };
  }

  async tryJoin() {
    try {
      // request setup
      const url = `/games/${this.props.match.params.gameId}/join`;
      const config = {
        headers: {
          ...User.getUserAuthentication(),
          password: this.state.password,
        }
      };
      const response = await api.put(url, "", config);
      console.log(response);

      this.setState({
        game: response.data,
        status: response.status,
      });
    } catch (error) {
      // the component will react accordingly when we update the status
      this.setState({status: error.response.status});
    }
  }

  async fetchGameData() {

    try {
      // request setup
      const url = `/games/${this.props.match.params.gameId}`;
      const config = { headers: User.getUserAuthentication() };

      const response = await api.get(url, config);
      console.log(response);
      this.setState({
        game: response.data,
        status: response.status,
      });
    } catch (error) {
      // the component will react accordingly when we update the status
      this.setState({status: error.response.status});
    }
  }



  async update() {
    switch(this.state.status) {
      case null:  // if we don't know, why not just try
      case 200: // 200: OK
      case 201: // 201: CREATED
        this.fetchGameData();
        break;
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
    switch(this.state.status) {
      case 200: // 200: OK
        return (
            <ConservativeBox>
              <ConservativeBox style={{paddingRight:'150px'}}>
                {this.currentGameStateUI()}
              </ConservativeBox>
              <Chat
                  updateLoop={this.props.updateLoop}
                  chatId={this.state.game.gameChatId}
              />
            </ConservativeBox>
        );
      case 401: // 401: UNAUTHORIZED
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
      case 404: // 404: NOT_FOUND
        return (
            <Label>
              This game doesn't seem to exist.
            </Label>
        );
      case 410: // 410: GONE
        return (
            <Label>
              This game is over. What are you still doing here?
            </Label>
        );
      case 422: // 422: UNPROCESSABLE_ENTITY
        return (
            <Label>
              This game is either full or already running.
            </Label>
        );
      case 423: // 423: LOCKED
        return (
            <Label>
              You have been banned from this game.
            </Label>
        );

      default: return null;
    }
  }

  currentGameStateUI() {
    // TODO return right game UI dependent on game state
    switch (this.state.game.gameState) {
      case 'LOBBY':  return (<Lobby game={this.state.game} updateLoop={this.props.updateLoop} />);
      case 'TITLE':  return (<Lobby game={this.state.game} updateLoop={this.props.updateLoop} />);
      case 'VOTE':   return (<Lobby game={this.state.game} updateLoop={this.props.updateLoop} />);
      case 'POINTS': return (<Lobby game={this.state.game} updateLoop={this.props.updateLoop} />);
      case 'FINISH': return (<Lobby game={this.state.game} updateLoop={this.props.updateLoop} />);
      default: throw "unknown game state!";
    }
  }

}

export default withRouter(Game);
