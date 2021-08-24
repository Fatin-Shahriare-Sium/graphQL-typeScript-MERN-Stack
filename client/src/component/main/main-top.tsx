import React from 'react'

const MainTop: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className='main-top'>
            <p>{name}</p>
        </div >
    )
}

export default MainTop;
