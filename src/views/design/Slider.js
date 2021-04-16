import styled from "styled-components";

export const Slider = styled.input`
    -webkit-appearance: none;
    height: 35px;
    width: 100%;
    border: none;
    background: rgba(0,0,0,0);
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
