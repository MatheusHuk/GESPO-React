import React, { useEffect } from 'react'

export default function Two({ goto }){

    useEffect(() => {
        goto("/two")
    }, []);

    return(
        <>
            <div>Two</div>
        </>
    );
}
