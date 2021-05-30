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
import {Info, Label, Title} from "../../views/design/Text";




const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 32%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  margin: auto;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: white;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;



const Table = styled.table`
    text-align: left;
    border-right: 30px;
`;

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            newPassword: null,
            newUsername: null,
            newEmail: null,
            userId: null

        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

    }

    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };


    handleUsernameChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    handlePasswordChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    handleEmailChange(key, value) {
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
            this.props.history.push(`/users/${User.getAttribute('username')}`);
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
            this.props.history.push(`/users/${User.getAttribute('username')}`);
        }

        this.hideModal();
        this.setState({user: await User.fetchSingle('username', this.props.match.params.username)});
    }

    async componentDidMount() {
        this.setState({user: await User.fetchSingle('username', sessionStorage.getItem('username'))});
    }

    render() {
        if (!this.state.user) return <Spinner/>
        return (
            <BaseContainer>
                <div style={{display: "flex", justifyContent: 'center'}}>
                    <BackgroundDiv>
                        <div>


                            <Title>{sessionStorage.getItem('username')}'s profile</Title>


                            <div>
                                <BackgroundDivLighter>
                                    {!this.state.user ? (
                                        <Spinner/>
                                    ) : (
                                        <Table width="100%">
                                            <tr>
                                                <th><Label>Id: </Label></th>
                                                <td><Info>{this.state.user.userId}</Info></td>
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
                                    )}
                                    <div style={{display: 'flex'}}
                                    >{
                                        (User.getAttribute("userId") == this.state.user.userId) ? (

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
                                                this.handleUsernameChange('newUsername', e.target.value);
                                            }}
                                        />




                                    <Label>
                                        Change Email:
                                    </Label>
                                        <InputField1
                                            style={{marginTop: '10px'}}
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleEmailChange('newEmail', e.target.value);
                                            }}
                                        />



                                    <Label>
                                        Change Password:
                                    </Label>
                                        <InputField1
                                            style={{marginTop: '10px'}}
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handlePasswordChange('newPassword', e.target.value);
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

export default withRouter(UserProfile);
