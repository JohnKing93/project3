import React from "react";

export function Card({ children }) {
    return (
        <div className="card">
            <div className="card-body">
            {children}
            </div>
        </div>
    );
}