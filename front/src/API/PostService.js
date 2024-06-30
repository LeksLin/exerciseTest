import axios from 'axios';
import {host, cookieToken} from '../store/saveElement';

export  default class PostService{
    static async postRegistration ({foto, ...dataInf}) {
        let check = true;
        const formData = new FormData();
        formData.append('file', foto[0]);
        formData.append('data', JSON.stringify(dataInf));
        const url = `${host}/api/registration`;
        
        await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then((result) => {
            console.log()
            if(result.status == 200){
                check = false;
            }
        }).catch((error) => {
            check = error.response.data;
        })
        return check;
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
            if(error.response.status == 401){
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

    static async postPeopleOne (id) {
        const url = `${host}/api/peopleOne`;

        return await axios.post(url, JSON.stringify({id}), {
            headers: {
                "Content-type": "application/json",
                "charset": "UTF-8"
            },
            withCredentials: true
        })
        .catch((error) => {
            if(error.status == 401){
                alert("Неверный Email или пароль");
            }else{
                console.error('Ошибка:', error);
            }   
            
        });
    }

    static async getUser () {
        const url = `${host}/api/userInf`;

        return await axios.get(url, {
            withCredentials: true
        }).catch((e) => {
            console.error(e);
        })
    }

    static async postAccount (data) {
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
                },
                withCredentials: true
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

    static async getExit () {
        const url = `${host}/api/exit`;

        return await axios.get(url, {
            headers: {
                "Content-type": "application/json",
                "charset": "UTF-8"
            },
            withCredentials: true
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
    }
}

