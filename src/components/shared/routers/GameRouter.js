import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Lobby from "../../lobby/Lobby";
import Dashboard from "../../lobby/Dashboard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/lobby/:lobbyId`}
          render={() => <Lobby />}
        />
          <Route
              exact
              path={`${this.props.base}/dashboard`}
              render={() => <Dashboard />}
          />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/dashboard`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
