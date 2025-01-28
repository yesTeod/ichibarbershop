import { CAPTCHA_SET_FAIL, CAPTCHA_SET_REQUEST, CAPTCHA_SET_SUCCESS } from "../Constants/CaptchaConstants";


export const captchaReducer = (state = {}, action) => {
    switch (action.type) {
        case CAPTCHA_SET_REQUEST:
            return { loading: true };
        case CAPTCHA_SET_SUCCESS:
            return { loading: false, captcha: action.payload };
        case CAPTCHA_SET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}