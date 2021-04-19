import React from "react";
import styled from "styled-components";
import {HorizontalBox, VerticalBox} from "../../views/design/Containers";
import {Info, Label} from "../../views/design/Text";
import {DiscreetButton, LinkButton} from "../../views/design/Input";
import {withRouter} from "react-router-dom";

const Cell = styled.div``;

class LobbyOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    render () {
        let lobby = this.props.lobby;
        return (
            <VerticalBox>
                <HorizontalBox style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '400px',
                }}>
                    <Cell style={{width:'30%'}}><LinkButton onClick={() => this.props.history.push(`/game/${lobby.lobbyId}`)}>
                        {`${lobby.name} :`}
                    </LinkButton></Cell>

                    <Cell style={{width:'20%'}}><Info> {`${lobby.gameState}`}</Info></Cell>
                    <Cell style={{width:'25%'}}><Info> {`r/${lobby.subreddit}`} </Info></Cell>
                    <Cell style={{width:'10%'}}><Info> {`${lobby.players.length}/${lobby.maxPlayers}`} </Info></Cell>
                    <Cell style={{width:'15%'}}>
                        <LinkButton onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                            {this.state.collapsed? 'details' : 'hide'}
                        </LinkButton></Cell>
                </HorizontalBox>

                {this.state.collapsed? null :

                    <HorizontalBox style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Cell style={{width:'25%'}}><Info> {`host: ${lobby.gameMaster}`}</Info></Cell>
                        <Cell style={{width:'25%'}}><Info> {`rounds: ${lobby.totalRounds}`}</Info></Cell>
                        <Cell style={{width:'25%'}}><Info> {`type: ${lobby.memeType}`} </Info></Cell>
                        <Cell style={{width:'25%'}}><Info> {`time: ${lobby.namingTime} / ${lobby.votingTime} / ${lobby.resultsTime}`} </Info></Cell>
                    </HorizontalBox>
                }
            </VerticalBox>
        );
    }
}

// TODO not sure whether the r/ should be in the string itself
export default withRouter(LobbyOverview);
