import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieService:CookieService,private route:ActivatedRoute, private loginServices: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap=>{
      console.log(paramMap);
    }
    )

  }
  logout(): void
  {
    this.loginServices.removeLocalStorage();
    this.cookieService.delete('token_access');
    this.router.navigate(['/login2']);
  }

}
