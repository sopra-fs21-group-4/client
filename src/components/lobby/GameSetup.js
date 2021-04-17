import React from 'react';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Input';
import { withRouter } from 'react-router-dom';
import {InputField, Slider} from "../../views/design/Input";
import {Label, Title} from "../../views/design/Text";
import {ConservativeBox, HorizontalBox, MediumForm} from "../../views/design/Containers";
import User from "../shared/models/User";

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
            <HorizontalBox>

                <MediumForm>
                    <Title>Game Setup</Title>
                    <table cellPadding="10px">
                        {this.inputRow('Name', 'name')}
                        {this.inputRow('Subreddit', 'subreddit')}
                        {this.inputRow('Password', 'password')}
                        {this.sliderRow('Max. Players', 'maxPlayers', 3, 10, 6)}
                        {this.sliderRow('Round Timer', 'roundTimer', 20, 180, 30)}
                        {this.sliderRow('Number of Rounds', 'noRounds', 1, 30, 10)}
                        <tr>
                            <td>
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.props.history.push('/');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </td>
                            <td>

                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.createGame();
                                    }}
                                >
                                    Create
                                </Button>
                            </td>
                        </tr>
                    </table>
                </MediumForm>
            </HorizontalBox>
        );
    }

    inputRow(label, attribute) {
        return (
            <tr>
                <th><Label>{label}</Label></th>
                <td>
                    <InputField id={attribute}/>
                </td>
            </tr>
        );
    }

    sliderRow(label, attribute, min, max, def) {
        return (
            <tr>
                <th><Label>{label}</Label></th>
                <td>
                    <Slider
                        id={attribute}
                        min={min}
                        max={max}
                    />
                </td>
            </tr>
        );
    }

}

export default withRouter(Lobby);
