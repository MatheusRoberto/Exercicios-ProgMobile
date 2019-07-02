import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jornal',
  templateUrl: './jornal.page.html',
  styleUrls: ['./jornal.page.scss'],
})
export class JornalPage implements OnInit {

  public noticias = [];
  public id;

  constructor(private http: Http,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let href = this.router.url;
    const split = href.split('/');
    href = split[3];
    if (href !== '' && href !== undefined) {
      this.id = href;
    } else {
      this.id = '';
    }
    this.getNoticias();
  }

  getNoticias() {

    this.noticias = [];
    let parametros = 'api-key=test';
    if (this.id !== '') {
      parametros = `section=${this.id}&${parametros}`;
    }

    const headers = {};

    const url = `http://content.guardianapis.com/search?${parametros}`;
    console.log(url);
    this.http.get(url, headers).subscribe(
      sucesso => {
        const news = sucesso.json().response.results;

        for (let i = 0; i < news.length; i++) {
          this.noticias.push({
            titulo: news[i].webTitle,
            categoria: news[i].sectionName
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
