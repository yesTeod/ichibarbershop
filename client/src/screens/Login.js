import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./../Redux/Actions/UserActions";
import { updateTimes } from "../Redux/Actions/OrderActions"
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";


const Login = ({ history }) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const orderUpdateTimes = useSelector((state) => state.orderUpdateTimes);
    const { success } = orderUpdateTimes;

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            navigate(`/admin/dashboard`);
        }
    }, [userInfo, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateTimes());
        dispatch(login(name, password));
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
            <div>
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1em", marginTop: "4em" }} onSubmit={submitHandler}>
                    {error && <Message variant="alert-danger">{error}</Message>}
                    {loading && <Loading />}
                    <input type="name" class="inputform" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="password" class="inputform" placeholder="Парола" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button style={{ marginTop: "0em", fontSize: "14px" }} type="submit" class="finalizeBtn submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;