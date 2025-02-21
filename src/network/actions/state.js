// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, STATE_SUCCESS, STATE_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const fetchStateSuccess = (data) => ({
    type: STATE_SUCCESS,
    payload: data,
});

export const fetchStateFailure = (error) => ({
    type: STATE_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onState = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("state")}`, {});
            let responseData = decryptData(response?.data?.data);
            dispatch(fetchStateSuccess(responseData));
        } catch (error) {
            dispatch(fetchStateFailure(error));
        }
    };
};
