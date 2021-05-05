import React from 'react';

class ExpandableVBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.id? this.props.id : 'widthExpandableBox'),
            expandedWidth: (this.props.expandedWidth? this.props.expandedWidth : 450),
            collapsedWidth: (this.props.collapsedWidth? this.props.collapsedWidth : 150),
            width: (this.props.collapsedWidth? this.props.collapsedWidth : 150),
        };
    }

    render() {
        return (
            <div
                style={{
                    width: this.state.width,
                    height: 'inherit',
                    transition: 'all 0.3s ease',
                    ...this.props.style
                }}
                onMouseEnter={e => {
                    this.setState({
                        width: this.state.expandedWidth
                    });
                    if (this.props.listener)
                        this.props.listener.setState({
                            [`${this.state.id}Collapsed`]: false
                        })
                }}
                onMouseLeave={e => {
                    this.setState({
                        width: this.state.collapsedWidth
                    });
                    if (this.props.listener)
                        this.props.listener.setState({
                            [`${this.state.id}Collapsed`]: true
                        })
                }}>
                {this.props.children}
            </div>
        );
    }

}

export default ExpandableVBox;
