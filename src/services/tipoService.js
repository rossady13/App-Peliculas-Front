import {axiosInstance} from '../helper/axios_confg';

const getTipos = () => {
    return axiosInstance.get('tipo', {
         headers: {
            'Content-Type': 'application/json'
        }
     });
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo', data, {
        headers: {
            'Content-Type': 'application/json'
        }

    });
}


const editarTipo = (tipoId, data) => {
    return axiosInstance.put(`tipo/$(tipoId)`, data, {
        headers: {
            'Content-Type': 'application/json'
        }

    });
}

export {
    crearTipo, getTipos, editarTipo
}
