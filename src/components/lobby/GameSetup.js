import React from 'react';
import { api, handleError } from '../../helpers/api';
import { redditApi, handleRedditError } from '../../helpers/redditApi';
import { withRouter } from 'react-router-dom';
import {ConservativeBox } from "../../views/design/Containers";
import User from "../shared/models/User";
import Form from "../general/Form";
import GetMemes from "../lobby/getMemes";

class Lobby extends React.Component {
    constructor() {
        super();
        // setting default values
        this.state = {
            name: `${User.getAttribute('username')}'s game`,
            subreddit: 'cats',
            memeType: 'HOT',
            password: null,
            maxPlayers: 6,
            totalRounds: 10,
            maxSuggestSeconds: 25,
            maxVoteSeconds: 20,
            maxAftermathSeconds: 10,
            REDDIT_ACCESS_TOKEN_URL: 'https://www.reddit.com/api/v1/access_token',
            APP_ONLY_GRANT_TYPE: 'https://oauth.reddit.com/grants/installed_client',
            REDDIT_CLIENT_ID: "0Fr36RPWNt-F3g",
            REDDIT_CLIENT_SECRET: "hWLk6igtgRKUxN5S7AzKZNbRcRotUQ",
            accessToken: null,
        };
    }

    async createGame() {
        try {
            console.log("REEEEEEEEEEEE")
            // Creating Body for the POST request which are URL encoded
            const params = new URLSearchParams()
            params.append('grant_type', 'APP_ONLY_GRANT_TYPE')
            params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')

            // Trigger POST to get the access token
            const tokenData = await redditApi.post(this.state.REDDIT_ACCESS_TOKEN_URL, {
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${this.state.REDDIT_CLIENT_ID}:`).toString('base64')}`, // Put password as empty
                    'Code': this.state.REDDIT_CLIENT_SECRET,
                }
            }).then(res => res.json())

            console.log(tokenData);

            if (!tokenData.error) {
                // Fetch Reddit data by passing in the access_token
                const url = `https://oauth.reddit.com/r/${this.state.subredit}/${this.state.memeType}`
                const trendData = await redditApi.get(url, {
                    headers: {
                        Authorization: `Bearer ${tokenData.accessToken}`
                    }
                })

                // Finding just the link of the post
                console.log(trendData);
            }

        } catch (error) {
            console.log(error)
        }
        try {
 
            // request setup
            const url = `/games/create`;
            const requestBody = JSON.stringify({
                name: this.state.name,
                subreddit: this.state.subreddit,
                memeType: this.state.memeType,
                password: this.state.password,
                maxPlayers: this.state.maxPlayers,
                totalRounds: this.state.totalRounds,
                maxSuggestSeconds: this.state.maxSuggestSeconds,
                maxVoteSeconds: this.state.maxVoteSeconds,
                maxAftermathSeconds: this.state.maxAftermathSeconds,
            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.post(url, requestBody, config);
            console.log(response);
            
            this.props.history.push(`/game/${response.data.gameId}`);
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
                    initialState={{
                        timersCollapsed: true,
                        ...this.state
                    }}
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
                            props:{ min:3, max:10} },
                        { label: 'Number of Rounds', key: 'totalRounds', type: 'Range',
                            props:{ min:1, max:30 } },
                        { label: 'Timers', key: 'timers', type: 'Group' },
                        { label: 'Naming Time', key: 'maxSuggestSeconds', type: 'Range', group: 'timers',
                            props:{ min:10, max:60 } },
                        { label: 'Voting Time', key: 'maxVoteSeconds', type: 'Range', group: 'timers',
                            props:{ min:10, max:60 } },
                        { label: 'Results Time', key: 'maxAftermathSeconds', type: 'Range', group: 'timers',
                            props:{ min:3, max:30 } },
                    ]}
                />
            </ConservativeBox>
        );
    }

}

export default withRouter(Lobby);
