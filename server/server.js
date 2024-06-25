const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4040;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/save-credential', (req, res) => {
  console.log('Request received');
  const data = req.body;
  const filePath = path.join(__dirname, 'credentials.json');

  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      return res.status(500).json({ message: 'Error writing file' });
    }
    res.status(200).json({ message: 'Credential saved successfully' });
  });
});

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
