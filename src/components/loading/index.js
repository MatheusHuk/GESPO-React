import React from 'react'
import ring from '../../assets/ring.gif'
import './index.css'

export default function Loading({ load }){

    return(
        <>
            {
                load ?
                <div class="loading">
                    <img src={ring} alt="loading"/>
                </div> :
                null

            }
        </>
    );
}