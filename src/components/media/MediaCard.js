import React from 'react'
import { Link } from "react-router-dom";

export const MediaCard = (props) => {

    const { media } = props;

    return (


        <div className="col">
            <div className="card" >
                <img src={media.foto} className="card-img-top" alt="Imagen"></img>
                <div className="card-body">
                <h5 className="card-title">Caracteristicas</h5>
                    <hr />
                    <p className="card-text">{`Titulo: ${media.titulo} `}</p>
                    <p className="card-text">{`Serial: ${media.serial} `}</p>
                    <p className="card-text">{`Sipnosis: ${media.sipnosis} `}</p>
                    <p className="card-text">{`URL: ${media.URL} `}</p>
                    <p className="card-text">{`Año de Estreno: ${media.añoEstreno} `}</p>
                    <p className="card-text">{`Genero: ${media.generoPrincipal} `}</p>
                    <p className="card-text">{`Director: ${media.directorPrincipal} `}</p>
                    <p className="card-text">{`Productora: ${media.Productora} `}</p>
                    <p className="card-text">{`Tipo: ${media.tipo} `}</p>
                    <p className="card-text">
                       <Link to= {`medias/edit/${media._id}`}>Ver más..</Link> 
                    </p>

                </div>

            </div>
        </div>


    );
};