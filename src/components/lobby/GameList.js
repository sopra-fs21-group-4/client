import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Input';
import { withRouter } from 'react-router-dom';
import GameInfoItem from "./GameInfoItem";
import {Label, Title} from "../../views/design/Text";
import {HorizontalBox, MediumForm, VerticalBox} from "../../views/design/Containers";
import User from "../shared/models/User";

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
      games: null,
    };
  }

  async update() {
    try {

      // request setup
      const url = `/games`;
      const config = {headers: User.getUserAuthentication()};
      // send request
      const response = await api.get(url, config);
      console.log(response);
      this.setState({ games: response.data });

    } catch (error) {
      // TODO memes?
      alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
    }
  }

  async enterGame(game) {
    this.props.history.push(`game/${game.gameId}`);
  }

  async componentDidMount() {
    this.props.updateLoop.addClient(this);
  }

  async componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    return (
    <MediumForm style={{
      paddingTop: '30px',
    }}>

      <Title> Do you even meme? </Title>

      <HorizontalBox>
        <td style={{width: '100%'}} ><Label> Start your own game: </Label></td>
        <td><Button style={{width: '35px'}} onClick={ () => {this.props.history.push('/create-game');}}>
          +
        </Button></td>
      </HorizontalBox>

      <Label>
        {this.state.games? (this.state.games.length? 'Join a Game:' : 'No open games 😥') : ('loading..')}
      </Label>

      <VerticalBox>
        {!this.state.games ? (
            <Spinner />
        ) : (
            this.state.games.map(game => {
              return <GameInfoItem game={game}/>;
            })
        )}
      </VerticalBox>
    </MediumForm>
    );
  }
}

export default withRouter(GameList);
