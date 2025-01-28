import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import moment from "moment";

const OrderScreen = () => {
    const orderId = useParams();

    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetails(orderId.id));
    }, [dispatch, orderId.id]);

    return (
        <>
            <div>
                {
                    loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) :
                        (
                            <>
                                <div className="orderbox">
                                    <div className="ordersuccess">
                                        <div className="orderconfirmation">
                                            <div className="confirmationbox">CONFIRMATION</div>
                                        </div>
                                        <div className="orderinfo">Благодаря ти <span style={{ fontWeight: "600" }}>{order.name}</span></div>
                                        <div className="orderinfo" style={{ marginLeft: "2.5em", marginRight: "0em" }}>Вашата услуга е потвърдена успешно на {moment(order.createdAt).format("DD/MM/YYYY")} в {moment(order.createdAt).format("H:mm")}.</div>

                                        <div className="outrobox">
                                            <div className="orderoutro">
                                                <div className="outrocolumn">дата на услуга: <span>{moment(order.serviceTime).clone().subtract(3, 'hour').format(`DD/MM/YYYY H:mm`)}</span></div>
                                                <div className="outrocolumn">услуга: <span>{order.service.namebg}</span></div>
                                                <div className="outrocolumn">очаквано време:  <span>{(order.service.name === "haircutbeardtrim") ? "60 минути" : "30 минути"}</span></div>
                                                <div className="outrocolumn">обща стойност: <span>{order.service.price}.00 лв.</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div>
        </>
    )
}

export default OrderScreen;