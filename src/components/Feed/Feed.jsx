import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios'
import serverUrl from '../../api';






function Feed(props) {
    const [allPosts, setAllPosts] = useState('')

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("userInfo")).token
        let headers = {
            "Authorization": "Bearer " + token
        }



        async function getPostFromDatabase() {
            let response = await axios.get(`${serverUrl}post`)
            console.log(response)
            setAllPosts(response.data.data.reverse())
        }
        getPostFromDatabase()
    }, [])

    const displayPost = () => {
        if (!allPosts) {
            return <></>
        } else {
            return allPosts.map(post => {
                return (
                    <div key={post._id}>
                        <div>{post.creator.fullName}</div>
                        <div>{post.post}</div>
                    </div>
                )
            })
        }
    }

    return (
        <div>
            <Header />
            <h1>Main Feed</h1>
            {displayPost()}
        </div>
    );
}

export default Feed;