import React, { useState } from 'react'
import './search.scss'
const Search = () => {
    let [bold, setBold] = useState([true, false, false])
    function handleRadioBox(index: number) {
        let newBold = new Array(3).fill(false)
        newBold[index] = newBold[index] ? false : true


        setBold([...newBold])
    }
    return (
        <div className='search-wrapper'>
            <div className="search-box">
                <input className='search-box__input' type="text" placeholder='search' />
                <div className='search-box__option'>
                    <div onClick={() => handleRadioBox(0)} className='search-box__single-option'>
                        <input type="radio" checked={bold[0]} />
                        <p>All</p>
                    </div>
                    <div onClick={() => handleRadioBox(1)} className='search-box__single-option'>
                        <input type="radio" checked={bold[1]} />
                        <p>People</p>
                    </div>
                    <div onClick={() => handleRadioBox(2)} className='search-box__single-option'>
                        <input type="radio" checked={bold[2]} />
                        <p>Posts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
