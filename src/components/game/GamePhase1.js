import React from 'react';
import { api, handleError } from '../../helpers/api';
import styled from 'styled-components';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import Lobby from "../lobby/Lobby";
import Chat from "../chat/Chat";
import { HorizontalBox } from "../../views/design/Containers";
import { BaseContainer } from '../../helpers/layout';

const Meme = styled.input`
    display:flex;
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
`;

class GamePhase1 extends React.Component {
    constructor() {
        super();
        this.state = {
            chatId: null,
            game: null,
            updating: false,
            active: true,
            imgUrl: null,
            gameId: null,
        };
    }

    async update() {
        try {
            const response = await api.get(`/game/${this.props.match.params.gameId}`);
            console.log(response);
            this.setState({
                game: response.data,
                chatId: response.data.chatId,
            });
        } catch (error) {
            alert(`Something went wrong while fetching game info: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        let gameId = this.props.match.params.userid;
        this.props.updateLoop.addClient(this);
        //ToDO get meme from backend
        /**try {
            const response = await api.get(`/`);
            console.log(response);
            this.setState({
                imgUrl: response.imgUrl,
            });
        } catch (error) {
            alert(`Could not fetch the next image: \n${handleError(error)}`);
        }*/
        this.imgUrl = "https://preview.redd.it/xm0379bidxg61.jpg?width=640&crop=smart&auto=webp&s=0cadfc66efbdb4f0f2ba12ff7711d6f4b53b7f82";

    }

    show_image(src) {
        var img = document.createElement("img");
        img.src = src;
        /**img.width = width;
        img.height = height;
        img.alt = alt;*/

        // This next line will just add it to the <body> tag
        // but you can adapt to make it append to the element you want.
        document.body.appendChild(img);
    }

    async componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    render() {
        return (
            <BaseContainer>
                <HorizontalBox>
                    {this.currentGameStateUI()}
                    <Chat
                        updateLoop={this.props.updateLoop}
                        chatId={this.state.chatId}
                    />
                </HorizontalBox>
                <Meme>
                    this.show_image(this.imgUrl);
                </Meme>
            </BaseContainer>
        );
    }

    currentGameStateUI() {
        // TODO return right game UI dependent on game state
        if (!this.state.game) return (<Spinner />);
        switch (this.state.game.state) {
            case 'LOBBY': return (<Lobby updateLoop={this.props.updateLoop} />);
            case 'TITLE': return (<Lobby updateLoop={this.props.updateLoop} />);
            case 'VOTE': return (<Lobby updateLoop={this.props.updateLoop} />);
            case 'POINTS': return (<Lobby updateLoop={this.props.updateLoop} />);
            case 'FINISH': return (<Lobby updateLoop={this.props.updateLoop} />);
            default: //throw "unknown game state!";
        }
    }

}

export default withRouter(GamePhase1);