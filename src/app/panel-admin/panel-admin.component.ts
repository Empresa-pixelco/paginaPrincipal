import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent {
 constructor(private router: Router){}


  crear() {
      this.router.navigate(['turnos'])
  }
  ver(){

  }
  eliminar(){
    this.router.navigate(['eliminarturno'])
  }
  eliminarcita(){
    this.router.navigate(['eliminarcita'])

  }
}
