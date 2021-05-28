import React from 'react';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import {BackgroundDivLighter, FlexBox, VerticalList, VerticalScroller} from "../../views/design/Containers";
import {Info, Label, Title} from "../../views/design/Text";
import User from "../shared/models/User";
import GameRoundSummary from "../game/GameRoundSummary";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";


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

class GameSummary extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            game: null,

        };
    }

    async componentDidMount() {
        while(!this.state.game) {
            try {
                // request setup
                const config = {headers: User.getUserAuthentication()};

                const url = `/archive/games/${this.props.match.params.gameId}`;
                const gameResponse = await api.get(url, config);
                console.log(gameResponse);
                this.setState({
                    game: gameResponse.data,
                });
            } catch (error) {
                alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
            }
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
        if (!this.state.game || !this.props.players) {
            return <Spinner/>
        }
        let i = 0;
        let game = this.props.game;
        let players = this.props.players.slice();
        players.sort((a,b) => {return game.scores[b.userId] - game.scores[a.userId]});

        return <VerticalList
            style={{}}>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center',flexGrow: '1',}}>
                    <Title>{game.name}</Title>
                </div>

                <Button style={{
                    flexGrow: '1',
                    maxWidth: 'fit-content'
                }}
                        onClick={() => {
                            this.gotoLobby();
                        }}
                >
                    Back to Lobby
                </Button>
            </div>
            <BackgroundDivLighter style={{padding: '20px'}}>
            <table style={{background: '#9ccfff'}} title={'loser'}>
                <tr>
                <td >
                    <Info> Ranking:</Info> </td> <td>
                    <Label>Player:</Label>
                </td>
                <td><Info>Score:</Info></td>
                </tr>
                {players.map((player, index) => {
                    return (
                        <tr>
                        <td >
                            <Info> {index+1}.</Info> </td> <td>
                            <Label>   {player.username}</Label></td>
                        <td><Info>{game.scores[player.userId]}</Info></td>
                        </tr>
                )})}


            </table>
            </BackgroundDivLighter>
            <BackgroundDivLighter>
                {this.state.game.rounds.map(round => {
                    return <GameRoundSummary round={round}/>
                })}
            </BackgroundDivLighter>
        </VerticalList>
    }

}

export default withRouter(GameSummary);