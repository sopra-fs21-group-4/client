import React from "react";
import styled from "styled-components";
import Message from "../../views/Message";
import {ConservativeBox, FlexBox, VerticalScroller} from "../../views/design/Containers";
import {Button, DiscreetButton, LinkButton} from "../../views/design/Interaction";
import {Spinner} from "../../views/design/Spinner";
import {withRouter} from "react-router-dom";
import User from "../shared/models/User";
import {Info, Label} from "../../views/design/Text";
import {api, handleError} from "../../helpers/api";

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
    }

    isGameMaster() {
        return User.getAttribute('userId') == this.props.game['gameMaster'];
    }

    async banPlayer(game, nameofbannedplayer){
        try {
            // request setup
            const url = `/games/${game.gameId}/ban`;
            const requestBody = nameofbannedplayer;
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);


            // const url2 =  `/games/${game.gameId}`;
            // const response2 = await api.get(url2, config);
            // console.log(response2)
            // const players = await api.get(`/users`, { headers:{ userIds: response2.data.players } });
            // console.log(players.data);


        } catch (error) {
            alert(`Something went wrong while banning the player: \n${handleError(error)}`);
        }


    }

    render() {
        if (!this.props.game || !this.props.players) {
            return <Spinner/>
        }
        let game = this.props.game;
        let players = this.props.players.slice();
        players.sort((a,b) => {return game.scores[b.userId] - game.scores[a.userId]});
        return <ConservativeBox
            style={{
                padding: '10px'
            }}
        >
            <VerticalScroller style={{
                width: 'inherit',
            }}>
                <table width='100%'>
                    {players.map(user => {
                        return (
                            <tr>
                                <td><Label>{user.username}</Label></td>
                                {game.gameState == 'LOBBY'? (
                                    <td>
                                        <Info>{game.playerStates[user.userId]}

                                        </Info>


                                    </td>
                                ) : (
                                    <td><Info>{game.scores[user.userId]}</Info></td>
                                )}

                            <td>

                                {this.isGameMaster() && (user.userId != User.getAttribute('userId'))?(

                                    <ButtonBan onClick={() => {
                                        this.banPlayer(game, user.username);
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
        </ConservativeBox>
    }


};

export default withRouter(PlayerList);
