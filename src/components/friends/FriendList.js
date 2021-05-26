import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {Button, ImageButton, InputField, RoundImageButton, SmallRoundImageButton} from '../../views/design/Interaction';
import {withRouter} from 'react-router-dom';
import {Label, Title} from "../../views/design/Text";
import User from "../shared/models/User";
import {
    BackgroundDiv,
    BackgroundDivLighterForFriends,
} from "../../views/design/Containers";
import refresh_icon from "../../image/icons/refresh_arrow.png"
import logo from "../../image/logo/doyouevenmeme.png";

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
            games: null,
        };
    }


    async sendFriendRequest(friendId) {
        try {
            const url = `/friends/sendRequest`;
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
            } else alert(`Something went wrong sending a request: \n${error.response.data.message}`);
        }
    }

    async acceptFriendRequest(friendId) {
        try {
            const url = `/friends/acceptRequest`;
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
            } else alert(`Something went wrong accepting a request: \n${error.response.data.message}`);
        }
    }

    async rejectFriendRequest(friendId) {
        try {
            const url = `/friends/rejectRequest`;
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
            } else alert(`Something went wrong rejecting a request: \n${error.response.data.message}`);
        }
    }

    async removeFriendRequest(friendId) {
        try {
            const url = `/friends/removeRequest`;
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
            } else alert(`Something went wrong removing a request: \n${error.response.data.message}`);
        }
    }

    async removeFriend(friendId) {
        try {
            const url = `/friends/removeFriend`;
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
            } else alert(`Something went wrong removing a friend: \n${error.response.data.message}`);
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

                // getting games
                const config = {headers: User.getUserAuthentication()};
                const gameresponse = await api.get('/games', config);
                console.log(gameresponse);

                let games = new Array();
                for(let i=0, iLen=Object.keys(gameresponse.data).length; i<iLen; i++){
                    let obj = gameresponse.data[i]
                    if (obj.gameState == "LOBBY"){
                        games.push((obj.gameId))
                    }
                }


                this.setState({games: games});
                console.log(this.state.games);
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
            } else alert(`Something went wrong while updating the users: \n${handleError(error)}`);
        }
    }

    // async componentWillUnmount() {
    //     this.props.updateLoop.removeClient(this);
    // }

    handleInputChange(key, value) {
        this.setState({[key]: value});
    }
    goBack() {
        this.props.history.push('/');
    }

    render() {

        return (
            <div style={{display: "flex", justifyContent: 'center'}}>
                <BackgroundDiv style={{paddingBottom: '30px'}}>
                    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <div style={{position: 'absolute', marginTop: '-25px', marginRight: '-55px'}}>


                            <SmallRoundImageButton
                                style={{backgroundColor: 'rgb(191,62,255)'}}
                                onClick={() => {
                                    window.location.reload(false);;
                                }}
                                image={`url(${refresh_icon})`}

                            ></SmallRoundImageButton>
                        </div>
                    </div>

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
                                            flexGrow: '1',
                                            display: 'flex',
                                            justifyContent: "flex-end"
                                        }}>{friend["currentGameId"] && this.state.games && this.state.games.includes(friend["currentGameId"])?
                                            <Button onClick={() => {
                                                console.log(friend)

                                                this.props.history.push(`/game/${friend["currentGameId"]}`);
                                            }}
                                            >Join</Button> : null}
                                        </Cell>
                                        <Cell style={{
                                            flexGrow: '1',
                                            display: 'flex',
                                            justifyContent: "flex-end"
                                        }}>
                                            <Button onClick={() => {
                                                this.removeFriend(friend["userId"]);
                                            }}
                                            >Remove</Button>
                                        </Cell>
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
                                    placeholder={'Enter username here...'}
                                    style={{flexGrow: '1', width: 'auto', backgroundColor: "#21212144"}}>
                        </InputField>
                        <div style={{flexGrow: '5', justifyContent: 'center', paddingLeft: '30px'}}>
                            <Button
                                onClick={() => {
                                    this.sendFriendRequest(this.state.addFriendName);
                                }}
                            >Add New Friend</Button>
                        </div>
                        <div style={{flexGrow: '5', justifyContent: 'center', paddingLeft: '30px',}}>
                            <Button
                                onClick={() => {
                                    this.goBack();
                                }}
                            >Back</Button>
                        </div>
                    </div>


                </BackgroundDiv>
            </div>
        );
    }
}

export default withRouter(FriendList);
