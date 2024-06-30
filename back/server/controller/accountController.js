const hashedPassword = require('../middleware/hashPassword');
// const tokenMiddleware = require('../middleware/tokenMiddleware');
const mongodb = require('../query/mongodb');
const fs = require('fs');
const path = require('path');

module.exports.Controller = async (req, res) => {
    let data = {};
    try{
        if(req.file){
            const resultFile = await mongodb.accountFotoCheck(req.cookies.rt);
            console.log(path.join(__dirname, '..', "/upload", resultFile))
            fs.unlink(path.join(__dirname, '..', "/upload", resultFile), (err) => {
                console.log(err ? "Ошибка приудалении" + err : "Файл успешно удален")
            });
            data = JSON.parse(req.body.data);
            data.personalFotoName = req.file.filename;
        }else{
            data = req.body;
        }
        console.log(data)
        if(data.password)data.password = await hashedPassword.hashPassword(data.password);
        const result = await mongodb.accountUpdate(req.cookies.rt, data);
        res.status(200).send();
    }catch(e){
        res.status(400).send();
    }
    
    
}