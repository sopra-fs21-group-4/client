import React from 'react';
import {Spinner} from '../../views/design/Spinner';
import {withRouter} from 'react-router-dom';
import Data from "../shared/data/Data";
import styled from "styled-components";



const Container = styled.div`
  width: 100%;
  margin-top: 15px;
  border-radius: 12px;
  align-items: center;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #06c4ff;
`;

const Username = styled.h4`
  display: inline;
  font-weight: bold;
  color: #bf62ff;
  margin: 0;
`;

const Timestamp = styled.div`
  position: relative;
  top: -12px;
  margin-bottom: -12px;
  color: #06c4ff;
  font-size: 8px;
`;

const Text = styled.p`
  display: inline;
  color: #000000;
  margin: 0;
  word-wrap: break-word;
`;


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            sender: null,
        };
    }

    componentDidMount() {
        this.props.updateLoop.addClient(this);
    }

    componentWillUnmount() {
        this.props.updateLoop.removeClient(this);
    }

    async update() {
        let message = await Data.get(this.props.messageId)
        this.setState({
            message: message,
            sender: await Data.get(message.senderId)
        })
    }


    render() {
        if (!this.state.message || !this.state.sender) return <Spinner/>
        return (
            <Container>
                <Timestamp> { this.timeString(new Date (this.state.message.timestamp)) } </Timestamp>
                <Username> { this.state.sender.username +':' } </Username>
                <Text> { this.state.message.text } </Text>
            </Container>
        );
    }

    timeString(date) {
        if (!this.isToday(date)) return date.toDateString();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        return `Today at ${hours}:${minutes}`;
    }

    isToday(someDate) {
        const today = new Date()
        return someDate.getDay() == today.getDay() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
}

export default withRouter(Message);
