import React from 'react';
import styled from 'styled-components';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {Button, ImageButton, InputField, RoundImageButton, SmallRoundImageButton} from '../../views/design/Interaction';
import {withRouter} from 'react-router-dom';
import {Label, Title} from "../../views/design/Text";
import User from "../shared/data/User";
import {
    BackgroundDiv,
    BackgroundDivLighterForFriends,
} from "../../views/design/Containers";
import refresh_icon from "../../image/icons/refresh_arrow.png"
import logo from "../../image/logo/doyouevenmeme.png";
import Data from "../shared/data/Data";

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




    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        this.setState({
            me: await Data.get(User.getAttribute('userId')),
        })

        // console.log(this.state.me)
        this.setState({
            friends: await Data.getList(this.state.me.friends),
            incomingRequestsUsers: await Data.getList(this.state.me.incomingFriendRequests),
            outgoingRequestsUsers: await Data.getList(this.state.me.outgoingFriendRequests),
        })

        let games = [];
        this.state.friends.forEach(friend => {if(friend.currentGameId){games.push(friend.currentGameId)}})

        games = await Data.getList(games)
        let inLobbyGames = []
        games.forEach(game => {if(game.gameState == "LOBBY"){inLobbyGames.push(game.id)}})
        this.setState({
            games: inLobbyGames,
        })
    }


    async sendFriendRequest(friendId) {
        try {
            const url = `/friends/sendRequest`;
            const config = {
                headers: User.getUserAuthentication()
            }
            const response = await api.put(url, friendId, config);
            // console.log(response);
            // this.updateFriends()

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
            // this.updateFriends()

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
            // this.updateFriends()

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
            // this.updateFriends()

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
            // this.updateFriends()

        } catch (error) {
            if (error.response && error.response.data.message == 'invalid userId') {
                User.removeFromSessionStorage();
                this.props.history.push('/');
            } else alert(`Something went wrong removing a friend: \n${error.response.data.message}`);
        }
    }






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
                                                // console.log(friend)

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
                                                this.removeFriend(friend["id"]);
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
                                                    this.acceptFriendRequest(friend["id"]);
                                                }}
                                                        style={{marginRight: "0.5rem"}}
                                                >
                                                    Accept
                                                </Button>
                                                <Button onClick={() => {
                                                    this.rejectFriendRequest(friend["id"]);
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
                                                this.removeFriendRequest(friend["id"]);
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
