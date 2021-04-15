import styled from "styled-components";

export const InvisibleButton = styled.button`
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  border: none;
  background: rgba(0,0,0,0);
  transition: all 0.3s ease;
`;
