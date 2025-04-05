import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <span className="loader"></span>
        </div>
    );
};

export default Loader;
