import fetch from 'node-fetch';
import axios from 'axios';

export default class Api{

    constructor(){
        const api_url = "localhost:8080";
    }

    static buildParams(path, body){
        path += "?";
        for(let i = 1; i <= body.length; i++){
            path += body[i-1][0] + "=" + body[i-1][1];
            if(i != body.length) path += "&";
        }
        return path;
    }

    static get(path, body){
        if(body)
            path = "http://localhost:8080" + this.buildParams(path, body);
        return axios.get(path)
            .then(res => {
                return res;
            })
            .catch(error => {
                return error.response;
            });
    }
}