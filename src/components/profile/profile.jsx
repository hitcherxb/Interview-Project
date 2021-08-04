import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import serverUrl from '../../api';
import axios from 'axios';

function Profile(props) {
    const [email, setEmail] = useState("")

    useEffect(() => {
        async function getinfo() {
            const token = JSON.parse(localStorage.getItem("userInfo")).token
            let headers = {
                "Authorization": "Bearer " + token
            }
            let response = await axios.get(`${serverUrl}users/getinfo`, {
                headers: headers
            })
            setEmail(response.data.data.email)
        }
        getinfo()
    }, [])




    return (
        <div>
            <Header />
            {email}

        </div>
    );
}

export default Profile;