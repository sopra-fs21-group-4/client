import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {HorizontalBox} from "../../views/design/Containers";
import User from "../shared/models/User";
import Form from "../general/Form";

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalCollapsed: true,
            timersCollapsed: true,
        };
    }

    // TODO implement in backend
    async updateSettings() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}`;
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

        } catch (error) {
            alert(`Something went wrong on updating the game settings: \n${handleError(error)}`);
        }
    }

    async sendReady() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}/ready`;
            const requestBody = this.isReady()? 'false' : 'true';
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
            const url = `/games/${this.props.match.params['gameId']}/leave`;
            const requestBody = "";
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

        } catch (error) {
            alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
        }
    }

    isGameMaster() {
        return User.getAttribute('userId') == this.props.game['gameMaster'];
    }

    isReady() {
        let playerState = this.props.game.playerStates[User.getAttribute('userId')];
        return playerState == 'READY' || playerState == 'GM_READY';
    }

    render() {
        // TODO game settings: update in backend
        // TODO better proportions for UserList (maybe also absolute position?)
        // TODO gamemaster can ban players
        return (
            <HorizontalBox>
                <div>
                    {this.gameSettings()}
                </div>
                {/* ready button */}
            </HorizontalBox>
        );
    }

    gameSettings() {

        const general = { label: 'General', key: 'general', type: 'Group' };

        const subreddit = { label: 'Subreddit', key: 'subreddit', type: 'Input', group: 'general',
            props:{defaultValue: this.props.game['subreddit'], disabled: !this.isGameMaster()} };

        const memeType = { label: 'Meme Type', key: 'memeType', type: 'Select', group: 'general',
            options: [
                {name:'Hot',value:'HOT'},
                {name:'Random',value:'RANDOM'},
                {name:'Rising',value:'RISING'},
                {name:'Top',value:'TOP'}],
            props:{defaultValue: this.props.game['memeType'], disabled: !this.isGameMaster()} };

        const totalRounds = { label: 'Number of Rounds', key: 'totalRounds', type: 'Range', group: 'general',
            props:{ min:1, max:30, defaultValue: this.props.game['totalRounds'], disabled: !this.isGameMaster() } };

        const timers = { label: 'Timers', key: 'timers', type: 'Group' };

        const namingTime = { label: 'Naming Time', key: 'namingTime', type: 'Range', group: 'timers',
            props:{ min:10, max:60, defaultValue: this.props.game['namingTime'], disabled: !this.isGameMaster() } };

        const votingTime = { label: 'Voting Time', key: 'votingTime', type: 'Range', group: 'timers',
            props:{ min:10, max:60, defaultValue: this.props.game['votingTime'], disabled: !this.isGameMaster() } };

        const resultsTime = { label: 'Results Time', key: 'resultsTime', type: 'Range', group: 'timers',
            props:{ min:3, max:30, defaultValue: this.props.game['resultsTime'], disabled: !this.isGameMaster() } };

        return <Form
            title='Game Settings'
            attributes={[general, subreddit, memeType, totalRounds, timers, namingTime, votingTime, resultsTime]}
            listener={this}
            initialState={{generalCollapsed: true, timersCollapsed: true}}
            submitButtonText={this.isReady()? "Hold on.." : "I'm ready"}
            onSubmit={() => this.sendReady()}
            cancelButtonText='Leave'
            onCancel={() => this.leave()}
        />
    }

}

export default withRouter(Lobby);
