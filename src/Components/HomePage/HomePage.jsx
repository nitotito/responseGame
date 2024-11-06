// HomePage.jsx
import React,{useState,useEffect } from "react";
import PrincipalPage from "../PrincipalPage/PrincipalPage";
import PrincipalButton from "../PrincipalButton/PrincipalButton";
import useScores from "../hooks/useScores";
import './HomePage.css';

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [showScoresModal, setShowScoresModal] = useState(false); // Estado para controlar el modal de puntuaciones
  
    const { scores, loading } = useScores(); // Obtenemos las puntuaciones
  
    // Verifica si hay un nombre en el localStorage al cargar el componente
    useEffect(() => {
      const storedName = localStorage.getItem("name");
      if (!storedName) {
        setShowModal(true);
      } else {
        setName(storedName);
      }
    }, []);
  
    // Función para manejar el guardado del nombre
    const handleSaveName = () => {
      if (name.trim() === "") {
        setError("Por favor, ingrese un nombre o apodo.");
        return;
      }
      localStorage.setItem("name", name);
      setShowModal(false);
    };
  
    const toggleScoresModal = () => {
      setShowScoresModal(!showScoresModal); // Muestra u oculta el modal de puntuaciones
    };

    const changeName = () => {
      localStorage.clear();
      setShowModal(true);
    }
  
    return (
      <div className="landingcontainer">
        <PrincipalPage />
        <PrincipalButton />
  
        {/* Botón para abrir el modal de puntuaciones */}
        <button onClick={toggleScoresModal}>Puntuaciones</button>
        <button onClick={changeName}>Cambiar nombre</button>
  
        {/* Modal para ingresar el nombre */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Ingrese su nombre o apodo</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(""); // Limpia el error al cambiar el valor
                }}
                placeholder="Nombre"
              />
              {error && <p className="error-message">{error}</p>}
              <button onClick={handleSaveName}>Guardar</button>
            </div>
          </div>
        )}
  
        {/* Modal de puntuaciones */}
        {showScoresModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Puntuaciones</h2>
              {loading ? (
                <p>Cargando...</p>
              ) : (
                <ul>
                    {scores.length > 0 ? (
                        <table>
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Puntuación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, index) => (
                            <tr key={index}>
                                <td>{score.nombre}</td>
                                <td>{score.puntuacion}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    ) : (
                        <p>No hay puntuaciones disponibles.</p>
                    )}
                </ul>
              )}
              <button onClick={toggleScoresModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default HomePage;