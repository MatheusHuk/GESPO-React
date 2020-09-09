import Requests from './requests'

export default class PermissionService {


    static async getAll(body) {
        return new Promise((resolve, reject) => {
            Requests.get("/permissions/all", body)
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
            Requests.post("/permissions", body)
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
            Requests.delete("/permissions", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }
}