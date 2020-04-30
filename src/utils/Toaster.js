import React from 'react'
import { Toast } from 'react-bootstrap'

export default class Toaster extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Toast 
                show={this.props.show} 
                onClose={() => {this.props.setShowToaster(false)}}
                style={{
                    position: 'absolute',
                    top: '1VH',
                    right: '1VW',
                    transition: 'all 0.5s',
                    width: '20VW',
                    zIndex: '1000'
                  }}>
                <Toast.Header>
                    <img
                        src="../assets/ring.gif"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">{this.props.header}</strong>
                </Toast.Header>
                <Toast.Body>{this.props.body}</Toast.Body>
            </Toast>
        );
    }
}