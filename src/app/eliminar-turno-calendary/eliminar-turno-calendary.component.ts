import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-eliminar-turno-calendary',
  templateUrl: './eliminar-turno-calendary.component.html',
  styleUrls: ['./eliminar-turno-calendary.component.scss']
})
export class EliminarTurnoCalendaryComponent {
  //respuesta de la request
  horarios: any | any;
  //dias de turno veterinario
  dias: any | any;
  horas: any | any;

  horarioVet: any[] = [];
  turnos: any | any;
  
  mesActual: any
  fechaSeleccionada: any | undefined;
  diaSelecter: any
  mesSelected: any 
  horaSeleccionada: string| any;
  idVet: string | any;
  idTurno: string | any

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  async ngOnInit() {
    //obtener el id del veterinario
    this.route.queryParams.subscribe( async params => {
      this.idVet = params['idSelected'];
      console.log('Código de VET recibido:', this.idVet);
    });
  } 
  async datosPacientes(){
    //fecha de ionic al dar clic al dia 
    const fecha = new Date(this.fechaSeleccionada);
    this.diaSelecter = fecha.getDate();
    
    moment.locale('es');
    //obtener el mes de ionic calendar y el mes actual
    this.mesActual = moment().format('MMMM').toUpperCase();
    this.mesSelected = moment(fecha).format('MMMM').toUpperCase();
    console.log(this.mesSelected)
    console.log(this.mesActual)
    if(this.mesSelected != this.mesActual){
      //obtener los turnos del veterinario seleccionado
      this.horarios = await this.authService.obtenerTurnos(this.idVet, this.mesSelected)
      this.idTurno = this.horarios.data.id
      this.dias = this.horarios.data.dias
      this.turnos = this.dias.find((turno: any)=> turno.dia == this.diaSelecter) 
      console.log(this.turnos)
      if(this.turnos){
          this.horas = this.turnos.horarios.map((hora: any )=> hora.hora)
          console.log(this.horas)
      }
    console.log(this.horas)
    }
    else if(this.mesSelected == this.mesActual){
      //obtener los turnos del veterinario seleccionado
      this.horarios = await this.authService.obtenerTurnos(this.idVet, this.mesSelected)
      this.idTurno = this.horarios.data.id
      this.dias = this.horarios.data.dias
      this.turnos = this.dias.find((turno: any)=> turno.dia == this.diaSelecter) 
      console.log(this.turnos)
      if(this.turnos){
          this.horas = this.turnos.horarios.map((hora: any )=> hora.hora)
          console.log(this.horas)
      }
    }  
  }

  seleccionarHora(hora: string): void{
    console.log(hora)
  }

  seleccionarSubservicio(subservicio: string): any {
    console.log('ReservasComponent - seleccionarSubservicio()', subservicio);
  }
  back(){
    this.router.navigate(['panel']);
  }
  async borrar(){
    const data= {
      "dia": this.diaSelecter
    }
    const res = window.confirm('seguro que quieres eliminar este dia con turno?')
    console.log(res)
    if(res){
      try{
        const respuesta = await this.authService.eliminarTurnos(data, this.idTurno)
        alert('eliminado con exito')
      }catch(err){
        alert('No existen turnos')
      }

    }

  }
}
