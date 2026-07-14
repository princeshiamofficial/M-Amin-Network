import http from "http";
import crypto from "crypto";

interface ClientSocket {
  write: (data: Buffer | string) => void;
  destroy: () => void;
  on: (event: string, callback: () => void) => void;
}

const globalForWs = global as unknown as {
  wsServer?: http.Server;
  wsClients?: ClientSocket[];
};

if (!globalForWs.wsClients) {
  globalForWs.wsClients = [];
}

export function initWebSocketServer() {
  if (globalForWs.wsServer) return;

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("M-Amin WS Server\n");
  });

  server.on("upgrade", (req, socket) => {
    const secKey = req.headers["sec-websocket-key"];
    if (!secKey) {
      socket.destroy();
      return;
    }

    const acceptKey = crypto
      .createHash("sha1")
      .update(secKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
      .digest("base64");

    socket.write(
      "HTTP/1.1 101 Switching Protocols\r\n" +
      "Upgrade: websocket\r\n" +
      "Connection: Upgrade\r\n" +
      `Sec-WebSocket-Accept: ${acceptKey}\r\n\r\n`
    );

    const clientSocket = socket as unknown as ClientSocket;
    if (globalForWs.wsClients) {
      globalForWs.wsClients.push(clientSocket);
    }

    socket.on("close", () => {
      if (globalForWs.wsClients) {
        globalForWs.wsClients = globalForWs.wsClients.filter(c => c !== clientSocket);
      }
    });

    socket.on("error", () => {
      if (globalForWs.wsClients) {
        globalForWs.wsClients = globalForWs.wsClients.filter(c => c !== clientSocket);
      }
    });
  });

  server.on("error", (err: unknown) => {
    const error = err as Error & { code?: string };
    if (error.code === "EADDRINUSE") {
      console.log("WS Server: port 3015 is already in use, skipping creation.");
    } else {
      console.error("WS Server error:", error);
    }
  });

  const wsPort = 3015;
  server.listen(wsPort, () => {
    console.log(`WebSocket server started on port ${wsPort}`);
  });

  globalForWs.wsServer = server;
}

export function broadcastMaintenance(data: { 
  isMaintenance?: boolean; 
  maintenanceMessage?: string;
  popupEnabled?: boolean;
  popupImage?: string;
}) {
  try {
    initWebSocketServer();
  } catch (err) {
    console.warn("Could not init WebSocket server:", err);
  }

  const payload = JSON.stringify(data);
  const buf = Buffer.from(payload);
  const len = buf.length;
  let frame: Buffer;

  if (len <= 125) {
    frame = Buffer.alloc(2 + len);
    frame[0] = 0x81;
    frame[1] = len;
    buf.copy(frame, 2);
  } else if (len <= 65535) {
    frame = Buffer.alloc(4 + len);
    frame[0] = 0x81;
    frame[1] = 126;
    frame.writeUInt16BE(len, 2);
    buf.copy(frame, 4);
  } else {
    frame = Buffer.alloc(10 + len);
    frame[0] = 0x81;
    frame[1] = 127;
    frame.writeBigUInt64BE(BigInt(len), 2);
    buf.copy(frame, 10);
  }

  const clients = globalForWs.wsClients || [];
  clients.forEach(socket => {
    try {
      socket.write(frame);
    } catch {
      if (globalForWs.wsClients) {
        globalForWs.wsClients = globalForWs.wsClients.filter(c => c !== socket);
      }
    }
  });
}
