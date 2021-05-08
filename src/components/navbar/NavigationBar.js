import React from "react";
import styled from "styled-components";
import {ImageButton, InvisibleButton, RoundImageButton, SmallRoundImageButton} from "../../views/design/Interaction";
import {withRouter} from "react-router-dom";
import HoverableBox from "../../views/design/HoverableBox";
import User from "../shared/models/User";
import chatAddIcon from "../../image/icons/chat-add.png"
import friendsIcon from "../../image/icons/friends.png"
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
import userSearchIcon from "../../image/icons/user-search.png"
import userViewIcon from "../../image/icons/user-view.png"
import userFriendIcon from "../../image/icons/user-friend.png"
import userUnfriendIcon from "../../image/icons/user-unfriend.png"
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
        this.state = { };
    }


    render() {
        return (
            <Container

            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'left',
                    height:'100%',
                    width:'70vh',

                }}>
                    <ImageButton

                        onClick={() => {this.props.history.push('/');}}
                        image={`url(${logo})`}
                        style={{marginLeft: "30px",width: '100%', height: '100%'}}
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
                    {this.getNavigationBarContent()}
                </div>
            </Container>
        );
    }

    getNavigationBarContent() {
        // TODO user should be fetched from sessionStorage
        let myUser = {
            id: 1,
            username: sessionStorage.getItem('username'),
            avatar: avatar0,
            currentGameId: 2,
            friends: [3,4,5,6,7],
            chats: [8,9]


        }
        // TODO delete when no longer needed
        let avatars = [avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7,avatar8,avatar9,avatar10];

        if (!User.isPresentInSessionStorage()) return [
            this.menu("login", userIcon, [
                {image: userLoginIcon, onClick: () => () => this.props.history.push('/login')},
                {image: userAddIcon, link: '/register'},
                ])
        ];
        else return [
            this.menu("myUser", myUser.avatar, [
                {image: userLogoutIcon, onClick: () => this.props.history.push('/logout')},
                {image: userEditIcon, onClick: () => this.props.history.push("/users/"+myUser.username)},
                {image: myUser.avatar, onClick: () => this.props.history.push('/users/'+myUser.username)},
            ]),
            (myUser.currentGameId?
                this.menu("myGame", gameOkIcon, [
                    {image: gamePlayIcon, onClick: () => this.props.history.push('/game')},
                    {image: gameLeaveIcon, onClick: () => this.props.history.push('/leave-game')},
                    {image: gameArchiveIcon, onClick: () => this.props.history.push('/game-archive')},
                ]) :
                this.menu("myGame", gameIcon, [
                    {image: gameSearchIcon, onClick: () => this.props.history.push('/game-list')},
                    {image: gameAddIcon, onClick: () => this.props.history.push('/game-create')},
                    {image: gameArchiveIcon, onClick: () => this.props.history.push('/game-archive')},
                ])),
            this.menu("myChats", chatIcon, [
                {image: chatAddIcon, onClick: () => this.props.history.push('/chat-create')},
            ].concat(myUser.chats.map(chatId => {
                // TODO fetch chat from localStorage
                let chat = {
                    avatar: avatars[chatId],
                }
                return {image: chat.avatar, onClick: () => sessionStorage.setItem('currentChat', chatId)}
            }))),
            this.menu("myFriends", friendsIcon, [
                {image: userSearchIcon, onClick: () => this.props.history.push('/user-find')},
            ].concat(myUser.friends.map(userId => {
                // TODO fetch user from localStorage
                let user = {
                    username: 'friend#'+userId,
                    avatar: avatars[userId],
                }
                return {image: user.avatar, onClick: () => this.props.history.push('/user/'+user.username)}
            }))),
        ];
    }

    menu(id, image, options) {
        return <HoverableBox
            id = {id}
            listener = {this}
            style={{
                marginRight: '15px',
                alignItems: 'center',
                background: '#9969c4',
                borderRadius: '99999px',
                width: this.state[`${id}Hovered`]? (options.length *6) +'vh' : '6vh',
            }}
        >
            {this.state[`${id}Hovered`]?
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
