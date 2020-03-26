import React, { useEffect } from 'react'

export default function Three({ goto }){

    useEffect(() => {
        goto("/three")
    }, []);

    return(
        <>
            <div>Three</div>
        </>
    );
}
