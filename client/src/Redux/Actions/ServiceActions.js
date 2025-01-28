import { SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS } from "../Constants/ServiceConstants"
import axios from "axios";

export const listService = () => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_LIST_REQUEST })

        const { data } = await axios.get("/api/products");

        dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SERVICE_LIST_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,

        });
    }
};