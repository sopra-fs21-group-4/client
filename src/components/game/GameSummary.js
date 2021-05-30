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
import User from "../shared/data/User";
import GameRoundSummary from "../game/GameRoundSummary";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";
import Data from "../shared/data/Data";


class GameSummary extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            gameSummaryId: this.props.gameSummaryId? this.props.gameSummaryId : this.props.match.params.gameSummaryId,
            game: null,
            players: null,
        };
    }

    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        let game = await Data.get(this.state.gameSummaryId);
        if (!game) return;
        this.setState({
            game: game,
            players: await Data.getList(Object.keys(game.scores)),
        })
        this.state.players.sort((a,b) => {return this.state.game.scores[b.userId] - this.state.game.scores[a.userId]});
    }


    render() {
        if (!this.state.game) return <Spinner/>
        return <BackgroundDiv>
            <VerticalList
                style={{}}>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'center',flexGrow: '1',}}>
                        <Title>{this.state.game.name}</Title>
                    </div>

                    <Button style={{
                        flexGrow: '1',
                        maxWidth: 'fit-content'
                    }}
                            onClick={() => {this.props.history.push('/')}}
                    >
                        Back to Dashboard
                    </Button>
                    <Button style={{
                        flexGrow: '1',
                        maxWidth: 'fit-content'
                    }}
                            onClick={() => {this.props.history.push('/archive')}}
                    >
                        Back to Archive
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
                        {this.state.players.map((player, index) => {
                            return (
                                <tr>
                                    <td >
                                        <Info> {index+1}.</Info> </td> <td>
                                    <Label>   {player.username}</Label></td>
                                    <td><Info>{this.state.game.scores[player.userId]}</Info></td>
                                </tr>
                            )})}


                    </table>
                </BackgroundDivLighter>
                <BackgroundDivLighter>
                    {this.state.game.roundIds.map(round => {
                        return <GameRoundSummary updateLoop={this.props.updateLoop} gameRoundSummaryId={round}/>
                    })}
                </BackgroundDivLighter>
            </VerticalList>
        </BackgroundDiv>
    }

}

export default withRouter(GameSummary);