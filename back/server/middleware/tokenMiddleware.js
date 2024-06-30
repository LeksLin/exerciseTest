const jwt = require('jsonwebtoken');
const mongodb = require('../query/mongodb');

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecret';

const checkValidity = (token, secret) => {
    let resultCheck = false;
    if(token){
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              // Обработка ошибки
              if (err.name === 'TokenExpiredError') {
                console.log('Token has expired');
              } else if (err.name === 'JsonWebTokenError') {
                console.log('Invalid token');
              } else {
                console.log('Token verification failed:', err.message);
              }
            } else {
              // Токен валиден
              resultCheck = true;
            }
          });
    }
    return resultCheck;
}

const checkToken = async (req, res, next) => {
    if(checkValidity(req.cookies.at, accessTokenSecret) && checkValidity(req.cookies.rt, refreshTokenSecret)){
        next();
    }else{
        if(checkValidity(req.cookies.rt, refreshTokenSecret)){
            const user = await mongodb.chackRefreshToken(req.cookies.rt);
            const accessToken = generationAccessToken({user});
            res.cookie('at', accessToken, {
                httpOnly: true,
                secure: true, // Устанавливайте secure=true в production
                sameSite: 'strict', // SameSite защита от CSRF
                maxAge: 60 * 60 * 1000
            })
            next();
        }else{
            return res.status(401).json({massage: 'Не авторизован'});
        }
    }
}

const generationAccessToken = (user) =>{
    const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '1h' });
    return accessToken;
}
const generationRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: '10d' });
    return refreshToken;
}

const DeleteToken = async (req, res) => {
    console.log(1)
    if(checkValidity(req.cookies.at, accessTokenSecret)){
        res.clearCookie('at', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
    }
    if(checkValidity(req.cookies.rt, refreshTokenSecret)){
        res.clearCookie('rt', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        await mongodb.delteRefreshToken(req.cookies.rt);
    }
    res.status(200).send();
}

module.exports = {
    generationAccessToken,
    generationRefreshToken,
    checkToken,
    DeleteToken
}