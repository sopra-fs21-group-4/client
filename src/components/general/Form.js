import React from 'react';
import styled from 'styled-components';
import {Button, InputField, LinkButton, Option, Select, Slider, SliderLabel} from '../../views/design/Interaction';
import {FlexBox, MediumForm, VerticalScroller} from "../../views/design/Containers";
import {Error, Label, Title} from "../../views/design/Text";

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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props['initialState']? this.props['initialState'] : {};
  }

  handleInputChange(key, value) {
    // since the form itself has no use for the data, we only update the listener.
    this.setState({[key]: value});
    if (this.props.listener) {
      this.props.listener.handleInputChange(key, value);
    }
  }

  nextRequired() {
    for (let attribute of this.props.attributes) {
      if (attribute.required && !this.state[attribute.key]) return attribute;
    }
    return null;
  }

  render() {
    return (
        <MediumForm>
          <Title> { this.props.title } </Title>
          <table>

            {!this.props.attributes? null : this.props.attributes.map(attribute => {
              return this.state[`${attribute.group}Collapsed`]? null :
                  <Row>
                    <Cell><Label id={`${attribute.key}Label`}> {`${attribute.label}${attribute.required? '*':''}`} </Label></Cell>
                    <Cell>{ this.inputComponent(attribute) }</Cell>
                  </Row>
            })}

            {this.nextRequired()?
                <Row>
                  <Cell/>
                  <Cell style={{paddingTop:'0'}}><Error style={{margin:'0'}}> {`*${this.nextRequired().label} required.`} </Error></Cell>
                </Row>
                : null}

            <Row>
              <Cell>
                {this.props['withoutCancelButton']? null :
                    <Button
                        width='100%'
                        onClick={this.props['onCancel']}
                        { ...this.props['cancelButtonProps'] }
                    >
                      Cancel
                    </Button>}
              </Cell>
              <Cell>
                {this.props['withoutSubmitButton']? null :
                <Button
                    width='100%'
                    onClick={this.props['onSubmit']}
                    disabled={this.props['submitCondition']? !this.props['submitCondition']() : this.nextRequired()}
                    { ...this.props['submitButtonProps'] }
                >
                  Submit
                </Button>}
              </Cell>
            </Row>
          </table>
        </MediumForm>
    );
  }

  inputComponent(attribute) {
    switch(attribute.type) {
      case 'Input':
        return <InputField
            id={ attribute.key }
            value={this.state[attribute.key]}
            onChange={e => {this.handleInputChange(attribute.key, e.target.value)}}
            { ...attribute.props }
        />;

      case 'Range':
        return <FlexBox>
          <Slider
              id={ attribute.key }
              defaultValue={this.state[attribute.key]}
              onChange={e => {this.handleInputChange(attribute.key, e.target.value)}}
              { ...attribute.props }
          />
          <SliderLabel>
            { this.state[attribute.key] }
          </SliderLabel>
        </FlexBox>;

      case 'Select':
        return <Select
            id={ attribute.key }
            value={this.state[attribute.key]}
            onChange={e => {this.handleInputChange(attribute.key, e.target.value)}}
            { ...attribute.props }
        >
          {attribute.options.map(option => {
            return <Option value={option.value}>{option.name}</Option>
          })}
        </Select>;

      case 'Group':
        return <LinkButton
              onClick={ e => {
                this.setState({[`${attribute.key}Collapsed`]: !this.state[`${attribute.key}Collapsed`],});
              }}>
            {this.state[`${attribute.key}Collapsed`]? 'expand' : 'collapse'}
          </LinkButton>;

      default: return null;
    }
  }

}

export default Form;
