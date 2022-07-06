import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceitaService } from '../receita.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  nome: any = environment.nome;
  receitas: any = '';
  pharma: any;
  receita: any;
  isAdmin: any = localStorage.getItem('admin');
  procura: string;
  IsDisabled: boolean = false;
  LoopText: any = "Carregando Informações"
  DisplayLoading:any = "none"
  LoadingAnimation: any = ""

  constructor(private rService: ReceitaService, private router: Router) {}


  async ngOnInit() {
    this.rService.isAdmin = localStorage.getItem('admin');
    if (this.rService.isAdmin !== '1') {
      location.href = '/login';
    }
    await this.rService.obterPharm().then((farma) => {
      this.pharma = farma;
    });
    await this.rService.obterRecs().then((rec) => {
      this.receitas = rec;
    });
  }
  converterLongDate(data: any) {
    let datamov = new Date(data).toLocaleDateString();
    let hora = new Date(data).toLocaleTimeString();

    return datamov + ' ' + hora;
  }

  async getRecId(id: any) {
    this.IsDisabled = true

    this.DisplayLoading = "block"
    this.LoadingAnimation = "ApereceLoading 600ms linear"

    const loop = setInterval(() => {

      if (this.LoopText != "Carregando Informações...")
      {
        this.LoopText += "."
      }
      else {
        this.LoopText = "Carregando Informações"
      }
    }, 1000)

    console.log(this.IsDisabled)
    await this.rService.obterPharm().then((farma) => {
      this.pharma = farma;
    });
    await this.rService.obterRecById(id).then((rec) => {
      this.receita = rec;
    });
    this.goToUser(id);
    clearInterval(loop)
  }

  goToUser(id: any) {
    console.log(this.router.url);

    this.router.navigate(['/rec/' + id]);
    this.IsDisabled = false;
    this.DisplayLoading = "none"
    this.LoadingAnimation = ""
    this.LoopText = "Carregando Informações"
  }

  backToAdmin() {
    console.log(this.router.url);
    localStorage.setItem('admin', '2');
    this.router.navigate(['/login']);
  }

  async getByName(nome: string) {
    if (nome !== '') {
      await this.rService.obterPharm().then((farma) => {
        this.pharma = farma;
        console.log(farma)
      });
      await this.rService.obterRecsByName(nome).then((rec) => {
        this.receitas = rec;
        console.log(nome)
      });
    } else {
      await this.rService.obterPharm().then((farma) => {
        this.pharma = farma;
        console.log(farma)
      });
      await this.rService.obterRecs().then((rec) => {
        this.receitas = rec;
        console.log(rec)
      });
    }
  }
}
