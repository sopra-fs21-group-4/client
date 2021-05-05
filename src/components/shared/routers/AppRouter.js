import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { UserGuard } from "../routeProtectors/UserGuard";
import { GuestGuard } from "../routeProtectors/GuestGuard";
import Login from "../../login/Login";
import Register from "../../login/Register";
import Chat from "../../chat/Chat";
import ChatCreator from "../../chat/ChatCreator";
import PageBar from "../../navbar/NavigationBar";
import UserProfile from "../../user/UserProfile";
import Lobby from "../../lobby/LobbyOld";
import Game from "../../game/Game";
import GameSetup from "../../lobby/GameSetup";
import GameList from "../../lobby/GameList";
import GameSummary from "../../lobby/GameSummary";
import User from "../models/User";


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
          <PageBar updateLoop={this.props.updateLoop} />
        <Switch>
            <Route
                exact
                path={"/dashboard"}
                render={() =>
                    <UserGuard>
                        <GameList updateLoop={this.props.updateLoop} />
                    </UserGuard>
                }
            />
            <Route
                exact
                path={"/game-create"}
                render={() =>
                    <UserGuard>
                        <GameSetup updateLoop={this.props.updateLoop} />
                    </UserGuard>
                }
            />
            <Route
                exact
                path={"/lobby/:lobbyId"}
                render={() =>
                    <UserGuard>
                        <Lobby updateLoop={this.props.updateLoop} />
                    </UserGuard>
                }
            />
            <Route
                exact
                path={"/game/:gameId"}
                render={() =>
                    <UserGuard>
                        <Game updateLoop={this.props.updateLoop} />
                    </UserGuard>
                }
            />
            <Route
                exact
                path={"/chat"}
                render={() => (
                    <UserGuard>
                        <ChatCreator updateLoop={this.props.updateLoop} />
                    </UserGuard>
                )}
            />
            <Route
                exact
                path={"/chat/:chatId"}
                render={() => (
                    <UserGuard>
                        <Chat updateLoop={this.props.updateLoop} />
                    </UserGuard>
                )}
            />



            <Route
                exact
                path={"/users/:username"}
                render={() => (
                    <UserGuard>
                        <UserProfile updateLoop={this.props.updateLoop} />
                    </UserGuard>
                )}
            />
            <Route
                exact
                path="/login"
                render={() => (
                    <GuestGuard>
                        <Login updateLoop={this.props.updateLoop} />
                    </GuestGuard>
                )}
            />

            <Route
                exact
                path="/register"
                render={() => (
                    <GuestGuard>
                        <Register updateLoop={this.props.updateLoop} />
                    </GuestGuard>
                )}
            />

            <Route path="/logout" exact render={() => {
                User.removeFromSessionStorage();
                return <Redirect to={"/dashboard"}/>
            }} />


            <Route path="/" exact render={() => <Redirect to={"/dashboard"} />} />
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
