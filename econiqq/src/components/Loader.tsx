import React from "react";

const Loader = () => {
    return (
    <div className="card">
        <div className="loader">
            <p>loading</p>
            <div className="words">
            <span className="word">CITIES</span>
            <span className="word">COUNTRIES</span>
            <span className="word">PLACES</span>
            <span className="word">PRICES</span>
            <span className="word">LANGUAGES</span>
            </div>
        </div>
    </div>
    )
}

export default Loader;