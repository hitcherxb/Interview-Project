
//Where your server/backend lives
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:4000/api/`



export default serverUrl