import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {MediumForm, VerticalBox} from "../../views/design/Containers";
import User from "../shared/models/User";
import Form from "../general/Form";
import {Info, Label, Title} from "../../views/design/Text";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";
import title from "../../views/design/title.module.css";
import doge from "../../image/memes/doge.jpg";
import Modal from "../login/Modal";

const ButtonReady = styled.button`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 10px;
  font-weight: 700;
  
  font-size: 15px;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 2px;
  margin-left: 15px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;

const ButtonEdit = styled.button`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 10px;
  font-weight: 700;
  
  font-size: 15px;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 2px;
  margin-right: 15px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;

const ButtonLeave = styled.button`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 10px;
  font-weight: 700;
  
  font-size: 15px;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 2px;
  margin-right: 15px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;


export const Cell = styled.div`
    width: 50%;
    padding-bottom: 5px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
`;

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalCollapsed: true,
            timersCollapsed: true,
            subreddit: this.props.game.gameSettings['subreddit'],
            memeType: this.props.game.gameSettings['memeType'],
            totalRounds: this.props.game.gameSettings['totalRounds'],
            maxSuggestSeconds:this.props.game.gameSettings['maxSuggestSeconds'],
            maxVoteSeconds:this.props.game.gameSettings['maxVoteSeconds'],
            maxAftermathSeconds: this.props.game.gameSettings['maxAftermathSeconds'],
            settingsUpdated: false,
        };
    }

    async componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    async componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async updateSettings() {
        try {


            // request setup
            const url = `/games/${this.props.match.params['gameId']}/update`;
            const requestBody = JSON.stringify({
                subreddit: this.state.subreddit,
                memeType: this.state.memeType,
                totalRounds: this.state.totalRounds,
                maxSuggestSeconds: this.state.maxSuggestSeconds,
                maxVoteSeconds: this.state.maxVoteSeconds,
                maxAftermathSeconds: this.state.maxAftermathSeconds,
            });
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

            this.setState({["settingsUpdated"]:true});

        } catch (error) {
            alert(`Something went wrong on updating the game settings: \n${handleError(error)}`);
        }
    }

    async sendReady() {
        try {

            // request setup
            const url = `/games/${this.props.match.params['gameId']}/ready`;
            const requestBody = this.isReady()? 'false' : 'true';
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

        } catch (error) {
            alert(`Something went wrong while setting you ready: \n${handleError(error)}`);
        }
    }

    async leave() {
        try {
            // request setup
            const url = `/games/${this.props.match.params['gameId']}/leave`;
            const requestBody = "";
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);
            this.props.history.push('/')

        } catch (error) {
            alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
        }
    }

    isGameMaster() {
        return User.getAttribute('userId') == this.props.game['gameMaster'];
    }

    isReady() {
        let playerState = this.props.game.playerStates[User.getAttribute('userId')];
        return playerState == 'READY' || playerState == 'GM_READY';
    }

    async update() {
        if(!this.isGameMaster()){
            // TODO update slider position for all users
            this.setState({
                subreddit: this.props.game.gameSettings['subreddit'],
                memeType: this.props.game.gameSettings['memeType'],
                totalRounds: this.props.game.gameSettings['totalRounds'],
                maxSuggestSeconds:this.props.game.gameSettings['maxSuggestSeconds'],
                maxVoteSeconds:this.props.game.gameSettings['maxVoteSeconds'],
                maxAftermathSeconds: this.props.game.gameSettings['maxAftermathSeconds'],
            });
        }
    }

    render() {
        // TODO game settings: update visuals (and states?) in the frontend
        // TODO better proportions for UserList (maybe also absolute position?)

        return (
            <MediumForm
            >
            <VerticalBox>
                <Title> { this.props.game.gameSettings.name } </Title> <br/>

                {this.state.edit? this.gameSettingsForm() : this.gameSettingsTable()}

            </VerticalBox>
            </MediumForm>
        );
    }

    handleInputChange(key, value) {
        this.setState({[key]: value})
        this.setState({["settingsUpdated"]:false})
    }

    gameSettingsTable() {
        return <table style={{
            width: '300px'
        }}>
            <tr>
                <Cell><Label>Subreddit:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.subreddit}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Meme Type:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.memeType}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Memes found:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.memesFound}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>No. Rounds:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.totalRounds}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Player Limit:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.maxPlayers}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Naming Time:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.maxSuggestSeconds}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Voting Time:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.maxVoteSeconds}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Results Time:</Label></Cell>
                <Cell><Info>{this.props.game.gameSettings.maxAftermathSeconds}</Info></Cell>
            </tr>
            <tr>
                <Cell><Label>Waiting until:</Label></Cell>
                <Cell><Info>{this.getWaitingIssue()}</Info></Cell>
            </tr>
            <tr>
                <Cell>
                    <ButtonEdit
                        width='100%'
                        onClick={() => this.setState({edit: true})}
                        disabled={!this.isGameMaster()}
                    >
                        Edit
                    </ButtonEdit>
                </Cell>
                <Cell>
                    <ButtonReady
                        width='100%'
                        onClick={() => this.sendReady()}
                    >
                        {this.isReady() ? "Hold on.." : "I'm ready"}
                    </ButtonReady>
                </Cell>

            </tr>
            <Cell>
                <ButtonLeave
                    width='100%'
                    onClick={() => this.leave()}
                >
                    Leave Lobby
                </ButtonLeave>
            </Cell>
        </table>
    }

    getWaitingIssue() {
        let game = this.props.game;
        if (game.players.length < 3) return `more players join`;
        if (game.memesFound < game.gameSettings.totalRounds) return `r/${game.gameSettings.subreddit} gets richer`;
        else return 'all players are ready';
    }

    gameSettingsForm() {

        // const general = { label: 'General', key: 'general', type: 'Group' };

        const subreddit = { label: 'Subreddit', key: 'subreddit', type: 'Input',
            props:{defaultValue: this.props.game.gameSettings['subreddit'], disabled: !this.isGameMaster()} };

        const memeType = { label: 'Meme Type', key: 'memeType', type: 'Select',
            options: [
                {name:'Hot',value:'HOT'},
                {name:'New',value:'NEW'},
                {name:'Rising',value:'RISING'},
                {name:'Top',value:'TOP'}],
            props:{defaultValue: this.props.game.gameSettings['memeType'], disabled: !this.isGameMaster()} };

        const totalRounds = { label: 'Number of Rounds', key: 'totalRounds', type: 'Range',
            props:{ min:1, max:30, defaultValue: 5, disabled: !this.isGameMaster() } };

        const timers = { label: 'Timers', key: 'timers', type: 'Group' };

        const namingTime = { label: 'Naming Time', key: 'maxSuggestSeconds', type: 'Range', group: 'timers',
            props:{ min:10, max:60, disabled: !this.isGameMaster() } };

        const votingTime = { label: 'Voting Time', key: 'maxVoteSeconds', type: 'Range', group: 'timers',
            props:{ min:10, max:60, disabled: !this.isGameMaster() } };

        const resultsTime = { label: 'Results Time', key: 'maxAftermathSeconds', type: 'Range', group: 'timers',
            props:{ min:3, max:30, disabled: !this.isGameMaster() } };

        return <Form
            attributes={[subreddit, memeType, totalRounds, timers, namingTime, votingTime, resultsTime]}
            listener={this}
            initialState={{
                timersCollapsed: true,
                ...this.state}}
            submitButtonText='save'
            onSubmit={() => {
                this.updateSettings();
                this.setState({edit: false});
            }}
            onCancel={() => this.setState({edit: false})}
            settingsUpdated={this.state.settingsUpdated}

        />
    }

}

export default withRouter(Lobby);
