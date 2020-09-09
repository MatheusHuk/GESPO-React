import React, {useEffect} from 'react'
import * as Comp from '../components'
import './index.css'
import { Todo } from './style.js'

export default function Viewer({ children, setLoad, showMenu, setShowMenu, logged }){
    return(
        <>
            {
                logged != null && logged != undefined ?
                <>
                    <Comp.Menu setLoad={setLoad} />
                    {
                        logged.office.permission.id == 1 ?
                            <Comp.SideMenu showMenu={showMenu} setShowMenu={setShowMenu} /> :
                        logged.office.permission.id == 2 ?
                            <Comp.RegisterSideMenu showMenu={showMenu} setShowMenu={setShowMenu} /> :
                        logged.office.permission.id == 3 ?
                            <Comp.GestorSideMenu showMenu={showMenu} setShowMenu={setShowMenu} /> :
                            null
                    }
                    <Todo showMenu={logged.office.permission.id == 4 ? false : showMenu}>
                        {children}
                    </Todo>
                </>
                : null
            }
        </>
    );
}