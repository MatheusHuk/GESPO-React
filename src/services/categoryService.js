import Requests from './requests'

export default class CategoryService {


    static async getAll(body) {
        return new Promise((resolve, reject) => {
            Requests.get("/categories/all", body)
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
            Requests.post("/categories", body)
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
            Requests.delete("/categories", body)
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