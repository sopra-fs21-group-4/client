import React from 'react';
import { api, handleError } from '../../helpers/api';
import styled from 'styled-components';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import {
    ConservativeBox,
    HorizontalBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import {Info, Label, Title} from "../../views/design/Text";
import User from "../shared/models/User";
import parseEmoji from "../../helpers/Emoji";
import InputField from "../general/InputField";



const VoteButton = styled.button`
  &:hover {
    transform: translateWidth(+5px);
  }
  padding: 6px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #000;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: #yellow;
  transition: all 0.3s ease;
`;

class GameRound extends React.Component {

    async vote(recipient) {
        try {
            // request setup
            const url = `/games/${this.props.match.params.gameId}/vote`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, recipient.userId, config);
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while voting: \n${handleError(error)}`);
        }
    }

    async suggest() {
        try {
            let inputField = document.getElementById(`suggestionInput`);
            // request setup
            const url = `/games/${this.props.match.params.gameId}/suggest`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, inputField.value, config);
            console.log(response);
            inputField.value = "";    // reset input field

        } catch (error) {
            alert(`Something went wrong while suggesting: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <ConservativeBox
                style={{padding: '10%'}}
            >

                <Title style={{
                    textAlign: 'left',
                    paddingLeft: '100px',
                }}>
                    {this.props.game.currentRoundTitle}
                </Title>
                <br/>
                <HorizontalBox style={{justifyContent: 'left'}}>
                    <img width='400px' src={this.props.game.currentMemeURL} />
                    <VerticalScroller style={{paddingLeft: '30px', width: '400px'}}>
                        <Label>{`${this.currentActivity()}`}</Label>
                        <br/>
                        <Info>{`time remaining: ${Math.round(this.props.game.currentCountdown / 1000)}`}</Info>
                        <br/>
                        {this.currentRoundPhaseInteractive()}
                    </VerticalScroller>
                </HorizontalBox>
            </ConservativeBox>
        );
    }

    currentActivity() {
        switch (this.props.game.currentRoundPhase) {
            case 'STARTING':    return'prepare!';
            case 'SUGGEST':     return 'suggest a title!';
            case 'VOTE':        return 'vote!';
            case 'AFTERMATH':   return 'admire the winner!';
            default:            return 'relax!';
        }
    }

    currentRoundPhaseInteractive() {
        let game = this.props.game;
        switch (game.currentRoundPhase) {
            case 'STARTING':    return null;
            case 'SUGGEST':     return this.suggestionInteractive();
            case 'VOTE':        return this.voteInteractive();
            case 'AFTERMATH':   return this.aftermathInteractive();
            default: return <Spinner />;
        }
    }

    suggestionInteractive() {
        let currentSuggestion = this.props.game.currentSuggestions[User.getAttribute('userId')];
        return <VerticalList >
            <Label>{currentSuggestion? currentSuggestion : 'what title would you suggest?'}</Label>
            <div>
                <InputField
                    id={`suggestionInput`}
                    submitAction={() => this.suggest()}
                    // submitButtonText='Suggest' // too long
                    textFilters={[parseEmoji]}
                />
            </div>
        </VerticalList>
    }

    voteInteractive() {
        return <VerticalList>
            {this.props.players.map(player => {
                return <VoteButton
                    disabled={player.userId == User.getAttribute('userId')}
                    onClick={e => this.vote(player)}
                    style={{background: (this.props.game.currentVotes[User.getAttribute('userId')] == player.userId)? '#a59aed' : '#9aeced'}}
                >
                    {`${player.username}: ${this.props.game.currentSuggestions[player.userId]}`}</VoteButton>
            })}
        </VerticalList>
    }

    aftermathInteractive() {
        return <VerticalList>
            <Label>Scores:</Label>
            {this.props.players.map(player => {
                return <div style={{
                    paddingBottom:'15px'
                }}>
                    <Label>{`${this.props.game.currentSuggestions[player.userId]} (${player.username}): ${this.props.game.currentScores[player.userId]}`}</Label>
                </div>
            })}
        </VerticalList>
    }

}

export default withRouter(GameRound);