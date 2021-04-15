import '../../../src/views/design/Modal.css';
import React from "react";
import {withRouter} from "react-router-dom";
import styled from "styled-components";



const CloseButton = styled.div`
 &:hover {
    transform: translateY(-2px);
  }
  padding: 10px;
  font-weight: 700;
  
  font-size: 15px;
  font-family: Roboto;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(191,62,255);
  transition: all 0.3s ease;
  
`;





const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <CloseButton width={'10%'} onClick={handleClose}>
                    Close
                </CloseButton>
            </section>
        </div>
    );
};
export default withRouter(Modal);