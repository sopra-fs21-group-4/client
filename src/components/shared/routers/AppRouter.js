import React from "react";
import {BrowserRouter, Redirect, Route, Switch, useParams} from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Testsite from "../../temporary/Testsite";
import Register from "../../register/Register";
import Chat from "../../chat/Chat";
import CreateChat from "../../chat/CreateChat";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <Switch>
              <Route
                  path="/test"
                  render={() => (
                          <Testsite />
                  )}
              />
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
                exact
                path={"/chat"}
                render={() => (
                    <CreateChat />
                )}
            />
            <Route
                exact
                path={"/chat/:chatId"}
                render={() => (
                    <Chat />
                )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />

            <Route
                path="/register"
                render={() => (
                    <Register />
                )}
            />


            <Route path="/" exact render={() => <Redirect to={"/game"} />} />
        </Switch>
      </BrowserRouter>
    );
  }

  function
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
