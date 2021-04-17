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

export const InputField = styled.input`
    height: 35px;
    padding-left: 15px;
    margin-left: -4px;
    border: none;
    border-radius: 20px;
    margin-bottom: 20px;
    rgba(0, 0, 0, 0.6);
     /* Surface overlay */
    background: rgba(33, 33, 33, 0.08);
    border-radius: 4px 4px 0px 0px;
`;

InputField.defaultProps = {
    placeholder: "Enter here..",
}

export const Slider = styled.input`
    -webkit-appearance: none;
    height: 35px;
    width: 100%;
    padding-bottom: 10px;
    border: none;
    background: #00000000;
    border-radius: 4px 4px 0px 0px;
    &::-webkit-slider-runnable-track {
        height: .35em;
        background: rgba(33, 33, 33, 0.08);
        border: none;
        border-radius: 3px;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 1em;
        width: 1em;
        border-radius: 50%;
        background: rgb(191,62,255);
        margin-top: -5px;
    }
    &:focus {
        outline: none;
    }
    
    &:active::-webkit-slider-thumb {
        background: rgba(191,62,255, 0.5);
    }
`;
Slider.defaultProps = {
    type: "range",
}
