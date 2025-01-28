import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="pattern" style={
                {
                    display: "flex",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "100%"
                }}>
                <h1>Page not found.</h1>
                <button className="finalizeBtn submit" style={{ backgroundColor: "edd8d8", marginTop: "1.5em" }}><Link to="/">Home Page</Link></button>
            </div>
        </>
    )
}

export default NotFound;