import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public categorias = [];

  constructor(private http: Http,
    private router: Router) {
    this.getCategorias();
  }

  ngOnInit() {
  }

  getCategorias() {
    const parametros = 'api-key=test';

    const headers = {};

    const url = `https://content.guardianapis.com/sections?${parametros}`;

    this.http.get(url, headers).subscribe(
      sucesso => {
        const news = sucesso.json().response.results;

        for (let i = 0; i < news.length; i++) {
          this.categorias.push({
            id: news[i].id,
            titulo: news[i].webTitle
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  isSelected(categoria) {
    this.router.navigate([`/menu/jornal/${categoria.id}`]);
  }

}
