import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import LobbyItem from "./LobbyItem";

const Container = styled(BaseContainer)`
  width: 700px;
  color: white;
  text-align: center;
`;

const Label = styled.h1`
  font-size: 14px;
  color: #666666;
  text-align: left;
`;

const LobbyList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const LobbyButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #8888ff;
  width: ${props => props.width || null};
  height: 35px;
  width: 100%;
  border: 1px grey;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgba(240,240,255,0.8);
  transition: all 0.3s ease;
`;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbies: null,
      updating: false,
      active: true,
    };
  }

  async updateLoop() {
    // if the loop is called by multiple threads, only the first should execute it
    if (this.state.updating) return;
    else this.setState({updating: true});

    // loop runs as long as this component is active
    while (this.state.active) {
      try {

        //wait for 100ms
        await new Promise(resolve => setTimeout(resolve, 100));

        const response = await api.get(`/lobbies`);

        // Get the returned users and update the state.
        this.setState({ lobbies: response.data });

        // See here to get more data.
        console.log(response);

      } catch (error) {
        alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
      }
    }
  }

  async enterLobby(lobby) {
    // TODO send request

    this.props.history.push(`lobby/${lobby.lobbyId}`);  // TODO why is /game not required here?
  }

  async componentDidMount() {
    this.updateLoop();
  }

  render() {
    return (
      <Container>
        <Button
            style={{
              marginTop: "45px",
              width: "400px",
            }}
            onClick={ () => {
              this.props.history.push('/create-game');
            }}
        >
          Create game
        </Button>
        {!this.state.lobbies ? (
          <Spinner />
        ) : (
          <div>
            <Label>
              {this.state.lobbies.length? 'Join a Game:' : 'No open games'}
            </Label>
            <LobbyList>
              {this.state.lobbies.map(lobby => {
                return (
                    <LobbyButton onClick={() => {
                      this.enterLobby(lobby);
                    }}>
                      <LobbyItem lobby={lobby} />
                    </LobbyButton>
                );
              })}
            </LobbyList>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Dashboard);
