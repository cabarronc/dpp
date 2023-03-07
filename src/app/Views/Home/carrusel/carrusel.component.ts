import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

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
