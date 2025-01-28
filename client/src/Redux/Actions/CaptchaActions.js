import { CAPTCHA_SET_FAIL, CAPTCHA_SET_REQUEST, CAPTCHA_SET_SUCCESS } from "../Constants/CaptchaConstants"
import axios from "axios";

export const verifyCaptcha = (userKey) => async (dispatch, getState) => {
    try {
        dispatch({ type: CAPTCHA_SET_REQUEST });

        const { data } = await axios.post(`/verify`, userKey);
        dispatch({ type: CAPTCHA_SET_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CAPTCHA_SET_FAIL,
            payload: message,
        });
    }
}