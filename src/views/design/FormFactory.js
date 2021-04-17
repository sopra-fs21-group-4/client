import {MediumForm} from "./Containers";
import {Label, Title} from "./Text";
import React from "react";
import {Button, InputField, Slider} from "./Input";
import styled from "styled-components";

const Row = styled.tr`
    display: table-row;
`;

const Cell = styled.td`
    height: 100%;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
`;

export function generateForm(title, attributes, onSubmit, onCancel) {
    return (
        <MediumForm>
            <Title> { title } </Title>
            <table>

                {attributes.map(attribute => {
                    return (
                        <Row>
                            <Cell><Label> { attribute.label } </Label></Cell>
                            <Cell>{ inputComponent(attribute) }</Cell>
                        </Row>
                    );
                })}

                <Row>
                    <Cell>
                        {onCancel? <Button
                            onClick={onCancel}
                            width='100%'
                        >
                            Cancel
                        </Button> : <div/>}
                    </Cell>
                    <Cell>
                        {onSubmit? <Button
                            onClick={onSubmit}
                            width='100%'
                        >
                            Submit
                        </Button> : <div/>}
                    </Cell>
                </Row>
            </table>
        </MediumForm>
    );
}

function inputComponent(attribute) {
    switch(attribute.type) {
        case 'Input':
            return <InputField id={ attribute.id } { ...attribute.props } />;

        case 'Range':
            return <Slider id={ attribute.id } { ...attribute.props } />;
        default: return null;
    }
}