import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

// Confirm DB connection is loaded
void db;

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});

export default app;
