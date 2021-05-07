import styled from "styled-components";

export const Title = styled.h1`
    font-family: Impact;
    font-size: 48px;
    text-align: center;
    color: #fff;
    -webkit-text-stroke: 2px black;
`;

export const Label = styled.h2`
    font-size: 16px;
    color: #000;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
    padding-left: 5px;
    padding-right: 5px;
`;

export const Info = styled.p`
    font-size: 16px;
    color: #fff;
    background: #000;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
`;

export const Error = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #ff0000;
    background: #000;
`;