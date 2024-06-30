const jwt = require('jsonwebtoken');
const mongodb = require('../query/mongodb');

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecret';
const refreshTokens = [];

module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1] // Bearer jskdnfjonsdjonfonsd
        if(!token){
            return res.status(401).json({massage: 'Не авторизован'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch (e){
        res.status(401).json({massage: 'Не авторизован'});
    }




    const { token } = req.body;
    if (!token) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '1h' });
        res.json({
            accessToken
        });
    });
}

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

module.exports = {
    generationAccessToken,
    generationRefreshToken,
    checkToken
}