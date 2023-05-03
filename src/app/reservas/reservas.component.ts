import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.authService.staff().then((data)=>{
      console.log(data)
    })
  }


  continuar() {
    this.router.navigate(['horarios-veterinarios']);

  }
}
