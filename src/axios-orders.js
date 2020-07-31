import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-14c4e.firebaseio.com/'
});

export default instance;