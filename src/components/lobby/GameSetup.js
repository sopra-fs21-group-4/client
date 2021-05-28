import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import User from "../shared/models/User";
import Form from "../general/Form";
import {Spinner} from "../../views/design/Spinner";
import {BackgroundDiv} from "../../views/design/Containers";
import {Title} from "../../views/design/Text";


class Lobby extends React.Component {
    constructor() {
        super();
        // setting default values
        this.state = {
            name: `${User.getAttribute('username')}'s game`,
            subreddit: 'memes',
            memeType: 'HOT',
            password: null,
            maxPlayers: 6,
            totalRounds: 10,
            maxSuggestSeconds: 25,
            maxVoteSeconds: 20,
            maxAftermathSeconds: 10,
            creating: false,
        };
    }

    async createGame() {
        this.setState({creating: true});
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
            
            this.props.history.push(`/e/${response.data.id}`);
        } catch (error) {
            alert(`Something went wrong creating the game: \n${handleError(error)}`);
        }
        this.setState({creating: false});
    }

    handleInputChange(key, value) {
        this.setState({[key]: value})
    }

    render() {
        return this.state.creating? <Spinner/> : (
            <div style={{display: "flex", justifyContent: 'center'}}>
                <BackgroundDiv>
                    <Title>Game Setup</Title>
                <Form
                    // title='a'
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
                                {name:'New',value:'NEW'},
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
                </BackgroundDiv>
            </div>
        );
    }

}

export default withRouter(Lobby);
