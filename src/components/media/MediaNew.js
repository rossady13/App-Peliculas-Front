import React, { useState, useEffect } from "react"
import { getDirectores } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import {crearMedia} from '../../services/mediaService';
import Swal from 'sweetalert2';






export const MediaNew = ({ handleOpenModal, listarMedias }) => {

    const [tipos, setTipos] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const {serial='', titulo='', sipnosis='', URL='', foto='', fechaCreacion='',fechaActualizacion='', añoEstreno='',genero, director, productora, tipo} =valoresForm;

    const listarProductoras = async () => {
      try {
          const { data } = await getProductoras();
          setProductoras(data);
       
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      listarProductoras();
  }, []);

  const listarDirectores = async () => {
      try {
          const { data } = await getDirectores();
          setDirectores(data);
       
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      listarDirectores();
  }, []);

  const listarGeneros = async () => {
      try {
          const { data } = await getGeneros();
          setGeneros(data);
       
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      listarGeneros();
  }, []);

  const listarTipos = async () => {
      try {
          const { data } = await getTipos();
          setTipos(data);
       
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      listarTipos();
  }, []);

  const handleOnChange = ({ target }) => {
      const { name, value } = target;
      setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      const media = {
        serial, titulo, sipnosis, URL, foto, 
        fechaCreacion,fechaActualizacion, añoEstreno,
        generoPrincipal:{
          _id: genero },
        
        directorPrincipal:{
          _id: director}, 

        productora:{ 
          _id: productora}, 

        tipo:{
          _id: tipo
        }
      }
      console.log(media);
      try {
          Swal.fire({
              allowOutsideClick: false,
              text: 'Cargado...'
          });
          Swal.showLoading();
          const { data } = await crearMedia(media)
          handleOpenModal();
          listarMedias();
          Swal.close();
      } catch (error) {
          console.log(error);
          Swal.close();
      }
  }

return (
  <div className='sidebar'> 
      <div className='container-fluid'>
          <div className='row'>

              <div className='col'>
                  <div className='sidebar-header'>
                      <h3>Nuevo Media</h3>
                      <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                  </div>
              </div>

              <div className='row'>
                  <div className='col'>
                      <hr />
                  </div>
              </div>

              <form onSubmit={(e) => handleOnSubmit(e)}>
                  <div className='row'>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Serial</label>
                              <input type="text" name='serial'
                              value={serial}  
                              onChange={e => handleOnChange(e) }
                              required
                              className='form-control'
                              />
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Titulo</label>
                              <input type="text" name='titulo' 
                              required
                              value={titulo}
                              onChange={(e) => handleOnChange(e)}
                              className='form-control' /> 
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Sipnosis</label>
                              <input type="text" name='sipnosis' 
                              required
                              value={sipnosis}
                              onChange={(e) => handleOnChange(e)}
                              className='form-control' /> 
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">URL</label>
                              <input type="url" name='URL' 
                              required
                              value={URL}
                              onChange={(e) => handleOnChange(e)}
                              className='form-control' /> 
                          </div>
                      </div>
                  </div>

                  <div className='row'>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Foto</label>
                              <input type="url" name='foto' 
                              value={foto}
                              required
                              onChange={(e) => handleOnChange(e)}
                              className='form-control'/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Fecha Creacion</label>
                              <input type="date" name='fechaCreacion' 
                              required
                              value={fechaCreacion}
                              onChange={(e) => handleOnChange(e)}
                              className='form-control' /> 
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Fecha Actualizacion</label>
                              <input type="date" name='fechaActualizacion' 
                              required
                              value={fechaActualizacion}
                              onChange={(e) => handleOnChange(e)}
                              className='form-control' /> 
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Año Estreno</label>
                              <input type="text" name='añoEstreno' 
                              required
                              value={añoEstreno}
                              onChange={(e) => handleOnChange(e)}
                              className='form-control' /> 
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Genero</label>
                              <select className="form-select"
                                  required
                                  name='genero'
                                  value={genero}
                                  onChange={(e) => handleOnChange(e)}>
                                  <option value="">--SELECCIONE--</option>
                                  {
                                      generos.map(({ _id, nombre }) => {
                                          return <option key={_id} value={_id}>{nombre}</option>
                                      })
                                  }
                              </select>
                          </div>
                      </div>
                  </div>

                  <div className='row'>
                     <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Director</label>
                              <select className="form-control"
                                  name='director'
                                  value={director}
                                  onChange={(e) => handleOnChange(e)}
                                  required>
                                  <option value="">--SELECCIONE--</option>
                                  {
                                      directores.map(({ _id, nombre }) => {
                                          return <option key={_id} value={_id}>{nombre}</option>
                                      })
                                  }
                              </select>
                          </div>
                      </div>

                      <div className='col'>
                          <div className="mb-3">
                              <label className="form-label">Tipo </label>
                              <select className="form-control"
                                  name='tipo'
                                  value={tipo}
                                  required
                                  onChange={(e) => handleOnChange(e)}>
                                  <option value="">--SELECCIONE--</option>
                                  {
                                      tipos.map(({ _id, nombre }) => {
                                          return <option key={_id} value={_id}>{nombre}</option>
                                      })
                                  }
                              </select>
                          </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Productora</label>
                                <select className="form-control"
                                    name='productora'
                                    value={productora}
                                    required
                                    onChange={(e) => handleOnChange(e)}>
                                    
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        productoras.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                  </div>

                  <div className='row'>
                      <div className='col'>
                      <button className="btn btn-primary">Guardar</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>
)
}