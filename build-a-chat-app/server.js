import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {

  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading page");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  const username = new URL(req.url, "http://localhost").searchParams.get("username");
  
  console.log(`Client connected: ${username}`);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const msg = { "type": "system", "text": `${username} joined` };
            client.send(JSON.stringify(msg));
        }
    });

  socket.on("message", (data) => {
    const { username, text } =  JSON.parse(data);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const msg = { type: 'chat', username, text };
            client.send(JSON.stringify(msg));
        }
    });
  });

  socket.on("close", () => {
    console.log(`Client disconnected: ${username}`);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const msg = { type: 'system', text: `${username} left` };
            client.send(JSON.stringify(msg));
        }
    });
  });
});


server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`);
});