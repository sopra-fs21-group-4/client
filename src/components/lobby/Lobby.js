import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {HorizontalBox} from "../../views/design/Containers";
import User from "../shared/models/User";
import UserList from "../../views/UserList";
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
            const url = `/lobbies/${this.props.match.params['gameId']}`;
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

    isGameMaster() {
        return User.getAttribute('username') == this.props.game['gameMasterName'];
    }

    async componentDidMount() {
        try {
            // request setup
            const url = `/users`;
            const config = {headers: {usernames: this.props.game.playerNames}};

            // send request
            const response = await api.get(url, config);
            console.log(response);
            this.setState({ players: response.data });
        } catch (error) {
            alert(`Something went wrong while fetching the players: \n${handleError(error)}`);
        }
    }

    render() {
        // TODO game settings: update in backend
        // TODO better proportions for UserList (maybe also absolute position?)
        // TODO gamemaster can ban players
        return (
            <HorizontalBox>
                <div style={{
                    width: '80%'
                }}>
                    {this.gameSettings()}
                </div>
                <div style={{
                    width: '20%',
                    paddingTop: '30px',
                }}>
                    <UserList users={this.state.players}/>
                </div>
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
            withoutSubmitButton='true'
            withoutCancelButton='true'
            listener={this}
            initialState={{generalCollapsed: true, timersCollapsed: true}}
        />
    }

}

export default withRouter(Lobby);
