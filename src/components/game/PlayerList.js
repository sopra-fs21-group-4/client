import React from "react";
import styled from "styled-components";
import {VerticalScroller} from "../../views/design/Containers";
import {Spinner} from "../../views/design/Spinner";
import {withRouter} from "react-router-dom";
import User from "../shared/models/User";
import {Info, Label} from "../../views/design/Text";
import {api, handleError} from "../../helpers/api";
import Data from "../shared/models/Data";

/**
 * TODO there's probably more to add here (friend requests maybe)
 */

const ButtonBan = styled.button`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 3px;
  font-weight: 700;
  margin-left: 5px;
  font-size: 15px;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height:  auto;
  border: none;
  border-radius: 2px;
  
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;
class PlayerList extends React.Component {
    constructor(params) {
        super(params);
        this.state={
            game: null,
            players: [],
        };
    }

    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        let game = await Data.get(this.props.gameId);
        // game.players.forEach((id) => {Data.get(id).then((user) => {this.state.players[game.players.indexOf(id)] = user})})
        this.setState({
            game: game,
            players: await Data.getList(game.players)
        })
    }

    isGameMaster() {
        return User.getAttribute('userId') == this.state.game['gameMaster'];
    }

    async banPlayer(user){
        try {
            // request setup
            const url = `/games/${this.params.gameId}/ban`;
            const requestBody = user.userId;
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while banning the player: \n${handleError(error)}`);
        }
    }

    render() {
        if (!this.state.game) {
            return <Spinner/>
        }
        let game = this.state.game;
        let players = this.state.players.slice();
        players.sort((a,b) => {return game.scores[b.userId] - game.scores[a.userId]});
        return <div
            style={{
                padding: '10px'
            }}
        >
            <VerticalScroller style={{
                width: 'inherit',
            }}>
                <table width='100%'>
                    {players.map(user => {
                        if (!user) return <Spinner/>
                        return (
                            <tr>
                                <td><Label>{user.username}</Label></td>
                                {game.gameState == 'LOBBY'? (
                                    <td><Info>{game.playerStates[user.userId]}</Info></td>
                                ) : (
                                    <td><Info>{game.scores[user.userId]}</Info></td>
                                )}
                            <td>
                                {this.isGameMaster() && (user.userId != User.getAttribute('userId'))?(

                                    <ButtonBan onClick={() => {
                                        this.banPlayer(user);
                                    }}>
                                        Ban
                                    </ButtonBan>
                                ): null}
                            </td>
                            </tr>
                        );
                    })}
                </table>
            </VerticalScroller>
        </div>
    }


};

export default withRouter(PlayerList);
