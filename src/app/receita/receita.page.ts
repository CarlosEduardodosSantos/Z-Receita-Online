import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceitaService } from '../receita.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  PDFGenerator,
  PDFGeneratorOptions,
} from '@ionic-native/pdf-generator/ngx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage implements OnInit {
  @ViewChild('imp', { static: false }) el!: ElementRef;
  constructor(
    private pdf: PDFGenerator,
    private rService: ReceitaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('nro');
  }
  data: any[] = [];
  html: string = '';
  nome: any = environment.nome;
  receitas: any = '';
  pharma: any;
  receita: any = '';
  id: any;
  zap: any = '';
  teste: any = "none";
  Loading: any = "Carregando Dados"
  animacaoLoading:any = "none"
  DesapareceLoading:any = "100%"

  async ngOnInit() {

    const loop = setInterval(()=> {
      if (this.receita == '')
      {
        if (this.Loading == "Carregando Dados...")
      {
        this.Loading = "Carregando Dados"
      }
      else
      {
      this.Loading = this.Loading + "."
      }
      }
      else {
        clearInterval(loop)
        this.Loading = "Dados Carregados!!!"
        setTimeout(() => {
          this.Loading = "Mostrando Informações..."
          this.animacaoLoading = "DesapareceTela 1500ms linear"
          setTimeout(() => {
            this.DesapareceLoading = "0%"
            this.teste = "block"
          }, 1450);
        }, 1000)
      }
    }, 1000)
    this.rService.isAdmin = localStorage.getItem('admin');
    if (this.rService.isAdmin !== '1') {
      location.href = '/login';
    }
    await this.rService.obterPharm().then((farma) => {
      this.pharma = farma;
    });
    await this.rService.obterRecById(this.id).then((rec) => {
      this.receita = rec;
    });
    this.zap = `https://api.whatsapp.com/send?phone=55016${this.receita.telefone}`;
  }

  printThisPage() {
    const pdf = new jsPDF({
      unit: 'px',
      hotfixes: ['px_scaling'],
    });
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
      },
    });
  }

  print2() {
    var image = new Image();
    var image2 = new Image();
    var image3 = new Image();
    var image4 = new Image();
    image.src = this.receita.receita;
    image2.src = this.receita.receita2;
    image3.src = this.receita.receita3;
    image4.src = this.receita.receita4;

    var w = window.open("");
    w.document.write('<style type="text/css">img{max-width:400px; display: block; margin-left: auto; margin-right: auto; margin: auto;top: 0;left: 0;right: 0; margin-bottom: 30px;}</style>');
    w.document.write(image.outerHTML);
    if(this.receita.receita2){
    w.document.write(image2.outerHTML);
    }
    if(this.receita.receita3){
    w.document.write(image3.outerHTML);
    }
    if(this.receita.receita4){
    w.document.write(image4.outerHTML);
    }
    w.print();
  }

  print3() {
    var doc = new jsPDF();
    const img1 = this.receita.receita;
    const img2 = this.receita.receita2;
    const img3 = this.receita.receita3;
    const img4 = this.receita.receita4;
    doc.addImage(img1, 'JPEG', 10, 10, 150, 150, 'alias1', 'SLOW');
    if(this.receita.receita2){
    doc.addPage();
    doc.addImage(img2, 'JPEG', 10, 10, 150, 150, 'alias2', 'SLOW');
    }
    if(this.receita.receita3){
    doc.addPage();
    doc.addImage(img3, 'JPEG', 10, 10, 150, 150, 'alias3', 'SLOW');
    }
    if(this.receita.receita4){
    doc.addPage();
    doc.addImage(img4, 'JPEG', 10, 10, 150, 150, 'alias4', 'SLOW');
    }

    doc.save(`receita${this.receita.nome}.pdf`);
  }

  converterLongDate(data: any) {
    let datamov = new Date(data).toLocaleDateString();
    let hora = new Date(data).toLocaleTimeString();

    return datamov + ' ' + hora;
  }

  backToAdmin() {
    console.log(this.router.url);
    this.router.navigate(['/admin']);
  }
}
