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
 */
const UserList = ({ users }) => {
  return users? (
    <VerticalScroller>
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
