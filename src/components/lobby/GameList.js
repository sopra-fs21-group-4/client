import React from 'react';
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
import createGameIcon from "../../image/icons/game-add.png";


class GameList extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            lobbies: null,
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
            lobbies: JSON.parse(sessionStorage.getItem('lobbies'))
        })
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

    async gameArchive(){
        this.props.history.push(`archive`);
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
                            {this.state.lobbies ? (this.state.lobbies.length ? 'Join a Game:' : 'No open games 😥') : ('loading..')}
                        </Label>

                        <VerticalBox>
                            {!this.state.lobbies ? (
                                <Spinner/>
                            ) : (
                                this.state.lobbies.map(gameId => {
                                    return <GameInfoItem gameId={gameId} updateLoop={this.props.updateLoop}/>;
                                })
                            )}
                        </VerticalBox>
                    </BackgroundDivLighter>

                    <BackgroundDivLighter style={{width: '600px', paddingBottom:'30px'}}>
                        <Button
                            width="100%"
                            onClick={() => {
                            this.gameArchive();
                            }}
                        >
                            GameArchive
                        </Button>
                    </BackgroundDivLighter>
                    
                </BackgroundDiv>
            </div>
        );
    }
}

export default withRouter(GameList);
