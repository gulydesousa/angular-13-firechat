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
   
    switch (proveedor) {
      case "google":
      this.chatService
        .loginGoogle()
        .then((data) => {
          console.log(this.chatService.usuario);
        })
        .catch((error) => {
          console.log(error);
        });
        break;
      case "facebook":
        this.chatService
        .loginFacebook()
        .then((data) => {
          console.log(this.chatService.usuario);
        })
        .catch((error) => {
          console.log(error);
        });
        break;
     default:
      this.chatService
        .loginGithub()
        .then((data) => {
          console.log(this.chatService.usuario);
        })
        .catch((error) => {
          console.log(error);
        });
        break;

     }
    }
}
