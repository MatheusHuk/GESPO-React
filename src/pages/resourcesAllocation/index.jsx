import React, { useEffect } from 'react'
import ResourcesAllocation from './component'
import { useHistory } from 'react-router-dom'

export default function ResourcesAllocationFunction ({ setLoad, logged, setLogged, showMenu, setShowMenu }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>
            {
                logged != null ? <ResourcesAllocation setLoad={setLoad} logged={logged} setLogged={setLogged} showMenu={showMenu} setShowMenu={setShowMenu}/> : null
            }

        </>
    )
}