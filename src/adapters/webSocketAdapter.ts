import WebSocket, { Server } from 'ws';

export interface MessageObject {
  message: string;
  data: Record<string, any>; // Pode ser qualquer tipo de dados JSON
}

export class WebSocketServer {
  private static wsServer: Server | null = null; // Alterado para ser estático para garantir que a conexão seja compartilhada entre instâncias da classe

  constructor() {
    // Garante que a conexão seja criada apenas uma vez
    if (!WebSocketServer.wsServer) {
      WebSocketServer.createConnection();
    }
  }

  // Função para criar e retornar uma conexão do WebSocket
  private static createConnection(): Server {
    // Se a conexão já estiver inicializada, retorna ela mesma
    if (WebSocketServer.wsServer) {
      return WebSocketServer.wsServer;
    }

    WebSocketServer.wsServer = new WebSocket.Server({ port: 8080 });
    return WebSocketServer.wsServer;
  }

  // Função para obter a conexão existente
  getConnection(): Server {
    if (!WebSocketServer.wsServer) {
      throw new Error('WebSocket connection not initialized');
    }
    return WebSocketServer.wsServer;
  }

  // Função não assíncrona para enviar uma mensagem no WebSocket
  sendMessage(messageObject: MessageObject): void {
    const server = WebSocketServer.createConnection(); // Obtém a conexão existente
    server.on('connection', (ws: WebSocket) => {
      console.log('connected');

      ws.on('message', (receivedMessage: string) => {
        console.log(`Received message: ${receivedMessage}`);
        ws.send(`Server received your message: ${receivedMessage}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });

      // Envio do objeto como mensagem
      ws.send(JSON.stringify(messageObject));
    });
  }

  // Função assíncrona para escutar mensagens
  async listSentMessages(): Promise<void> {
    const client = new WebSocket('ws://localhost:8080');

    client.on('open', () => {
      console.log('Connected to WebSocket server');

      client.on('message', (message: string) => {
        try {
          const messageObject: MessageObject = JSON.parse(message);
          console.log('Received message:', messageObject);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      client.on('close', () => {
        console.log('Disconnected from WebSocket server');
      });
    });

    client.on('error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  // Função para finalizar a conexão
  closeConnection(): void {
    if (WebSocketServer.wsServer) {
      WebSocketServer.wsServer.close(() => {
        console.log('WebSocket connection closed');
      });
    } else {
      console.log('WebSocket connection not initialized');
    }
  }
}