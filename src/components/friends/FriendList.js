import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {Button, InputField} from '../../views/design/Interaction';
import {withRouter} from 'react-router-dom';
import {Label, Title} from "../../views/design/Text";
import User from "../shared/models/User";
import {
    BackgroundDiv,
    BackgroundDivLighterForFriends,
} from "../../views/design/Containers";


const Cell = styled.div`
    padding: 0.5rem;
`;




class FriendList extends React.Component {
    constructor() {
        super();
        this.state = {
            me: null,
            friends: null,
            incomingRequestsUsers: null,
            outgoingRequestsUsers: null,
            addFriendName: null,
        };
    }


    // TODO change id of friend for all 3 functions
    async sendFriendRequest(friendId) {
        try {
            const url = `/friends/send`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendId, config);
            // console.log(response);
            this.updateFriends()

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async acceptFriendRequest(friendId) {
        try {
            const url = `/friends/accept`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendId, config);
            // console.log(response);
            this.updateFriends()

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async rejectFriendRequest(friendId) {
        try {
            const url = `/friends/reject`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendId, config);
            // console.log(response);
            this.updateFriends()

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    async removeFriendRequest(friendId) {
        try {
            const url = `/friends/remove`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendId, config);
            // console.log(response);
            this.updateFriends()

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }


    async componentDidMount() {
        this.updateFriends()
    }

    async updateFriends() {

        try {
            this.setState({friends: null})
            this.setState({incomingRequestsUsers: null})
            this.setState({outgoingRequestsUsers: null})

            // request setup
            const url = `/user`;
            const config = {headers: User.getUserAuthentication()};
            // send request
            const response = await api.get(url, config);
            console.log(response);
            this.setState({me: response.data});


            const url2 = `/users`;


            if (response.data.friends.length != 0) {
                // request setup
                const friendsIds = response.data.friends
                const config2 = {headers: {userIds: friendsIds}};
                // send request
                const response2 = await api.get(url2, config2);
                console.log(response2);
                this.setState({friends: response2.data});
            }

            if (response.data.incomingFriendRequests.length != 0) {
                // request setup
                const incomingIds = response.data.incomingFriendRequests
                const config3 = {headers: {userIds: incomingIds}};
                // send request
                const response3 = await api.get(url2, config3);
                console.log(response3);
                this.setState({incomingRequestsUsers: response3.data});
            }
            if (response.data.outgoingFriendRequests.length != 0) {
                // request setup
                const outoingIds = response.data.outgoingFriendRequests
                const config4 = {headers: {userIds: outoingIds}};
                // send request
                const response4 = await api.get(url2, config4);
                console.log(response);
                this.setState({outgoingRequestsUsers: response4.data});
            }


        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
        }
    }

    // async componentWillUnmount() {
    //     this.props.updateLoop.removeClient(this);
    // }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }


    render() {

        return (
            <div style={{display: "flex", justifyContent: 'center'}}>
                <BackgroundDiv style={{paddingBottom: '30px'}}>
                    <div style={{height: "700px", display: "flex", justifyContent: 'center'}}>


                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "400px",
                            height: "100%",
                            marginRight: "0.5rem"
                        }}>
                            <div>
                                <Title style={{marginTop: "5px", marginBottom: '5px', fontSize: '32px'}}>Friends</Title>
                            </div>
                            <BackgroundDivLighterForFriends style={{flexGrow: "1"}}>


                                {this.state.friends ? Array.from(this.state.friends).map(friend => {
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

                            </BackgroundDivLighterForFriends>
                        </div>


                        <div style={{display: "flex", flexDirection: "column", width: "400px", height: "100%"}}>

                            <div style={{display: "flex", flexDirection: "column", flexBasis: "50%"}}>
                                <div>
                                    <Title style={{marginTop: "5px", marginBottom: '5px', fontSize: '32px'}}>Incoming
                                        Friend Requests</Title>

                                </div>
                                <BackgroundDivLighterForFriends style={{flexGrow: "1"}}>
                                    {this.state.incomingRequestsUsers ? Array.from(this.state.incomingRequestsUsers).map(friend => {
                                        return <div style={{display: 'flex', alignItems: "center"}}>

                                            <Cell style={{flexGrow: '3'}}>{friend["username"]}</Cell>
                                            <Cell style={{flexGrow: '1'}}>{friend["status"]}</Cell>
                                            <Cell style={{
                                                flexGrow: '3',
                                                display: 'flex',
                                                justifyContent: "flex-end"
                                            }}>
                                                <Button onClick={() => {
                                                    this.acceptFriendRequest(friend["userId"]);
                                                }}
                                                        style={{marginRight: "0.5rem"}}
                                                >
                                                    Accept
                                                </Button>
                                                <Button onClick={() => {
                                                    this.rejectFriendRequest(friend["userId"]);
                                                }}>
                                                    Reject
                                                </Button>
                                            </Cell>
                                        </div>;
                                    }) : null}
                                </BackgroundDivLighterForFriends>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", flexBasis: "50%"}}>
                                <div style={{marginTop: "0.5rem"}}>
                                    <Title style={{marginTop: "5px", marginBottom: '5px', fontSize: '32px'}}>Outgoing
                                        Friend Requests</Title>
                                </div>

                                <BackgroundDivLighterForFriends style={{flexGrow: "1"}}>
                                    {this.state.outgoingRequestsUsers ? Array.from(this.state.outgoingRequestsUsers).map(friend => {
                                        return <div style={{display: 'flex', alignItems: "center"}}>

                                            <Cell style={{flexGrow: '3'}}>{friend["username"]}</Cell>
                                            <Cell style={{flexGrow: '1'}}>{friend["status"]}</Cell>
                                            <Cell style={{
                                                flexGrow: '3',
                                                display: 'flex',
                                                justifyContent: "flex-end"
                                            }}><Button onClick={() => {
                                                this.removeFriendRequest(friend["userId"]);
                                            }}>remove</Button>
                                            </Cell>
                                        </div>;
                                    }) : null}
                                </BackgroundDivLighterForFriends>
                            </div>


                        </div>


                    </div>


                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh'}}>
                        <Title style={{marginTop: "5px", marginBottom: '5px', fontSize: '32px', flexGrow: '1'}}>Add new
                            Friend:</Title>
                        <InputField value={this.state.addFriendName}
                                    onChange={e => {
                                        this.handleInputChange("addFriendName", e.target.value);
                                    }}
                                    style={{flexGrow: '1', width: 'auto', backgroundColor: "#21212144"}}>
                        </InputField>
                        <div style={{flexGrow: '5', justifyContent: 'center', paddingLeft: '30px'}}>
                            <Button
                                onClick={() => {
                                    this.sendFriendRequest(this.state.addFriendName);
                                }}
                            >Add New Friend</Button>
                        </div>
                    </div>


                </BackgroundDiv>
            </div>
        );
    }
}

export default withRouter(FriendList);
