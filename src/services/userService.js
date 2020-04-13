import Api from './api'

export default class UserService{

    static async login(body){
        return new Promise((resolve, reject) => {
            Api.get("/user/login", body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res.data);
                    }else{
                        reject(res.status);
                    }
                });
        });
    }
}