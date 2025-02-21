// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, SITE_MASTER_SUCCESS, SITE_MASTER_FALIURE, CONTRACTOR_LIST_SUCCESS, CONTRACTOR_LIST_FALIURE, CONTRACTOR_DETAILS_SUCCESS, CONTRACTOR_DETAILS_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const contractorDetailsApiSuccess = (data) => ({
    type: CONTRACTOR_DETAILS_SUCCESS,
    payload: data,
});

export const contractorDetailsApiFailure = (error) => ({
    type: CONTRACTOR_DETAILS_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const contractorDetailsApiApi = (id) => {
    return async (dispatch) => {
        try {
            let url = `/contractor/detail?id=${encryptDataGet(JSON.stringify(id))}`

            const response = await axios.get(url, {});
            let responseData = decryptData(response?.data?.data)
            dispatch(contractorDetailsApiSuccess(responseData));
        } catch (error) {
            dispatch(contractorDetailsApiFailure(error));
        }
    };
};
