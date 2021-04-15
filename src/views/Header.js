import React from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import {InvisibleButton} from "./design/InvisibleButton";
import {withRouter} from "react-router-dom";


/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: 50px;
  width: 100%;
  background: rgba(6, 196, 255, 0.2);
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  align-items: right;
`;

const UserInfoContainer = styled.div`
  width: 500px;
  align-items: right;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #666666;
  text-align: left;
`;
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
class Header extends React.Component {

    render() {
        return (
            <Container>
                <TitleContainer>
                    <InvisibleButton
                        style={{marginLeft: "50px"}}
                        onClick={() => {this.props.history.push('/');}}
                    >
                        <Title> Do you even meme? </Title>
                    </InvisibleButton>
                </TitleContainer>
                <UserInfoContainer>
                    <UserInfo />
                </UserInfoContainer>
            </Container>
        );
    }
}

/**
 * Don't forget to export your component!
 */
export default withRouter(Header);
