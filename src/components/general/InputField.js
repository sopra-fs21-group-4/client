import React from "react";
import styled from "styled-components";
import {Button} from "../../views/design/Interaction";
import {withRouter} from "react-router-dom";
import { HorizontalBox } from "../../views/design/Containers";

const Input = styled.input`
  width: 100%;
  margin-right: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #06c4ff;
  background: #ffffff88;
  color: #000000;
`;

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAction: this.props.submitAction? this.props.submitAction : () => {},
            textFilters: this.props.textFilters? this.props.textFilters : [],
            input: null,
        };
    }

  render() {
      return (
          <HorizontalBox style={{
             // padding: '15px',
          }}>
              <Input
                  id={this.props.id}
                  type="text"
                  autoComplete="off"
                  placeholder={this.props.placeholder? this.props.placeholder : " ... "}
                  maxLength="255"     // max length for default database String (+ 1 for EOS \0)
                  onChange={e => {
                      for (let filter of this.state.textFilters)
                      e.target.value = filter(e.target.value);
                      this.setState({input: e.target.value})
                  }}
                  onKeyPress={e => {
                      if (e.key == 'Enter') {
                          this.state.submitAction()
                          this.setState({input: null})
                      }
                  }}
              />
              <Button
                  disabled={!this.state.input}
                  width="80px"
                  onClick={() => {
                      this.state.submitAction();
                      this.setState({input: null})
                  }}
              >
                  {this.props.submitButtonText? this.props.submitButtonText : 'OK'}
              </Button>
          </HorizontalBox>
      );
  }


};

export default withRouter(InputField);
