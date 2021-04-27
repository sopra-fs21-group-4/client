import React from 'react';
import {VerticalBox} from "./Containers";

class ExpandableVBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedWidth: (this.props.expandedWidth? this.props.expandedWidth : 450),
            collapsedWidth: (this.props.collapsedWidth? this.props.collapsedWidth : 150),
            width: (this.props.collapsedWidth? this.props.collapsedWidth : 150),
        };
    }

    render() {
        return (
            <VerticalBox
                style={{
                    width: this.state.width,
                    height: 'inherit',
                    ...this.props.style
                }}
                onMouseEnter={e => {
                    this.setState({
                        width: this.state.expandedWidth
                    });
                }}
                onMouseLeave={e => {
                    this.setState({
                        width: this.state.collapsedWidth
                    });
                }}>
                {this.props.children}
            </VerticalBox>
        );
    }

}

export default ExpandableVBox;
