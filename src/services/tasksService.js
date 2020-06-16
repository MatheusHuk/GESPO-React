import Requests from './requests'

export default class TasksService{

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

    static async getAllByProjectId(body){
        return new Promise((resolve, reject) => {
            Requests.get("/tasks/project", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async create(body){
        return new Promise((resolve, reject) => {
            Requests.post("/tasks", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async update(body){
        return new Promise((resolve, reject) => {
            Requests.put("/tasks", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }

    static async delete(body){
        return new Promise((resolve, reject) => {
            Requests.delete("/tasks", body)
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }
}