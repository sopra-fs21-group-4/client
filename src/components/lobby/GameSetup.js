import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {ConservativeBox } from "../../views/design/Containers";
import User from "../shared/models/User";
import Form from "../general/Form";

class Lobby extends React.Component {
    constructor() {
        super();
        // setting default values
        this.state = {
            name: null,
            subreddit: null,
            memeType: 'HOT',
            password: null,
            maxPlayers: 6,
            totalRounds: 10,
            namingTime: 25,
            votingTime: 20,
            resultsTime: 10,
        };
    }

    async createGame() {
        try {
            // request setup
            const url = `/lobbies/create`;
            const requestBody = JSON.stringify({
                name: this.state.name,
                subreddit: this.state.subreddit,
                memeType: this.state.memeType,
                password: this.state.password,
                maxPlayers: this.state.maxPlayers,
                totalRounds: this.state.totalRounds,
                namingTime: this.state.namingTime,
                votingTime: this.state.votingTime,
                resultsTime: this.state.resultsTime,
            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.post(url, requestBody, config);
            console.log(response);
            this.props.history.push(`/game/${response.data.lobbyId}`);

        } catch (error) {
            alert(`Something went wrong creating the game: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        this.setState({[key]: value})
    }

    render() {
        return (
            <ConservativeBox>
                <Form
                    title='Game Setup'
                    listener={this}
                    onCancel={() => { this.props.history.push('/') }}
                    onSubmit={() => { this.createGame() }}
                    initialState={{timersCollapsed: true}}
                    attributes={[
                        { label: 'Name', key: 'name', type: 'Input',
                            props:{}, required: true },
                        { label: 'Subreddit', key: 'subreddit', type: 'Input',
                            props:{} },
                        { label: 'Meme Type', key: 'memeType', type: 'Select',
                            options: [
                                {name:'Hot',value:'HOT'},
                                {name:'Random',value:'RANDOM'},
                                {name:'Rising',value:'RISING'},
                                {name:'Top',value:'TOP'}],
                            props:{} },
                        { label: 'Password', key: 'password', type: 'Input',
                            props:{ autoComplete: 'off' } },
                        { label: 'Max. Players', key: 'maxPlayers', type: 'Range',
                            props:{ min:3, max:10, defaultValue: this.state['maxPlayers'] } },
                        { label: 'Number of Rounds', key: 'totalRounds', type: 'Range',
                            props:{ min:1, max:30, defaultValue: this.state['totalRounds'] } },
                        { label: 'Timers', key: 'timers', type: 'Group' },
                        { label: 'Naming Time', key: 'namingTime', type: 'Range', group: 'timers',
                            props:{ min:10, max:60, defaultValue: this.state['namingTime'] } },
                        { label: 'Voting Time', key: 'votingTime', type: 'Range', group: 'timers',
                            props:{ min:10, max:60, defaultValue: this.state['votingTime'] } },
                        { label: 'Results Time', key: 'resultsTime', type: 'Range', group: 'timers',
                            props:{ min:3, max:30, defaultValue: this.state['resultsTime'] } },
                    ]}
                />
            </ConservativeBox>
        );
    }

}

export default withRouter(Lobby);
