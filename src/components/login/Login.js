import React from 'react';
import {api, handleError} from '../../helpers/api';
import User from '../shared/models/User';
import {withRouter} from 'react-router-dom';
import title from '../../views/design/title.module.css'
import doge from "../../image/memes/doge.jpg"
import Modal from "../login/Modal"

// Styling Imports:
import {BackgroundDiv, BackgroundDivLighter} from "../../views/design/Containers";
import {Label, Title} from "../../views/design/Text";
import {Button, InputField1, InputFieldLoginRegister} from '../../views/design/Interaction';

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
        this.setState({showImage: true});
    };

    hideModal = () => {
        this.setState({showImage: false});
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
            new User(response.data).putToSessionStorage();

            // Login successfully worked --> navigate to default route
            this.props.history.push('/');
        } catch (error) {
            if (error.response && error.response.status == 401) { // 401: UNAUTHORIZED
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
        this.setState({[key]: value});
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: 'center'}}>
                <BackgroundDiv>
                    <Title> Do you even meme? </Title>
                    <Title style={{fontSize: '30px'}}> SoPra Group-04</Title>
                    <BackgroundDivLighter>
                        <div style={{width: '350px', height: '50px'}}>
                            <Label>Login to your account:</Label>
                        </div>

                        <InputFieldLoginRegister
                            placeholder="Username"
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />

                        <InputFieldLoginRegister
                            // type='password'
                            placeholder="Password"
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                            <Button
                                role="button"
                                disabled={!this.state.username || !this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.login();
                                }}
                            >
                                Login
                            </Button>

                            <Button width='50%' onClick={() => {
                                this.props.history.push('/register')
                            }}
                            >
                                Register
                            </Button>
                        </div>
                    </BackgroundDivLighter>
                    <Modal show={this.state.showImage} handleClose={this.hideModal}>


                        <div style={{display: this.state.showImage ? "block" : "none"}}>
                            <img className={title.bestmemes} src={doge} alt={"such meme"}/>

                        </div>
                    </Modal>
                </BackgroundDiv>
            </div>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
