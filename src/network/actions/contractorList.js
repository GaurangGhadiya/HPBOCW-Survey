// actions/someActions.js
import axios from "../api";

import { DISTRICT_SUCCESS, DISTRICT_FALIURE, SITE_MASTER_SUCCESS, SITE_MASTER_FALIURE, CONTRACTOR_LIST_SUCCESS, CONTRACTOR_LIST_FALIURE } from "../action_types";
import { decryptData, encryptDataGet } from "../../utils/encryptDecrypt";

// Action Creators
export const contractorListrSuccess = (data) => ({
    type: CONTRACTOR_LIST_SUCCESS,
    payload: data,
});

export const contractorListrFailure = (error) => ({
    type: CONTRACTOR_LIST_FALIURE,
    payload: error,
});

// Async Action to Fetch Data
export const contractorListrApi = (district,block) => {
    return async (dispatch) => {
        try {
            let url = `/contractor/summaryList?page=${encryptDataGet(JSON.stringify(0))}&size=${encryptDataGet(JSON.stringify(100))}`
            if (district) {
                url = url + `&districtId=${encryptDataGet(JSON.stringify(district))}`
            }
            if (block) {
                url = url + `&blockId=${encryptDataGet(JSON.stringify(block))}`
            }
            const response = await axios.get(url, {});
            let responseData = decryptData(response?.data?.data);
            dispatch(contractorListrSuccess(responseData));
        } catch (error) {
            dispatch(contractorListrFailure(error));
        }
    };
};
