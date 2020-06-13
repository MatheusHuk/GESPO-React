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

    static async getAllByEmployeeId(id){
        let body = { id: id }
        return new Promise((resolve, reject) => {
            Requests.get("/projects/employee", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async addAllocation(body){
        return new Promise((resolve, reject) => {
            Requests.put("/projects/add-allocation", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async removeAllocation(body){
        return new Promise((resolve, reject) => {
            Requests.delete("/projects/add-allocation", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }
}