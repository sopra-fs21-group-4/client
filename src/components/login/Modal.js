import '../../../src/views/design/Modal.css';
import React from "react";
import {withRouter} from "react-router-dom";





const Modal = ({ show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}

            </section>
        </div>
    );
};
export default withRouter(Modal);