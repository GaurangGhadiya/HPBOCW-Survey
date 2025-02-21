// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, SITE_MASTER_SUCCESS, SITE_MASTER_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const siteMasterSuccess = (data) => ({
    type: SITE_MASTER_SUCCESS,
    payload: data,
});

export const siteMasterFailure = (error) => ({
    type: SITE_MASTER_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const siteMasterApi = (id, page) => {
    return async (dispatch) => {
        try {
            let url = `/master-data/paginated?status=${encryptDataGet(`true`)}&masterName=${encryptDataGet("siteMaster")}&page=${encryptDataGet(JSON.stringify(page))}&size=${encryptDataGet("10") }`
            if (id) {
                url = url + `&parentId=${ encryptDataGet(JSON.stringify(id)) }`
            } else {
                url = url
            }
            const response = await axios.get(url, {});
            let responseData = decryptData(response?.data?.data)
            dispatch(siteMasterSuccess(responseData));
        } catch (error) {
            dispatch(siteMasterFailure(error));
        }
    };
};
