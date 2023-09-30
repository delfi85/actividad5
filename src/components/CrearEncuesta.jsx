import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CrearEncuesta = ({ agregarEncuesta }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Verificar si se proporcionaron preguntas y opciones
    const preguntas = data.preguntas ? data.preguntas.split(',') : [];
    const opciones = data.opciones ? data.opciones.split(',') : [];

    if (preguntas.length > 0 && opciones.length > 0) {
      // Crear la estructura de la encuesta con preguntas y opciones
      const nuevaEncuesta = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        preguntas: preguntas.map((pregunta, index) => ({
          id: index + 1,
          pregunta,
          opciones: opciones.map((opcion, opcIndex) => ({
            id: opcIndex + 1,
            texto: opcion
          }))
        }))
      };

      agregarEncuesta(nuevaEncuesta);
      navigate('/');
    } else {
      alert('Por favor, agrega al menos una pregunta y una opción a la encuesta.');
    }
  };

  return (
    <div>
      <h1>Crear Nueva Encuesta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          {...register("titulo", {
            required: 'Este campo es obligatorio',
            maxLength: { value: 50, message: 'El título debe tener menos de 50 caracteres' }
          })}
        />
        {errors.titulo && <p>{errors.titulo.message}</p>}

        <label>Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          {...register("descripcion", {
            maxLength: { value: 200, message: 'La descripción debe tener menos de 200 caracteres' }
          })}
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}

        <label>Preguntas (separadas por coma):</label>
        <input
          type="text"
          id="preguntas"
          name="preguntas"
          {...register("preguntas")}
        />
        {errors.preguntas && <p>{errors.preguntas.message}</p>}

        <label>Opciones (separadas por coma):</label>
        <input
          type="text"
          id="opciones"
          name="opciones"
          {...register("opciones")}
        />
        {errors.opciones && <p>{errors.opciones.message}</p>}

        <button type="submit">Guardar Encuesta</button>
      </form>
    </div>
  );
};

export default CrearEncuesta;
