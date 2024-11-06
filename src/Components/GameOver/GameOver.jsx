import React,{useEffect} from 'react'
import style from './GameOver.module.css'
import {Link} from 'react-router-dom'
import music from '../Assets/gameover.mp3'
import { useLocation } from 'react-router-dom';
import { saveScore, getScoreByName } from '../hooks/useSaveScore'; 

const GameOver = (props) => {
    const location = useLocation();
    const { puntuacion } = location.state || {};
    const nombre = localStorage.getItem('name');

    useEffect(() => {
        const saveOrUpdateScore = async () => {
            if (nombre && puntuacion !== undefined) {
                // Verificar si el usuario ya existe en la base de datos
                const existingScore = await getScoreByName(nombre);

                if (existingScore) {
                    // Si el usuario existe, actualiza la puntuación solo si es mayor a la anterior
                    if (puntuacion > existingScore.puntuacion) {
                        await saveScore(nombre, puntuacion);
                        console.log('Puntuación actualizada');
                    } else {
                        console.log('Puntuación actual es menor o igual a la existente, no se actualiza');
                    }
                } else {
                    // Si el usuario no existe, guarda la nueva puntuación
                    await saveScore(nombre, puntuacion);
                    console.log('Puntuación guardada');
                }
            }
        };

        saveOrUpdateScore();
    }, [nombre, puntuacion]);

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
