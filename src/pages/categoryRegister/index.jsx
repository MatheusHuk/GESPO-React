import React, { useEffect } from 'react'
import CategoryRegister from './component'
import { useHistory } from 'react-router-dom'

export default function CategoryRegisterFunction ({ setLoad, logged, setLogged }){

    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

    return (
        <>
        
            {
                logged != null ? <CategoryRegister setLoad={setLoad} logged={logged} setLogged={setLogged}/> : null
            }

        </>
    )
}
