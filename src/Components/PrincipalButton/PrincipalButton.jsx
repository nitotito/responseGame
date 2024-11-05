import React, {useState} from "react";
import style from './PrincipalButton.module.css';
import {Link} from 'react-router-dom';

const PrincipalButton = () => {
    const [showInstructions, setShowInstructions] = useState(false);
    
    return (
        <>
        <div className={style.container}>

            <div className={style.containerEnlace}>
            <button to="/instrucciones" className={style.a} onClick={() => setShowInstructions(true)}>Instrucciones</button>
            </div>

            <div className={style.containerEnlace}>
            <Link to="/playing" className={style.a}>Play</Link>
            </div>
            
        </div>
        {showInstructions && (
                        <div className={style.instructionsModal}>
                            <div className={style.modalClose} onClick={() => setShowInstructions(false)}>✕</div>
                            <h2>Instrucciones</h2>
                            <p>- Responde las preguntas seleccionando la opción correcta</p>
                            <p>- Tienes 20 segundos para cada pregunta</p>
                            <p>- Comienzas con 5 vidas</p>
                            <p>- Cada respuesta correcta suma 1 punto</p>
                            <button onClick={() => setShowInstructions(false)}>Cerrar</button>
                        </div>
                    )}
        </>
        
    )
    

}

export default PrincipalButton;