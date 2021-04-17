import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {ConservativeBox } from "../../views/design/Containers";
import User from "../shared/models/User";
import * as FormFactory from "../../views/design/FormFactory";

class Lobby extends React.Component {

    async createGame() {
        try {
            // request setup
            const url = `/lobbies/create`;
            const requestBody = JSON.stringify({
                name: document.getElementById('name').value,
                subreddit: document.getElementById('subreddit').value,
                maxPlayers: document.getElementById('maxPlayers').value,
                password: document.getElementById('password').value,
                roundTimer: document.getElementById('roundTimer').value,
                noRounds: document.getElementById('noRounds').value,
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
                        { label: 'Name', id: 'name', type: 'Input',
                            props:{} },
                        { label: 'Subreddit', id: 'subreddit', type: 'Input',
                            props:{} },
                        { label: 'Password', id: 'password', type: 'Input',
                            props:{ autoComplete: 'off' } },
                        { label: 'Max. Players', id: 'maxPlayers', type: 'Range',
                            props:{ min:3, max:10, defaultValue:6 } },
                        { label: 'Round Timer', id: 'roundTimer', type: 'Range',
                            props:{ min:20, max:180, defaultValue:30 } },
                        { label: 'Number of Rounds', id: 'noRounds', type: 'Range',
                            props:{ min:1, max:30, defaultValue:10 } },
                    ],
                    () => { this.props.history.push('/'); },
                    () => { this.createGame(); }
                ) }
            </ConservativeBox>
        );
    }

}

export default withRouter(Lobby);
