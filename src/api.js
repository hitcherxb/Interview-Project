import axios from 'axios'

console.log(process.env)
//Where your server/backend lives
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:4000/api`

const createHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
}

const actions = {

    getUser: async () => {
        return await axios.get(`${serverUrl}/get-user`, createHeaders())
    },

    postFeed: async ({ description, user, currentList }) => {
        return await axios.post(`${serverUrl}/feed`, { description, user, currentList }, createHeaders())
    },

    postBucketList: async ({ button, item, user }) => {
        return await axios.post(`${serverUrl}/bucketList`, { button, item, user }, createHeaders())
    },

    logIn: async ({ user, pass }) => {
        let res = await axios.post(`${serverUrl}/login`, { user, pass })
        localStorage.setItem('token', res.data.token)
        return res.data
    },

    signUp: async ({ user, pass }) => {
        let res = await axios.post(`${serverUrl}/signUp`, { user, pass })
        localStorage.setItem('token', res.data.token)
        console.log(res)
        return res.data
    }
}

export default actions