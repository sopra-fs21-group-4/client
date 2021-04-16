import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import Header from "../../views/header/Header";
import title from '../../views/design/title.module.css'
import doge from "../../views/design/Memes/doge.jpg"
import Modal from "../login/Modal"


class GameLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      password: null,
      username: null,
      showImage: false
    };
  }

  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      const response = await api.post('/users/login', requestBody);
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while trying to join the game: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <BaseContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameLogin);
