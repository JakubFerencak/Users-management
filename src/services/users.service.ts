import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../entities/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    new User("JanoService", "jano@jano.sk", 1, new Date()),
    new User("FeroService", "fero@jano.sk"),
    {name: "AnkaService", email: "anka@anka.sk", password: "qwerty"}
  ];
  token: string = '';

  constructor(private http: HttpClient) { }

  getSynchronousUsers(): User[] {
    return this.users;
  }

  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/users").pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser)))
    );
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.post("http://localhost:8080/login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            return of(false);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
