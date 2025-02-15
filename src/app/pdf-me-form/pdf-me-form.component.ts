import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {Font, Template} from '@pdfme/common';
import {HttpClient} from '@angular/common/http';
import {Form} from '@pdfme/ui';
import {  checkbox,  date,  dateTime, ellipse,  image,
  line,  multiVariableText,  radioGroup,  rectangle,
  select, svg,  text,  time} from '@pdfme/schemas';

@Component({
  selector: 'app-pdf-me-form',
  templateUrl: './pdf-me-form.component.html',
  styles: '',
  providers: [HttpClient], // HttpClient を providers に追加
})
export class PdfMeFormComponent implements AfterViewInit,OnDestroy {

  @ViewChild('pdfme_content', {static: false}) PdfMeDivViewChild!: ElementRef;

  // Keep it as a variable for memory release
  private dom!: any;
  // HttpClient
  private httpClient = inject(HttpClient);
  // pdfme form
  private form?: Form;

  ngAfterViewInit() {
    this.dom = this.PdfMeDivViewChild.nativeElement;
    setTimeout(() => {
      this.showForm();
    }, 300);
  }

  protected async showForm(): Promise<void> {
     try {
       // load json. public/tempFormSignature.json
       const json: any = await firstValueFrom(this.httpClient.get('/tempFormSignature.json'));
       const template = json.templateData as Template;

       await this.loadFonts();

       this.form = new Form({
         domContainer: this.dom,
         template: template,
         inputs: [{}],
         plugins: this.getPlugins(),
         options: {
           font: this.MyFont,
           lang: 'ja',
         },
       });
     }
     catch (e) {
       console.error(e);
     }
  }

  ngOnDestroy() {
    if (this.form) {// form is the pdfme Form class.
      this.form.destroy();
    }

    // Force release of ViewChild 2025/2/10
    if (this.dom && this.dom.parentNode) {
      this.dom.parentNode.removeChild(this.dom);
    }
    this.dom = undefined;
  }


  private getPlugins() {
    return {
      Text: text,
      MultiVariableText: multiVariableText,
      Chckbox: checkbox,
      RadioGroup: radioGroup,
      Select: select,
      Image: image,
      Line: line,
      Date: date,
      DateTime: dateTime,
      Time: time,
      Rectangle: rectangle,
      Ellipse: ellipse,
      SVG: svg
    }
  }

  private readonly fontSeed: Font = {
    NotoSansJP_Regular: {
      data: '/NotoSansJP-Regular.otf',  // public folder. see angular.json assets: ["src/public"]
    },
    NotoSerifJP_Regular: {
      data: '/NotoSerifJP-Regular.otf',
      fallback: true,
    },
  };


  MyFont: Font =  {...this.fontSeed};
  /*
  Loading fonts in the public folder
   */
  private async loadFonts(): Promise<void> {
    for (const key in this.MyFont) {
      const directUrl = this.MyFont[key].data.toString();
      this.MyFont[key].data = await (await fetch(directUrl)).arrayBuffer();
    }
  }
} // end of class



