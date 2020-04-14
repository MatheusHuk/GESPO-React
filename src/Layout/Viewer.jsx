import React from 'react'
import * as Comp from '../components'
import './index.css'

export default function Viewer({ children }){
    return(
        <>
            <Comp.Menu />
            <Comp.SideMenu />
            <div class="todo">
                {children}
            </div>
        </>
    );
}