import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import Lobby from "../lobby/Lobby";
import Chat from "../chat/Chat";
import {ConservativeBox, HorizontalBox, VerticalBox} from "../../views/design/Containers";
import { Label, Title } from "../../views/design/Text";
import {Button, InputField} from "../../views/design/Interaction";
import User from "../shared/models/User";
import {Spinner} from "../../views/design/Spinner";
import GameRound from "./GameRound";
import ExpandableVBox from "../../views/design/ExpandableVBox";
import PlayerList from "./PlayerList";
import GameSummary from "../game/GameSummary";

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
      //console.log(response);

      this.setState({
        game: response.data,
        status: response.status,
      });
    } catch (error) {
      // the component will react accordingly when we update the status
      this.setState({status: error.response.status});
      alert("Invalid password, try again")
    }
  }

  async fetchGameData() {
    try {
      // request setup
      const url = `/games/${this.props.match.params.gameId}`;
      const config = { headers: User.getUserAuthentication() };

      const gameResponse = await api.get(url, config);
      //console.log(gameResponse);
      this.setState({
        game: gameResponse.data,
        status: gameResponse.status,
      });
      const players = await api.get(`/users`, { headers:{ userIds: this.state.game.players } });
      //console.log(players.data);
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
      case 401: // 401: UNAUTHORIZED
        break;
      case 404: // 404: NOT_FOUND
        break;
      default: this.tryJoin();
    }
  }

  async componentDidMount() {
      this.tryJoin();
    this.props.updateLoop.addClient(this);
  }

  async componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    switch(this.state.status) {
      case 200: // 200: OK
        return (
            <HorizontalBox
                style={{
                  position:'fixed',
                  bottom:0,
                  left:0,
                  height: '95vh',
                  width: '100%',
                }}
            >
              {this.currentGameStateUI()}
              <ExpandableVBox
                style={{
                  position:'fixed',
                  bottom:0,
                  right:0,
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
          <VerticalBox
          style={{
            paddingLeft: '10%',
              paddingRight: '10%',
          }}
          >
            <Label
                style={{
                    fontSize: '20px',
                    height: '80px',
                    textAlign: 'left',
                    paddingLeft: '10px',
                }}>
                This lobby seems to be password protected.
            </Label>
              <div style={{ margin: "10px",}}>
                <Label>
                    Please enter the password:
                </Label>
              </div>
            <InputField
                placeholder={"Enter password here.."}
                onChange={e => {
              this.setState({password: e.target.value})
            }} />
            <Button
                style={{
                    size: '100px',
                    margin: "10px",
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    textAlign: 'center',
                }}
                onClick={e => this.tryJoin()}
            >  Join  </Button>

          </VerticalBox>
        );
      case 404: // 404: NOT_FOUND
        return (
            <GameSummary/>
            // <Label>
            //   This game doesn't seem to exist.
            // </Label>
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
      case 'AFTERMATH': return <GameSummary game={this.state.game} players={this.state.players} />;
      default: throw "unknown game state!";
    }
  }

}

export default withRouter(Game);
