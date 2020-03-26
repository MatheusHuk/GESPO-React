import React, { useEffect } from 'react'

export default function Four({ goto }){

    useEffect(() => {
        goto("/four")
    }, []);

    return(
        <>
            <div>Four</div>
        </>
    );
}
