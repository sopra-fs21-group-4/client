import React from 'react';

class HoverableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.id? this.props.id : 'hoverableBox'),
            listener: (this.props.listener? this.props.listener : this),
        };
    }

    render() {
        return (
            <div
                style={{
                    display: 'inherit',
                    transition: 'all 0.5s ease',
                    ...this.props.style
                }}
                onMouseEnter={e => {
                    this.state.listener.setState({
                        [`${this.state.id}Hovered`]: true
                    });
                }}
                onMouseLeave={e => {
                    this.state.listener.setState({
                        [`${this.state.id}Hovered`]: false
                    });
                }}>
                {this.props.children}
            </div>
        );
    }

}

export default HoverableBox;
