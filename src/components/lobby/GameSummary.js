import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {HorizontalBox, VerticalList} from "../../views/design/Containers";
import User from "../shared/models/User";
import UserList from "../game/PlayerList";
import Form from "../general/Form";
import {Label} from "../../views/design/Text";
import {Spinner} from "../../views/design/Spinner";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Interaction";
import styled from "styled-components";

const ButtonLogin = styled.button`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 10px;
  font-weight: 700;
  
  font-size: 15px;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: auto;
  border: none;
  border-radius: 2px;
  margin-right: 15px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;

class GameSummary extends React.Component {



    async componentDidMount() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}`;

            const requestBody = JSON.stringify({

            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.get(url, config);
            console.log(response);

        } catch (error) {
            alert(`Something went wrong on updating the game settings: \n${handleError(error)}`);
        }
    }
    aftermathInteractive() {
        let game = this.props.game;
        let players = this.props.players.slice();
        players.sort((a,b) => {return game.scores[b.userId] - game.scores[a.userId]});
        return <BaseContainer>Scores:
            {players.map(player => {

                let score = game.scores[player.userId];
                return <div >
                    <Label> {player.username}: {score}</Label>
                </div>
            })}
        </BaseContainer>
    }

    async gotoLobby() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}/leave`;
            const requestBody = "";
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);
            this.props.history.push('/')

        } catch (error) {
            alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
        }
    }

    render() {
        if (!this.props.game || !this.props.players) {
            return <Spinner/>
        }
        return (
            <div>
                <div style={{
                    width: '80%'
                }}>

                </div>
                <div style={{
                    width: '20%',
                    paddingTop: '30px',
                }}>
                    {this.aftermathInteractive()}
                </div>
                <ButtonLogin
                    role="button"

                    width="50%"
                    onClick={() => {
                        this.gotoLobby();
                    }}
                >
                    Back to Lobby
                </ButtonLogin>
            </div>
        );
    }


}

export default withRouter(GameSummary);
