import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import serverUrl from '../../server';
import axios from 'axios';
import { Form, Button } from "react-bootstrap"
import './profile.css'

function Profile(props) {
    const [name, setName] = useState('')
    const [post, setPost] = useState('')
    const [userPost, setUserPost] = useState('')

    //Connecting to backend
    useEffect(() => {
        //Grabbing token and finding it with JWT
        const token = JSON.parse(localStorage.getItem("userInfo")).token
        let headers = {
            "Authorization": "Bearer " + token
        }

        //Grabbing the name of the user
        async function getInfo() {

            let response = await axios.get(`${serverUrl}users/getinfo`, {
                headers: headers
            })
            setName(response.data.data.fullName)
        }
        getInfo()

        //Grabbing post from user
        async function getPostFromDatabase() {
            let response = await axios.get(`${serverUrl}post/postFromUser`, {
                headers: headers
            })
            setUserPost(response.data.data.post.reverse())
        }
        getPostFromDatabase()
    }, [])


    const submitHandler = async (e) => {
        //Grabbing token and finding it with JWT
        const token = JSON.parse(localStorage.getItem("userInfo")).token
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            }
        }

        //Submitting post to backend
        await axios.post(
            `${serverUrl}post/createPost`, {
            userInput: post
        }, config);
    }

    //Creating container for post to live in
    const displayPost = () => {
        if (!userPost) {
            return <></>
        } else {
            return userPost.map(post => {
                return (
                    <div key={post._id} className='container'>
                        <div className='postBox'>
                            <div id='name'>
                                {name.toUpperCase()} Posted:
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
            <div id='body'>
                <h1 id='user'>{name.toUpperCase()}'s Profile</h1>
                <Form onSubmit={submitHandler} >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Tell us how you feel</Form.Label>
                        <Form.Control
                            id='inputField'
                            as="textarea"
                            rows={1}
                            value={post}
                            placeholder='Tell us how you feel'
                            onChange={(e) => setPost(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
                {displayPost()}
            </div>
        </div >
    );
}

export default Profile;