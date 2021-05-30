import React from 'react';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import {
    HorizontalBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import {Label} from "../../views/design/Text";
import Data from "../shared/data/Data";

class GameRoundSummary extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            round: null,
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
        let round = await Data.get(this.props.gameRoundSummaryId);
        this.setState({
            round: round,
            players: await Data.getList(Object.keys(round.scores)),
        })

    }


    render() {
        if (!this.state.round) return <Spinner/>
        return <div
            style={{
                display: "flex",
                flexDirection: 'row',
                padding: '20px',
            }}>
            <div style={{
                width: '110px', display: "flex",
                flexDirection: 'row',
            }}>
                <Label style={{

                    textAlign: 'left',
                    width: '100px',
                }}>
                    {this.state.round.title}
                </Label>
            </div>
            <div style={{
                display: "flex",
                flexDirection: 'row',
            }}>
                <div style={{
                    flexGrow: '1', display: "flex",
                    flexDirection: 'row',
                }}>
                    <img
                        height='300px'
                        src={this.state.round.memeURL}/>
                </div>
                <div style={{
                    flexGrow: '1', display: "flex",
                    flexDirection: 'row',
                }}>
                    <VerticalScroller style={{paddingLeft: '20px'}}>
                        {this.suggestionList()}
                    </VerticalScroller>
                </div>
            </div>
        </div>
    }

    suggestionList() {
        return <VerticalList>
            <Label>Scores:</Label>
            {this.state.players.map(player => {
                let suggestion = this.state.round.suggestions[player.id];
                let username = player.username
                let score = this.state.round.scores[player.id]
                return <div>
                    <Label>{`${suggestion? suggestion : 'git gud'} (${username}): ${score}`}</Label>
                </div>
            })}
        </VerticalList>
    }

}

export default withRouter(GameRoundSummary);