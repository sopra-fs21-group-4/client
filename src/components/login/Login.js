import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Input';
import Header from "../../views/pagebar/PageBar";
import title from '../../views/design/title.module.css'
import doge from "../../views/design/Memes/doge.jpg"
import Modal from "../login/Modal"

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  min-height: 300px;
  justify-content: center;
  
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 32%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: white;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonRegister = styled.button`
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

const InputField = styled.input`
  &::placeholder {
    color: rgba(105,105,105, 1.0);
    font-size: 14px
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 2px;
  margin-bottom: 10px;
  background: rgba(211, 211, 211, 0.5);
  color: black;
`;

const ButtonLogin = styled.button`
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



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      password: null,
      username: null,
      showImage: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  showModal = () => {
    this.setState({ showImage: true });
  };

  hideModal = () => {
    this.setState({ showImage: false });
    window.location = "/login"
  };

  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      const response = await api.patch('/users/login', requestBody);
      console.log(response);
      User.putToSessionStorage(response.data);

      // Login successfully worked --> navigate to default route
      this.props.history.push('/');
    } catch (error) {
      if (error.response.status == 401) { // 401: UNAUTHORIZED
        this.showModal();
      } else {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (

      <BaseContainer>
        <div className={title.title}> Do you even meme? </div>
        <div className={title.sopragroupname}> SoPra Group-04</div>
          <Form>
            <div className={title.create}> Login to your account:</div>
            <InputField
              placeholder="Username"
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />

            <InputField
              placeholder="Password"
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
              <ButtonContainer>
              <ButtonLogin
                  role="button"
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </ButtonLogin>

            <ButtonRegister width = '50%' onClick={ () => {
              this.props.history.push('/register')
            }}
            >
            Register
            </ButtonRegister>
              </ButtonContainer>
          </Form>

        <Modal show={this.state.showImage} handleClose={this.hideModal}>


          <div style={{display: this.state.showImage ? "block" : "none"}}>
        <img className={title.bestmemes} src={doge} alt={"such meme"} />

      </div>
      </Modal>
      </BaseContainer>

    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
