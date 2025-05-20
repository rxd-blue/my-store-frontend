const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let filter = {};

app.post('/api/filter', (req, res) => {
  filter = req.body;
  console.log('فلتر جديد:', filter);
  res.sendStatus(200);
});

app.get('/api/filter', (req, res) => {
  res.json(filter);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`السيرفر شغال على البورت ${PORT}`);
}); 