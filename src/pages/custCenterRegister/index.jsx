import React, { useEffect } from 'react'
import CustCenterRegister from './component'
import { useHistory } from 'react-router-dom'

export default function CustCenterRegisterFunction ({ setLoad, logged, setLogged }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>
        
            {
                logged != null ? <CustCenterRegister setLoad={setLoad} logged={logged} setLogged={setLogged}/> : null
            }

        </>
    )
}
