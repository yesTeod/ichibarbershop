import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_TIMES_REQUEST, ORDER_TIMES_SUCCESS, ORDER_TIMES_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_TIMES_REQUEST, ORDER_UPDATE_TIMES_SUCCESS, ORDER_UPDATE_TIMES_FAIL } from "../Constants/OrderConstants";

// Create
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderUpdateTimesReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_UPDATE_TIMES_REQUEST:
            return { loading: true };
        case ORDER_UPDATE_TIMES_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_UPDATE_TIMES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// DETAILS
export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//scheduled
export const orderTimesReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_TIMES_REQUEST:
            return { loading: true };
        case ORDER_TIMES_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_TIMES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


//all
export const ordersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//delete
export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true };
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};