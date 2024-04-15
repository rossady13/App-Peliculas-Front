import React from 'react'
import {NavLink} from 'react-router-dom'; 

export const Header = () => {
  return (
    <nav className=  "navbar navbar-expand-lg navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">

        <NavLink className="navbar-brand" to='/media'>MegaFilms</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

          <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact  to='/media'>Peliculas y Series</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" activeClassName='active' exact to='/genero'>Genero</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to='/director'>Director</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact  to='/productora'>Productora</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to='/tipo'>Tipo</NavLink>
            </li>

            

            

          </ul>

        </div>

      </div>

    </nav>
  )
}

