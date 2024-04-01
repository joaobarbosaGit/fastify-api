import { WebSocketServer } from "adapters";

class ListSocketMessagesUseCase {
    constructor() { }

    async execute(): Promise<void> {
        const webSocket = new WebSocketServer();
        return await webSocket.listSentMessages();
    }
}

export { ListSocketMessagesUseCase };