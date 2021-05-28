import React from 'react';
import { withRouter } from 'react-router-dom';
import {Spinner} from "../../views/design/Spinner";
import Data from "../shared/models/Data";
import UserEntity from "../user/UserEntity";
import GameEntity from "../game/GameEntity";
import ChatEntity from "../chat/ChatEntity";


class Entity extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      id: this.props.entityId? this.props.entityId : this.props.match.params.entityId,
      data: null,
    };
  }

  async componentDidMount() {
    this.props.updateLoop.addClient(this);
    this.setState({data: Data.get(this.state.id)});
    while (!this.state.data) {
      await Data.observeEntity(this.state.id)
      await new Promise(resolve => setTimeout(resolve, 500));
      this.setState({data: await Data.get(this.state.id)});
    }
  }

  componentWillUnmount() {
    this.props.updateLoop.removeClient(this);
  }

  render() {
    if (!this.state.data) return <Spinner />
    console.log(this.state.data)
    switch(this.state.data.type) {
      case 'USER': return <UserEntity updateLoop={this.props.updateLoop} userId={this.state.id}/>
      case 'GAME': return <GameEntity updateLoop={this.props.updateLoop} gameId={this.state.id}/>
      case 'CHANNEL': return <ChatEntity updateLoop={this.props.updateLoop} chatId={this.state.id}/>
      default: return null;
    }
  }
}

export default withRouter(Entity);
