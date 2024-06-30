const mongodb = require('../query/mongodb');
const hashedPassword = require('../middleware/hashPassword');


module.exports.Controller = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Файл не загружен');
    }
    
    const data = JSON.parse(req.body.data);

    if(!(await mongodb.authorization(data.email)).length){
        data.personalFotoName = req.file.filename;
        data.password = await hashedPassword.hashPassword(data.password);
        data.refreshToken = "";
        mongodb.registration(data);
        res.status(200).send();
    }else{
        return res.status(400).json({message: 'Пользователь с таким email уже существует!'})
    }
}