import React from 'react';
import '../App.css';

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader">
                <div className="justify-content-center jimu-primary-loading"></div>
            </div>
        </div>
    );
};

export default Loader;
