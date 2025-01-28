import React, { useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";

const LatestOrder = (props) => {
    const { loading, error, orders } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const ordersPerPage = 7;
    const filteredOrders = orders.filter(order => !order.isFinished && order.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const sortedOrders = filteredOrders.sort((a, b) => new Date(a.serviceTime) - new Date(b.serviceTime));
    const currentOrders = sortedOrders.slice(currentPage * ordersPerPage, (currentPage + 1) * ordersPerPage);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <>
            <div style={{ fontSize: "small", marginBottom: "1em" }}>Нови поръчки: {currentPage + 1}/{totalPages}</div>
            <div>
                <input type="text" placeholder="Име" value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="latestorders">
                <div>Име</div>
                <div>Дата на час</div>
                <div>Цена</div>
                <div>Допълнително съобщение</div>
                <div>Тел. Номер</div>
            </div>
            {loading ? <Loading /> : error ? <Message variant="alert-danger">{error}</Message> :
                (
                    <div>
                        {currentOrders.map((order) => (
                            <div key={order._id} className="latestorders">
                                <div>{order.name}</div>
                                <div>{moment(order.serviceTime).clone().subtract(2, 'hour').format('DD-MM HH:mm')}</div>
                                <div>{order.service.price}</div>
                                <div>{order.additionalMessage}</div>
                                <div>0{order.phone}</div>
                            </div>
                        ))}
                    </div>
                )
            }
            <div className="carousel-nav">
                <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
                <button disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
            </div>
        </>
    );
}

export default LatestOrder;