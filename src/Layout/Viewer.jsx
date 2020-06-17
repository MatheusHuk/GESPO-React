import React from 'react'
import * as Comp from '../components'
import './index.css'

export default function Viewer({ children, setLoad, showMenu, setShowMenu }){
    return(
        <>
            <Comp.Menu setLoad={setLoad} />
            <Comp.SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            <div class="todo">
                {children}
            </div>
        </>
    );
}