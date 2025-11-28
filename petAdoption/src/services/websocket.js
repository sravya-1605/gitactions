import SockJS from 'sockjs-client';
import { Stomp } from 'stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
  }

  connect() {
    if (this.connected) return;

    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, () => {
      this.connected = true;
      console.log('Connected to WebSocket');
    }, (error) => {
      console.error('WebSocket connection error:', error);
      this.connected = false;
    });
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.disconnect();
      this.connected = false;
      console.log('Disconnected from WebSocket');
    }
  }

  subscribeToChat(callback) {
    if (this.stompClient && this.connected) {
      this.stompClient.subscribe('/topic/public', callback);
    }
  }

  subscribeToNotifications(callback) {
    if (this.stompClient && this.connected) {
      this.stompClient.subscribe('/topic/notifications', callback);
    }
  }

  sendMessage(message) {
    if (this.stompClient && this.connected) {
      this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
    }
  }

  addUser(userData) {
    if (this.stompClient && this.connected) {
      this.stompClient.send('/app/chat.addUser', {}, JSON.stringify(userData));
    }
  }

  sendAdoptionNotification(notification) {
    if (this.stompClient && this.connected) {
      this.stompClient.send('/app/adoption.notification', {}, JSON.stringify(notification));
    }
  }
}

export default new WebSocketService();
