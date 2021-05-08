import styled from "styled-components";


export const Button = styled.button`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  
  font-size: 15px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 2px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  margin: 10px;
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

export const LinkButton = styled.button`
  &:hover {
    color: #55ee00;
  }
  font-weight: 700;
  font-size: 16px;
  color: #8888ff;
  background: #00000000;
  border: none;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.15s ease;
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
    background: #033dfcaf;
    border-radius: 4px;
    padding-left: 15px;
    
     ::-webkit-input-placeholder {
    color: white;
  }
`;

export const InputField1 = styled.input`
  &::placeholder {
    color: rgba(105,105,105, 1.0);
    font-size: 14px
  }
  height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 2px;

  background: rgba(211, 211, 211, 0.5);
  color: black;
`;

export const InputFieldLoginRegister = styled.input`
  &::placeholder {
    color: rgba(105,105,105, 1.0);
    font-size: 14px
  }
  height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 2px;
  margin-bottom: 8px;
  margin-top: 8px;
  background: rgba(211, 211, 211, 0.5);
  color: black;
`;

InputField.defaultProps = {
    placeholder: "Enter here..",
}

export const Slider = styled.input`
    appearance: none;
    width: 100%;
    height: 35px;
    background: #00000000;
    
    
    &::-webkit-slider-runnable-track {height: .35em; background: #033dfcaf; border: none; border-radius: 3px;}
    &::-moz-range-track {height: .35em; background: #033dfcaf; border: none; border-radius: 3px;}
    
    &::-webkit-slider-thumb {appearance: none; height: 15px; width: 15px; border-radius: 50%; margin-top: -5px; 
    background: ${props => (props.disabled ? '#888' : '#bf3eff')};}
    &::-moz-range-thumb {appearance: none; border: none; height: 15px; width: 15px; border-radius: 50%; margin-top: -5px; 
    background: ${props => (props.disabled ? '#888' : '#bf3eff')};}
    
    &:active::-webkit-slider-thumb {background: ${props => (props.disabled ? '#888' : '#bf3eff7f')}; }
    &:active::-moz-range-thumb {background: ${props => (props.disabled ? '#888' : '#bf3eff7f')};}
    
`;
Slider.defaultProps = {
    type: "range",
}

export const SliderLabel = styled.div`
    display: inline-block;
    width: 3em;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #111;
`;

// TODO image copyrights?
export const Select = styled.select`
    width: 100%;
    height: 35px;
    border: none;
    background: rgba(211, 211, 211, 0.5);
    border-radius: 1px;
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

export const RoundImageButton = styled.button`
    width: 6vh;
    height: 6vh;
    padding: 0;
    background-image: ${props => props.image};
    background-color: ${props => props.image? 'transparent' : 'white'};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    image-rendering: auto;
    font-weight: bold;
    color: #000;
    border-radius: 50%;
    border: none;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

export const SmallRoundImageButton = styled.button`
    width: 5vh;
    height: 5vh;
    padding: 0;
    margin: 0.5vh;
    background-image: ${props => props.image};
    background-color: ${props => props.image? 'transparent' : 'white'};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    image-rendering: auto;
    font-weight: bold;
    color: #000;
    border-radius: 50%;
    border: none;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
    &:hover {
        transform: scale(1.2,1.2);
    }
    transition: all 0.25s ease;
`;

export const ImageButton = styled.button`
    padding: 0;
    background-image: ${props => props.image};
    background-color: ${props => props.image? 'transparent' : 'white'};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    image-rendering: auto;
    font-weight: bold;
    color: #000;
    border: none;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    opacity: ${props => (props.disabled ? 0.4 : 1)};
`;