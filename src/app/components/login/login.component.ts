import { Component } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent {

  constructor(private chatService: ChatService) {}


  
  login(proveedor: string) {
    if (proveedor === "google") {
      this.chatService
        .loginGoogle()
        .then((data) => {
          console.log(this.chatService.usuario);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      
      this.chatService
        .loginGithub()
        .then((data) => {
       
          console.log(this.chatService.usuario);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
