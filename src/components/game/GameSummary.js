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
import GameRoundSummary from "../lobby/GameRoundSummary";

class GameSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null
        };
    }
    async componentDidMount() {
        try {
            // request setup
            const url = `/archive/games/${this.props.match.params.gameId}`;
            const config = { headers: User.getUserAuthentication() };

            const gameResponse = await api.get(url, config);
            console.log(gameResponse);
            this.setState({
                game: gameResponse.data,
            });
        } catch (error) {
            alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
        }
    }

    render() {
        if (!this.game) {
            return <Spinner/>
        }
        return <VerticalList
            style={{
                paddingLeft: '10%',
                paddingRight: '10%',
            }}>
            <Title style={{
                textAlign: 'left',
                width: '100px',
            }}>
                {this.props.game.name}
            </Title>
            {this.props.game.rounds.map(round => {
                return <GameRoundSummary round={round}/>
            })}
        </VerticalList>
    }

}

export default withRouter(GameSummary);