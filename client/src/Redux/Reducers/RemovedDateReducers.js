import { DATE_CREATE_FAIL, DATE_CREATE_REQUEST, DATE_CREATE_RESET, DATE_CREATE_SUCCESS, DATE_LIST_FAIL, DATE_LIST_REQUEST, DATE_LIST_SUCCESS } from "../Constants/RemovedDateConstants";

// Create
export const removedDateCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DATE_CREATE_REQUEST:
            return { loading: true };
        case DATE_CREATE_SUCCESS:
            return { loading: false, success: true, date: action.payload };
        case DATE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case DATE_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

//removed dates
export const removedDateReducer = (state = { date: [] }, action) => {
    switch (action.type) {
        case DATE_LIST_REQUEST:
            return { loading: true };
        case DATE_LIST_SUCCESS:
            return { loading: false, date: action.payload };
        case DATE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};