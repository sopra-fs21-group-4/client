import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 4px 0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #06c4ff;
`;

const UserName = styled.div`
  margin-right: 15px;
  font-weight: bold;
  color: #06c4ff;
`;

const Timestamp = styled.div`
  width: 40px;
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
const MessageView = ({ message }) => {
  return (
    <Container>
        <Timestamp>{new Date (message.timestamp).toLocaleString()}</Timestamp>
        <UserName>{message.senderName}</UserName>
        <Text>{message.text}</Text>
    </Container>
  );
};

export default MessageView;
