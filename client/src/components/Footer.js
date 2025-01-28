import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="footero">
                <div className="footerdiv">ICHI BARBERSHOP 2023 | <Link to="/privacy">Privacy Policy</Link></div>
            </div>
        </>
    )
}

export default Footer;