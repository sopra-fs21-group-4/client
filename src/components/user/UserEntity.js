import React from 'react';
import {BaseContainer} from '../../helpers/layout';
import {api, handleError} from '../../helpers/api';
import {Spinner} from '../../views/design/Spinner';
import {Button, InputField1} from '../../views/design/Interaction';
import {withRouter} from 'react-router-dom';
import styled from "styled-components";
import Modal from "../login/Modal";
import User from "../shared/data/User";
import {BackgroundDiv, BackgroundDivLighter} from "../../views/design/Containers";
import {Error, Info, Label, Title} from "../../views/design/Text";
import Data from "../shared/data/Data";

const Table = styled.table`
    text-align: left;
    border-right: 30px;
`;

class UserEntity extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            user: null,
            newPassword: null,
            newUsername: null,
            newEmail: null,
        };
    }

    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        let userId = this.props.userId? this.props.userId : User.getAttribute('userId');
        this.setState({
            user: await Data.get(userId),
        })
    }

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    goBack() {
        this.props.history.push('/');
    }

    async updateProfile() {

        try {
            const url = '/user';
            const requestBody = JSON.stringify({
                username: this.state.newUsername,
                password: this.state.newPassword,
                email: this.state.newEmail
            });
            const config = {headers: User.getUserAuthentication()};
            const response = await api.put(url, requestBody, config);
            console.log(response);
            new User(response.data).putToSessionStorage();
            this.props.history.push(`/e/${User.getAttribute('userId')}`);
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
            this.props.history.push(`/e/${User.getAttribute('userId')}`);
        }

        this.hideModal();
        window.location.reload(false)
    }

    render() {
        if (!this.state.user) return <Spinner/>
        return (
            <BaseContainer>
                <div style={{display: "flex", justifyContent: 'center'}}>
                    <BackgroundDiv>
                        <div>

                            <Title>{this.state.user.username}'s profile</Title>

                            <div>
                                <BackgroundDivLighter>
                                    {
                                        <Table width="100%">
                                            <tr>
                                                <th><Label>Id: </Label></th>
                                                <td><Info>{this.state.user.id}</Info></td>
                                            </tr>
                                            <tr>
                                                <th><Label>Name: </Label></th>
                                                <td><Info>{this.state.user.username}</Info></td>
                                            </tr>
                                            <tr>
                                                <th><Label>Email: </Label></th>
                                                <td><Info>{this.state.user.email}</Info></td>
                                            </tr>
                                            <tr>
                                                <th><Label>Status: </Label></th>
                                                <td><Info>{this.state.user.status}</Info></td>
                                            </tr>
                                            <tr>
                                                <th><Label>Current Lobby: </Label></th>
                                                <td><Info>{this.state.user.currentGameId}</Info></td>
                                            </tr>
                                        </Table>
                                    }
                                    <div style={{display: 'flex'}}
                                    >{
                                        (User.getAttribute("userId") == this.state.user.id) ? (

                                            <Button
                                                margin="auto"
                                                width="120px"
                                                onClick={() => {
                                                    this.showModal();
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        ) : (<div/>)


                                    }

                                        <Button

                                            width="120px"
                                            onClick={() => {
                                                this.goBack();
                                            }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </BackgroundDivLighter>
                            </div>
                        </div>

                        <Modal show={this.state.show} handleClose={this.hideModal}>
                            <div style={{display: "flex", justifyContent: 'center'}}>
                                <BackgroundDivLighter>
                                    <Label>
                                        Change Username:
                                    </Label>
                                        <InputField1
                                            style={{marginTop: '10px'}}
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('newUsername', e.target.value);
                                            }}
                                        />




                                    <Label>
                                        Change Email:
                                    </Label>
                                        <InputField1
                                            style={{marginTop: '10px'}}
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('newEmail', e.target.value);
                                            }}
                                        />



                                    <Label>
                                        Change Password:
                                    </Label>
                                        <InputField1
                                            style={{marginTop: '10px'}}
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('newPassword', e.target.value);
                                            }}
                                        />


                                    <div
                                        style={{marginTop:'30px',display:'flex', justifyContent:'center'}}>
                                    <Button
                                        style={{flexGrow:'1'}}
                                        disabled={!this.state.newUsername && !this.state.newPassword && !this.state.newEmail}
                                        onClick={() => {
                                            this.updateProfile();
                                        }}> Save </Button>
                                    <Button
                                        style={{flexGrow:'1'}}
                                        onClick={() => {
                                            this.hideModal();
                                        }}> Close </Button>
                                    </div>
                                </BackgroundDivLighter>
                            </div>
                        </Modal>

                    </BackgroundDiv>
                </div>


            </BaseContainer>
        );
    }
}

export default withRouter(UserEntity);
