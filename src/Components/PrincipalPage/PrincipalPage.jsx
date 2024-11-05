import React from 'react';
import style from './PrincipalPage.module.css'
import img from './imagenPortada.webp'

const PrincipalPage = () => {
    return(
        <>

        <div className={style.container}>
            <h1 className={style.titulo}>Quiz Challenge</h1>
            {/* <img src={img} width="10%" className={style.imagen} /> */}
            <svg className={style.brainAnimation} viewBox="0 0 100 100" fill="none" stroke="#FFD700" strokeWidth="2">
                        <path d="M20,50 A30,30 0 1,1 80,50 A30,30 0 1,1 20,50 Z" />
                        <path d="M35,40 Q50,20 65,40" />
                        <path d="M40,60 Q50,70 60,60" />
                        <circle cx="40" cy="45" r="5" />
                        <circle cx="60" cy="45" r="5" />
                    </svg>
        </div>
        </>
    )
}

export default PrincipalPage;