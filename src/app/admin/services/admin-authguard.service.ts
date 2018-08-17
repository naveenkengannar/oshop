import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'shared/services/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Injectable()
export class AdminAuthguard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }

}
