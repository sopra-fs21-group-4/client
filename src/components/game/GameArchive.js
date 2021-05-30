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
import GameRoundSummary from "./GameRoundSummary";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";
import {BaseContainer} from "../../helpers/layout";
import GameSummary from './GameSummary';
import Data from "../shared/data/Data";


class GameArchive extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            gameHistory: null,
        };
    }


    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        this.setState({
            gameHistory: await Data.getList(await User.getData('gameHistory')),
        })
    }


    render() {
        if (!this.state.gameHistory) return <Spinner/>
        return <div style={{display: "flex", justifyContent: 'center'}}>
            <BackgroundDiv>
                <Title>Game Archive</Title>
                <BackgroundDivLighter
                    style={{width: '450px', display: 'flex', flexDirection: "column", paddingBottom: '30px'}}
                >
                    {
                        (this.state.gameHistory.length) ?
                            <div
                                style={{display: "flex", justifyContent: 'center', flexDirection: "column"}}
                            >
                                {this.state.gameHistory.map(game => {
                                    return <Button
                                        onClick={() => {
                                            this.props.history.push(`/archive/${game.id}`)
                                        }}
                                    >
                                        {`${game.name} (${game.subreddit}/${game.memeType})`}
                                    </Button>
                                })}
                            </div>
                            :
                            <div style={{display: "flex", justifyContent: 'center'}}>
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