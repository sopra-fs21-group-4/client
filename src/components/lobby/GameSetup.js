import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {ConservativeBox } from "../../views/design/Containers";
import User from "../shared/models/User";
import * as FormFactory from "../../views/design/FormFactory";

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
            timersCollapsed: true,
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

    render() {
        return (
            <ConservativeBox>
                { FormFactory.generateForm(
                    'Game Setup',
                    [
                        { label: 'Name*', id: 'name', type: 'Input',
                            props:{} },
                        { label: 'Subreddit', id: 'subreddit', type: 'Input',
                            props:{} },
                        { label: 'Meme Type', id: 'memeType', type: 'Select',
                            options: [
                                {name:'Hot',value:'HOT'},
                                {name:'Random',value:'RANDOM'},
                                {name:'Rising',value:'RISING'},
                                {name:'Top',value:'TOP'}],
                            props:{} },
                        { label: 'Password', id: 'password', type: 'Input',
                            props:{ autoComplete: 'off' } },
                        { label: 'Max. Players', id: 'maxPlayers', type: 'Range',
                            props:{ min:3, max:10, defaultValue: this.state.maxPlayers } },
                        { label: 'Number of Rounds', id: 'totalRounds', type: 'Range',
                            props:{ min:1, max:30, defaultValue: this.state.totalRounds } },
                        { label: 'Timers', id: 'timers', type: 'Group' },
                        { label: 'Naming Time', id: 'namingTime', type: 'Range', group: 'timers',
                            props:{ min:10, max:180, defaultValue: this.state.namingTime } },
                        { label: 'Voting Time', id: 'votingTime', type: 'Range', group: 'timers',
                            props:{ min:10, max:180, defaultValue: this.state.votingTime } },
                        { label: 'Results Time', id: 'resultsTime', type: 'Range', group: 'timers',
                            props:{ min:3, max:30, defaultValue: this.state.resultsTime } },
                    ],
                    this,
                    {
                        onClick: () => { this.createGame(); },
                        disabled: !this.state.name,
                    },
                    {
                        onClick: () => { this.props.history.push('/'); },
                    },
                ) }
            </ConservativeBox>
        );
    }

}

export default withRouter(Lobby);
