import React, { useEffect } from 'react';
import Viewer from '../../Layout/Viewer'

export default function One({ setLoad }){

    useEffect(() => {
        setLoad(true);
        setTimeout(() => l(), 5000);
    });

    function l(){
        setLoad(false);
    }
    return(
        <>
            <Viewer>
                <div>One</div>
            </Viewer>
        </>
    );
}
