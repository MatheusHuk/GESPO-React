import Requests from './requests'

export default class ProjectService{

    static verifyStatus(status){
        return (status >= 200 && status < 300);
    }

    static async getAll(body){
        return new Promise((resolve, reject) => {
            Requests.get("/projects/all", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async getAllByEmployeeId(id){
        let body = [["id", id]]
        return new Promise((resolve, reject) => {
            Requests.get("/projects/employee", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }
}