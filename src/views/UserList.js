import React from "react";
import styled from "styled-components";
import Message from "./Message";
import {FlexBox, VerticalScroller} from "./design/Containers";
import {DiscreetButton, LinkButton} from "./design/Input";
import {Spinner} from "./design/Spinner";
import {withRouter} from "react-router-dom";
import User from "../components/shared/models/User";
import {Info} from "./design/Text";

/**
 * TODO there's probably more to add here
 * TODO cannot push to history. probably needs to be an object instead of a function.
 */
const UserList = ({ users }) => {
  return users? (
    <VerticalScroller style={{
      width: '100%',
      maxWidth: '100px',
      borderRadius: '5px',
      border: '1px solid #55ee00',
    }}>
        {users.map(user => {
            return (
                <FlexBox>
                    <LinkButton
                        onClick={() => {
                          this.props.history.push(`/users/${user.username}`);
                        }}>
                      {user.username}
                    </LinkButton>
                    <Info>{user.status}</Info>
                </FlexBox>
            );
        })}
    </VerticalScroller>
  ) : <Spinner/>;
};

export default withRouter(UserList);
