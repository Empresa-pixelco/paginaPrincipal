import { Component } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-eliminarcitacalendary',
  templateUrl: './eliminarcitacalendary.component.html',
  styleUrls: ['./eliminarcitacalendary.component.scss']
})
export class EliminarcitacalendaryComponent {
  iVet: string | any;
  filteredCitas: any
  horaCita: any | any
  servicioCita: any | any
  veterinario: any | any
  paciente: any | any
  mesEnEspanol: any | any;
  mes: string | any;
  dia: string | any;

  diaParse: string | any;
  dataCita: any | any;
  diaSelecter: any | any;
  fechaSeleccionada: any | undefined;
  idCitaSeleccionada: any
  constructor(private router: Router, private authService: AuthService,  private dataStorageService: StorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( async params => {
      this.iVet = params['idSelected'];
      console.log('Código de categoría recibido:', this.iVet);

      const data: any = await this.authService.citas(this.iVet);
      this.dataCita = data.data
      console.log(this.dataCita)
    })
  }

  datosCita() {
    this.filteredCitas = this.dataCita.filter((cita: any) => {
      const fechaCita = cita.fecha;
      const partesFecha = fechaCita.split("-");
      const año = parseInt(partesFecha[0], 10);
      this.mes = partesFecha[1];
      this.dia = parseInt(partesFecha[2], 10);

      const fecha = new Date(this.fechaSeleccionada);
      moment.locale('es');
      this.mesEnEspanol = moment(fecha).format('MMMM').toUpperCase();
      this.diaSelecter = fecha.getDate();

      return this.dia === this.diaSelecter && this.mes === this.mesEnEspanol;
    });

 }


  filtrarCitas() {
    // Implementa el código para filtrar las citas por la fecha seleccionada
  }
  volver() {
    this.router.navigate(['panel'])  
  }
  async seleccionarcita(idVet: string){
    if (this.idCitaSeleccionada === idVet) {
      this.idCitaSeleccionada = ''
    
      console.log(this.idCitaSeleccionada)
    }else{
      this.idCitaSeleccionada = idVet
    }
  }
  async borrar(){
      const res = window.confirm('seguro que quieres eliminar este dia con turno?')
      console.log(res)
      if(res){

        const respuesta = await this.authService.borrarCita(this.idCitaSeleccionada)
        console.log('borrada con exito')
      } 
  }
}
