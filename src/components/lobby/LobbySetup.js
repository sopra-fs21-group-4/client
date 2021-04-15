import React from 'react';
import { api, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import styles from './Lobby.module.css';
import {InputField} from "../../views/design/InputField";

class Lobby extends React.Component {

    async createLobby() {
        try {
            // request setup
            const url = `/lobbies/create`;
            // TODO shouldn't lobby setup information be passed before creation?
            const requestBody = JSON.stringify({ });
            const config = {
                headers: {
                    'userId': localStorage.getItem('userId'),
                    'token': localStorage.getItem('token')
                }
            };

            // send request
            const response = await api.post(url, requestBody, config);

            const lobby = new Lobby(response.data);

            // reroute to new lobby
            this.props.history.push(`/game/lobby/${lobby.lobbyId}`);

            console.log(response);
        } catch (error) {
            alert(`Something went wrong creating the lobby: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <div>
                <div className={styles.Content}>
                    <div className={styles.ContentBox}>
                        <div className={styles.ContentTitle}>Lobby Setup</div>
                        <div className={styles.Form}>
                            <table>
                                <tr>
                                    <th><div className={styles.Settings}>Lobby Name:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Subreddit:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Max. Players:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Lobby Key:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Round Timer:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Number of Rounds:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className={styles.ContentBox}>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.props.history.push('/game/dashboard');
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.createLobby();
                                }}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Lobby);
