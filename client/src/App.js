import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import NotFound from "./screens/NotFound";
import OrderScreen from "./screens/OrderScreen";
import Login from "./screens/Login"
import Dashboard from "./screens/Dashboard"
import PrivateRouter from "./PrivateRouter";
import PrivacyPolicy from "./screens/PrivacyScreen";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<HomeScreen />}></Route>
                <Route path="/cart" element={<CartScreen />}></Route>
                <Route path="/order/:id" element={<OrderScreen />}></Route>

                <Route path="/admin/login" element={<Login />}></Route>
                <Route path="/admin/dashboard" element={<PrivateRouter />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/privacy" element={<PrivacyPolicy />}></Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </HashRouter>
    );
};

export default App;