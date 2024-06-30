const Router = require('express');
const router = new Router();
const {upload} = require('../middleware/uploadFile.js');
const tokenMiddleware = require('../middleware/tokenMiddleware.js');
const peopleContoller = require('../controller/peopleContoller.js');
const registrationController = require('../controller/registrationController.js');
const autorizationController = require('../controller/autorizationController.js');
const accountController = require('../controller/accountController.js');

// POST
router.post('/registration', upload.single('file'), registrationController.Controller);
router.post('/authorization', autorizationController.Controller);
router.post('/accountUpdateFile', tokenMiddleware.checkToken, upload.single('file'), accountController.Controller);
router.post('/accountUpdate', tokenMiddleware.checkToken, accountController.Controller);
router.post('/peopleOne', tokenMiddleware.checkToken, peopleContoller.ControllerPeopleCard);

//GET 
router.get('/people', tokenMiddleware.checkToken, peopleContoller.Controller);
router.get('/userInf', tokenMiddleware.checkToken, peopleContoller.ControllerUser);
router.get('/exit', tokenMiddleware.DeleteToken);

module.exports = router;