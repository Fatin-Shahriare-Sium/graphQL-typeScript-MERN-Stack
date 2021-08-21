import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useData } from '../../store'
import Loading from '../loading/loading'
import './search.scss'
import ShowPeople from './show-people'
import ShowSearchPost from './show-search-post'

let SEARCH_USER = gql`

query($text:String){
    searchUser(searchText:$text){
        id
        name
        profilePic
        posts
        profile{
            friends
        }
    }
}


`

let SERACH_POST = gql`

query($searchText:String){
    searchPost(searchText:$searchText){
        _id
        text
        likes
        dislikes
        comments{
            user
        }
        createdAt
        user {
            _id
            name
         
    }
    }
}

`








const Search = () => {
    let { auth } = useData()
    let [bold, setBold] = useState([true, false, false])
    let [searchUser, searchUserResults] = useLazyQuery(SEARCH_USER)
    let [searchPost, searchPostResults] = useLazyQuery(SERACH_POST)
    function handleRadioBox(index: number) {
        let newBold = new Array(3).fill(false)
        newBold[index] = newBold[index] ? false : true


        setBold([...newBold])
    }

    function handleSearch(e: any) {

        if (e.code == 'Enter') {
            if (bold[0]) {
                //all
                searchUser({ variables: { text: e.target.value } })
                searchPost({ variables: { searchText: e.target.value } })
            } else if (bold[1]) {
                //people
                searchUser({ variables: { text: e.target.value } })
            } else if (bold[2]) {
                //posts
                searchPost({ variables: { searchText: e.target.value } })
            }

        }


    }

    function renderPeopleConatinerContent() {
        if (searchUserResults.data.searchUser.length > 0) {
            return searchUserResults.data.searchUser.map((sig: any, index: any) => <ShowPeople key={index} people={sig} />)
        } else {
            return (
                <p>No results found</p>
            )
        }
    }

    useEffect(() => {
        console.log(searchUserResults.data);
        let textx = document.getElementById('text') as HTMLParagraphElement
        let replacex = textx.innerText.replace('Allah', ' <span class="search-text">Allah</span>')
        console.log(replacex);

        textx.innerHTML = replacex
    }, [searchUserResults.data])

    useEffect(() => {
        console.log('searchPostResults.da', searchPostResults);

    }, [searchPostResults.data])

    return (
        <div className='search-wrapper'>
            <div className="search-box">
                <input onKeyPress={(event) => handleSearch(event)} className='search-box__input' type="text" placeholder='search' />
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
                <div className="search-box__results">

                    <div className='search-box__results__people-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                        {searchUserResults.data ? renderPeopleConatinerContent() : <Loading />}
                    </div>
                    <div className='search-box__results__post-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <p id='text'>Allah is Almighty</p>
                        {searchPostResults.data ? searchPostResults.data.searchPost.map((sig: any, index: any) => <ShowSearchPost key={index} searchText={searchPostResults.variables!.searchText} searchedPost={sig} />) : <Loading />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
