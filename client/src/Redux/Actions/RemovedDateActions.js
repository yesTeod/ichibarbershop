import { DATE_CREATE_FAIL, DATE_CREATE_REQUEST, DATE_CREATE_SUCCESS, DATE_LIST_FAIL, DATE_LIST_REQUEST, DATE_LIST_SUCCESS } from "../Constants/RemovedDateConstants";
import axios from "axios";

// Create removed date
export const createRemovedDate = (date) => async (dispatch, getState) => {
    try {
        dispatch({ type: DATE_CREATE_REQUEST });

        const { data } = await axios.post(`../api/removedDates`, date);
        dispatch({ type: DATE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: DATE_CREATE_FAIL,
            payload: message,
        });
    }
};

export const listRemovedDate = () => async (dispatch) => {
    try {
        dispatch({ type: DATE_LIST_REQUEST })

        const { data } = await axios.get("/api/removedDates");
        dispatch({ type: DATE_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: DATE_LIST_FAIL,
            payload: message,
        });
    }
};