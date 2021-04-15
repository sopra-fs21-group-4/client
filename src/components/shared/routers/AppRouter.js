import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { UserGuard } from "../routeProtectors/UserGuard";
import GameRouter from "./GameRouter";
import { GuestGuard } from "../routeProtectors/GuestGuard";
import Login from "../../login/Login";
import Register from "../../login/Register";
import Chat from "../../chat/Chat";
import ChatCreator from "../../chat/ChatCreator";
import Header from "../../../views/header/Header";
import UserProfile from "../../user/UserProfile";

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
                    <UserGuard>
                        <GameRouter base={"/game"} />
                    </UserGuard>
                )}
            />
            <Route
                exact
                path={"/chat"}
                render={() => (
                    <UserGuard>
                        <ChatCreator />
                    </UserGuard>
                )}
            />
            <Route
                exact
                path={"/chat/:chatId"}
                render={() => (
                    <UserGuard>
                        <Chat />
                    </UserGuard>
                )}
            />
            <Route  // TODO add profile editor
                exact
                path={"/users/:username"}
                render={() => (
                    <UserGuard>
                        <UserProfile />
                    </UserGuard>
                )}
            />
            <Route
                exact
                path="/login"
                render={() => (
                    <GuestGuard>
                        <Login />
                    </GuestGuard>
                )}
            />

            <Route
                exact
                path="/register"
                render={() => (
                    <GuestGuard>
                        <Register />
                    </GuestGuard>
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
