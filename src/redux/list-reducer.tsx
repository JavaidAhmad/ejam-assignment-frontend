import { GET_TEMPLATE, GET_DEPLOYMENTS, ADD_DEPLOYMENT, DELETE_DEPLOYMENT } from './action-types';
const initialState: any = {
    templates: [],
    deployments: []
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_TEMPLATE:
            return {
                ...state,
                templates: action.payload.data
            }
        case GET_DEPLOYMENTS:
            return {
                ...state,
                deployments: action.payload.data
            }
        case ADD_DEPLOYMENT:
            return {
                ...state,
                deployments: [...state.deployments, action.payload.result]
            }
        case DELETE_DEPLOYMENT:
            return {
                ...state,
                deployments: state.deployments.filter((ele: any) => ele._id !== action.payload.data.deletedId) //deletedId is id of deleted element
            }
        default: return state;
    }


}