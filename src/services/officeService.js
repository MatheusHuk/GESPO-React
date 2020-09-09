import Requests from './requests'

export default class OfficeService {


    static async getAll(body) {
        return new Promise((resolve, reject) => {
            Requests.get("/office/all", body)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        resolve(res);
                    } else {
                        reject(res.status);
                    }
                });
        });
    }

    static async create(body) {
        return new Promise((resolve, reject) => {
            Requests.post("/office", body)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        resolve(res);
                    } else {
                        reject(res.status);
                    }
                });
        });
    }

    static async delete(body){
        return new Promise((resolve, reject) => {
            Requests.delete("/office", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async getAllP(body) {
        return new Promise((resolve, reject) => {
            Requests.get("/office/permissions", body)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        resolve(res);
                    } else {
                        reject(res.status);
                    }
                });
        });
    }
}