import React from 'react';
import '../App.css';

const TaskLoader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default TaskLoader;
