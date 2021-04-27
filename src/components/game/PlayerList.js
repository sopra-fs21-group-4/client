import React from "react";
import styled from "styled-components";
import Message from "../../views/Message";
import {ConservativeBox, FlexBox, VerticalScroller} from "../../views/design/Containers";
import {DiscreetButton, LinkButton} from "../../views/design/Interaction";
import {Spinner} from "../../views/design/Spinner";
import {withRouter} from "react-router-dom";
import User from "../shared/models/User";
import {Info, Label} from "../../views/design/Text";

/**
 * TODO there's probably more to add here
 * TODO cannot push to history. probably needs to be an object instead of a function.
 */
class PlayerList extends React.Component {

  render() {
      if (!this.props.game || !this.props.players) {
          return <Spinner/>
      }
      let game = this.props.game;
      return <ConservativeBox
          style={{
              padding: '10px'
          }}
      >
          <VerticalScroller style={{
              width: 'inherit',
          }}>
              <table width='100%'>
                  {this.props.players.map(user => {
                      return (
                          <tr>
                              <td><Label>{user.username}</Label></td>
                              {game.gameState == 'LOBBY'? (
                                  <td><Info>{game.playerStates[user.userId]}</Info></td>
                              ) : (
                                  <td><Info>{game.scores[user.userId]}</Info></td>
                              )}
                          </tr>
                      );
                  })}
              </table>
          </VerticalScroller>
      </ConservativeBox>
  }


};

export default withRouter(PlayerList);
