import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Label = styled.h1`
  font-size: 14px;
  color: #666666;
  text-align: left;
`;

const HeaderButton = styled.button`
  &:hover {
    transform: scale(1.1, 1);
  }
  padding: 6px;
  margin-left: 15px;
  margin-right: 15px;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #8888ff;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgba(255,255,255,0.8);
  transition: all 0.3s ease;
`;

class UserInfo extends React.Component {

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        this.props.history.push(`/login`);
        this.setState({username: null});
    }

    render() {
        return localStorage.getItem('username')? (
            <Container>
                <Label>
                    Logged in as:
                </Label>
                <HeaderButton
                    onClick={() => {
                        // TODO show user info
                        this.props.history.push(`/chat`);
                    }}
                >
                    {localStorage.getItem('username')}
                </HeaderButton>

                <HeaderButton
                    onClick={ () => {
                        this.logout();
                    }}
                >
                    Log out
                </HeaderButton>
            </Container>
        ) : (
            <Label>
                Logged out
            </Label>
        );
    }
}

/**
 * Don't forget to export your component!
 */
export default withRouter(UserInfo);
