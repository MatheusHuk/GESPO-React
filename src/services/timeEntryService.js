import Requests from './requests'

export default class TimeEntryService{

    static async getAllByUser(body){
        return new Promise((resolve, reject) => {
            Requests.get("/work-schedules/employee", body)
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