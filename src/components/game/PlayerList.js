import React from "react";
import styled from "styled-components";
import Message from "../../views/Message";
import {ConservativeBox, FlexBox, VerticalScroller} from "../../views/design/Containers";
import {DiscreetButton, LinkButton} from "../../views/design/Interaction";
import {Spinner} from "../../views/design/Spinner";
import {withRouter} from "react-router-dom";
import User from "../shared/models/User";
import {Info, Label} from "../../views/design/Text";

/**
 * TODO there's probably more to add here (friend requests maybe)
 */
class PlayerList extends React.Component {
    constructor(params) {
        super(params);
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
                                    <td><Info>{game.playerStates[user.userId]}</Info></td>
                                ) : (
                                    <td><Info>{game.scores[user.userId]}</Info></td>
                                )}
                            </tr>
                        );
                    })}
                </table>
            </VerticalScroller>
        </ConservativeBox>
    }


};

export default withRouter(PlayerList);
