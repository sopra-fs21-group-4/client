import React from 'react';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import {
    HorizontalBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import {Label} from "../../views/design/Text";

class GameRoundSummary extends React.Component {

    render() {
        if (!this.props.round) {
            return <Spinner/>
        }
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
                    {this.props.round.title}
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
                        src={this.props.round.memeURL}/>
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
        let round = this.props.round;
        let players = Object.keys(round.suggestions).sort((a, b) => {
            return round.scores[b] - round.scores[a]
        });
        return <VerticalList>
            <Label>Scores:</Label>
            {players.map(player => {
                return <div>
                    <Label>{`${round.suggestions[player]} (${player}): ${round.scores[player]}`}</Label>
                </div>
            })}
        </VerticalList>
    }

}

export default withRouter(GameRoundSummary);