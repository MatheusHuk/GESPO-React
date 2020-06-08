import React, { useEffect } from 'react'
import HoursProvisioningReal from './component'
import { useHistory } from 'react-router-dom'

export default function HoursProvisioningFunction ({ setLoad, logged, setLogged }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>
            {
                logged != null ? <HoursProvisioningReal setLoad={setLoad} logged={logged} setLogged={setLogged}/> : null
            }
        </>
    )
}