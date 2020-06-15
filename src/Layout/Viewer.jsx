import React from 'react'
import * as Comp from '../components'
import './index.css'

export default function Viewer({ children, setLoad }){
    return(
        <>
            <Comp.Menu setLoad={setLoad} />
            <Comp.SideMenu />
            <div class="todo">
                {children}
            </div>
        </>
    );
}