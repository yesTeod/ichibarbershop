import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, ordersReducer, orderTimesReducer, orderUpdateTimesReducer } from "./Reducers/OrderReducers";
import { serviceListReducer } from "./Reducers/ServiceReducers";
import { userLoginReducer } from "./Reducers/UserReducers";
import { captchaReducer } from "./Reducers/CaptchaReducers";
import { removedDateCreateReducer, removedDateReducer } from "./Reducers/RemovedDateReducers";

const reducer = combineReducers({
    serviceDetails: serviceListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderTimes: orderTimesReducer,
    userLogin: userLoginReducer,
    orderList: ordersReducer,
    orderDelete: orderDeleteReducer,
    captchaVerify: captchaReducer,
    removedDateCreate: removedDateCreateReducer,
    removedDateList: removedDateReducer,
    orderUpdateTimes: orderUpdateTimesReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;