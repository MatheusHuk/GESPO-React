import React, { useEffect } from 'react'
import UserRegister from './component'
import { useHistory } from 'react-router-dom'

export default function UserRegisterFunction ({ setLoad, logged, setLogged }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>
            {
                logged != null ? <UserRegister setLoad={setLoad} logged={logged} setLogged={setLogged}/> : null
            }

        </>
    )
}