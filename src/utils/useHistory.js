import { useHistory } from 'react-router-dom'

export default class History{

    constructor(){
        this.history = useHistory();
    }

    static push(path){
        console.log("Push: ",path);
        this.history.push(path);
    }

}