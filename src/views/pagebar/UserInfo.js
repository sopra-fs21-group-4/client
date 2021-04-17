import React from "react";
import { withRouter } from 'react-router-dom';
import User from "../../components/shared/models/User";
import {DiscreetButton} from "../design/Input";
import {Label} from "../design/Text";
import {FlexBox} from "../design/Containers";

class UserInfo extends React.Component {

    logout() {
        User.removeFromSessionStorage();
        this.setState({username: null});
        this.props.history.push(`/`);
    }

    render() {
        return User.getAttribute('username')? (
            <FlexBox>
                <Label>
                    Logged in as:
                </Label>
                <DiscreetButton
                    onClick={() => {
                        this.props.history.push(`/users/${User.getAttribute('username')}`);
                    }}
                >
                    {User.getAttribute('username')}
                </DiscreetButton>

                <DiscreetButton
                    onClick={ () => {
                        this.logout();
                    }}
                >
                    Log out
                </DiscreetButton>
            </FlexBox>
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
