import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {BackgroundDivLighter} from "../../views/design/Containers";
import User from "../shared/models/User";
import Form from "../general/Form";
import {Info, Label, Title} from "../../views/design/Text";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";
import Data from "../shared/models/Data";
import {Spinner} from "../../views/design/Spinner";


export const Cell = styled.div`
    width: 50%;
    padding-bottom: 5px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
`;

class GameLobby extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            game: null,
            settings: null,
            generalCollapsed: true,
            timersCollapsed: true,
            subreddit: null,
            memeType: null,
            totalRounds: null,
            maxSuggestSeconds: null,
            maxVoteSeconds: null,
            maxAftermathSeconds: null,
            settingsUpdated: false,
            edit: false,
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
        let settings = await Data.get(game.gameSettingsId);
        this.setState({
            game: game,
            settings: settings,
        })
        if (!this.state.edit) {
            this.setState({
                subreddit: settings['subreddit'],
                memeType: settings['memeType'],
                totalRounds: settings['totalRounds'],
                maxSuggestSeconds: settings['maxSuggestSeconds'],
                maxVoteSeconds: settings['maxVoteSeconds'],
                maxAftermathSeconds: settings['maxAftermathSeconds'],})
        }
    }

    async sendReady() {
        try {

            // request setup
            const url = `/games/${this.props.gameId}/ready`;
            const requestBody = this.isReady() ? 'false' : 'true';
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

        } catch (error) {
            alert(`Something went wrong while setting you ready: \n${handleError(error)}`);
        }
    }

    async leave() {
        try {
            // request setup
            const url = `/games/${this.props.gameId}/leave`;
            const requestBody = "";
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);
            this.props.history.push('/')

        } catch (error) {
            alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
        }
    }
    async updateSettings() {
        try {
            // request setup
            const url = `/games/${this.props.gameId}/update`;
            const requestBody = JSON.stringify({
                subreddit: this.state.subreddit,
                memeType: this.state.memeType,
                totalRounds: this.state.totalRounds,
                maxSuggestSeconds: this.state.maxSuggestSeconds,
                maxVoteSeconds: this.state.maxVoteSeconds,
                maxAftermathSeconds: this.state.maxAftermathSeconds,
            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

            this.setState({["settingsUpdated"]: true});

        } catch (error) {
            alert(`Something went wrong on updating the game settings: \n${handleError(error)}`);
        }
    }

    isGameMaster() {
        return User.getAttribute('userId') == this.state.game['gameMaster'];
    }

    isReady() {
        let playerState = this.state.game.playerStates[User.getAttribute('userId')];
        return playerState == 'READY' || playerState == 'GM_READY';
    }

    render() {
        if (!this.state.settings) return <Spinner/>
        return (
            <div>
                <Title> {this.state.settings.name} </Title>
                {this.state.edit ? this.gameSettingsForm() : this.gameSettingsTable()}
            </div>
        );
    }

    handleInputChange(key, value) {
        this.setState({[key]: value})
        this.setState({["settingsUpdated"]: false})
    }

    gameSettingsTable() {
        return <div>
            <BackgroundDivLighter>
                <table style={{
                    width: '350px'
                }}>
                    <tr>
                        <Cell><Label>Subreddit:</Label></Cell>
                        <Cell><Info>{this.state.settings.subreddit}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Meme Type:</Label></Cell>
                        <Cell><Info>{this.state.settings.memeType}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Memes found:</Label></Cell>
                        <Cell><Info>{this.state.settings.memesFound}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>No. Rounds:</Label></Cell>
                        <Cell><Info>{this.state.settings.totalRounds}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Player Limit:</Label></Cell>
                        <Cell><Info>{this.state.settings.maxPlayers}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Naming Time:</Label></Cell>
                        <Cell><Info>{this.state.settings.maxSuggestSeconds}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Voting Time:</Label></Cell>
                        <Cell><Info>{this.state.settings.maxVoteSeconds}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Results Time:</Label></Cell>
                        <Cell><Info>{this.state.settings.maxAftermathSeconds}</Info></Cell>
                    </tr>
                    <tr>
                        <Cell><Label>Waiting until:</Label></Cell>
                        <Cell><Info>{this.getWaitingIssue()}</Info></Cell>
                    </tr>

                </table>
                <div>
                    {this.isGameMaster() ?
                        <div style={{display: "flex", justifyContent: 'center',}}>
                            <Button
                                style={{width: '100px', marginBottom: '10px'}}

                                onClick={() => this.setState({edit: true})}
                                disabled={!this.isGameMaster()}
                            >
                                Edit
                            </Button></div> : null
                    }
                    <div style={{display: 'flex', justifyContent: 'center'}}>


                        <Button
                            width='100%'
                            onClick={() => this.leave()}
                        >
                            Leave Lobby
                        </Button>


                        <Button
                            width='100%'
                            onClick={() => this.sendReady()}
                        >
                            {this.isReady() ? "Hold on.." : "I'm ready"}
                        </Button>

                    </div>
                </div>
            </BackgroundDivLighter>
        </div>
    }

    getWaitingIssue() {
        if (this.state.game.players.length < 3) return `more players join`;
        if (this.state.game.memesFound < this.state.settings.totalRounds) return `r/${this.state.settings.subreddit} gets richer`;
        else return 'all players are ready';
    }

    gameSettingsForm() {
        // const general = { label: 'General', key: 'general', type: 'Group' };

        const subreddit = {
            label: 'Subreddit', key: 'subreddit', type: 'Input',
            props: {defaultValue: this.state.settings['subreddit'], disabled: !this.isGameMaster()}
        };

        const memeType = {
            label: 'Meme Type', key: 'memeType', type: 'Select',
            options: [
                {name: 'Hot', value: 'HOT'},
                {name: 'New', value: 'NEW'},
                {name: 'Rising', value: 'RISING'},
                {name: 'Top', value: 'TOP'}],
            props: {defaultValue: this.state.settings['memeType'], disabled: !this.isGameMaster()}
        };

        const totalRounds = {
            label: 'Number of Rounds', key: 'totalRounds', type: 'Range',
            props: {min: 1, max: 30, defaultValue: 5, disabled: !this.isGameMaster()}
        };

        const timers = {label: 'Timers', key: 'timers', type: 'Group'};

        const namingTime = {
            label: 'Naming Time', key: 'maxSuggestSeconds', type: 'Range', group: 'timers',
            props: {min: 10, max: 60, disabled: !this.isGameMaster()}
        };

        const votingTime = {
            label: 'Voting Time', key: 'maxVoteSeconds', type: 'Range', group: 'timers',
            props: {min: 10, max: 60, disabled: !this.isGameMaster()}
        };

        const resultsTime = {
            label: 'Results Time', key: 'maxAftermathSeconds', type: 'Range', group: 'timers',
            props: {min: 3, max: 30, disabled: !this.isGameMaster()}
        };

        return <Form
            attributes={[subreddit, memeType, totalRounds, timers, namingTime, votingTime, resultsTime]}
            listener={this}
            initialState={{
                timersCollapsed: true,
                ...this.state
            }}
            submitButtonText='save'
            onSubmit={() => {
                this.updateSettings();
                this.setState({edit: false});
            }}
            onCancel={() => this.setState({edit: false})}
            settingsUpdated={this.state.settingsUpdated}

        />
    }

}

export default withRouter(GameLobby);
