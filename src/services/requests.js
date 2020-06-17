import axios from 'axios';

export default class Requests {

    static buildParams(path, body) {
        path += "?";
        let keys = Object.keys(body);
        let values = Object.values(body);
        for (let i = 0; i < keys.length; i++) {
            if(values[i] == null) continue
            if (i > 0) path += "&";
            path += keys[i] + "=" + values[i];
        }
        return path;
    }

    static get(path, body) {
        path = body ? this.buildParams(path, body) : path;
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

    static put(path, body, isParam) {
        path = body && isParam ? this.buildParams(path, body) : path;
        console.log("PUT BODY: ",body)
        return axios.put((process.env.REACT_APP_API_URL + path), body, {withCredentials : true})
            .then(res => {
                return res
            })
            .catch(error => {
                return error.response ? error.response : { status: 500 };
            });
    }

    static patch(path, body) {
        return axios.patch((process.env.REACT_APP_API_URL + path), body, {withCredentials : true})
            .then(res => {
                return res
            })
            .catch(error => {
                return error.response ? error.response : { status: 500 };
            })
    }

    static delete(path, body) {
        path = body ? this.buildParams(path, body) : path;
        return axios.delete((process.env.REACT_APP_API_URL + path), {withCredentials : true})
            .then(res => {
                return res
            })
            .catch(error => {
                return error.response ? error.response : { status: 500 };
            })
    }

}