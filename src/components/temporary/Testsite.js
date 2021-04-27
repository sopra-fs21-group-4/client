import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Interaction';
import { withRouter } from 'react-router-dom';
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Testsite extends React.Component {

    constructor() {
        super();
        this.state = {
            token: null
        };
    }


    async createuser(){
        console.log("creating user");

        const requestBody = JSON.stringify({
            username: "testuser",
            password: "testpassword"
        });

        const response = await api.post('/users/create', requestBody);

        const user = new User(response.data);

        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', response.data.userId);
    }


    async login(){
        console.log("login");

        const requestBody = JSON.stringify({
            username: "testuser",
            password: "testpassword"
        });

        const response = await api.post('/users/login', requestBody);

        const user = new User(response.data);

        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', response.data.userId);

    }

    async createlobby(){
        console.log("creating lobby");

        const requestBody = null;

        const response = await api.post('/lobbies/create', requestBody, {headers:{userId:localStorage.getItem("userId"), token:localStorage.getItem("token")}});

    }

    async joinlobby(){

    }

    async startlobby(){
        console.log("starting game");

        const requestBody = null;

        const response = await api.put('/lobbies/2/start', requestBody, {headers:{userId:localStorage.getItem("userId"), token:localStorage.getItem("token")}});

    }


  // logout() {
  //   localStorage.removeItem('token');
  //   this.props.history.push('/login');
  // }

  async componentDidMount() {
    // try {
    //   const response = await api.get('/users');
    //   // delays continuous execution of an async operation for 1 second.
    //   // This is just a fake async call, so that the spinner can be displayed
    //   // feel free to remove it :)
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //
    //   // Get the returned users and update the state.
    //   this.setState({ users: response.data });
    //
    //   // This is just some data for you to see what is available.
    //   // Feel free to remove it.
    //   console.log('request to:', response.request.responseURL);
    //   console.log('status code:', response.status);
    //   console.log('status text:', response.statusText);
    //   console.log('requested data:', response.data);
    //
    //   // See here to get more data.
    //   console.log(response);
    // } catch (error) {
    //   alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    // }
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>testtest:</p>
        <Button
            width="100%"
            onClick={() => {
              this.createuser();
            }}
        >
          createuser
        </Button>
          <Button
              width="100%"
              onClick={() => {
                  this.login();
              }}
          >
              login
          </Button>
          <Button
              width="100%"
              onClick={() => {
                  this.createlobby();
              }}
          >
              create lobby
          </Button>
          <Button
              width="100%"
              onClick={() => {
                  this.joinlobby();
              }}
          >
              join lobby
          </Button>
          <Button
              width="100%"
              onClick={() => {
                  this.startlobby();
              }}
          >
              start lobby
          </Button>
      </Container>
    );
  }
}

export default withRouter(Testsite);
