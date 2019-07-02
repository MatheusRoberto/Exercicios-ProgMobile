import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.page.html',
  styleUrls: ['./uno.page.scss'],
})
export class UnoPage implements OnInit {

  public cor: String = 'red';

  classes() {
    return {
      'block': true
  };
}

background() {
  return {
    'background': this.cor
  };
}

mudarCor(cor) {
  this.cor = cor;
}

constructor() { }

ngOnInit() {
}

}
