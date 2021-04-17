import React from 'react';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import Modal from "../login/Modal";

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
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  margin: 20px;
  height: 35px;
  padding-left: 15px;
  margin-left: 4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(27, 124, 186, 2);
  color: black;
`;



const UserName = styled.div`
  font-weight: lighter;
  margin-left: 3px;
  color: black;
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
            userId: null

        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

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


    async updatePassword() {
            var everyThingsFine = true;
        const requestBody = JSON.stringify({
            username: this.state.newUsername,
            password: this.state.newPassword
        });
        
        this.state.userId = Number(this.state.userId)
       
        try{ const response = await api.put('/user/'+this.state.userId, requestBody);}
        catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
            everyThingsFine = false;
        }


       if(this.state.newUsername != null && everyThingsFine){
           localStorage.setItem('username', this.state.newUsername)
       }
       this.props.history.push('/');

    }

    async componentDidMount() {
        try {

            // request setup
            const url = `/user`;
            const params = new URLSearchParams([['username', this.props.match.params.username]]);

            // send request
            const response = await api.get(url, {params});


            this.setState({ user: response.data });
            this.setState({userId: response.data.userId.toString()})

            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching user: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <BaseContainer>
                <Container>
                    <div>
                        <HeaderContainer>

                            <Title>{this.props.match.params.username}'s profile</Title>
                            {
                                (localStorage.getItem("userId") === this.state.userId)? (

                                    <Button
                                        width="120px"
                                        onClick={() => {this.showModal();}}
                                    >
                                        Edit
                                    </Button>
                                ) : (<div/>)
                            }

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
                                        <th>Status: </th>
                                        <td>{this.state.user.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Current Lobby: </th>
                                        <td>{this.state.user.currentLobby}</td>
                                    </tr>
                                </Table>
                            )}
                        </div>
                    </div>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <p>


                            <label>
                                Change Username:

                                <InputField
                                    placeholder="Enter here.."
                                    onChange={e => {
                                        this.handleUsernameChange('newUsername', e.target.value);
                                    }}
                                />


                            </label>
                        </p>
                        <p>
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
                                disabled={!this.state.newUsername && !this.state.newPassword}
                                width={'10%'}
                                onClick={() => {
                                    this.updatePassword();
                                }}> Save </SaveButton>

                        </p>
                    </Modal>
                </Container>



            </BaseContainer>
        );
    }
}

export default withRouter(UserProfile);
