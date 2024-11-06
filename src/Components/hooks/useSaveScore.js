import { db } from '../../firebaseConfig'; // Ajusta la ruta si es necesario
import {  getDocs,getDoc,setDoc , doc } from 'firebase/firestore';

const scoresCollection = 'scores'; 

// Guarda o actualiza la puntuación en Firebase
export const saveScore = async (nombre, puntuacion) => {
    console.log("nombre y puntuacion : ",typeof(nombre) + " "+ typeof(puntuacion));
 
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        console.error('El nombre no es válido o está vacío');
        return;
    }

    nombre = nombre.trim();

    // Verifica que no esté vacío después de limpiar
    if (nombre === '') {
        console.error('El nombre no debe estar vacío después de limpiar');
        return;
    }

     // Crea la referencia al documento dentro de la colección
    const scoreRef = doc(db, scoresCollection, nombre);

    console.log('scoreRef:', scoreRef);
    
    // Verificar si el documento existe
    const docSnap = await getDoc(scoreRef);
    
    if (docSnap.exists()) {
        const existingData = docSnap.data();
        // Si existe, actualiza la puntuación solo si es mayor
        if (puntuacion > existingData.puntuacion) {
            await setDoc(scoreRef, { nombre, puntuacion });
            console.log('Puntuación actualizada');
        } else {
            console.log('Puntuación actual es menor o igual a la existente, no se actualiza');
        }
    } else {
        // Si no existe, guarda el nuevo documento
        await setDoc(scoreRef, { nombre, puntuacion });
        console.log('Puntuación guardada');
    }
};

// Obtener los datos de puntuación por nombre
export const getScoreByName = async (nombre) => {
    // Si el nombre es inválido, retornamos null
    if (typeof nombre !== 'string' || nombre.trim() === '') {
        console.error('Nombre inválido');
        return null;
    }

    // Creamos una referencia al documento
    const scoreRef = doc(db, 'scores', nombre);

    try {
        // Intentamos obtener el documento
        const docSnap = await getDoc(scoreRef);

        if (docSnap.exists()) {
            return docSnap.data();  // Si el documento existe, devolvemos los datos
        } else {
            console.log('No se encontró el documento');
            return null;  // Si no existe, retornamos null
        }
    } catch (error) {
        console.error('Error al obtener el documento:', error);
        return null;  // En caso de error, retornamos null
    }
};