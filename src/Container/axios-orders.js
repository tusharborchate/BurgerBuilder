import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://burgerapp-86cc5.firebaseio.com/'
});

export default instance;