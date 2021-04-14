import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
    width: 100%;
  margin: 4px 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  text-align: left;
  border: 1px solid #06c4ff;
  flex-shrink: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const UserName = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  font-weight: bold;
  color: #bf62ff;
`;

const Timestamp = styled.div`
  width: 45px;
  margin-left: 5px;
  margin-right: 15px;
  color: #06c4ff;
  font-size: 8px;
`;

const Text = styled.div`
  color: #000000;
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
          <TextBox>
              <UserName>{ message.username }</UserName>
              <Timestamp>{timeString(new Date (message.timestamp))}</Timestamp>
              <Text style={{flex: 1, flexWrap: 'wrap'}}>{message.text}</Text>
          </TextBox>

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
