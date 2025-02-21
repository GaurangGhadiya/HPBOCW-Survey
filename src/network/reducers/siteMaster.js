// reducers/someReducer.js
import { SHOW_LOADER_SUCCESS, SHOW_LOADER_FALIURE, SITE_MASTER_SUCCESS, SITE_MASTER_FALIURE } from "../action_types";


const initialState = {
    data: {},
    error: null,
};

const siteMaster = (state = initialState, action) => {
    switch (action.type) {
        case SITE_MASTER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case SITE_MASTER_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default siteMaster;
