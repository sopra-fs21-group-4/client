import React from 'react';
import {api, handleError} from '../../helpers/api';
import User from '../shared/models/User';
import {withRouter} from 'react-router-dom';
import title from '../../views/design/title.module.css'
import fuu from '../../image/memes/fuu.jpg'
import doge from "../../image/memes/doge.jpg";
import Modal from "./Modal";

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
class Register extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            password1: null,
            password2: null,
            username: null,
            email: null,
            showImage: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({showImage: true});
    };

    hideModal = () => {
        this.setState({showImage: false});
        window.location = `/register`;
    };

    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password1,
                email: this.state.email,
            });
            const response = await api.post('/users/create', requestBody);
            console.log(response);
            new User(response.data).putToSessionStorage();

            // Registration successfully worked --> navigate to default route
            this.props.history.push('/');
        } catch (error) {
            if (error.response && error.response.status == 409) { // 409: CONFLICT
                this.showModal();
            } else {
                alert(`Something went wrong while registering: \n${handleError(error)}`);
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


                        <Title > Do you even meme? </Title>
                        <Title style={{fontSize:'30px'}}> SoPra Group-04</Title>


                        <BackgroundDivLighter>
                            <div style={{width:'350px', height:'50px'}}> <Label>Create your own account:</Label></div>
                            <InputFieldLoginRegister
                                placeholder="Username"
                                onChange={e => {
                                    this.handleInputChange('username', e.target.value);
                                }}
                            />


                            <InputFieldLoginRegister
                                placeholder="Email"
                                onChange={e => {
                                    this.handleInputChange('email', e.target.value);
                                }}
                            />

                            <InputFieldLoginRegister
                                // type='password'
                                placeholder="Password"
                                onChange={e => {
                                    this.handleInputChange('password1', e.target.value);
                                }}
                            />

                            <InputFieldLoginRegister
                                // type='password'
                                placeholder="Reenter password"
                                onChange={e => {
                                    this.handleInputChange('password2', e.target.value);
                                }}
                            />
                            <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                                <Button

                                    width="50%"
                                    onClick={() => {
                                        this.props.history.push('/login');
                                    }}
                                >
                                    Back to login
                                </Button>

                                <Button
                                    width='50%'
                                    disabled={!this.state.username || !this.state.password1 || !this.state.password2 || (this.state.password1 != this.state.password2)}
                                    onClick={() => {

                                        this.register();
                                    }}
                                >
                                    Create account
                                </Button>
                            </div>
                        </BackgroundDivLighter>
                        <Modal show={this.state.showImage} handleClose={this.hideModal}>


                            <div style={{display: this.state.showImage ? "block" : "none"}}>
                                <img className={title.bestmemes} src={fuu} alt={"such meme"}/>
                                <Button
                                    style={{
                                        marginTop: "15px",
                                        marginLeft: "48%",
                                        marginRight: "50%"


                                    }}


                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                > Back</Button>

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
export default withRouter(Register);
