import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Register from "../../login/Register";
import Chat from "../../chat/Chat";
import ChatCreator from "../../chat/ChatCreator";
import Header from "../../../views/Header";

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
          <Header />
        <Switch>
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
                    <GameGuard>
                        <ChatCreator />
                    </GameGuard>
                )}
            />
            <Route
                exact
                path={"/chat/:chatId"}
                render={() => (
                    <GameGuard>
                        <Chat />
                    </GameGuard>
                )}
            />
            <Route
                exact
                path="/login"
                render={() => (
                    <LoginGuard>
                        <Login />
                    </LoginGuard>
                )}
            />

            <Route
                exact
                path="/register"
                render={() => (
                    <LoginGuard>
                        <Register />
                    </LoginGuard>
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
