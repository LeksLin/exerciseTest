import axios from 'axios';
import {host, cookieToken} from '../store/saveElement';

export  default class PostService{
    static async postRegistration ({foto, ...dataInf}) {
        const formData = new FormData();
        formData.append('file', foto[0]);
        formData.append('data', JSON.stringify(dataInf));
        const url = `${host}/api/registration`;
        try {
            return await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    static async postAuthorization (dataInf) {
        let statusAuth = false;
        const url = `${host}/api/authorization`;
        await axios.post(url, JSON.stringify(dataInf), {
            headers: {
                "Content-type": "application/json",
                "charset": "UTF-8"
            },
            withCredentials: true
        })
        .then((response) => {
            
            if(response.status == 200){
                console.log(response.status)
                statusAuth = true;
            }
        })
        .catch((error) => {
            if(error.status == 401){
                alert("Неверный Email или пароль");
            }else{
                console.error('Ошибка:', error);
            }   
            
        });
        return statusAuth;
    }

    static async postPeople () {
        const url = `${host}/api/people`;
        await axios.get(url, {
            withCredentials: true
        })
        .then((result) => {
            console.log(result)
        })
    }
}

