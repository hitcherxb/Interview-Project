import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios'
import serverUrl from '../../server';
import './feed.css'

function Feed(props) {
    const [allPosts, setAllPosts] = useState('')


    useEffect(() => {

        //Grabbing posts from everyone
        async function getPostFromDatabase() {
            let response = await axios.get(`${serverUrl}post`)
            setAllPosts(response.data.data.reverse())
        }
        getPostFromDatabase()
    }, [])

    //Creating container for post to live in
    const displayPost = () => {
        if (!allPosts) {
            return <></>
        } else {
            return allPosts.map(post => {
                return (
                    <div key={post._id} id='containerBox'>
                        <div id='postBox'>
                            <div id='name'>
                                {post.creator.fullName.toUpperCase()} Posted:
                            </div>
                            <div id='post'>
                                {post.post}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div>
            <Header />
            <h1 id='titleFeed'>Main Feed</h1>
            {displayPost()}
        </div>
    );
}

export default Feed;