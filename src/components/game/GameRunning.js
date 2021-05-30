import React from 'react';
import { api, handleError } from '../../helpers/api';
import styled from 'styled-components';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import {
    BackgroundDivLighter,
    HorizontalBox, VerticalBox,
    VerticalList,
    VerticalScroller
} from "../../views/design/Containers";
import {Info, Label, Title} from "../../views/design/Text";
import User from "../shared/data/User";
import parseEmoji from "../../helpers/Emoji";
import InputField from "../general/InputField";
import Data from "../shared/data/Data";


const colorSelected = '#b5007c';
const colorUnselected = 'rgb(50,62,200)';

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
  background: rgb(191,62,255);
  transition: all 0.3s ease;
`;

class GameRunning extends React.Component {
    constructor(params) {
        super(params);
        this.state={
            game: null,
            players: null,
            round: null,
            settings: null,
        };
    }

    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        let game = await Data.get(this.props.gameId);
        this.setState({
            game: game,
            players: await Data.getList(game.players),
            round: await Data.get(game.currentRoundId),
            settings: await Data.get(game.gameSettingsId),
        })
    }

    async vote(recipient) {
        try {
            // request setup
            const url = `/games/${this.props.gameId}/vote`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, recipient.id, config);
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while voting: \n${handleError(error)}`);
        }
    }

    async suggest() {
        try {
            let inputField = document.getElementById(`suggestionInput`);
            // request setup
            const url = `/games/${this.props.gameId}/suggest`;
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
        if (!this.state.round || !this.state.players || !this.state.settings) {
            return <Spinner/>
        }
        let countdown = this.state.game.advanceTargetTime - Date.now()
        return <div>

       <VerticalBox

        >
            <Title style={{
                textAlign: 'left',
                paddingLeft: '100px',
            }}>
                <HorizontalBox>{`${this.state.round.title} out of  ${this.state.settings.totalRounds}`}</HorizontalBox>
            </Title>

            <HorizontalBox style={{justifyContent: 'left'}}>
                <img width='400px' src={this.state.round.memeURL} />
                <BackgroundDivLighter
                style={{marginLeft:'20px',width:'500px'}}>
                <div >
                    <Label>{`${this.currentActivity()}`}</Label>
                    <br/>
                    <Info>{`time remaining: ${this.state.game.gameState == 'PAUSED'? '(paused)' : Math.round(countdown / 1000)}`}</Info>
                    <br/>
                    {this.currentRoundPhaseInteractive()}
                </div>
                </BackgroundDivLighter>
            </HorizontalBox>
        </VerticalBox>

        </div>
    }

    currentActivity() {
        switch (this.state.round.roundPhase) {
            case 'STARTING':    return'prepare!';
            case 'SUGGEST':     return 'suggest a title!';
            case 'VOTE':        return 'vote!';
            case 'AFTERMATH':   return 'admire the winner!';
            default:            return 'relax!';
        }
    }

    currentRoundPhaseInteractive() {
        switch (this.state.round.roundPhase) {
            case 'STARTING':    return null;
            case 'SUGGEST':     return this.suggestionInteractive();
            case 'VOTE':        return this.voteInteractive();
            case 'AFTERMATH':   return this.aftermathInteractive();
            default: return <Spinner />;
        }
    }

    suggestionInteractive() {
        let currentSuggestion = this.state.round.suggestions[User.getAttribute('userId')];
        return <VerticalList >
            <Label>{currentSuggestion? "Suggestion: " + currentSuggestion : 'What title would you suggest?'}</Label>
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
    // i took out the name of the player so you dont know who you vote for, old: ${player.username}:
    // buttons are sorted alphabetically so you dont know whose title you are voting for
    voteInteractive() {
        return <VerticalList>
            {(this.state.players.map(player => {
                return (this.state.round.suggestions[player.id]? <VoteButton
                    disabled={player.id == User.getAttribute('userId')}
                    onClick={() => this.vote(player)}
                    style={{background: (this.state.round.votes[User.getAttribute('userId')] == player.id)? colorSelected : colorUnselected}}
                >
                    {`${this.state.round.suggestions[player.id]}`}</VoteButton>
                : null);
            })).sort(function(a,b){
                if(!(a&&b)){return 1}
                    if (a.props.children>b.props.children){return 1}
                    else {return -1}
            })}
        </VerticalList>
    }

    aftermathInteractive() {
        let players = this.state.players.slice();
        players.sort((a,b) => {return this.state.round.scores[b.userId] - this.state.round.scores[a.userId]});
        return <VerticalList>
            <Label>Scores:</Label>
            {players.map(player => {
                let suggestion = this.state.round.suggestions[player.userId];
                let score = this.state.round.scores[player.userId];
                return <div style={{
                    paddingBottom:'15px'
                }}>
                    <Label>{`${suggestion? suggestion : 'git gud'} (${player.username}): ${score? score : '0'}`}</Label>
                </div>
            })}
        </VerticalList>
    }

}

export default withRouter(GameRunning);