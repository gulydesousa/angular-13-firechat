import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAuth, getAuth} from '@angular/fire/auth';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './services/chat.service';
import { LoginComponent } from './components/login/login.component';

const firebaseConfig = {
  apiKey: 'AIzaSyDMesoTIlb9YtiP1BwL0vylBzY4sCR8rTI',
  authDomain: 'firechat-7c702.firebaseapp.com',
  projectId: 'firechat-7c702',
  storageBucket: 'firechat-7c702.appspot.com',
  messagingSenderId: '614232560587',
  appId: '1:614232560587:web:a11ce5ffb9d789d791dc4e',
};

@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    ChatService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
