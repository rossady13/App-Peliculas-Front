import React, { useState, useEffect } from 'react'
import { getGeneros, crearGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');


export const GeneroView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [generos, setGeneros] = useState([]);
  const { nombre = '', estado = '', descripcion='' } = valoresForm;

  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      const resp = await getGeneros();
      setGeneros(resp.data);

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  useEffect(() => {
    listarGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }
  const handleCrearGenero = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      Swal.showLoading();
      const resp = await crearGenero(valoresForm);
      setValoresForm({ nombre: '', estado: '', descripcion: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }


  }


  return (
    <div className='container-Fluid'>
      <form onSubmit={(e) => handleCrearGenero(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" value={nombre} required name='nombre' className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input type="text" value={descripcion} required name='descripcion' className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>



          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select value={estado} className="form-select" required name='estado'
                onChange={(e) => handleOnChange(e)}>
                <option selected>---SELECCIONE---</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>

            </div>
          </div>


        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>

      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
          </tr>
        </thead>
        <tbody>
          {
            generos.length > 0 && generos.map((genero, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{genero.nombre}</td>
                <td>{genero.descripcion}</td>
                <td>{genero.estado}</td>
                <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(genero.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
