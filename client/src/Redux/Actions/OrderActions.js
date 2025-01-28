import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_TIMES_REQUEST, ORDER_TIMES_SUCCESS, ORDER_TIMES_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_TIMES_REQUEST, ORDER_UPDATE_TIMES_SUCCESS, ORDER_UPDATE_TIMES_FAIL } from "../Constants/OrderConstants"
import axios from "axios";
import { logout } from "./UserActions";

// Create order
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { data } = await axios.post(`/api/orders`, order);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        });
    }
};

export const updateTimes = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_UPDATE_TIMES_REQUEST });

        const { data } = await axios.post(`/api/orders/times`);
        dispatch({ type: ORDER_UPDATE_TIMES_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ORDER_UPDATE_TIMES_FAIL,
            payload: message,
        });
    }
};

// Order Details
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

export const listTimes = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_TIMES_REQUEST })

        const { data } = await axios.get("/api/orders/times");
        dispatch({ type: ORDER_TIMES_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ORDER_TIMES_FAIL,
            payload: message,
        });
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`../api/orders/all`, config);

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
}

//delete
export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`../api/orders/${id}`, config);

        dispatch({ type: ORDER_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({ type: ORDER_DELETE_FAIL, payload: message, });
    };
};