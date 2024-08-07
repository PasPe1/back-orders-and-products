import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class WebSocketGatewayService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private activeTabsCount = 0;

  handleConnection() {
    this.activeTabsCount++;
    this.server.emit('updateActiveTabs', this.activeTabsCount);
  }

  handleDisconnect() {
    if (this.activeTabsCount > 0) {
      this.activeTabsCount--;
    }
    this.server.emit('updateActiveTabs', this.activeTabsCount);
  }

  @SubscribeMessage('tabOpened')
  handleTabOpened(client: Socket, count: number) {
    this.activeTabsCount = count;
    this.server.emit('updateActiveTabs', this.activeTabsCount);
  }

  @SubscribeMessage('tabClosed')
  handleTabClosed() {
    if (this.activeTabsCount > 0) {
      this.activeTabsCount--;
    }
    this.server.emit('updateActiveTabs', this.activeTabsCount);
  }
}
