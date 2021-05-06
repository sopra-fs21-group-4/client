import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {Button, InputField} from '../../views/design/Interaction';
import {withRouter} from 'react-router-dom';
import {Label, Title} from "../../views/design/Text";
import {
    HorizontalBox,
    MediumForm,
    VerticalBox,
    TestHorizont,
    List,
    ListEle,
    ListTitle
} from "../../views/design/Containers";
import User from "../shared/models/User";


const Cell = styled.div`
    padding: 0.5rem;
`;

const titleStyle = {display: 'flex', alignItems: 'flex-end', padding: '0.5rem 0', fontSize: '25px'};

class FriendList extends React.Component {
    constructor() {
        super();
        this.state = {
            me: null,
            friendName: null,
        };
    }


    async update() {
        try {

            // request setup
            const url = `/me`;
            const config = {headers: User.getUserAuthentication()};
            // send request
            const response = await api.get(url, config);
            console.log(response);
            this.setState({me: response.data});

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }


    // TODO change id of friend for all 3 functions
    async sendFriendRequest(friendName) {
        try {
            const url = `/friends/send`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendName, config);
            console.log(response);

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async acceptFriendRequest(friendName) {
        try {
            const url = `/friends/accept`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendName, config);
            console.log(response);

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async rejectFriendRequest(friendName) {
        try {
            const url = `/friends/reject`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendName, config);
            console.log(response);

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async removeFriendRequest(friendName) {
        try {
            const url = `/friends/remove`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendName, config);
            console.log(response);

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }


    async componentDidMount() {
        this.props.updateLoop.addClient(this);
    }


    async componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }


    render() {

        return (

            <div>
                <div style={{height: "700px", display: "flex", justifyContent: 'center'}}>


                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "400px",
                        height: "100%",
                        marginRight: "0.5rem"
                    }}>
                        <div
                            style={titleStyle}>
                            Friends
                        </div>
                        <List style={{flexGrow: "1"}}>


                            {this.state.me ? Array.from(this.state.me["friends"]).map(friend => {
                                return <div style={{display: 'flex', alignItems: "center"}}>
                                    <Cell style={{flexGrow: '3'}}>{friend["username"]}</Cell>
                                    <Cell style={{flexGrow: '1'}}>{friend["status"]}</Cell>
                                    <Cell style={{
                                        flexGrow: '3',
                                        display: 'flex',
                                        justifyContent: "flex-end"
                                    }}>{friend["currentGameId"] ? null : <Button>Join</Button>}</Cell>
                                </div>;
                            }) : null}

                        </List>
                    </div>


                    <div style={{display: "flex", flexDirection: "column", width: "400px", height: "100%"}}>

                        <div style={{display: "flex", flexDirection: "column", flexBasis: "50%"}}>
                            <div style={titleStyle}>
                                Incoming Friend Requests
                            </div>
                            <List style={{flexGrow: "1"}}>
                                {this.state.me ? Array.from(this.state.me["incomingFriendRequests"]).map(friend => {
                                    return <div>

                                        <h3>{friend["username"]}</h3>
                                        <h3>{friend["status"]}</h3>
                                        <Button onClick={() => {
                                            this.acceptFriendRequest(friend["username"]);
                                        }}>Accept</Button>
                                        <Button onClick={() => {
                                            this.rejectFriendRequest(friend["username"]);
                                        }}>Reject</Button>
                                    </div>;
                                }) : null}
                            </List>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", flexBasis: "50%"}}>
                            <div style={{...titleStyle, ...{marginTop: "0.5rem"}}}>
                                Outgoing Friend Requests
                            </div>

                            <List style={{flexGrow: "1"}}>
                                {this.state.me ? Array.from(this.state.me["outgoingFriendRequests"]).map(friend => {
                                    return <div style={{display: 'flex', alignItems: "center"}}>

                                        <Cell>{friend["username"]}</Cell>
                                        <Cell>{friend["status"]}</Cell>
                                        <Cell><Button onClick={() => {
                                            this.removeFriendRequest(friend["username"]);
                                        }}>remove</Button>
                                        </Cell>
                                    </div>;
                                }) : null}
                            </List>
                        </div>


                    </div>


                </div>


                <div>
                    <input
                        value={this.state.friendName}
                        onChange={e => {
                            this.handleInputChange("friendName", e.target.value);
                            console.log(this.state.friendName)
                        }}>

                    </input>
                    <button
                        onClick={() => {
                            this.sendFriendRequest(this.state.friendName);
                        }}>
                        send
                    </button>
                    <button
                        onClick={() => {
                            this.acceptFriendRequest(this.state.friendName);
                        }}>
                        accept
                    </button>
                    <button
                        onClick={() => {
                            console.log(this.state.me["friends"]);
                        }}>
                        accept
                    </button>
                </div>


            </div>
        );
    }
}

export default withRouter(FriendList);
