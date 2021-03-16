import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * Armazena a temperatura referente a cidade
   */
  graus = '';

  /**
   * Armazena a cidade que será exibida
   */
  cidade = '';

  /**
   * Armazena a cor de fundo que será exibida
   */
  cor = '';

  /**
   * Texto indicativo
   */
  indicativo = '';

  /**
   * Armazena a imagem que será exibida
   */
  imagem = '';

  /**
   * Armazena a previsão para os proximos dias
   */
  previsao = [];

  /**
   * Responsável por verificar se há erro
   */
  erro = false;



  constructor( private appService: AppService) { }

  ngOnInit() {
    this.get();
  }

  /**
   * Responsável por buscar uma cidade
   */
  buscarCidade($event){
    $event.preventDefault();
    let obForm = new FormData($event.target);
    let cidade = obForm.get('cidade');
    return this.get(cidade);
  }

  /**
   * Responsável por fazer a chamada ao webservice
   */
  get(cidade = null){
    this.appService.get(cidade).subscribe(response => {
      if(typeof response['temp'] === 'undefined'){
        this.erro = true
        return;
      }
      this.graus  = response['temp'];
      this.cidade = response['city'];
      this.setImagem(response);
      this.setCor(response);
      this.previsao = response['forecast'].slice(0,5);
    })
  }

  /**
   * Responsável por definir a imagem
   */
  setImagem(response){
    switch (response['condition_slug']) {
      case 'storm':
      case 'snow':
      case 'rain':
      case 'cloud':
        this.imagem = response['condition_slug'];
        break;

      default:
        this.imagem = 'sun';
        break;
    }
  }

  /**
   * Responsável por retornar a minhatura do icone
   */
  img(img){
    switch (img) {
      case 'storm':
      case 'snow':
      case 'rain':
      case 'cloud':
        return img;
      default:
        return 'sun';
    }
  }

  /**
   * Responsável por definir a cor de fundo
   */
  setCor(response){
    switch (response['condition_slug']) {
      case 'storm':
        this.indicativo = 'Tempestade';
        this.cor = '0,18,84';
        break;
      case 'snow':
        this.indicativo = 'Nevando';
        this.cor = '0,51,66';
        break;
      case 'rain':
        this.indicativo = 'Chuvoso';
        this.cor = '35,35,35';
        break;
      case 'cloud':
        this.indicativo = 'Nublado';
        this.cor = '52,81,123';
        break;
      default:
        this.indicativo = 'Ensolarado';
        this.cor = '241, 224, 190';
        break;
    }
  }

}
