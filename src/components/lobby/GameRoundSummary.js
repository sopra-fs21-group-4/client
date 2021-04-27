import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {HorizontalBox} from "../../views/design/Containers";
import User from "../shared/models/User";
import UserList from "../game/PlayerList";
import Form from "../general/Form";

class GameRoundSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalCollapsed: true,
            timersCollapsed: true,

        };
    }




    async componentDidMount() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}`;
            var testurl = '/games/1';
            const requestBody = JSON.stringify({

            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.get(testurl);
            console.log(response);

        } catch (error) {
            alert(`Something went wrong on updating the game settings: \n${handleError(error)}`);
        }
    }


    render() {

        return (
            <HorizontalBox>
                <div style={{
                    width: '80%'
                }}>

                </div>
                <div style={{
                    width: '20%',
                    paddingTop: '30px',
                }}>
                    <UserList users={this.state.players}/>
                </div>
            </HorizontalBox>
        );
    }


}

export default withRouter(GameRoundSummary);
