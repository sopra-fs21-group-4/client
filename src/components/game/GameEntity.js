import React from 'react';
import { withRouter } from 'react-router-dom';
import {BackgroundDiv} from "../../views/design/Containers";
import {Spinner} from "../../views/design/Spinner";
import GameRound from "./GameRound";
import ExpandableVBox from "../../views/design/ExpandableVBox";
import PlayerList from "./PlayerList";
import GameSummary from "../game/GameSummary";
import ChatEntity from "../chat/ChatEntity";
import LobbyState from "./GameLobby";
import Data from "../shared/models/Data";
import GameRunning from "./GameRunning";

class GameEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            game: null
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
            game: await Data.get(this.props.gameId)
        })
    }


    render() {
        if (!this.state.game) return <Spinner/>
        return (
            <div style={{width:'calc(100% - 170px)', display: "flex", justifyContent: 'center'}}>
                <BackgroundDiv
                    style={{}}
                >

                    {this.currentGameStateUI()}

                    {/**Chat Starts here*/}
                    <ExpandableVBox
                        style={{
                            position:'fixed',
                            bottom:0,
                            right:0,
                            height: '93.5%',
                            display: 'flex',
                            flexFlow:'column',
                        }}
                    >
                        <div
                            style={{
                                background: '#dfebe3',
                            }}
                        >
                            <PlayerList
                                updateLoop={this.props.updateLoop}
                                gameId={this.props.gameId}
                            />
                        </div>
                        <div
                            style={{
                                background: '#f0f0ff',
                                display:'flex',
                                flexDirection:'column',
                                overflow:'hidden',
                                flexGrow:'1',
                            }}
                        >
                            <ChatEntity
                                updateLoop={this.props.updateLoop}
                                chatId={this.state.game.gameChatId}
                            />
                        </div>
                    </ExpandableVBox>
                </BackgroundDiv>
            </div>
        );
    }

    currentGameStateUI() {
        switch (this.state.game.gameState) {
            case 'LOBBY':     return (<LobbyState updateLoop={this.props.updateLoop} gameId={this.props.gameId} />);
            case 'STARTING':  return <div><Spinner/></div>;  // TODO loading screen
            case 'PAUSED':
            case 'RUNNING':   return <GameRunning updateLoop={this.props.updateLoop} gameId={this.props.gameId} />;
            case 'AFTERMATH': return <GameSummary updateLoop={this.props.updateLoop} gameId={this.props.gameId} />;
            default: throw "unknown game state!";
        }
    }

}

export default withRouter(GameEntity);
