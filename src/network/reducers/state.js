// reducers/someReducer.js
import { DISTRICT_SUCCESS, DISTRICT_FALIURE, STATE_SUCCESS, STATE_FALIURE } from "../action_types";


const initialState = {
    data: [],
    error: null,
};

const state = (state = initialState, action) => {
    switch (action.type) {
        case STATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case STATE_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default state;
