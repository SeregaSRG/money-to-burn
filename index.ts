import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as http from 'http';
import * as WebSocket from 'ws';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);
  });
});

app.get('/', (_req, res) => {
  res.send('WebSocket API Server is running!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
