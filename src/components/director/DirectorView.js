import React, { useState, useEffect } from 'react'
import { getDirectores, crearDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');


export const DirectorView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [directores, setDirectores] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;

  const listarDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      const resp = await getDirectores();
      setDirectores(resp.data);

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  useEffect(() => {
    listarDirectores();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }
  const handleCrearDirector = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      Swal.showLoading();
      const resp = await crearDirector(valoresForm);
      setValoresForm({ nombre: '', estado: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }


  }


  return (
    <div className='container-Fluid'>
      <form onSubmit={(e) => handleCrearDirector(e)}>
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
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
          </tr>
        </thead>
        <tbody>
          {
            directores.length > 0 && directores.map((director, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{director.nombre}</td>
                <td>{director.estado}</td>
                <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(director.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}


