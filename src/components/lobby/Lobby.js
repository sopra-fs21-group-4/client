import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const Title = styled.div`
position: absolute;
width: 612px;
height: 56px;
left: 68px;
top: 58px;

font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 56px;
line-height: 56px;

/* identical to box height, or 100% */

color: #000000;

mix-blend-mode: darken;
`;

class Lobby extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    async componentDidMount() {
        try {
            const response = await api.get('/lobby');
            // delays continuous execution of an async operation for 1 second..
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ users: response.data });

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <Title>Creating a new Game</Title>

            </Container>
        );
    }
}

export default withRouter(Lobby);
