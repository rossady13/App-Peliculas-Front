import React, { useState, useEffect } from 'react'
import { getDirectores } from '../../services/directorService';
import {DirectorCard} from './DirectorCard';


export const DirectorView = () => {

  const [directores, setDirectores] = useState([]);

  const listarDirectores = async () => {

    try {
      const { data } = await getDirectores();
      console.log(data);
      setDirectores(data);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    listarDirectores();
  }, []);

  return (
    <div className='.container-fluid'>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          directores.map((director) =>{
            return<DirectorCard key= {director._id} />
          })
        }
      </div>
    </div>
  )

}


