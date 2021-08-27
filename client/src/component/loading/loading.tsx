import React from 'react'

const Loading: React.FC<{ refx?: any }> = ({ refx }) => {
    return (
        <div ref={refx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;
