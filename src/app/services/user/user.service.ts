import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Entity/UserEntity';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private userSubject: BehaviorSubject<User| null>;
    public user: Observable<User|null>;


    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      
       //Mettre l'objet en réserve
       //l'objet utilisateur de localStorage qui permet à l'utilisateur de rester connecté entre les actualisations de page ou après la fermeture du navigateur.
        this.userSubject = new BehaviorSubject<User| null>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }
     
    public get CurrentUserValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
      return this.http.get<User>(`http://localhost:8080/user/login/${email}/${password}`)
        .pipe(map(user => {
          console.log(user);
            // stocker les détails de l'utilisateur et le jeton jwt dans le stockage local pour que l'utilisateur reste connecté entre les actualisations de la page
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }

    logout() {
        // supprimer l'utilisateur du stockage local pour déconnecter l'utilisateur
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }
  
  getById(id: number) {
    return this.http.get<User>(`http://localhost:8080/${id}`);
  }

  getAll() {
    return this.http.get<User[]>(`http://localhost:8080/users`);
}
}