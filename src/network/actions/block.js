// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, BLOCK_SUCCESS, BLOCK_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const fetchBlockSuccess = (data) => ({
    type: BLOCK_SUCCESS,
    payload: data,
});

export const fetchBlockFailure = (error) => ({
    type: BLOCK_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const onBlock = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/master-data?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("block")}&parentId=${encryptDataGet(JSON.stringify(id))}`, {});
            let responseData = decryptData(response?.data?.data)
            dispatch(fetchBlockSuccess(responseData));
        } catch (error) {
            dispatch(fetchBlockFailure(error));
        }
    };
};
