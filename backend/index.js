const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const scanRouter = require('./routes/scan');
const fixRouter = require('./routes/fix');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/scan', scanRouter);
app.use('/api/fix', fixRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
