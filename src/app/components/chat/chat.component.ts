import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Mensaje } from 'src/app/interface/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  public mensaje: string = '';
  public chats: Mensaje[] = [];
  private elemento: any;

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe((msgs) => {
      this.chats = msgs;
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) {
      return;
    }

    this.chatService
      .agregarMensaje(this.mensaje)
      .then(() => (this.mensaje = ''))
      .catch((err) => console.error('Error al enviar', err));
  }
}
