const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongodb = require('./query/mongodb');
const cookieParser = require('cookie-parser');
const path = require('path');
const tokenMiddleware = require('./middleware/tokenMiddleware.js')

const autorizationController = require('./controller/autorizationController.js');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Разрешить передачу учётных данных
  if (req.method === 'OPTIONS') {
      res.sendStatus(200); // Ответ на OPTIONS запросы
  } else {
      next(); // Продолжить обработку других запросов
  }
});

// Сервирование статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/upload/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/api/registration', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const data = JSON.parse(req.body.data);

  data.personalFotoName = req.file.filename;

  console.log(data)
  mongodb.registration(data);

  res.send({ message: 'File uploaded successfully', file: req.file });
});

app.post('/api/authorization', autorizationController.Controller);

app.get('/api/people', tokenMiddleware.checkToken);

app.post('/token', (req, res) => {
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
});

// Обработка любых других запросов и отправка index.html как ответа
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// mongodb.start();

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});