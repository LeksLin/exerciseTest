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
            console.error(error);
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

        return await axios.get(url, {
            withCredentials: true
        }).catch((e) => {
            console.error(e);
        })
    }

    static async postAccount (data) {
        console.log(data)
        if(data.foto){
            const {foto, ...dataInf} = data;
            const formData = new FormData();
            formData.append('file', foto[0]);
            formData.append('data', JSON.stringify(dataInf));
            const url = `${host}/api/accountUpdateFile`;
            try {
                return await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });
            } catch (error) {
                console.error(error);
            }
        }else{
            const url = `${host}/api/accountUpdate`;
            await axios.post(url, JSON.stringify(data), {
                headers: {
                    "Content-type": "application/json",
                    "charset": "UTF-8"
                },
                withCredentials: true
            })
            .then((response) => {
                
                if(response.status == 200){
                    console.log(response.status)
                    // statusAuth = true;
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
        }
    }
}

