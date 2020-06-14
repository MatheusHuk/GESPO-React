import Requests from './requests'

export default class CostCenterRegisterService {

    static verifyStatus(status) {
        return (status >= 200 && status < 300);
    }

    static async writeNewDados(body) {
        return new Promise((resolve, reject) => {
            Requests.post("/cost-centers", body)
            .then(res => {
                this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
            });
        });
    }

    static async filterEntries(body) {
        return new Promise((resolve, reject) => {
            Requests.get("/", body)
            .then(res => {
                this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
            })
        })
    }
}