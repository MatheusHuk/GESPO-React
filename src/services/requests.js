import axios from 'axios';

export default class Requests {

    static buildParams(path, body) {
        path += "?";
        for (let i = 1; i <= body.length; i++) {
            path += body[i - 1][0] + "=" + body[i - 1][1];
            if (i != body.length) path += "&";
        }
        return path;
    }

    static get(path, body) {
        if (body)
            path = process.env.REACT_APP_API_URL + this.buildParams(path, body);
        return axios.get(path, {withCredentials : true})
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