import React from 'react'
import * as Style from './style.js'

export default class DeleteModal extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
        this.state = {}
    }

    render(){
        return (
            <>
                <Style.Todo>
                    <Style.Container>
                        <Style.Header>{this.props.message}</Style.Header>
                        <Style.Body>
                            <Style.Button onClick={() => { this.props.yes(this.props.obj) }}>Sim</Style.Button>
                            <Style.Button onClick={() => { this.props.no() }}>Não</Style.Button>
                        </Style.Body>
                    </Style.Container>
                </Style.Todo>
            </>
        );
    }
}