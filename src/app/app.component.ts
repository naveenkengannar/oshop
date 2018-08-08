import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private route: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        route.navigateByUrl(returnUrl);
      }
    });
   }
}
