import {axiosInstance} from '../helper/axios_confg';

const getGeneros = () => {
    return axiosInstance.get('genero', {
         headers: {
            'Content-Type': 'application/json'
        }
     });
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        headers: {
            'Content-Type': 'application/json'
        }

    });
}


const editarGenero = (generoId, data) => {
    return axiosInstance.put(`genero/$(generoId)`, data, {
        headers: {
            'Content-Type': 'application/json'
        }

    });
}

export {
    crearGenero, getGeneros, editarGenero
}
