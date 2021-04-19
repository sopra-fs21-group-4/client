import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import {Button, InvisibleButton} from '../../views/design/Input';
import { withRouter } from 'react-router-dom';
import LobbyOverview from "./LobbyOverview";
import {Label, Title} from "../../views/design/Text";
import {ConservativeBox, HorizontalBox, MediumForm, VerticalBox} from "../../views/design/Containers";

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

class GameList extends React.Component {
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
    <MediumForm style={{paddingTop: '30px'}}>

      <Title> Do you even meme? </Title>

      <HorizontalBox>
        <td style={{width: '100%'}} ><Label> Start your own game: </Label></td>
        <td><Button style={{width: '35px'}} onClick={ () => {this.props.history.push('/create-game');}}>
          +
        </Button></td>
      </HorizontalBox>

      <Label>
        {this.state.lobbies? (this.state.lobbies.length? 'Join a Game:' : 'No open games 😥') : ('loading..')}
      </Label>

      <VerticalBox>
        {!this.state.lobbies ? (
            <Spinner />
        ) : (
            this.state.lobbies.map(lobby => {
              return <LobbyOverview lobby={lobby}/>;
            })
        )}
      </VerticalBox>
    </MediumForm>
    );
  }
}

export default withRouter(GameList);
