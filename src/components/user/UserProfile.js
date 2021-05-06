import React from 'react';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Interaction';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import Modal from "../login/Modal";
import User from "../shared/models/User";
import {MediumForm} from "../../views/design/Containers";


const Container = styled.div`
    width: 500px;
    align-items: center;
`;
const EditButton = styled.button`
   &:hover {
    transform: translateY(-2px);
  }
  margin: 40px;
  padding: 6px;
  float:left;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;



const SaveButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  margin: 40px;
 
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 2px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgb(105,105,105, 1.0);
  }
  margin: 20px;
  height: 35px;
  padding-left: 15px;
  margin-left: 5px;
  border: none;
  border-radius: 2px;
  margin-bottom: 20px;
  background:  rgba(211, 211, 211, 0.5);;
  color: black;
`;

const BackButton = styled(Button)({
    margin: 'auto',
})

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

const HeaderContainer = styled.div`
    text-align: left;
    align-items: center;
    display: flex;
`;

const Title = styled.h1`
    margin-right: 50px;
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
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };



    handleUsernameChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    handlePasswordChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    handleEmailChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    goBack(){
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
        }
        catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
            this.props.history.push(`/users/${User.getAttribute('username')}`);
        }

        this.hideModal();
        this.setState({user: await User.fetchSingle('username', this.props.match.params.username)});
    }

    async componentDidMount() {
        this.setState({user: await User.fetchSingle('username', this.props.match.params.username)});
    }

    render() {
        if (!this.state.user) return <Spinner/>
        return (
            <BaseContainer>
                <MediumForm style={{
                    marginTop: '20px',
                    paddingTop: '30px',
                    paddingBottom: '30px',

                }}>
                    <div>
                        <HeaderContainer>

                            <Title>{this.props.match.params.username}'s profile</Title>
                            {
                                (User.getAttribute("userId") == this.state.user.userId)? (

                                    <Button
                                        margin="auto"
                                        width="120px"
                                        onClick={() => {this.showModal();}}
                                    >
                                        Edit
                                    </Button>
                                ) : (<div/>)


                            }

                            <BackButton

                                width="120px"
                                onClick={() => {this.goBack();}}
                            >
                                Back
                            </BackButton>
                        </HeaderContainer>

                        <div>
                            {!this.state.user ? (
                                <Spinner />
                            ) : (
                                <Table width="100%">
                                    <tr>
                                        <th>Id: </th>
                                        <td>{this.state.user.userId}</td>
                                    </tr>
                                    <tr>
                                        <th>Name: </th>
                                        <td>{this.state.user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email: </th>
                                        <td>{this.state.user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Status: </th>
                                        <td>{this.state.user.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Current Lobby: </th>
                                        <td>{this.state.user.currentGameId}</td>
                                    </tr>
                                </Table>
                            )}
                        </div>
                    </div>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <Form>

                            <label>
                                Change Username:

                                <InputField
                                    placeholder="Enter here.."
                                    onChange={e => {
                                        this.handleUsernameChange('newUsername', e.target.value);
                                    }}
                                />


                            </label>

                        <label>
                            Change Email:

                            <InputField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleEmailChange('newEmail', e.target.value);
                                }}
                            />


                        </label>
                            <label>
                                Change Password:

                                <InputField
                                    placeholder="Enter here.."
                                    onChange={e => {
                                        this.handlePasswordChange('newPassword', e.target.value);
                                    }}
                                />
                            </label>


                            <SaveButton
                                disabled={!this.state.newUsername && !this.state.newPassword && !this.state.newEmail}
                                width={'10%'}
                                onClick={() => {
                                    this.updateProfile();
                                }}> Save </SaveButton>

                        </Form>
                    </Modal>
                </MediumForm>



            </BaseContainer>
        );
    }
}

export default withRouter(UserProfile);
