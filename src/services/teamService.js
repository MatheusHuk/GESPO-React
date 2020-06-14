import Requests from './requests'

export default class TeamService{

    static verifyStatus(status){
        return (status >= 200 && status < 300);
    }

    static async getAll(){
        return new Promise((resolve, reject) => {
            Requests.get("/teams/all")
                .then(res => {
                    this.verifyStatus(res.status) ? resolve(res) : reject(res.status);
                });
        });
    }
}