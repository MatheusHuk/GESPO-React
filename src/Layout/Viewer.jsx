import React from 'react'
import * as Comp from '../components'
import './index.css'
import { Todo } from './style.js'

export default function Viewer({ children, setLoad, showMenu, setShowMenu, logged }){
    return(
        <>
            <Comp.Menu setLoad={setLoad} />
            <Comp.SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            <Todo showMenu={showMenu}>
                {children}
            </Todo>
        </>
    );
}