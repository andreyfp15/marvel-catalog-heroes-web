import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nameSearch = "";
  model = <any>{ data: { results: [], total : 0 } };
  heroes = [];
  paginate = <any>{ pages : []};

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.getHeroes(0, null);
  }

  getHeroes(currentPage: number, name : string) {
    this.service.getHero(currentPage * 10, name).subscribe(data => {
      this.model = data;
      this.heroes = this.model.data.results;

      this.paginate = this.calcPaginate(this.model.data.total, currentPage);
      console.log(this.paginate)

      this.nameSearch = "";
      //Helper.hideLoader();
    }, error => {
      console.log('Erro ao carregar lista. ' + error.message, 'Erro!')
      //this.toast.error('Erro ao carregar lista. ' + error.message, 'Erro!');
      //Helper.hideLoader();
    });
  }

  calcPaginate(totalItems: number, currentPage: number, pageSize: number = 10, maxPages: number = 6) {

    let totalPages = Math.trunc(totalItems / pageSize);

    //if (currentPage < 1) {
    //  currentPage = 1;
    //} else if (currentPage > totalPages) {
    //  currentPage = totalPages;
    //}

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {

      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    //let startIndex = (currentPage - 1) * pageSize;
    //let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      //pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      //startIndex: startIndex,
      //endIndex: endIndex,
      pages: pages
    };
  }

}
