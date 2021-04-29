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
                return <div style={{
                    paddingBottom:'15px'
                }}>
                    <Label> {player.username}: {score}</Label>
                </div>
            })}
        </BaseContainer>
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
            </div>
        );
    }


}

export default withRouter(GameSummary);
