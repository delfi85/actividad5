import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const Encuesta = ({ listaEncuestas, responderEncuesta }) => {
  const { id } = useParams();
  const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));

  // Estado para almacenar las respuestas del usuario
  const [respuestasUsuario, setRespuestasUsuario] = useState(
    encuesta.preguntas.reduce((acc, pregunta) => {
      return { ...acc, [pregunta.id]: null }; // Inicializar respuestas a null
    }, {})
  );

  // Estados para controlar mensajes de confirmación
  const [encuestaEnviada, setEncuestaEnviada] = useState(false);
  const [respuestasIncompletas, setRespuestasIncompletas] = useState(false);

  const handleRespuestaChange = (preguntaId, opcionId) => {
    // Actualizar el estado con la nueva respuesta del usuario
    setRespuestasUsuario((prevRespuestas) => ({
      ...prevRespuestas,
      [preguntaId]: opcionId,
    }));
  };

  const handleSubmit = () => {
    console.log("Respuestas del usuario:", respuestasUsuario);

    // Verificar si todas las preguntas tienen una respuesta
    const todasRespondidas = Object.values(respuestasUsuario).every(
      (respuesta) => respuesta !== null
    );

    if (todasRespondidas) {
      // Llamar a la función responderEncuesta para guardar las respuestas
      responderEncuesta(id, respuestasUsuario);
      setEncuestaEnviada(true);
      setRespuestasIncompletas(false);
      console.log("Respuestas enviadas");
    } else {
      setEncuestaEnviada(false);
      setRespuestasIncompletas(true);
    }
  };

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>Preguntas</h2>
          <form>
            {!encuesta.preguntas && <p>Sin preguntas definidas.</p>}
            {encuesta.preguntas &&
              encuesta.preguntas.map((pregunta) => (
                <div key={pregunta.id}>
                  <p>{pregunta.pregunta}</p>
                  <ul>
                    {pregunta.opciones.map((opcion) => (
                      <li key={opcion.id}>
                        <label>
                          <input
                            type="radio"
                            name={`pregunta${pregunta.id}`}
                            value={opcion.id}
                            onChange={() =>
                              handleRespuestaChange(pregunta.id, opcion.id)
                            }
                            checked={respuestasUsuario[pregunta.id] === opcion.id}
                          />
                          {opcion.texto}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </form>
          <br />
          <button onClick={handleSubmit}>Enviar Respuestas</button>
          {encuestaEnviada && <p>Encuesta enviada.</p>}
          {respuestasIncompletas && (
            <p>Por favor, selecciona una respuesta para todas las preguntas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
