import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {BackgroundDiv, BackgroundDivLighter, HorizontalBox, VerticalBox} from "../../views/design/Containers";
import { Label, Title } from "../../views/design/Text";
import {Button, InputField} from "../../views/design/Interaction";
import User from "../shared/models/User";
import {Spinner} from "../../views/design/Spinner";

class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      password: null,
      status: null,
    };
  }

  async componentDidMount() {
    await this.tryJoin();
  }

  async tryJoin() {
    try {

      // request setup
      const url = `/games/${this.props.gameId}/join`;
      const config = {
        headers: {
          ...User.getUserAuthentication(),
          password: this.extractInput(),
        }
      };
      await api.put(url, "", config);

      this.props.history.push('/game');
    } catch (error) {
      // the component will react accordingly when we update the status
      // this.setState({status: error.response.status});
      console.log(error.response)
    }
  }

  extractInput() {
    let inputField = document.getElementById(`gamePasswordInput`);
    if (!inputField) return "";
    let input = inputField.value;
    inputField.value = "";
    return input;
  }


  render() {
    if (!this.state.status) return <Spinner/>

    return <div
        style={{display: "flex", justifyContent: 'center'}}
    ><BackgroundDiv>
      <Title> {this.message()} </Title>
      {this.state.status == 401?
          <BackgroundDivLighter>
            <div style={{ margin: "10px",}}>
              <Label>
                Please enter password:
              </Label>
            </div>
            <InputField
                id={`gamePasswordInput`}
                submitAction={() => this.tryJoin()}
                submitButtonText='Join'
                placeholder='Enter password here..'
            />
          </BackgroundDivLighter>
          : null
      }
    </BackgroundDiv></div>
  }

  message() {
    switch(this.state.status) {
      case 401: return 'This lobby seems to be password protected.'
      case 404: return 'Lobby not found.'
      case 410: return 'This game is already running.'
      case 422: return 'This lobby is full.'
      case 423: return 'You have been banned from this lobby.'
      default:  return 'This message should never be seen. Prepare for self-destruction in 3, 2, 1...'
    }
  }

}

export default withRouter(Join);
