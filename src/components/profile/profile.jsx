import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import serverUrl from '../../api';
import axios from 'axios';
import { Form, Button } from "react-bootstrap"

function Profile(props) {
    const [name, setName] = useState('')
    const [post, setPost] = useState('')
    const [userPost, setUserPost] = useState('')

    console.log(post)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("userInfo")).token
        let headers = {
            "Authorization": "Bearer " + token
        }

        async function getInfo() {

            let response = await axios.get(`${serverUrl}users/getinfo`, {
                headers: headers
            })
            setName(response.data.data.fullName)
        }
        getInfo()

        async function getPostFromDatabase() {
            let response = await axios.get(`${serverUrl}post/postFromUser`, {
                headers: headers
            })
            setUserPost(response.data.data.post.reverse())
            console.log(userPost)
        }
        getPostFromDatabase()
    }, [])


    const submitHandler = async (e) => {
        // e.preventDefault()
        const token = JSON.parse(localStorage.getItem("userInfo")).token
        console.log(token)
        const config = {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            }
        }

        const data = await axios.post(
            `${serverUrl}post/createPost`, {
            userInput: post
        }, config);
    }

    const displayPost = () => {
        if (!userPost) {
            return <></>
        } else {
            return userPost.map(post => {
                return (
                    <div key={post._id}>
                        {post.post}
                        {post.date}
                    </div>
                )
            })
        }
    }




    return (
        <div>
            <Header />
            <h1>{name.toUpperCase()}</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Tell us how you feel</Form.Label>
                    <Form.Control
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
        </div >
    );
}

export default Profile;