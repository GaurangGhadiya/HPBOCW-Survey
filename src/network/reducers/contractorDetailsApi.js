// reducers/someReducer.js
import { SHOW_LOADER_SUCCESS, SHOW_LOADER_FALIURE, SITE_MASTER_SUCCESS, SITE_MASTER_FALIURE, CONTRACTOR_LIST_SUCCESS, CONTRACTOR_LIST_FALIURE, CONTRACTOR_DETAILS_SUCCESS, CONTRACTOR_DETAILS_FALIURE } from "../action_types";


const initialState = {
    data: {},
    error: null,
};

const contractorDetailsApi = (state = initialState, action) => {
    switch (action.type) {
        case CONTRACTOR_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case CONTRACTOR_DETAILS_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default contractorDetailsApi;
