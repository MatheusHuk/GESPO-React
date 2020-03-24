import React from 'react'
import * as Style from './style'

export default class SideMenu extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return(
            <Style.SideMenu />
        )
    }
}