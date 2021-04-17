import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
`;

export const DiscreetButton = styled.button`
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

export const InvisibleButton = styled.button`
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  border: none;
  background: rgba(0,0,0,0);
  transition: all 0.3s ease;
`;
