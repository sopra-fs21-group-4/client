import React from 'react';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import {
    BackgroundDiv,
    BackgroundDivLighter,
    FlexBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import {Info, Label, Title} from "../../views/design/Text";
import User from "../shared/models/User";
import GameRoundSummary from "../game/GameRoundSummary";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";
import {BaseContainer} from "../../helpers/layout";
import GameSummary from '../game/GameSummary';


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
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;

class GameArchive extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            user: null,
            pastGames: []
        };

    }

    async componentDidMount() {
        try {
            // request setup
            const config = {headers: User.getUserAuthentication()};

            const url = `/archive`;
            const gameResponse = await api.get(url, config);
            console.log(gameResponse);
            this.setState({
                user: gameResponse.data,
            });

            console.log(this.state.user);
        } catch (error) {
            alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
        }

        try {
            if (this.state.user.pastGames) {
                this.state.user.pastGames.forEach(game => this.getGame(game));
            } else {
                this.state.pastGames = null;
            }


        } catch (error) {
            alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
        }
    }

    async getGame(value) {
        try {
            // request setup
            const config = {headers: User.getUserAuthentication()};
            const url = `/archive/games/${value}`;
            const gameResponse = await api.get(url, config);
            console.log(gameResponse);

            var buffer1 = gameResponse.data;
            var buffer = this.state.pastGames;
            buffer.push(buffer1)

            this.setState({pastGames: buffer})
        } catch (error) {
            alert(`Something went wrong while fetching a certain game info: \n${handleError(error)}`);
        }
    }

    render() {
        return <div style={{display: "flex", justifyContent: 'center'}}>
            <BackgroundDiv>
                <Title>GameArchive</Title>
                <BackgroundDivLighter
                    style={{width: '450px', display: 'flex', flexDirection: "column", paddingBottom: '30px'}}
                >
                    {
                        (this.state.pastGames) ?
                            <div
                                style={{display: "flex", justifyContent: 'center'}}
                            >
                                {this.state.pastGames.map(game => {
                                    return <Button
                                        onClick={() => {
                                            this.props.history.push(`/game/${game.gameId}`)
                                        }}
                                    >
                                        Go to Game
                                    </Button>
                                })}
                            </div>
                            :
                            <div>
                                <Label>
                                    You haven't played any games yet.
                                </Label>
                            </div>
                    }
                    <div
                        style={{display: "flex", justifyContent: 'center'}}
                    >
                        <Button onClick={() => {
                            this.props.history.push('/')
                        }}
                        >
                            Back to Lobby
                        </Button>
                    </div>
                </BackgroundDivLighter>

            </BackgroundDiv>
        </div>
    }

}

export default withRouter(GameArchive);