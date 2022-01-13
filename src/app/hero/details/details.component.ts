import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  model = <any>{};
  hero = <any>{ thumbnail : { path:''}, series : [], events:[], comics : []};

  constructor(private service: HeroService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(){
    this.service.getHeroById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
      this.model = data;
      this.hero = this.model.data.results[0];
    }, error => {
      console.log('Erro ao carregar dados. ' + error.message, 'Erro!')
    });
  }

  backPage() {
    this.location.back();
  }

}
