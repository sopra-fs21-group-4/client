import React from "react";
import { HorizontalBox, VerticalBox } from "../../views/design/Containers";
import { Info } from "../../views/design/Text";
import { LinkButton } from "../../views/design/Interaction";
import { withRouter } from "react-router-dom";
import Data from "../shared/data/Data";
import {Spinner} from "../../views/design/Spinner";

class GameInfoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            game: null,
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
        let settings = await Data.get(game.gameSettingsId)
        this.setState({
            game: game,
            settings: settings,
        })
    }

    render () {
        if (!this.state.game || !this.state.settings) return <Spinner/>
        return (
            <VerticalBox>
                <HorizontalBox style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '400px',
                }}>
                    <div style={{width:'30%'}}><LinkButton onClick={() => this.props.history.push(`/game/${this.props.gameId}`)}>
                        {`${this.state.settings['name']} :`}
                    </LinkButton></div>
                    <div style={{width:'20%'}}><Info>
                        {`${this.state.game['gameState']}`}
                    </Info></div>
                    <div style={{width:'25%'}}><Info>
                        {`r/${this.state.settings['subreddit']}`}
                    </Info></div>
                    <div style={{width:'10%'}}><Info>
                        {`${this.state.game['players'].length}/${this.state.settings['maxPlayers']}`}
                    </Info></div>
                    <div style={{width:'15%'}}>
                        <LinkButton onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                            {this.state.collapsed? 'details' : 'hide'}
                        </LinkButton></div>
                </HorizontalBox>

                {this.state.collapsed? null :

                    <HorizontalBox style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {/*<div style={{width:'25%'}}><Info>*/}
                        {/*    {`host: ${game['gameMaster']}`}*/}
                        {/*</Info></div>*/}
                        <div style={{width:'33%'}}><Info>
                            {`rounds: ${this.state.settings['totalRounds']}`}
                        </Info></div>
                        <div style={{width:'33%'}}><Info>
                            {`type: ${this.state.settings['memeType']}`}
                        </Info></div>
                        <div style={{width:'33%'}}><Info>
                            {`timers: ${this.state.settings['maxSuggestSeconds']} / ${this.state.settings['maxVoteSeconds']} / ${this.state.settings['maxAftermathSeconds']}`}
                        </Info></div>
                    </HorizontalBox>
                }
            </VerticalBox>
        );
    }
}

// TODO not sure whether the r/ should be in the string itself
export default withRouter(GameInfoItem);
