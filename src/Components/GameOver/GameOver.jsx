import React from 'react'
import style from './GameOver.module.css'
import {Link} from 'react-router-dom'
import music from '../Assets/gameover.mp3'
import { useLocation } from 'react-router-dom';

const GameOver = (props) => {
    const location = useLocation();
    const { puntuacion} = location.state || {};

    return (
        <>  <div className={style.container}>
                <h1 className={style.titulo}>¡¡¡GAME OVER!!!</h1>
                <div className={style.containerImg}>
                    <div className={style.img}></div>
                </div>
                <div className={style.gameOver}>
                    <p>Puntuación: {puntuacion}</p>
                </div>
                <div className={style.buttonContainer}>
                    <Link to ='/'>VOLVER</Link>
                </div>      
             </div>
             <audio src={music} autoPlay></audio>
        </>
    )
}

export default GameOver
