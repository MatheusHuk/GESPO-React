import React, { useEffect } from 'react';
import ProjectRegister from './component';
import { useHistory } from 'react-router-dom';

export default function ProjectRegisterFunction ({ setLoad, logged, setLogged }) {

    
    const history = useHistory();

    useEffect(() => {
        if(logged == null) {
             history.push("/login")
         } 
     })

     return (
        <>
            {
                logged != null ? <ProjectRegister setLoad={setLoad} logged={logged} setLogged={setLogged}/> : null
            }

        </>
    )
}

    