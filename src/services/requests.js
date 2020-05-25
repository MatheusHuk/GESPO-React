import axios from 'axios';

export default class Requests {

    static buildParams(path, body) {
        path += "?";
        let keys = Object.keys(body);
        let values = Object.values(body);
        for (let i = 0; i < keys.length; i++) {
            path += keys[i] + "=" + values[i];
            if (i+1 != keys.length) path += "&";
        }
        return path;
    }

    static get(path, body) {
        path = (body ? this.buildParams(path, body) : path);
        return axios.get(process.env.REACT_APP_API_URL + path, {withCredentials : true})
            .then(res => {
                return res;
            })
            .catch(error => {
                return error.response ? error.response : { status: 500 };
            });
    }

    static post(path, body) {
        return axios.post((process.env.REACT_APP_API_URL + path), body, {withCredentials : true})
            .then(res => {
                return res
            })
            .catch(error => {
                return error.response ? error.response : { status: 500 };
            });
    }

}