import React from "react";
import styled from "styled-components";
import {
    Button,
    ImageButton,
    InvisibleButton,
    RoundImageButton,
    SmallRoundImageButton
} from "../../views/design/Interaction";
import {Route, withRouter} from "react-router-dom";
import HoverableBox from "../../views/design/HoverableBox";
import User from "../shared/data/User";
import chatAddIcon from "../../image/icons/chat-add.png"
import chatIcon from "../../image/icons/chat.png"
import gameIcon from "../../image/icons/game.png"
import gameSearchIcon from "../../image/icons/game-search.png"
import gameArchiveIcon from "../../image/icons/game-archive.png"
import gameLeaveIcon from "../../image/icons/game-leave.png"
import gameOkIcon from "../../image/icons/game-ok.png"
import gameAddIcon from "../../image/icons/game-add.png"
import gamePlayIcon from "../../image/icons/game-play.png"
import userIcon from "../../image/icons/user.png"
import userLoginIcon from "../../image/icons/user-login.png"
import userLogoutIcon from "../../image/icons/user-logout.png"
import userAddIcon from "../../image/icons/user-add.png"
import userEditIcon from "../../image/icons/user-edit.png"
import homeIcon from "../../image/icons/home.png"
import userSearchIcon from "../../image/icons/user-search.png"
import friendsIcon from "../../image/icons/friends.png"
import avatar0 from "../../image/avatars/avatar0.png"
import avatar1 from "../../image/avatars/avatar1.png"
import avatar2 from "../../image/avatars/avatar2.png"
import avatar3 from "../../image/avatars/avatar3.png"
import avatar4 from "../../image/avatars/avatar4.png"
import avatar5 from "../../image/avatars/avatar5.png"
import avatar6 from "../../image/avatars/avatar6.png"
import avatar7 from "../../image/avatars/avatar7.png"
import avatar8 from "../../image/avatars/avatar8.png"
import avatar9 from "../../image/avatars/avatar9.png"
import avatar10 from "../../image/avatars/avatar10.png"
import logo from "../../image/logo/doyouevenmeme.png"
import {api, handleError} from "../../helpers/api";
import title from "../../views/design/title.module.css";
import bruh from "../../image/memes/bruh girl.jpg";
import Modal from "../login/Modal";
import {Spinner} from "../../views/design/Spinner";
import Data from "../shared/data/Data";


/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: 6.5%;
  width: 100%;
  background: linear-gradient(90deg, #1ae 30%, #af9bd1 70%);
  // background: rgba(6, 196, 255, 0.2);
  display: flex;
  align-items: center;
  position: fixed;
`;


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: null,
            username: null,
            showImage: false,
            reset: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({showImage: true});
    };

    hideModal = () => {
        this.setState({showImage: false});
        this.props.history.push('/')
    };

    async leave() {
        try {

            // request setup
            const url = `/games/${this.state.gameId}/leave`;
            const requestBody = "";
            const config = {headers: User.getUserAuthentication()};

            // send request
            const response = await api.put(url, requestBody, config);
            console.log(response);

            this.props.history.push('/')


        } catch (error) {
            this.showModal();
            //alert(`Something went wrong while leaving the game: \n${handleError(error)}`);
        }
    }

    render() {
        // if (!this.state.username)
        //    return <Spinner/>

        return (
            <Container
                style={{zIndex: '100'}}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'left',
                    height: '100%',
                    width: '70vh',

                }}>
                    <ImageButton

                        onClick={() => {
                            this.props.history.push('/');
                        }}
                        image={`url(${logo})`}
                        style={{marginLeft: "30px", width: '100%', height: '100%'}}
                    >
                        {/*<Title> Do you even meme? </Title>*/}
                    </ImageButton>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'right',
                    width: '100%',
                    transition: 'all 0.3s ease',
                }}>
                    <HoverableBox style={{background: '#9969c4',borderRadius: '99999px',}}>
                    <RoundImageButton
                        image={`url(${homeIcon})`}
                        onClick={() => {
                            this.props.history.push('/');
                        }}
                    >
                    </RoundImageButton>
                    </HoverableBox>
                    {this.getNavigationBarContent()}
                </div>

                <Modal show={this.state.showImage} handleClose={this.hideModal}>


                    <div style={{display: this.state.showImage ? "block" : "none"}}>
                        <img className={title.bestmemes} src={bruh}/>
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
            </Container>
        );
    }


    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        if (!User.isPresentInSessionStorage()) return
        let me = await Data.get(User.getAttribute("userId"))

        this.setState({
            gameId: me.currentGameId,
            username: me.username,
        })
    }


    getNavigationBarContent() {

        if (!User.isPresentInSessionStorage()) return [
            this.menu("login", userIcon, [
                {image: userLoginIcon, onClick: () => this.props.history.push('/login')},
                {image: userAddIcon, onClick: () => this.props.history.push('/register')},
            ])
        ];
        else return [
            this.menu("login", avatar0, [
                {image: userLogoutIcon, onClick: () => this.props.history.push('/logout')},
                {image: userEditIcon, onClick: () => this.props.history.push("/user/" + User.getAttribute('userId'))},
                {image: friendsIcon, onClick: () => this.props.history.push('/friends')},
                {image: avatar0, onClick: () => this.props.history.push("/user/" + User.getAttribute('userId'))},
            ]),

            (this.state.gameId?
                    this.menu("myGame", gameIcon, [
                        {image: gamePlayIcon, onClick: () => this.props.history.push('/game/' + this.state.GameId)},
                        {image: gameLeaveIcon, onClick: () => this.leave()},
                        {image: gameArchiveIcon, onClick: () => this.props.history.push('/archive')},
                    ])
                    :
                    this.menu("myGame", gameIcon, [
                        {image: gameAddIcon, onClick: () => this.props.history.push('/game-create')},
                        {image: gameSearchIcon, onClick: () => this.props.history.push('/dashboard')},
                        {image: gameArchiveIcon, onClick: () => this.props.history.push('/archive')},
                    ])
            ),


        ];
    }

    menu(id, image, options) {
        return <HoverableBox
            id={id}
            listener={this}
            style={{
                marginRight: '15px',
                alignItems: 'center',
                background: '#9969c4',
                borderRadius: '99999px',
                width: this.state[`${id}Hovered`] ? (options.length * 6) + 'vh' : '6vh',
            }}
        >
            {this.state[`${id}Hovered`] ?
                options.map(option => <SmallRoundImageButton
                    image={`url(${option.image})`}
                    onClick={option.onClick}

                />) :
                <RoundImageButton
                    image={`url(${image})`}
                />}
        </HoverableBox>
    }

}

export default withRouter(NavigationBar);
