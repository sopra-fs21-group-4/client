import React from "react";
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
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Message = ({ message }) => {
  return (
      <Container>
          <Timestamp> { timeString(new Date (message.timestamp)) } </Timestamp>
          <Username> { message.username +':' } </Username>
          <Text> { message.text } </Text>
      </Container>
  );
};

const timeString = (date) => {
    if (!isToday(date)) return date.toDateString();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return `Today at ${hours}:${minutes}`;
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDay() == today.getDay() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}

export default Message;
