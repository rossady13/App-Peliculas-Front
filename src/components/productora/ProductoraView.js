import React, { useState, useEffect } from 'react'
import { getProductoras, crearProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');


export const ProductoraView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const { nombre = '', estado = '', slogan= '', descripcion= '' } = valoresForm;

  const listarProductoras = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      const resp = await getProductoras();
      setProductoras(resp.data);

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  
  useEffect(() => {
    listarProductoras();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }
  const handleCrearProductora = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      Swal.showLoading();
      const resp = await crearProductora(valoresForm);
      setValoresForm({ nombre: '', estado: '', slogan: '', descripcion: ''});
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }


  }


  return (
    <div className='container-Fluid'>
      <form onSubmit={(e) => handleCrearProductora(e)}>
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
              <label className="form-label">Slogan</label>
              <input type="text" value={slogan} required name='slogan' className="form-control"
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
            <th scope="col">Slogan</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
          </tr>
        </thead>
        <tbody>
          {
            productoras.length > 0 && productoras.map((productora, index) => {
              return <tr>
                <th scope='row'> {index + 1}</th>
                <td>{productora.nombre}</td>
                <td>{productora.slogan}</td>
                <td>{productora.descripcion}</td>
                <td>{productora.estado}</td>
                <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(productora.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}


