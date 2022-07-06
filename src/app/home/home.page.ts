import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { iRec } from '../iRec';
import { iPharm } from '../iPharm';
import { ReceitaService } from '../receita.service';
import { environment } from 'src/environments/environment';
import { encode, decode } from 'node-base64-image';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public fGroup: FormGroup;
  Nome: any;
  Cpf: any;
  Celular: any;
  picture: string;
  picture2: string;
  picture3: string;
  picture4: string;
  pictureC: any;
  recModel: iRec = new iRec();
  pharmModel: iPharm = new iPharm();
  pharma: any;
  nome: any = environment.nome;
  IsDisabled: any = false;
  DisplayErro:any = "none";
  ErroAnimation: any = "";
  BarraErroAnimation: any =""
  TextoLoop:any = "Aguarde, estamos enviando Seus Dados"
  DisplayCerto:any = "none"
  CertoAnimation:any = ""
  TextoErro:any = ""

  constructor(private fBuilder: FormBuilder, private rService: ReceitaService) {
    this.fGroup = this.fBuilder.group({
      Nome: [this.Nome],
      Cpf: [this.Cpf],
      Celular: [this.Celular],
    });
  }

  async submit(_nome: any, _cpf: any, _celular: any) {
    if (this.fGroup.valid && this.Cpf.length > 13 && this.Celular.length > 14) {
      this.IsDisabled = true;
      await this.rService.obterPharm().then((farma) => {
        this.pharma = farma;
      });
      this.Nome = _nome;
      this.Cpf = _cpf;
      this.Celular = _celular;
      this.insertReceita();
      console.log(this.recModel);
      console.log(this.fGroup.value);
    } else if (
      this.picture === undefined ||
      this.picture === null ||
      this.picture === ''
    ) {
      this.IsDisabled = true;
      this.TextoErro = "Insira a imagem do documento 1";
      this.DisplayErro = "block"
      this.ErroAnimation = "someTudo 2s linear";
      this.BarraErroAnimation = "someBarra 2s linear";
      setTimeout(()=>{
        this.DisplayErro="none"
        this.BarraErroAnimation = "";
        this.ErroAnimation = "";
        this.IsDisabled = false;
      },2000)
    } else {
      this.IsDisabled = true;
      this.TextoErro = "Verifique se os dados estão corretos";
      this.DisplayErro = "block"
      this.ErroAnimation = "someTudo 2s linear";
      this.BarraErroAnimation = "someBarra 2s linear";
      setTimeout(()=>{
        this.DisplayErro="none"
        this.BarraErroAnimation = "";
        this.ErroAnimation = "";
        this.IsDisabled = false;
      },2000)
    }
  }

  FechaErro() {
    this.DisplayErro="none"
  }

  async pic() {
    const image = await Camera.getPhoto({
      quality: 25,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.picture = image.dataUrl;
  }

  async pic2() {
    const image2 = await Camera.getPhoto({
      quality: 25,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.picture2 = image2.dataUrl;
  }

  async pic3() {
    const image3 = await Camera.getPhoto({
      quality: 25,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.picture3 = image3.dataUrl;
  }

  async pic4() {
    const image4 = await Camera.getPhoto({
      quality: 25,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.picture4 = image4.dataUrl;
  }

  async insertReceita() {
    this.recModel = {
      nome: this.Nome,
      cpf: this.Cpf,
      telefone: this.Celular,
      receita: this.picture,
      receita2: this.picture2,
      receita3: this.picture3,
      receita4: this.picture4,
    };
    if (this.recModel.receita !== null && this.recModel.receita !== undefined) {
      this.DisplayCerto = "block"
        this.CertoAnimation = "ApareceCerto 700ms linear"
        const loop = setInterval(()=>{
          if (this.TextoLoop != "Aguarde, estamos enviando Seus Dados...") {
          this.TextoLoop += "."
        }
        else {
         this.TextoLoop = "Aguarde, estamos enviando Seus Dados"
        }}
        , 1000)
      await this.rService.insertReceita(this.recModel).then(() => {
      location.reload();
      });
    } else {
      this.TextoErro = "Insira a imagem do documento 1";
      this.DisplayErro = "block"
      this.ErroAnimation = "someTudo 2s linear";
      this.BarraErroAnimation = "someBarra 2s linear";
      setTimeout(()=>{
        this.DisplayErro="none"
        this.BarraErroAnimation = "";
        this.ErroAnimation = "";
        this.IsDisabled = false;
      },2000)
    }
  }
}
