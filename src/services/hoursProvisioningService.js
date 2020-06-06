import Requests from './requests'

export default class HoursProvisioningService{

    static verifyStatus(status){
        return (status >= 200 && status < 300);
    }

    static async getAll(){
        return new Promise((resolve, reject) => {
            Requests.get("/provisioning-hours")
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async getAllByEmployeeId(id){
        let body = { id: id }
        return new Promise((resolve, reject) => {
            Requests.get("/provisioning-hours", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async create(body){
        return new Promise((resolve, reject) => {
            Requests.post("/provisioning-hours", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }
}