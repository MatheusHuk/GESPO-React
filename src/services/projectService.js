import Requests from './requests'

export default class ProjectService{

    static verifyStatus(status){
        return (status >= 200 && status < 300);
    }

    static async getAll(){
        return new Promise((resolve, reject) => {
            Requests.get("/projects")
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }


    static async create(body){
        return new Promise((resolve, reject) => {
            Requests.post("/projects", body)
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
            Requests.put("/projects", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }

    static async getAllByEmployeeId(id){
        let body = { id: id }
        return new Promise((resolve, reject) => {
            Requests.get("/projects/employee", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async addAllocation(body, isParam){
        return new Promise((resolve, reject) => {
            Requests.put("/projects/add-allocation", body, isParam)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async removeAllocation(body){
        return new Promise((resolve, reject) => {
            Requests.delete("/projects/delete-allocation", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }
}