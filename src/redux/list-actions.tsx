import { GET_DEPLOYMENTS, GET_TEMPLATE, ADD_DEPLOYMENT, DELETE_DEPLOYMENT } from './action-types';

import axios from 'axios';


export const getTemplates = (data: any) => {
    return {
        type: GET_TEMPLATE,
        payload: data
    }
}
export const addDeployment = (data: any) => {
    return {
        type: ADD_DEPLOYMENT,
        payload: data
    }
}
export const removeDeployment = (data: any) => {

    return {
        type: DELETE_DEPLOYMENT,
        payload: data
    }
}
export const getDeployments = (data: any) => {

    return {
        type: GET_DEPLOYMENTS,
        payload: data
    }
}


export const fetchDeployments = () => {
    return (dispatch: any) => {
        axios.get('http://localhost:4000/api/deployments')
            .then(response => {
                dispatch(getDeployments(response.data))
            })

    };
}
export const fetchTemplates = () => {
    return (dispatch: any) => {
        axios.get('http://localhost:4000/api/templates').then(response => {
            dispatch(getTemplates(response.data))
        })
    };
};
export const createDeployment = (data: any) => {
    return (dispatch: any) => {
        axios.post('http://localhost:4000/api/deployments/create', data).then(response => {
            dispatch(addDeployment(response.data))
        })
    };
};
export const deleteDeployment = (id: string) => {
    return (dispatch: any) => {
        axios.delete(`http://localhost:4000/api/deployments?id=${id}`).then(response => {
            dispatch(removeDeployment(response.data))
        })
    };
};
