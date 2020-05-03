import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TimeEntry from './component'

export default function TimeEntryFunction({ setLoad, logged }) {
    const history = useHistory();

    useEffect(() => {
       if(logged == null) {
            console.log("LOGGED FALSE: ",logged)
            history.push("/login")
        }
    })
    return(
        <>
            {
                logged != null ? <TimeEntry setLoad={setLoad} logged={logged} history={history} /> : null
            }
        </>
    );

    /*return(
        <TimeEntry setLoad={setLoad} logged={logged} history={history} />
    );*/
}
