import React from 'react'

const MainNavbar = () => {
    return (
        <div className='main-navbar'>
            <p>Social App</p>
            <div className='main-navbar__searchBox'>
                <input type="text" placeholder='search posts' />
            </div>
            <div className='main-navbar__btnContainer'>
                <button>Login</button>
                <button>Signup</button>
            </div>
        </div>
    )
}

export default MainNavbar;
