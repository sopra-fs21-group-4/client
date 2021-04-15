import React from 'react';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    width: 500px;
    align-items: center;
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
        };
    }

    async componentDidMount() {
        try {

            // request setup
            const url = `/user`;
            const params = new URLSearchParams([['username', this.props.match.params.username]]);

            // send request
            const response = await api.get(url, {params});

            this.setState({ user: response.data });

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
                                (localStorage.getItem("username") == this.props.match.params.username)? (
                                    <Button
                                        width="120px"
                                        onClick={() => {this.props.history.push(`/users/${this.props.match.params.username}/edit`);}}
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
                </Container>
            </BaseContainer>
        );
    }
}

export default withRouter(UserProfile);
