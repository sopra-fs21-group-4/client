import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {Button, SmallRoundImageButton} from '../../views/design/Interaction';
import {withRouter} from 'react-router-dom';
import GameInfoItem from "./GameInfoItem";
import {Label, Title} from "../../views/design/Text";
import {
    BackgroundDiv,
    BackgroundDivLighter,
    VerticalBox
} from "../../views/design/Containers";
import User from "../shared/models/User";
import createGameIcon from "../../image/icons/game-add.png";


class GameList extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null,
        };
    }

    async update() {
        try {

            // request setup
            const url = `/games`;
            const config = {headers: User.getUserAuthentication()};
            // send request
            const response = await api.get(url, config);
            console.log(response);
            this.setState({games: response.data});

        } catch (error) {
            // TODO memes?
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async enterGame(game) {
        this.props.history.push(`game/${game.gameId}`);
    }

    async componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    async componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: 'center'}}>
                <BackgroundDiv>

                    <Title> Open Games </Title>
                    <BackgroundDivLighter
                        style={{width: '600px', display: 'flex', flexDirection: "row", paddingBottom: '30px'}}>

                        <div style={{display: 'flex', flexGrow: '1', alignItems: 'center'}}>
                            <Label> Start your own game: </Label>
                        </div>

                        <div style={{display: 'flex', flexGrow: '1', justifyContent: 'flex-end'}}>
                            <SmallRoundImageButton image={`url(${createGameIcon})`} onClick={() => {
                                this.props.history.push('/game-create');
                            }}
                                                   style={{backgroundColor: 'rgb(191,62,255)',}}>
                            </SmallRoundImageButton>
                        </div>
                    </BackgroundDivLighter>

                    <BackgroundDivLighter style={{width: '600px'}}>
                        <Label>
                            {this.state.games ? (this.state.games.length ? 'Join a Game:' : 'No open games 😥') : ('loading..')}
                        </Label>

                        <VerticalBox>
                            {!this.state.games ? (
                                <Spinner/>
                            ) : (
                                this.state.games.map(game => {
                                    return <GameInfoItem game={game}/>;
                                })
                            )}
                        </VerticalBox>
                    </BackgroundDivLighter>

                </BackgroundDiv>
            </div>
        );
    }
}

export default withRouter(GameList);
