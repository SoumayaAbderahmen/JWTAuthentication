import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  user = new User();

  err:number = 0;


  constructor(private authService : AuthService,
               private router: Router) { }

  ngOnInit(): void {
  }
  onLoggedin() {
    this.authService.login(this.user).subscribe((data)=> {
      console.log(data);
      let jwToken = data.headers.get('Authorization');
      console.log(jwToken);
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
      },(err)=>{ this.err = 1;
      });
  }
}
