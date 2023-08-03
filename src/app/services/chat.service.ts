import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //Para login con Google + Github
  reauthenticateWithCredential ,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';

import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
} from '@angular/fire/firestore';

import { Observable, map, single } from 'rxjs';

import { Mensaje } from '../interface/mensaje.interface';
import { Usuario } from '../interface/usuario.interface';
import { browserSessionPersistence, getAuth, setPersistence, signOut } from 'firebase/auth';

@Injectable()
export class ChatService {
  public usuario: Usuario = { nombre: '', uid: '' };

  constructor(private firestore: Firestore, private auth: Auth) {
   
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.usuario.nombre = user.displayName ?? user.email ?? '';
        this.usuario.uid = user.uid;
      } else {
        this.usuario = { nombre: '', uid: '' };
      }
    })
  }

  cargarMensajes(): Observable<Mensaje[]> {
    const chatCollection = query(
      collection(this.firestore, 'chats'),
      orderBy('fecha', 'desc'),
      limit(5)
    );

    const mensajes$: Observable<Mensaje[]> = collectionData(chatCollection, {
      idField: 'id',
    }) as Observable<Mensaje[]>;
    //Revertir el array original
    return mensajes$.pipe(map((mensajes) => mensajes.reverse()));
  }

  agregarMensaje(texto: string) {
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    //Agregamos un nuevo elemento al arreglo de chats
    const chatCollection = collection(this.firestore, 'chats');
    return addDoc(chatCollection, mensaje);
  }

  //Autenticación por formulario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.usuario = { nombre: '', uid: '' };

    const a = getAuth();
    return this.auth.signOut().finally(() => {console.log('Sesión cerrada', this.auth.currentUser);}) ;
  }

  //Autenticación con Google
  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());  
    
  }

  loginGithub() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }
}
