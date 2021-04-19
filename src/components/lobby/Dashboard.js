import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Input';
import { withRouter } from 'react-router-dom';
import LobbyOverview from "./LobbyOverview";
import {Info, Label, Title} from "../../views/design/Text";
import {HorizontalBox, MediumForm, VerticalBox} from "../../views/design/Containers";

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

  async update() {
    try {

      const response = await api.get(`/lobbies`);
      console.log(response);
      this.setState({ lobbies: response.data });

    } catch (error) {
      alert(`Something went wrong while fetching the messages: \n${handleError(error)}`);
    }
  }

  async enterLobby(lobby) {
    this.props.history.push(`game/${lobby.lobbyId}`);
  }

  async componentDidMount() {
    this.props.updateLoop.addClient(this);
  }

  async componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    return (
        <HorizontalBox>
          <MediumForm style={{paddingTop: "30px"}}>
            <Title> Do you even meme? </Title>
            <table>
              <tr>
                <td><Label> Start your own game: </Label></td>
                <td/>
                <td/>
                <td>
                  <Button style={{width: "35px"}} onClick={ () => {this.props.history.push('/create-game');}}>
                    +
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <Label>
                    {this.state.lobbies? (this.state.lobbies.length? 'Join a Game:' : 'No open games 😥') : ('loading..')}
                  </Label>
                </td>
              </tr>
              {!this.state.lobbies ? (
                  <Spinner />
              ) : (
                  this.state.lobbies.map(lobby => {
                      return (
                          <tr>
                            <td>
                              <Info>{lobby.name}</Info>
                            </td>
                            <td>
                              <Info>{lobby.subreddit}</Info>
                            </td>
                            <td>
                              <Info>{lobby.maxPlayers}</Info>
                            </td>
                            <td>
                              <Button style={{width: "35px"}} onClick={ () => {this.enterLobby(lobby);}}>
                                ▷
                              </Button>
                            </td>
                          </tr>
                      );
                    })
              )}
            </table>
          </MediumForm>
        </HorizontalBox>
    );
  }
}

export default withRouter(Dashboard);
