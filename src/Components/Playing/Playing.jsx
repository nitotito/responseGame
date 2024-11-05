import React, { useState,useEffect } from "react";
import style from './Playing.module.css';
import { useNavigate } from 'react-router-dom';
import { Preguntas } from "../Helpers/BD.jsx";


const Playing = () =>{
    const[aleatorio,setAleatorio]=useState(Math.floor(Math.random() * 100));
    const[vidas,setVidas]=useState(5);
    const[puntuacion,setPuntuacion]=useState(0);
    const[time,setTime]=useState(20);
    const[clase,setClase]=useState([style.naturaleza,style.cultura,style.arte,style.deportes,style.viajes]);
    const[gameOver,setGameOver]=useState(null);
    const [habilitarBotones, setHabilitarBotones] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        let cuentaAtras = setInterval(()=> {time>0 ? setTime(time-1):setGameOver(true)},1000)
        return()=>clearInterval(cuentaAtras);
    }, [time]);

    useEffect(() => {
        if (gameOver) {
            navigate('/gameover', { state: { puntuacion, vidas } }); // Pasamos los datos
        }
    }, [gameOver, navigate, puntuacion, vidas]);

    const reproducirAudio = (mensaje) => {
        const utterance = new SpeechSynthesisUtterance(mensaje);
        setHabilitarBotones(false); // Deshabilita los botones durante el audio
        utterance.onend = () => {
            setHabilitarBotones(true); // Habilita los botones cuando el audio termina
        };
        speechSynthesis.speak(utterance);
    };

    const bien=()=>{
        reproducirAudio('¡¡¡RESPUESTA CORRECTA!!!');
        const nuevoAleatorio = Math.floor(Math.random() * Preguntas.length);
        setAleatorio(nuevoAleatorio); 
        setPuntuacion(puntuacion + 1);
        setTime(20);
    }

    const mal=()=>{
        if(vidas === 0){
            setVidas("ultima chance");
        }
        reproducirAudio('¡¡¡RESPUESTA INCORRECTA!!!');
        setAleatorio(Math.round(Math.random()*100))
        setVidas(vidas >0 ? vidas - 1 : 0);
        setTime(20);

        if (vidas - 1 < 0) {
            setGameOver(true);
        }
    }

    return(
        <>
        <div className={style.gameContainer}>
            {Preguntas.map(preguntando=>(
                preguntando.id===aleatorio ?
                <>
                    <div className={style.countContainer}>
                        <h2>Time:{time}</h2>
                        <h2>Points: {puntuacion}</h2>
                        <h2>Life:{vidas !== 0 ? vidas : " Ultima Chance!"}</h2>
                    </div>

                    <div className={style.imgContainer}>
                        <div className={preguntando.estilos === 'naturaleza' ? clase[0] : 
                            preguntando.estilos ==='arte'     ? clase[2] : 
                            preguntando.estilos ==='deportes' ? clase[3] :
                            preguntando.estilos === 'viajes'  ? clase[4] : 
                            preguntando.estilos ==='cultura'  ? clase[1] : clase[4]}>
                            
                        </div>
                    </div>

                    <div className={style.preguntaContainer}>
                            <h3>{preguntando.pregunta}</h3>
                    </div>

                    <div className={style.buttonContainer}>                       
                        <button className={time <= 5 ? style.pulse: style.boton} onClick={()=>preguntando.respuesta1===preguntando.solucion ? bien() : mal()}disabled={!habilitarBotones}>{[preguntando.respuesta1]}</button>                        
                        <button className={time <= 5 ? style.pulse: style.boton} onClick={()=>preguntando.respuesta2===preguntando.solucion ? bien() : mal()}disabled={!habilitarBotones}>{[preguntando.respuesta2]}</button>                                
                        <button className={time <= 5 ? style.pulse: style.boton} onClick={()=>preguntando.respuesta3===preguntando.solucion ? bien() : mal()}disabled={!habilitarBotones}>{[preguntando.respuesta3]}</button>
                    </div>
                </>
                :null
            ))}
        </div>
        </>
        
    )


}

export default Playing;