import React from "react";

const Loading = () => {
    return (
        <div className="loading-container" aria-live="polite">
            <div 
                role="status" 
                className="loading-spinner"
                aria-label="Loading content"
            >
                <span className="loading-text">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;