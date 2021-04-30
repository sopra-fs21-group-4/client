import React from 'react';
import { api, handleError } from '../../helpers/api';
import styled from 'styled-components';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import {
    HorizontalBox, VerticalBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import {Info, Label, Title} from "../../views/design/Text";
import User from "../shared/models/User";
import parseEmoji from "../../helpers/Emoji";
import InputField from "../general/InputField";

class GameRoundSummary extends React.Component {

    render() {
        if (!this.props.round) {
            return <Spinner/>
        }
        return <HorizontalBox
            style={{
                paddingLeft: '10%',
                paddingRight: '10%',
            }}>
            <Label style={{
                textAlign: 'left',
                width: '100px',
            }}>
                {this.props.round.title}
            </Label>

            <img height='150px' src={this.props.round.memeURL} />

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
                    <Label>{`${round.suggestion[player]} (${player}): ${round.scores[player]}`}</Label>
                </div>
            })}
        </VerticalList>
    }

}

export default withRouter(GameRoundSummary);