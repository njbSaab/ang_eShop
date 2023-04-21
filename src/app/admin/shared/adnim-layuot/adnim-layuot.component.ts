import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adnim-layuot',
  templateUrl: './adnim-layuot.component.html',
  styleUrls: ['./adnim-layuot.component.scss']
})
export class AdnimLayuotComponent implements OnInit{
  constructor(
    public auth: AuthService ,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  logout($event: Event): void{
    $event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
