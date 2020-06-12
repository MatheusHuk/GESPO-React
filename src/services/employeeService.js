import Requests from './requests'

export default class EmployeeService{

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
}