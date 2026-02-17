import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../entities/auth';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Group } from '../entities/group';

export const DEFAULT_NAVIGATE_AFTER_LOGIN = '/extended-users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [
    new User("JanoService", "jano@jano.sk", 1),
    new User("FeroService", "fero@jano.sk"),
  ];
  serverUrl = "http://localhost:8080/";
  private loggedUserSubject = new BehaviorSubject(this.username);
  navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router
  ) { }

  get token(): string {
    return localStorage.getItem('umToken') || '';
  }

  set token(value: string) {
    if (value) {
      localStorage.setItem('umToken', value);
    } else {
      localStorage.removeItem('umToken');
    }
  }

  get username(): string {
    return localStorage.getItem('umUsername') || '';
  }

  set username(value: string) {
    if (value) {
      localStorage.setItem('umUsername', value);
    } else {
      localStorage.removeItem('umUsername');
    }
    this.loggedUserSubject.next(value);
  }

  loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getSynchronousUsers(): User[] {
    return this.users;
  }

  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl + "users").pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser))),
      catchError(err => this.errorHandling(err))
    );
  }

  getExtendedUsers():Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl + "users/" + this.token).pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser))),
      catchError(err => this.errorHandling(err))
    );
  }

  getGroups():Observable<Group[]> {
    return this.http.get<Group[]>(this.serverUrl + "groups").pipe(
      map(jsonGroups => jsonGroups.map(jsonGroup => Group.clone(jsonGroup))),
      catchError(err => this.errorHandling(err))
    );
  }

  getGroup(id: number):Observable<Group> {
    return this.http.get<Group>(this.serverUrl + "group/" + id).pipe(
      map(jsonGroup => Group.clone(jsonGroup)),
      catchError(err => this.errorHandling(err))
    );
  }
  saveGroup(group:Group):Observable<Group> {
    return this.http.post<Group>(this.serverUrl + "groups/" + this.token, group).pipe(
      map(jsonGroup => Group.clone(jsonGroup)),
      catchError(err => this.errorHandling(err))
    );
  }
  saveUser(user: User):Observable<User> {
    return this.http.post<User>(this.serverUrl + "users/" + this.token, user).pipe(
      map(jsonUser => User.clone(jsonUser)),
      catchError(err => this.errorHandling(err))
    );
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(`${this.serverUrl}user/${userId}/${this.token}`).pipe(
      map(() => true),
      catchError(err => this.errorHandling(err))
    )
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + "login", auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.username = auth.name;
        this.messageService.success(`User ${auth.name} logged in successfully`);
        return true;
      }),
      catchError(err => this.errorHandling(err))
    );
  }

  logout(): Observable<void> {
    return this.http.get<void>(this.serverUrl + 'logout/' + this.token).pipe(
      tap(() => {
        this.token = '';
        this.username = '';    
      }),
      catchError(err => this.errorHandling(err))
    );
  }

  errorHandling(err: any):Observable<never> {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.messageService.error("Server not accessible");
        return EMPTY;
      }
      if (err.status >= 400 && err.status < 500) {
        const msg = err.error.errorMessage || JSON.parse(err.error).errorMessage;
        if (msg === "unknown token") {
          this.token = '';
          this.username = ''; 
          this.messageService.error("Session lost, please log in again");
          this.router.navigateByUrl("/login");
          return EMPTY;
        }
        this.messageService.error(msg);
        return EMPTY;
      }
      // status >= 500
      this.messageService.error("Server error, see log for details");
    }
    console.error(err);
    return EMPTY;
  }
}
