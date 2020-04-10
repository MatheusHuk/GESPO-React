import Api from './api'

export default class UserService{

    static async login(path, body){
        return new Promise((resolve, reject) => {
            Api.get(path, body)
                .then(res => {
                    if(res.status >= 200 && res.status < 300){
                        resolve(res.data);
                    }else{
                        reject(res);
                    }
                });
        });
    }
}