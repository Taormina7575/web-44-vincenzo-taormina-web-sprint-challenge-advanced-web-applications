import axios from 'axios';

const axiosWithAuth = ()=> {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            authorization: token
        }
    });
}

export default axiosWithAuth;

//Task List:
//Build and export a function used to send in our authorization token