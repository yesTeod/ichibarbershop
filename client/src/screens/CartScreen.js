import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../components/cart/calendar/Calendar";
import CalendarHours from "../components/cart/calendarhour/CalendarHours";
import moment from "moment";
import { createOrder } from "../Redux/Actions/OrderActions"
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Message from "../components/LoadingError/Error";
import axios from "axios";
import Footer from "./../components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "../Redux/Actions/CaptchaActions";

const cartScreen = () => {
    const [value, setValue] = useState(moment.utc());
    const [sameTime, setSameTime] = useState(moment.utc());
    const [toggleHours, setToggleHours] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [expired, setExpired] = useState(true);
    const [namess, setName] = useState("");
    const [emailss, setEmail] = useState("");
    const [phoness, setPhone] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [message, setMessage] = useState("");
    const [servicess, setService] = useState({
        id: "635ffcd2643f25bfc574f51b",
        price: "15",
    });

    const dispatch = useDispatch();

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    const navigate = useNavigate();

    const captcha = useSelector((state) => state.captchaVerify);
    const { loading, errorr, _captcha } = captcha;


    useEffect(() => {
        dispatch(verifyCaptcha({ expired }));
    }, [_captcha, dispatch]);
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch, success, order]);

    const validate = (name, phone, email) => {
        const _errors = {};
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const regexPhone = /[^\d]/;

        if (!name) {
            _errors.name = "Въведете име";
        } else if (name.length < 3) {
            _errors.name = "Името е твърде късо"
        }
        if (!phone) {
            _errors.phone = "Въведете телефонен номер";
        } else if (regexPhone.test(phone)) {
            _errors.phone = "Невалиден телефонен номер";
        }
        if (!email) {
            _errors.email = "Въведете e-mail";
        } else if (!regex.test(email)) {
            _errors.email = "Невалиден e-mail";
        }
        setErrors({ name: _errors.name, phone: _errors.phone, email: _errors.email });
        return _errors;
    }

    const captchaVerifys = (verify) => {
        if (verify) {
            setExpired(false);
        } else {
            setExpired(true);
        }
    }

    const validateInfo = () => {
        const finalErrors = validate(namess, phoness, emailss);
        return placeOrderHandler(finalErrors);
    };

    const placeOrderHandler = (errors) => {

        if (namess.length > 20) return;
        if (message.length > 250) return;

        if (errors.name !== undefined) return;
        if (errors.phone !== undefined) return;
        if (errors.email !== undefined) return;

        if (value.isSame(sameTime)) return;
        if (value.isSame(sameTime, 'seconds')) return;

        dispatch(
            createOrder({
                name: namess,
                email: emailss,
                phone: phoness,
                service: servicess.id,
                serviceTime: value,
                additionalMessage: message,
            })
        );
    };



    return (
        <>
            <header style={{ display: "flex", color: "#edd8d8", backgroundColor: "#232323" }}>
                <a href="/" style={{ color: "silver", position: "relative", left: "2em" }}>
                    <h1 style={{ textShadow: "c0b4ae6e 4px 4px 4px" }}>ICHI</h1>
                    <h4 style={{ textShadow: "c0b4ae6e 4px 4px 4px" }}>BARBERSHOP</h4>
                </a>
            </header>

            <div className="containercart">
                <div style={{ justifyContent: "space-around" }} className="rowcart">
                    <div style={{ fontSize: "30px" }} className="titlecart">Изберете час за резервация </div>
                </div>
                <div className="form">
                    <div className="cart">
                        <div className="serviceflex">
                            <div>Услуга</div>
                            <div>Цена</div>
                            <div></div>
                        </div>
                        <div id="shopping-cart">
                            <div >Мъжка подстрижка</div>
                            <div>15 лв.</div>
                            <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51b" name="service" value="15" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required defaultChecked />
                            <div >Оформяне на брада</div>
                            <div>10 лв.</div>
                            <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51c" name="service" value="10" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required />
                            <div style={{ whiteSpace: "normal", marginLeft: "1.3em" }}>Подстрижка и оформяне на брада (1 час)
                            </div>
                            <div style={{ alignSelf: "center" }}>25 лв.</div>
                            <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51d" name="service" value="25" onChange={(e) => { setService({ id: e.target.id, price: e.target.value }), setToggleHours(false) }} required />
                            <div>Кралско бръснене</div>
                            <div>15 лв.</div>
                            <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51e" name="service" value="15" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required />
                            <div style={{ whiteSpace: "normal", marginLeft: "1.3em", width: "14em" }}>Подстрижка и оформяне на вежди (1 час)</div>
                            <div>25 лв.</div>
                            <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51f" name="service" value="20" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required />
                            <div >Боядисване</div>
                            <div>15 лв.</div>
                            <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f520" name="service" value="15" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required />
                        </div>
                    </div>
                    <div className="date-picker">
                        <div>
                            <Calendar value={value} onChange={e => {
                                setValue(e);

                                if (!e.isSame(sameTime, "month")) {
                                    setToggleHours(false);
                                } else {
                                    setToggleHours(true);
                                }
                                setSameTime(e);


                            }} />
                        </div>
                        <div>
                            {toggleHours && <CalendarHours value={value} onChange={setValue} selectedService={servicess.id} /> || <div className="chooseday">Изберете ден</div>}
                        </div>
                    </div>
                    <div className="contactinfo">
                        <h2
                            style={{ fontWeight: "100", borderStyle: "solid", borderColor: "silver", height: "2.36em", borderBottom: "none", whiteSpace: "nowrap", borderRadius: "4px" }}>
                            Информация за
                            контакт
                        </h2>

                        <div className="inputrows">

                            <div className="inputs">
                                <span>Име <sup className="text-required">*</sup></span>
                                <input type="text" name="first-name" className="inputform" id="first-name" placeholder="Име" value={namess} onChange={(e) => setName(e.target.value)}
                                    required />
                                <span className="text-required">{errors.name}</span>
                            </div>
                            <div className="inputs">
                                <span>Имейл <sup className="text-required">*</sup></span>
                                <input type="email" name="email" className="inputform" placeholder="Имейл" value={emailss} onChange={(e) => setEmail(e.target.value)} required />
                                <span className="text-required">{errors.email}</span>
                            </div>

                            <div className="inputs">

                                <span>Телефонен номер <sup className="text-required">*</sup></span>

                                <input type="tel" name="phone" className="inputform" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    placeholder="08xxxxxxxx" value={phoness} onChange={(e) => setPhone(e.target.value)} required />
                                <span className="text-required">{errors.phone}</span>
                            </div>

                            <div className="inputs">
                                <textarea className="inputform"
                                    style={{ maxWidth: "263px", marginTop: "-1em", marginBottom: "-2.5em", height: "100px", maxHeight: "100px", minHeight: "100px", minWidth: "263px" }} rows="4"
                                    name="additional_notes" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Допълнително съобщение..."></textarea>
                            </div>

                        </div>
                        <div className="total">
                            <div>Общо:</div>
                            <div id="totalprice">{servicess.price}.00 лв.</div>
                        </div>
                        <div className="finalizationflex">
                            {
                                value === 0 ? null : (
                                    <button disabled={expired} type="submit" onClick={validateInfo} className={`finalizeBtn ${!expired && "submit"}`}>
                                        Направете поръчка
                                    </button>
                                )
                            }
                            <div className="captchadiv">
                                <ReCAPTCHA
                                    sitekey="6LdRbNgiAAAAAJsYj5btKTjqsemwaAAS-rbm-kOW"
                                    onChange={captchaVerifys}
                                    theme="dark"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default cartScreen;