import {MediumForm} from "./Containers";
import {Label, Title} from "./Text";
import React from "react";
import {Button, InputField, LinkButton, Option, Select, Slider} from "./Input";
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

export function generateForm(title, attributes, listener, submitButtonProps, cancelButtonProps) {
    return (
        <MediumForm>
            <Title> { title } </Title>
            <table>

                {attributes.map(attribute => {
                    return formRow(attribute, listener);
                })}

                <Row>
                    <Cell>
                        {cancelButtonProps? <Button
                            { ...cancelButtonProps }
                            width='100%'
                        >
                            Cancel
                        </Button> : <div/>}
                    </Cell>
                    <Cell>
                        {submitButtonProps? <Button
                            { ...submitButtonProps }
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

function formRow(attribute, listener) {
    if(listener.state[`${attribute.group}Collapsed`]) return null;

    switch(attribute.type) {
        case 'Group':
            let collapsed = listener.state[attribute.id + 'Collapsed'];
            return (
                <Row>
                    <Cell><Label id={`${attribute.id}Label`}> { attribute.label } </Label></Cell>
                    <Cell>
                        <LinkButton
                            onClick={ e => {
                                collapsed = !collapsed;
                                listener.setState({[`${attribute.id}Collapsed`]: collapsed,});
                            }}>
                            {collapsed? 'expand' : 'collapse'}
                        </LinkButton>
                    </Cell>
                </Row>
            );
        default:
            return (
                <Row>
                    <Cell><Label id={`${attribute.id}Label`}> { attribute.label } </Label></Cell>
                    <Cell>{ inputComponent(attribute, listener) }</Cell>
                </Row>
        );
    }


}


function inputComponent(attribute, listener) {
    switch(attribute.type) {
        case 'Input':
            return <InputField
                id={ attribute.id }
                onChange={e => {listener.setState({[attribute.id]: e.target.value})}}
                { ...attribute.props }
            />;

        case 'Range':
            return <Slider
                id={ attribute.id }
                onChange={e => {listener.setState({[attribute.id]: e.target.value})}}
                { ...attribute.props }
            />;
        case 'Select':
            return <Select
                id={ attribute.id }
                onChange={e => {listener.setState({[attribute.id]: e.target.value})}}
                { ...attribute.props }
            >
                {attribute.options.map(option => {
                    return <Option value={option.value}>{option.name}</Option>
                })}
            </Select>;
        default: return null;
    }
}