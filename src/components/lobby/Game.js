import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import Lobby from "./Lobby";
import Chat from "../chat/Chat";
import {ConservativeBox, HorizontalBox} from "../../views/design/Containers";
import { Label } from "../../views/design/Text";
import { InputField } from "../../views/design/Interaction";
import User from "../shared/models/User";
import {Spinner} from "../../views/design/Spinner";
import GameRound from "../game/GameRound";
import ExpandableVBox from "../../views/design/ExpandableVBox";
import PlayerList from "../game/PlayerList";

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

      const gameResponse = await api.get(url, config);
      console.log(gameResponse);
      this.setState({
        game: gameResponse.data,
        status: gameResponse.status,
      });
      const players = await api.get(`/users`, { headers:{ userIds: this.state.game.players } });
      console.log(players);
      this.setState({players: players.data});
    } catch (error) {
      // the component will react accordingly when we update the status
      if (error.response) this.setState({status: error.response.status});
      else alert(`Something went wrong internally while fetching game info: \n${handleError(error)}`);
    }
  }



  async update() {
    switch(this.state.status) {
      case null:  // if we don't know, why not just try
      case 200: // 200: OK
      case 201: // 201: CREATED
        this.fetchGameData();
        break;
      case 404: // 404: NOT_FOUND
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
            <HorizontalBox>
              {this.currentGameStateUI()}
              <ExpandableVBox
                style={{
                  height: '95vh',
                }}
              >
                <div
                    style={{
                      height: '20%',
                      background: '#dfebe3',
                    }}
                >
                  <PlayerList
                      game={this.state.game}
                      players={this.state.players}
                  />
                </div>
                <div
                    style={{
                      height: '80%',
                      background: '#f0f0ff',
                    }}
                >
                  <Chat
                      updateLoop={this.props.updateLoop}
                      chatId={this.state.game.gameChatId}
                  />
                </div>
              </ExpandableVBox>
            </HorizontalBox>
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
      case 'LOBBY':     return (<Lobby game={this.state.game} />);
      case 'STARTING':  return <ConservativeBox><Spinner/></ConservativeBox>;  // TODO loading screen
      case 'PAUSED':
      case 'RUNNING':   return <GameRound game={this.state.game} players={this.state.players} />;
      case 'AFTERMATH': return <ConservativeBox><Spinner/></ConservativeBox>;
      default: throw "unknown game state!";
    }
  }

}

export default withRouter(Game);
