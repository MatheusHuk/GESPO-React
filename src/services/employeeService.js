import Requests from './requests'

export default class EmployeeService{

    static async getAll(body){
        return new Promise((resolve, reject) => {
            Requests.get("/user/all", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async getAllByProject(body){
        return new Promise((resolve, reject) => {
            Requests.get("/user/project", body)
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
            Requests.post("/user/registration", body)
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
            Requests.put("/user", body)
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
            Requests.delete("/user", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async distinctProject(body){
        return new Promise((resolve, reject) => {
            Requests.get("/user/distinct-project", body)
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