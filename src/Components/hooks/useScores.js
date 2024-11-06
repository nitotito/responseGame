import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const useScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Obtiene la colección de puntuaciones
        const scoresCollection = collection(db, "scores");
        const snapshot = await getDocs(scoresCollection);
        
        // Mapea los datos de Firestore y los almacena en el estado
        const scoresList = snapshot.docs.map(doc => doc.data());
        setScores(scoresList);
      } catch (error) {
        console.error("Error al obtener las puntuaciones: ", error);
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchScores();
  }, []);

  return { scores, loading };
};

export default useScores;