import React, { useEffect } from 'react'
import TeamRegister from './component'
import { useHistory } from 'react-router-dom'

export default function TeamRegisterFunction ({ setLoad, logged, setLogged, showMenu, setShowMenu }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>        
            {
                logged != null ? <TeamRegister setLoad={setLoad} logged={logged} setLogged={setLogged} showMenu={showMenu} setShowMenu={setShowMenu}/> : null
            }
        </>
    )
}
