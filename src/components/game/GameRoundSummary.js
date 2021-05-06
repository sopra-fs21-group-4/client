import React from 'react';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import {
    HorizontalBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import { Label } from "../../views/design/Text";

class GameRoundSummary extends React.Component {

    render() {
        if (!this.props.round) {
            return <Spinner/>
        }
        return <HorizontalBox
            style={{
                paddingLeft: '10%',
                paddingRight: '10%',
                margin: '30px',
            }}>
            <Label style={{
                textAlign: 'left',
                width: '100px',
            }}>
                {this.props.round.title}
            </Label>

            <img height='300px' src={this.props.round.memeURL} />

            <VerticalScroller style={{paddingLeft: '30px', width: '400px'}}>
                {this.suggestionList()}
            </VerticalScroller>
        </HorizontalBox>
    }

    suggestionList() {
        let round = this.props.round;
        let players = Object.keys(round.suggestions).sort((a,b) => {return round.scores[b] - round.scores[a]});
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