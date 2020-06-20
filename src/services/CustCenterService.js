import Requests from './requests'

export default class CostCenterRegisterService {

    static async getAll(body){
        return new Promise((resolve, reject) => {
            Requests.get("/cost-centers/all", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async create(body){
        return new Promise((resolve, reject) => {
            Requests.post("/cost-centers", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async update(body){
        return new Promise((resolve, reject) => {
            Requests.put("/cost-centers", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async delete(body){
        return new Promise((resolve, reject) => {
            Requests.delete("/cost-centers", body)
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