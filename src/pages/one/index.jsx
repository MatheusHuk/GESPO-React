import React, { useEffect } from 'react'

export default function One({ goto }){

    useEffect(() => {
        goto("/one")
    }, []);

    return(
        <>
            <div>One</div>
        </>
    );
}
