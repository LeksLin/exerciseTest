const hashedPassword = require('../middleware/hashPassword');
const tokenMiddleware = require('../middleware/tokenMiddleware');
const mongodb = require('../query/mongodb');


module.exports.Controller = async (req, res) => {
    const {email, password} = req.body;
    const result = await mongodb.authorization(email);
    if(result.length){
        const isMatch = await hashedPassword.comparePasswords(password, result[0].password);
        if(isMatch){
            const user = { email }; // Полезная нагрузка токена

            const accessToken = tokenMiddleware.generationAccessToken(user);
            const refreshToken = tokenMiddleware.generationRefreshToken(user);


            mongodb.saveRefreshToken(email, refreshToken);

            res.status(200).cookie('at', accessToken, {
                httpOnly: true,
                secure: true, // Устанавливайте secure=true в production
                sameSite: 'strict', // SameSite защита от CSRF
                maxAge: 60 * 60 * 1000
            }).cookie('rt', refreshToken, {
                httpOnly: true,
                secure: true, // Устанавливайте secure=true в production
                sameSite: 'strict', // SameSite защита от CSRF
                maxAge: 10 * 24 * 60 * 60 * 1000
            }).send();
        }else{
            res.status(401).json({
                auth: false,
                messageError: "Неправильный логин или пароль"
            })
        }
    }else{
        res.status(401).json({
            auth: false,
            messageError: "Неправильный логин или пароль"
        })
    }
    
  }