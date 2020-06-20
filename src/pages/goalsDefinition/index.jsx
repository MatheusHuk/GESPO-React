import React, { useEffect } from 'react'
import GoalsDefinition from './component'
import { useHistory } from 'react-router-dom'

export default function GoalsDefinitionFunction ({ setLoad, logged, setLogged, showMenu, setShowMenu }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>
            {
                logged != null ? <GoalsDefinition setLoad={setLoad} logged={logged} setLogged={setLogged} showMenu={showMenu} setShowMenu={setShowMenu}/> : null
            }

        </>
    )
}