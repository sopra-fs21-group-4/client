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
  color: #ffffff;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: #bf3eff;
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
  background: #ffffffcc;
  transition: all 0.3s ease;
`;

export const InvisibleButton = styled.button`
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  border: none;
  background: #00000000;
  transition: all 0.3s ease;
`;

export const InputField = styled.input`
    width: 100%;
    height: 35px;
    border: none;
    background: #21212114;
    border-radius: 4px;
    padding-left: 15px;
`;

InputField.defaultProps = {
    placeholder: "Enter here..",
}

export const Slider = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 35px;
    border: none;
    background: #00000000;
    &::-webkit-slider-runnable-track {
        height: .35em;
        background: #21212114;
        border: none;
        border-radius: 3px;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 1em;
        width: 1em;
        border-radius: 50%;
        background: #bf3eff;
        margin-top: -5px;
    }
    
    &:active::-webkit-slider-thumb {
        background: rgba(191,62,255, 0.5);
    }
`;
Slider.defaultProps = {
    type: "range",
}

// TODO image copyrights?
export const Select = styled.select`
    width: 100%;
    height: 35px;
    border: none;
    background: #21212114;
    border-radius: 4px;
    padding-left: 15px;
    appearance: none;
    background-image: url('https://www.skillstep.pt/i/apex_ui/img/ui/select-arrow.svg');    // TODO copyrights?
    background-repeat: no-repeat;
    background-position: 100% center;
    background-size: 35px;
    &.custom-select select {
        display: none; /*hide original SELECT element:*/
    }

`;

export const Option = styled.option`
    
`;