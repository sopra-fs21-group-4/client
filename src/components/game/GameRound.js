import React from 'react';
import { api, handleError } from '../../helpers/api';
import styled from 'styled-components';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import Lobby from "../lobby/Lobby";
import Chat from "../chat/Chat";
import {FlexBox, HorizontalBox, VerticalBox} from "../../views/design/Containers";
import { BaseContainer } from '../../helpers/layout';
import {Info, Label, Title} from "../../views/design/Text";

const Meme = styled.input`
    display:flex;
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
`;

class GameRound extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        let gameId = this.props.match.params.userid;
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

    render() { // TODO scale image to max size, also display suggestions
        return (
            <HorizontalBox>
                <VerticalBox>
                    <Title>{this.props.game.currentRoundTitle}</Title>
                    <br/>
                    <Label>{`${this.currentActivity()}!`}</Label>
                    <br/>
                    <Info>{`time remaining: ${Math.round(this.props.game.currentCountdown / 1000)}`}</Info>
                    <br/>
                    <div>
                        <img maxHeight='100px' src={this.props.game.currentMemeURL} />
                    </div>
                    {this.currentRoundPhaseUI()}
                </VerticalBox>
            </HorizontalBox>
        );
    }

    currentActivity() {
        switch (this.props.game.currentRoundPhase) {
            case 'STARTING':    return'prepare';
            case 'SUGGEST':     return 'suggest a title';
            case 'VOTE':        return 'vote';
            case 'AFTERMATH':   return 'worship the winner';
            default:            return 'relax';
        }
    }

    currentRoundPhaseUI() {
        // TODO return right game UI dependent on game state
        if (!this.props.game.currentRoundPhase) return (<Spinner />);
        switch (this.props.game.currentRoundPhase) {
            case 'STARTING': return null;
            case 'SUGGEST': return null;
            case 'VOTE': return null;
            case 'AFTERMATH': return null;
            default: return <Spinner />;
        }
    }

}

export default withRouter(GameRound);