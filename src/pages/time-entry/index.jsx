import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TimeEntry from './component'

export default function TimeEntryFunction({ setLoad, logged, showMenu, setShowMenu }) {
    const history = useHistory();

    useEffect(() => {
       if(logged == null) {
            history.push("/login")
        } 
    })
    return(
        <>
            {
                logged != null ? <TimeEntry setLoad={setLoad} logged={logged} history={history} showMenu={showMenu} setShowMenu={setShowMenu} /> : null
            }
        </>
    );
    /*
    return(
        <TimeEntry setLoad={setLoad} logged={logged} history={history} />
    ); */
}
