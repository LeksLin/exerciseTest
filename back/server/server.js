const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./router/router');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname + "/upload")));

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
app.use('/api', router);

// Обработка любых других запросов и отправка index.html как ответа
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});