import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

 public villes: any;
 public cinemas: any;
 public salles: any;
 public currentVille: any;
 public currentCinema: any;
  public currentProjection : any;


  constructor(public cinemaService : CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data=>{
       this.villes = data;
      }, error =>{
        console.log(error);
      })
  }

  onGetCinemas(ville: any) {
    this.currentVille = ville;
    this.salles = undefined;
    this.cinemaService.getCinemas(ville)
      .subscribe(data=>{
        this.cinemas = data;
      }, error =>{
        console.log(error);
      })
  }

  onGetSalles(cinema: any){
    this.currentCinema = cinema;
    this.cinemaService.getSalles(cinema)
      .subscribe(data=>{
        this.salles = data;

        this.salles._embedded.salles.forEach((salle:any) =>{
          this.cinemaService.getProjections(salle)
            .subscribe((data:any)=>{
              salle.projections=data;
          })
        })
      }, error=>{
        console.log(error);
      })

  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe((data:any)=>{
        this.currentProjection.tickets = data;
        console.log(this.currentProjection.tickets);
      }, (error:any)=>{
        console.log(error);
      })
  }
}
