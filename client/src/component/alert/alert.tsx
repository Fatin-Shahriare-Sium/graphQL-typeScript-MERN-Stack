import React from 'react'

interface alertProps {
    text: string,
    color: string
}

const Alert: React.FC<alertProps> = ({ text, color }) => {
    return (
        <div style={{ padding: "11px 7px" }} className={`alert alert-${color}`} role="alert">
            {text}
        </div>
    )
}

export default Alert;
