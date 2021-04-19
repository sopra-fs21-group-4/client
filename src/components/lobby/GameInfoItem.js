import React from "react";
import { HorizontalBox, VerticalBox } from "../../views/design/Containers";
import { Info } from "../../views/design/Text";
import { LinkButton } from "../../views/design/Input";
import { withRouter } from "react-router-dom";

class GameInfoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    render () {
        let game = this.props.game;
        return (
            <VerticalBox>
                <HorizontalBox style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '400px',
                }}>
                    <div style={{width:'30%'}}><LinkButton onClick={() => this.props.history.push(`/game/${game.lobbyId}`)}>
                        {`${game.name} :`}
                    </LinkButton></div>
                    <div style={{width:'20%'}}><Info>
                        {`${game['gameState']}`}
                    </Info></div>
                    <div style={{width:'25%'}}><Info>
                        {`r/${game['subreddit']}`}
                    </Info></div>
                    <div style={{width:'10%'}}><Info>
                        {`${game['players'].length}/${game['maxPlayers']}`}
                    </Info></div>
                    <div style={{width:'15%'}}>
                        <LinkButton onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                            {this.state.collapsed? 'details' : 'hide'}
                        </LinkButton></div>
                </HorizontalBox>

                {this.state.collapsed? null :

                    <HorizontalBox style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <div style={{width:'25%'}}><Info>
                            {`host: ${game['gameMaster']}`}
                        </Info></div>
                        <div style={{width:'25%'}}><Info>
                            {`rounds: ${game['totalRounds']}`}
                        </Info></div>
                        <div style={{width:'25%'}}><Info>
                            {`type: ${game['memeType']}`}
                        </Info></div>
                        <div style={{width:'25%'}}><Info>
                            {`time: ${game['namingTime']} / ${game['votingTime']} / ${game['resultsTime']}`}
                        </Info></div>
                    </HorizontalBox>
                }
            </VerticalBox>
        );
    }
}

// TODO not sure whether the r/ should be in the string itself
export default withRouter(GameInfoItem);
