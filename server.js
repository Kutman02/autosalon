import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());

app.get('/api/cars', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'cars.json'); // изменено на __dirname
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка чтения файла' });
    }
    res.send(data); // отправляем содержимое файла как строку
  });
});

app.get('/', (req, res) => {
  res.send('Добро пожаловать в API автосалона!'); // сообщение для корневого маршрута
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
