import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceitaService } from '../receita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nome: any = environment.nome;
  login: any = environment.login;
  senha: any = environment.senha;
  isAdmin: any;

  constructor(private rService: ReceitaService, private router: Router) {}

  ngOnInit() {}

  goToAdmin(login: any, senha: any) {
    if (login == this.login && senha == this.senha) {
      localStorage.setItem('admin', '1');
      this.router.navigate(['/admin']);
    } else {
      localStorage.setItem('admin', '2');
      this.isAdmin = localStorage.getItem('admin');
      alert('Credenciais Incorretas!');
    }
  }
}
