import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../Redux/Actions/OrderActions";
import LatestOrder from "../components/dashboard/LatestOrder";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import Calendar from "../components/dashboard/calendar/Calendar";
import CalendarHours from "../components/dashboard/calendarhour/CalendarHours";
import { deleteOrder } from "../Redux/Actions/OrderActions";
import { createRemovedDate } from "../Redux/Actions/RemovedDateActions";
import { createOrder } from "../Redux/Actions/OrderActions"


const Dashboard = () => {
    const [value, setValue] = useState(moment.utc());
    const [sameTime, setSameTime] = useState(moment.utc());
    const [toggleHours, setToggleHours] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(undefined);
    const [placeOrder, setPlaceOrder] = useState(false);
    const [namess, setName] = useState("");
    const [servicess, setService] = useState({
        id: "635ffcd2643f25bfc574f51b",
        price: "15",
    });

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const removedDateCreate = useSelector((state) => state.removedDateCreate);
    const { date, success, errorr } = removedDateCreate;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { orderSubmit, orderSuccess, orderError } = orderCreate;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        }
    }, [dispatch, userInfo])

    useEffect(() => {
        if (orderSuccess) {
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [orderSuccess, orderSubmit]);

    const removedDateHandler = (date) => {
        dispatch(
            createRemovedDate({
                removedDate: value,
            })
        );
    };

    const deleteHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const placeOrderHandler = () => {

        if (namess.length > 20) return;

        if (value.isSame(sameTime)) return;
        if (value.isSame(sameTime, 'seconds')) return;
        dispatch(
            createOrder({
                name: namess,
                email: "ichibarbervratsa@gmail.com",
                phone: 0,
                service: servicess.id,
                serviceTime: value,
                additionalMessage: "",
            })
        );
        window.location.reload();
    };

    return (
        <>
            <div className="dashboardh1">DASHBOARD</div>
            <header style={{ display: "flex", color: "silver", backgroundColor: "#232323" }}>
                <a href="/" style={{ position: "relative", left: "2em" }}>
                    <h1 style={{ textShadow: "c0b4ae6e 4px 4px 4px" }}>ICHI</h1>
                    <h4 style={{ textShadow: "c0b4ae6e 4px 4px 4px" }}>BARBERSHOP</h4>
                </a>
            </header>

            <div style={{ marginTop: "3em", width: "-webkit-fill-available", display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap" }}>
                {
                    loading ? <Loading /> : error ? <Message variant="alert-danger">{error}</Message> :
                        (
                            <LatestOrder orders={orders} loading={loading} error={error} />
                        )
                }
            </div>

            <div className="form">
                <div className="dashboardorderdetails">
                    <button style={{ position: "relative", left: "25%" }} className="finalizeBtn submit" onClick={() => setPlaceOrder(true)}>Добави поръчка</button>
                    <div style={{ fontWeight: "600", margin: "1em" }}>Детайли за поръчка
                        <div className="orderdetails">
                            {placeOrder ? (<>
                                <input type="text" name="first-name" className="inputform" id="first-name" placeholder="Име" value={namess} onChange={(e) => setName(e.target.value)} required />
                                <div id="shopping-cart" style={{ marginLeft: "-1.5em", padding: "0em 0em", rowGap: "2.6em" }}>
                                    <div >Мъжка подстрижка</div>
                                    <div>15 лв.</div>
                                    <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51b" name="service" value="15" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required defaultChecked />
                                    <div >Оформяне на брада</div>
                                    <div>10 лв.</div>
                                    <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51c" name="service" value="10" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required />
                                    <div style={{ whiteSpace: "normal" }}>Мъжка подстрижка и оформяне на брада (1 час)
                                    </div>
                                    <div style={{ alignSelf: "center" }}>25 лв.</div>
                                    <input type="radio" className="custom-radio-btn" id="635ffcd2643f25bfc574f51d" name="service" value="25" onChange={(e) => setService({ id: e.target.id, price: e.target.value })} required />
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
                                <button type="submit" onClick={placeOrderHandler} className={`finalizeBtn submit`}>
                                    Потвърди
                                </button>
                            </>)
                                : !selectedOrder ? <div>Изберете зает час</div> : !selectedOrder.service ? <div>Часът няма услуга</div> : (
                                    <>
                                        <div>Име: {selectedOrder.name}</div>
                                        <div>Емайл: {selectedOrder.email}</div>
                                        <div>Тел: 0{selectedOrder.phone}</div>
                                        <div>Услуга: {Object.values(selectedOrder.service.namebg)}</div>
                                        <div>Час: {moment(selectedOrder.serviceTime).clone().subtract(3, 'hour').format('DD-MM HH:mm')}</div>
                                        <div>Приета на: {moment(selectedOrder.createdAt).clone().subtract(3, 'hour').format('DD-MM HH:mm')}</div>
                                        <div>Цена: {Object.values(selectedOrder.service.price.toString())}лв.</div>
                                        <div>Допълнително съобщение: {selectedOrder.additionalMessage}</div>

                                        <button className="finalizeBtn cancel" onClick={() => { deleteHandler(selectedOrder._id); window.location.reload(); }}>Изтрии поръчка</button>
                                    </>
                                )}
                        </div>
                    </div>
                    <button style={{ position: "relative", left: "29%" }} className="finalizeBtn cancel" onClick={() => { removedDateHandler(value); window.location.reload(); }}>Премахни ден</button>
                </div>
                <div className="date-picker">
                    <div>
                        <Calendar value={value} onChange={e => {
                            setValue(e);
                            setPlaceOrder(false);
                            if (!e.isSame(sameTime, "month")) {
                                setToggleHours(false);
                            } else {
                                setToggleHours(true);
                            }
                            setSameTime(e);


                        }} />
                    </div>
                    <div>
                        {toggleHours && <CalendarHours value={value} onChange={e => { setValue(e); setPlaceOrder(false); }} onOrder={setSelectedOrder} selectedService={"635ffcd2643f25bfc574f51b"} props={[loading, error, orders]} /> || <div className="chooseday">Изберете ден</div>}
                    </div>
                </div>
            </div>



        </>
    )
}

export default Dashboard;