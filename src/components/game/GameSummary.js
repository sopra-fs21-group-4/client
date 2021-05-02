import React from 'react';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import { VerticalList } from "../../views/design/Containers";
import {Title} from "../../views/design/Text";
import User from "../shared/models/User";
import GameRoundSummary from "../game/GameRoundSummary";
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
    constructor(props) {
        super(props);
        this.state = {
            game: null
        };
    }
    async componentDidMount() {
        try {
            // request setup
            const url = `/archive/games/${this.props.match.params.gameId}`;
            const config = { headers: User.getUserAuthentication() };

            const gameResponse = await api.get(url, config);
            console.log(gameResponse);
            this.setState({
                game: gameResponse.data,
            });
        } catch (error) {
            alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
        }
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
        if (!this.state.game) {
            return <Spinner/>
        }
        return <VerticalList
            style={{
                paddingLeft: '10%',
                paddingRight: '10%',
            }}>
            <Title style={{
                textAlign: 'left',
                width: '100px',
            }}>
                {this.state.game.name}
            </Title>
            {this.state.game.rounds.map(round => {
                return <GameRoundSummary round={round}/>
            })}
            <ButtonLogin
                role="button"

                width="50%"
                onClick={() => {
                    this.gotoLobby();
                }}
            >
                Back to Lobby
            </ButtonLogin>
        </VerticalList>
    }

}

export default withRouter(GameSummary);